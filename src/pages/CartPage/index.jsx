import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './cartStyles.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import { BsFillPlusCircleFill, BsFillDashCircleFill } from "react-icons/bs";


import api from "../../services/loginApi";

export default function CartPage() {

    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [address, setAddress] = useState([]);

    const history = useHistory();

    useEffect(() => {getProducts()}, []);
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

    async function addCart(id) {

        try {
            await api.post(`cart/add-cart/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
            getProducts()
        } catch (err) {
            alert("Impossivel adicionar mais produtos, fora de estoque.");
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

    async function removeFromCart(prodId, qntd) {
        try {
            await api.delete(`cart/remove-cart/${prodId}/${qntd}`, {
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
            return <td><b>Nada a exibir</b></td>
        } else {
            return (<>
                <td><b>Produto</b></td>

                <td><b>Preço</b></td>

                <td colSpan={2}><b>Quantidade</b></td>
            </>);
        }
    }

    async function verifyAndProc() {

        if (cartProducts.length === 0) {
            alert('Nenhum item no carrinho')
            history.push('/')
        } else {
            if (address === null) {
                alert("Necessira preencher um endereço para entrega")
                history.push('/adicionarendereco');
            } else {
                for(let i = 0; i<cartProducts.length; i++)
                {
                    if(cartProducts[i].productDTO.prod_quantity < cartProducts[i].quantity)
                    {
                        alert('Algum produto pode estar indisponivel em estoque')
                        return history.push('/')
                    }else{
                        history.push('/confirmacaodecompra')
                    }
                }
            }
        }
    }
    
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
                            {cartProducts
                            .sort((a, b) => {return a.productDTO.prod_name.localeCompare(b.productDTO.prod_name)})
                            .map(p => (
                                <tr key={p.productDTO.id}>
                                    <td><button className="button" onClick={() => {
                                        localStorage.setItem('id-produto-selecionado', p.productDTO.id)
                                        history.push('/produto')
                                    }}>{p.productDTO.prod_name}</button></td>
                                    <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.productDTO.prod_price)}</td>
                                    <td>
                                        <button><BsFillDashCircleFill onClick={() => removeCart(p.productDTO.id)} /></button>
                                        {p.quantity}
                                        <button><BsFillPlusCircleFill onClick={() => {
                                            if(p.productDTO.prod_quantity - 1 < p.quantity)
                                            {
                                                alert("Impossivel adicionar, quantidade fora de estoque")
                                            }else{
                                                addCart(p.productDTO.id)}
                                            }} /></button>
                                    </td>
                                    <td><button className="button-remove-cart" onClick={() => removeFromCart(p.productDTO.id, p.quantity)}>Remover</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="cont-right-cart">
                    <div className="cont-final">
                        <div className="cont-price">
                            <ul>
                                <li className="title">Preço total</li>
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