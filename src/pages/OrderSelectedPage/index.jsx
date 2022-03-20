import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './OrderSelectedPage.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function OrderSelectedPage() {

    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    const history = useHistory();

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

    useEffect(() => {
        getProducts()
    }, []);

    async function getOrder() {

        try {

            await api.get(`/order/${localStorage.getItem('order-id')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res => {
                setOrder(res.data)
            })

        } catch (err) {
            alert("Falha ao trazer pedido")
        }
    }

    useEffect(() => { getOrder() }, [])

    console.log(cartProducts)

    return (
        <>
            <Nav />
            <div className="container-order-selected">
                <div className="selected-left">

                    <table className="top-table">
                        <tr>
                            <td>{'Pedido : ' + order.id}</td>
                            <td >{'Status do Pedido : ' + order.status}</td>
                            <td>{'Data do Pedido : ' + order.orderDate}</td>
                            <td colSpan={2}>{'Preço total do pedido : ' + Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)}</td>
                        </tr>
                    </table>
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

                </div>
            </div>
            <Bottom />
        </>
    );

}