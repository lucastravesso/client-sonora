import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './cartStyles.css'
import InputMask from 'react-input-mask'


import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import { BsFillPlusCircleFill, BsFillDashCircleFill } from "react-icons/bs";


import api from "../../services/loginApi";

export default function CartPage() {

    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    const history = useHistory();

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

    useEffect(() => {
        getProducts()
    }, []);

    async function addCart(id) {
        try {
            await api.post(`cart/add-cart/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
            getProducts()
        } catch (err) {
            alert("Falha ao adicionar no carrinho, necessario criar uma conta para continuar . .");
        }
    }

    async function removeCart(id) {
        try {
            await api.delete(`cart/remove-cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
            getProducts()
        } catch (err) {
            alert("Falha ao tirar do carrinho")
        }
    }

    function showTopTable() {

        if (cartProducts.length === 0) {
            return <th><b>Nada a exibir</b></th>
        } else {
            return (<>
                <td><b>Produto</b></td>

                <td><b>Preço</b></td>

                <td><b>Quantidade</b></td>
            </>);
        }
    }

    const [address, setAddress] = useState([]);

    useEffect(() => {
        try {
            api.get('user/findByToken', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(response => {
                setAddress(response.data.addressDto)
            })
        } catch (err) {
            alert("Falha ao trazer as informações de usuario")
        }
    }, [])


    async function verifyAndProc() {

        if (cartProducts.length === 0) {
            alert('Nenhum item no carrinho')
            history.push('/')
        } else {
            if (address.length === 0) {
                alert("Necessira preencher um endereço para entrega")
                history.push('/adicionarendereco');
            } else {
                history.push('/confirmacaodecompra')
            }
        }
    }


    const [cep, setCep] = useState()

    return (
        <>
            <Nav />
            <div className="container-cart">
                <div className="cont-left-cart">
                    <table>
                        <thead>
                            <tr>
                                {
                                    showTopTable()
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {cartProducts.map(p => (
                                <tr key={p.productDTO.id}>
                                    <td>{p.productDTO.prod_name}</td>
                                    <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.productDTO.prod_price)}</td>
                                    <td>
                                        <button><BsFillDashCircleFill onClick={() => removeCart(p.productDTO.id)} /></button>
                                        {p.quantity}
                                        <button><BsFillPlusCircleFill onClick={() => addCart(p.productDTO.id)} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="cont-right-cart">
                    <div className="cont-final">
                        <div className="cont-price">
                            <ul>
                                <li className="title"><b>Preço total</b></li>
                                <li>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)}</li>
                            </ul>
                        </div>

                        <div className="cont-btn-final">
                            <button className="button" onClick={() => verifyAndProc()}>Continuar para pagamento</button>
                        </div>
                    </div>
                </div>
            </div>
            <Bottom />
        </>
    );

    /**/
}