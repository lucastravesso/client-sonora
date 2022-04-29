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
    const [cup, setCup] = useState([]);
    const [user, setUser] = useState([]);
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState([]);

    const history = useHistory();

    useEffect(() => { getUser() }, [])
    useEffect(() => { getCard() }, [])
    useEffect(() => { getProducts() }, []);
    useEffect(() => { getCupon() }, [])

    function getCupon() {

        if (localStorage.getItem('cupon') !== null) {
            api.get(`/cupon/list/${localStorage.getItem('cupon')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res => {
                setCup(res.data)
            })
        } else {
            return;
        }
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

    async function confirmarCompra() {

        if (selectedAddress.length === 0) {
            return alert("Selecione um endereço para continuar a compra");
        } else {
            if (cup.length !== 0) {
                try {
                    await api.post(`/order/with/${localStorage.getItem('address-id')}`, cup, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        }
                    })
                    history.push('/pedidos')
                } catch (err) {
                    alert("Falha ao processar compra")
                }
            } else if (cup.length === 0) {
                try {
                    await api.post(`/order/${localStorage.getItem('address-id')}`, null, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        }
                    });
                    history.push('/pedidos')
                } catch (err) {
                    alert("Falha ao processar compra")
                }
            }
        }
    }

    function getResults() {

        if (cup.length !== 0 && cup.c_type === 0) {
            return <div className="results">
                <h1>Quantidade total de itens : {products.total}⠀⠀⠀⠀⠀⠀
                    Preço total da compra : {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)}⠀⠀⠀⠀⠀⠀
                    Preço total com desconto : {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice - (products.totalPrice / 100) * cup.c_percentage)}</h1>
            </div>
        } else if (cup.length !== 0 && cup.c_type === 1) {
            if(products.totalPrice < cup.c_percentage){
                return <div className="results">
                    <h1>Quantidade total de itens : {products.total}⠀⠀⠀⠀⠀⠀
                        Preço total da compra : R$: 0,00⠀⠀⠀⠀⠀⠀
                        Um cupom com valor {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cup.c_percentage - products.totalPrice)} sera gerado</h1>
                </div>
            }else{
                return <div className="results">
                    <h1>Quantidade total de itens : {products.total}⠀⠀⠀⠀⠀⠀
                        Preço total da compra : {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)}⠀⠀⠀⠀⠀⠀
                        Preço total com desconto : {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice - cup.c_percentage)}</h1>
                </div>
            }
        } else {
            return <div className="results">
                <h1>Quantidade total de itens : {products.total}⠀⠀⠀⠀⠀⠀
                    Preço total da compra : {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)}⠀⠀⠀⠀⠀⠀
                </h1>
            </div>
        }



    }

    function selectAddress(id) {
        address.find((c) => {
            if (c.id === id) {
                localStorage.setItem("address-id", id)
                setSelectedAddress(c)
            }
            return null;
        })
    }

    function showAddress() {
        return address.map(a => (
            <button key={a.id} className="address-btn" onClick={() => selectAddress(a.id)}>
                <tr className="lines-right">
                    <td>{a.state + ", " + a.city + " - " + a.district}</td>
                </tr>
            </button>
        ))
    }

    function verifySelectedAddress() {
        if (selectedAddress.length === 0) {
            return <tr className="lines-right">
                <td>Nenhum endereço selecionado</td>
            </tr>
        } else {
            return <tr className="lines-right">
                <td>
                    Estado : {selectedAddress.state} <br />
                    Cidade : {selectedAddress.city} <br />
                    Bairro : {selectedAddress.district} <br />
                    Rua : {selectedAddress.street} <br />
                    Numero : {selectedAddress.number} <br />
                    Logradouro : {selectedAddress.complement}</td>
            </tr>
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
                            {showAddress()}
                            <br />
                            <br />
                            <tr>
                                <td><h1>Endereço selecionado</h1></td>
                            </tr>
                            {verifySelectedAddress()}
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
                                    <td>Código de segurança : {card.card_security}</td>
                                </tr>

                            </div>
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