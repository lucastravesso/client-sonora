import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InputMask from 'react-input-mask'

import './OrderConfPage.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function OrderConfPage() {

    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [card, setCard] = useState([]);
    const [cup, setCup] = useState([]);

    const history = useHistory();

    const [user, setUser] = useState([]);
    const [address, setAddress] = useState([]);

    async function getUser() {
        try {
            await api.get('user/findByToken', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(response => {
                setUser(response.data)
                setAddress(response.data.addressDto)
            })
        } catch (err) {
            alert("Falha ao traer as informações de usuario")
        }
    }
    useEffect(() => { getUser() }, [])
    useEffect(() => { getCard() }, [])
    useEffect(() => { getProducts() }, []);

    async function getProducts() {
        try {
            await api.get('cart/get-product', {
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

    async function getCard() {
        api.get(`/card/find/${localStorage.getItem('id_cartão')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            setCard(response.data)
        });
    }

    async function confirmarCompra(){
        try {
            await api.post('/order', null ,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            alert('Pedido confirmado, poderá visualizar na pagina de pedidos')
            history.push('/perfilsimples')
        } catch (err) {
            alert("Falha ao processar compra")
        }
    }

    useEffect(() => {
        api.get(`/cupon/listname/${localStorage.getItem('cupon')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => {
            setCup(res.data)
        })
    }, [])

    let percent;

    if(cup != 0)
    {
        percent = cup.c_percentage
    }else{
        percent = 0;
    }
        

    return (
        <>
            <Nav />
            <div className="full-container-order">
                <div className="cont-left-order">
                    <table>
                        <thead>
                            <tr>
                                <td>Produto</td>
                                <td>Quantidade</td>
                                <td>Preço</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cartProducts.map(p => (
                                <tr key={p.productDTO.id}>
                                    <td >{p.productDTO.prod_name}</td>
                                    <td>{p.quantity}</td>
                                    <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.productDTO.prod_price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="results">
                        <h1>Quantidade total de itens : {products.total}⠀⠀⠀⠀⠀⠀
                            Preço total da compra : {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice - (products.totalPrice /100) * percent)}</h1>
                    </div>
                </div>
                <div className="cont-right-order">
                    <table>
                        <thead>
                            <tr>
                                <td><h1>Usuario . .</h1></td>
                            </tr>
                            <tr className="lines-right">
                                <td>{user.firstName + " " + user.lastName}</td>
                            </tr>
                            <tr className="lines-right">
                                <td>{user.cpf}</td>
                            </tr>
                            <tr className="lines-right">
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td><h1>Endereço de entrega . .</h1></td>
                            </tr>
                            <tr className="lines-right">
                                <td>{address.state + ", " + address.city + " - " + address.district}</td>
                            </tr>
                            <tr className="lines-right">
                                <td>{address.street + ", " + address.number}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <div className="cartao">
                                <tr>
                                    <td>Nome : {card.card_name}</td>
                                </tr>
                                <tr>
                                    <td>Bandeira : {card.card_flag}</td>
                                </tr>
                                <tr>
                                    <td>Numero : {card.card_number}</td>
                                </tr>
                                <tr>
                                    <td>Validade do cartão : {card.card_valid}</td>
                                </tr>

                            </div>
                            <tr className="cv">
                                <td>
                                    <InputMask
                                        mask="999"
                                        placeholder='CVC'
                                    />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <button className="button" onClick={() => confirmarCompra()}> Confirmar compra</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <Bottom />
        </>
    );

    /**/
}