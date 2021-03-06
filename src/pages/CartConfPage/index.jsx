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
    const [cup, setCup] = useState([]);
    const [card, setCard] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const history = useHistory();

    localStorage.removeItem('cupon')

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
            localStorage.removeItem('cupon')

        } catch (err) {
            alert("Nao foi possivel buscar produtos")
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

        api.get(`/card/find/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            localStorage.setItem('id_cartão', response.data.id);
            history.push('/confirmacaodepedido')
        });

    }

    function verifyCupon() {

        const cupom = document.getElementsByName("cupom")
        api.get(`/cupon/listname/${cupom[0].value}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => {
            setCup(res.data)
            if (cup.length !== 0 && cup.c_quantity > 0 && cup.c_type === 0) {
                setStatus({
                    type: 'cupom',
                    message: `PARABENS!! VOCE GANHOU ${cup.c_percentage}% DE DESCONTO COM NOSSO CUPOM ! CUPOM VALIDO ATÉ ${cup.c_final}`
                })
                localStorage.setItem('cupon', cup.id)
            } else if (cup.length !== 0 && cup.c_quantity > 0 && cup.c_type === 1) {
                setStatus({
                    type: 'cupom',
                    message: `VOCE ESTÁ UTILIZANDO UM CUPOM DE TROCA DE R$${cup.c_percentage},00`
                })
                localStorage.setItem('cupon', cup.id)
            } else {
                setStatus({
                    type: 'cupom',
                    message: 'Cupom invalido . .'
                })
            }
        })
    }

    function showCards() {
        if (card.length === 0) {
            return <tr>
                <td>
                    <button className="button" onClick={
                        () => history.push('/adicionarcartao')
                    }>Adicionar um cartão</button>
                </td>
            </tr>
        } else {
            return (
                <>
                    {card.map(card => (
                        <div className="cartao" key={card.id}>
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
                                <td>Código de segurança : {card.card_security}</td>
                            </tr>

                            <button
                                className="button"
                                onClick={() => selectCard(card.id)}>Selecionar cartão
                            </button>
                            <br /><br />
                        </div>
                    ))}
                    <tr>
                        <td>
                            <button className="button" onClick={
                                () => history.push('/adicionarcartao')
                            }>Adicionar outro cartão</button>
                        </td>
                    </tr>
                </>
            )
        }
    }

    return (
        <>
            <Nav />
            <div className="full-container-conf">
                <div className="cont-left-conf">
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
                            <tr className="cupom">
                                <td><h1>Insira o cupom promocional</h1></td>
                            </tr>
                            <tr className="cupom">
                                <td>
                                    <input type="text" name="cupom" placeholder="Cupom" />
                                </td>
                            </tr>
                            <tr className="cupom">
                                <td>
                                    <button className="button" onClick={() => verifyCupon()}>Verificar cupom</button>
                                </td>
                            </tr>
                            <tr>
                                <td>{status.type === 'cupom' ? <p>{status.message}</p> : ""}</td>
                            </tr>
                            {showCards()}
                            <tr>
                                <td>
                                    <button className="button" onClick={
                                        () => history.push('/qrcode')
                                    }>Pix via QR code</button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <Bottom />
        </>
    );

    /**/
}