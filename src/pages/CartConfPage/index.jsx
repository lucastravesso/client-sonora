import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InputMask from 'react-input-mask';


import './cartConfStyles.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function CartConfPage() {

    const [cep, setCep] = useState('')

    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [user, setUser] = useState([]);
    const [address, setAddress] = useState([]);
    const [card, setCard] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const history = useHistory();

    useEffect(() => { getCard() }, [])
    useEffect(() => { getProducts() }, []);
    useEffect(() => { getUser() }, [])

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

    async function getCard() {
        try {
            await api.get('/card/listallbyid', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(response => {
                setCard(response.data)
            })
        } catch (err) {
            alert("Nao foi possivel trazer o cartão")
        }
    }

    async function calFrete() {
        if (cep.lastIndexOf('_') === -1) {
            return setStatus({
                type: 'cep',
                message: 'O valor do frete é de R$ 78,80'
            })
        } else {
            return setStatus({
                type: 'cep',
                message: 'Necessario preencher o campo CEP'
            })
        }
    }

    async function selectCard(id) {

        return setStatus({
            type: 'card',
            message: 'Selecionado'
        });
    }

    return (
        <>
            <Nav />
            <div className="full-container-conf">
                <div className="cont-left-conf">
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
                <div className="cont-right-conf">
                    <table>
                        <thead>
                            <tr>
                                <td>Digite seu cep para calcular o frete</td>
                            </tr>
                            <tr>
                                <td>
                                    <InputMask
                                        mask="99999-999"
                                        placeholder="⠀⠀CEP"
                                        onChange={e => setCep(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {status.type === 'cep' ? <p style={{ color: "red" }}>{status.message}</p> : ""}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button className="button" onClick={() => calFrete()}>Calcular</button>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                card.map(card => (
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

                                        <button className="button" onClick={() => selectCard(card.id)}>Selecionar e prosseguir</button>
                                        <br /><br />
                                    </div>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Bottom />
        </>
    );

    /**/
}