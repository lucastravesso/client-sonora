import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './OrderConfPage.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function OrderConfPage() {

    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [card, setCard] = useState([]);

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

    return (
        <>
            <Nav />
            <div className="full-container-order">
                <div className="cont-left-order">
                    <table>
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
                            Preço total da compra : {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)}</h1>
                    </div>
                </div>
                <div className="cont-right-order">
                    <table>
                        <thead>
                            <tr>
                                <td><h1>Usuario . .</h1></td>
                            </tr>
                            <tr>
                                <td>{user.firstName + " " + user.lastName}</td>
                            </tr>
                            <tr>
                                <td>{user.cpf}</td>
                            </tr>
                            <tr>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td><h1>Endereço de entrega . .</h1></td>
                            </tr>
                            <tr>
                                <td>{address.state + ", " + address.city + " - " + address.district}</td>
                            </tr>
                            <tr>
                                <td>{address.street + ", " + address.number}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <div className="cartao">
                                <tr>
                                    <td>Nome no cartão : {card.card_name}</td>
                                </tr>
                                <tr>
                                    <td>Bandeira : {card.card_flag}</td>
                                </tr>
                                <tr>
                                    <td>Numero no cartão : {card.card_number}</td>
                                </tr>
                                <tr>
                                    <td>Validade do cartão : {card.card_valid}</td>
                                </tr>

                            </div>
                            <tr className="cv">
                                <td>
                                    <input type="text" placeholder="Código de Segurança do cartão" />
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