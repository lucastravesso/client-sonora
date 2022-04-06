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
    const [user, setUser] = useState([]);
    const [address, setAddress] = useState([]);

    const history = useHistory();

    useEffect(() => { getUser() }, [])
    useEffect(() => { getCard() }, [])
    useEffect(() => { getProducts() }, []);
    useEffect(() => {
        api.get(`/cupon/list/${localStorage.getItem('cupon')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => {
            setCup(res.data)
        })
    }, [])

    function xoption(){
        return (
                <select name="opt">
                    <option>1x {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)} - sem juros</option>
                    <option>2x {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice / 2) } - sem juros</option>
                    <option>3x {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice / 3)} - sem juros</option>
                    <option>4x {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice / 4)} - sem juros</option>
                    <option>5x {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice / 5)} - sem juros</option>
                    <option>6x {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice / 6)} - sem juros</option>
                    <option>7x {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((products.totalPrice + (products.totalPrice / 100) * 5) /7)} - 5% de juros</option>
                    <option>8x {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((products.totalPrice + (products.totalPrice / 100) * 5) /8)} - 5% de juros</option>
                    <option>9x {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((products.totalPrice + (products.totalPrice / 100) * 10) /9)} - 10% de juros</option>
                    <option>10x {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((products.totalPrice + (products.totalPrice / 100) * 10) /10)} - 10% de juros</option>
                </select>
        );
    }

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

        if(cup.length !== 0){
            try {
                await api.post('/order/with', cup ,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                alert('Pedido confirmado, poderá visualizar na pagina de pedidos')
                history.push('/perfilsimples')
                localStorage.clear('cupon')
            } catch (err) {
                alert("Falha ao processar compra")
            }
        }else if(cup.length === 0){
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
    }

    function getResults(){

        if(cup.length !== 0)
        {
            return <div className="results">
            <h1>Quantidade total de itens : {products.total}⠀⠀⠀⠀⠀⠀
                Preço total da compra : {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)}⠀⠀⠀⠀⠀⠀
                Preço total com desconto : {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice - (products.totalPrice /100) * cup.c_percentage)}</h1>
            </div>
        }else{
            return <div className="results">
            <h1>Quantidade total de itens : {products.total}⠀⠀⠀⠀⠀⠀
                Preço total da compra : {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)}⠀⠀⠀⠀⠀⠀
            </h1>
            </div>
        }

        
        
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
                    {getResults()}
                </div>
                <div className="cont-right-order">
                    <table>
                        <thead>
                            <tr>
                                <td><h1>Usuario</h1></td>
                            </tr>
                            <tr className="lines-right">
                                <td>Nome  -  {user.firstName + " " + user.lastName}</td>
                            </tr>
                            <tr className="lines-right">
                                <td>Cpf  -  {user.cpf}</td>
                            </tr>
                            <tr className="lines-right">
                                <td>Email  -  {user.email}</td>
                            </tr>
                            <tr>
                                <td><h1>Endereço de entrega</h1></td>
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
                            {xoption()}
                            <br />
                            <br />
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