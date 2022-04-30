import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './OrderSelectedPage.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";

import shippingBar from '../../components/ProgressBar/ShippingBar'


export default function OrderSelectedPage() {

    const [order, setOrder] = useState([]);
    const [cup, setCup] = useState([]);
    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    const history = useHistory();

    useEffect(() => { getOrder() }, [])
    useEffect(() => { getProducts() }, []);

    async function getProducts() {
        try {
            await api.get(`/order/prod/${localStorage.getItem('order-id')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(resProd => {
                setProducts(resProd.data)
                setCartProducts(resProd.data.cartProducts)
            })

        } catch (err) {
            alert("Nao foi possivel buscar produtos")
        }
    }

    function getOrder() {

        try {

            api.get(`/order/${localStorage.getItem('order-id')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res => {
                setOrder(res.data)
                setCup(res.data.cupon)
                setAddress(res.data.addressDto)
            })

        } catch (err) {
            alert("Falha ao trazer pedido")
        }
    }

    function handleOrderStatus() {
        if (order.cupon !== null && cup.c_type === 0) {
            return <table className="top-table">
                <tr>
                    <td><b>Nº Pedido</b></td>
                    <td><b>Data do Pedido</b></td>
                    <td><b>Preço total com cupom : {cup.c_name}</b></td>
                </tr>
                <tr>
                    <td>{order.id}</td>
                    <td>{order.orderDate}</td>
                    <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice - (products.totalPrice / 100) * cup.c_percentage)}</td>
                </tr>
                <tr>
                    <td><b>Cidade</b></td>
                    <td><b>Bairro</b></td>
                    <td><b>Numero</b></td>
                </tr>
                <tr>
                    <td>{address.city}</td>
                    <td>{address.district}</td>
                    <td>{address.number}</td>
                </tr>
            </table>
        } else if (order.cupon !== null && cup.c_type === 1) {

            if (products.totalPrice < cup.c_percentage) {
                return <table className="top-table">
                    <tr>
                        <td><b>Nº Pedido</b></td>
                        <td><b>Data do Pedido</b></td>
                        <td><b>Você utilizou o cupom ' {cup.c_name} '</b></td>
                    </tr>
                    <tr>
                        <td>{order.id}</td>
                        <td>{order.orderDate}</td>
                        <td>Um novo cupom foi gerado com o valor restante.</td>
                    </tr>
                    <tr>
                        <td><b>Cidade</b></td>
                        <td><b>Bairro</b></td>
                        <td><b>Numero</b></td>
                    </tr>
                    <tr>
                        <td>{address.city}</td>
                        <td>{address.district}</td>
                        <td>{address.number}</td>
                    </tr>
                </table>
            } else if(products.totalPrice > cup.c_percentage){
                return <table className="top-table">
                    <tr>
                        <td><b>Nº Pedido</b></td>
                        <td><b>Data do Pedido</b></td>
                        <td><b>Preço total com cupom : {cup.c_name}</b></td>
                    </tr>
                    <tr>
                        <td>{order.id}</td>
                        <td>{order.orderDate}</td>
                        <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice - cup.c_percentage)}</td>
                    </tr>
                    <tr>
                        <td><b>Cidade</b></td>
                        <td><b>Bairro</b></td>
                        <td><b>Numero</b></td>
                    </tr>
                    <tr>
                        <td>{address.city}</td>
                        <td>{address.district}</td>
                        <td>{address.number}</td>
                    </tr>
                </table>
            }
        } else {
            return <table className="top-table">
                <tr>
                    <td><b>Nº Pedido</b></td>
                    <td><b>Data do Pedido</b></td>
                    <td><b>Preço total do pedido</b></td>
                </tr>
                <tr>
                    <td>{order.id}</td>
                    <td>{order.orderDate}</td>
                    <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)}</td>
                </tr>
                <tr>
                    <td><b>Cidade</b></td>
                    <td><b>Bairro</b></td>
                    <td><b>Numero</b></td>
                </tr>
                <tr>
                    <td>{address.city}</td>
                    <td>{address.district}</td>
                    <td>{address.number}</td>
                </tr>
            </table>
        }
    }

    function verifyStatus() {
        if (order.status === "PEDIDO_ENVIADO" || order.status === "ENTREGUE") {
            return (
                <div>
                    <tr>
                        <td>Impossivel cancelar, pedido a caminho ou entregue</td>
                    </tr>
                </div>
            );
        } else {
            return (
                <div>
                    <tr>
                        <td>Deseja cancelar a compra ?</td>
                    </tr>
                    <tr>
                        <td><button className="button" onClick={() => {
                            localStorage.setItem('id-pedido_cancel', order.id)
                            history.push('/cancelamento')
                        }
                        }>Cancelar compra</button></td>
                    </tr>
                </div>
            );
        }
    }


    return (
        <>
            <Nav />
            <div className="container-order-selected">
                <div className="selected-left">
                    {shippingBar(order.status)}
                    <br />
                    {handleOrderStatus()}
                    <table className="middle-table">
                        <tr className="bar">
                            <td>Produto</td>
                            <td>Preço Unitario</td>
                            <td>Especificação</td>
                            <td>Fabricante</td>
                            <td>Quantidade total</td>
                            <td>Preço Total</td>
                        </tr>
                        {cartProducts.map(p => (
                            <tr>
                                <td>{p.productDTO.prod_name}</td>
                                <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.productDTO.prod_price)}</td>
                                <td>{p.productDTO.prod_spec}</td>
                                <td>{p.productDTO.prod_builder}</td>
                                <td>{p.quantity}</td>
                                <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="selected-right">
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td>Deseja trocar algum produto ?</td>
                                </tr>
                                <tr>
                                    <td><button className="button" onClick={() => history.push('/troca')}>Trocar pedido</button></td>
                                </tr>
                                <br />
                                {verifyStatus()}
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <Bottom />
        </>
    );

}