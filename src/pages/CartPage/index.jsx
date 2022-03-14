import React, { useState, useEffect } from "react";
import './styles.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import { BsFillFileMinusFill, BsFillFilePlusFill} from "react-icons/bs";


import api from "../../services/loginApi";

export default function CartPage() {

    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);


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
        try{
            await api.post(`cart/add-cart/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
            getProducts()
        }catch(err){
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

    return (
        <>
            <Nav />
            <div className="container">
                <div className="cont-left">
                    <table>
                        <thead>
                            <tr>
                                <th className="prod">Produto</th>
                                <th className="price" colSpan={2}>Preço</th>
                                <th className="qntd" >Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartProducts.map(p => (
                                <tr key={p.productDTO.id}>
                                    <td>IMG</td>
                                    <td>{p.productDTO.prod_name}</td>
                                    <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.productDTO.prod_price)}</td>
                                    <td>
                                        <button><BsFillFileMinusFill onClick={() => removeCart(p.productDTO.id)} /></button>
                                        {p.quantity}
                                        <button><BsFillFilePlusFill onClick={() => addCart(p.productDTO.id)} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="cont-right">
                    <div className="cont-final">
                        <div className="cont-price">
                            <ul>
                                <li>Preço total</li>
                                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)}
                            </ul>
                        </div>
                        <div className="cont-desc-price">
                            Preço total com desconto
                        </div>
                        <div className="cont-btn-final">
                            <button className="button">Finalizar pedido</button>
                        </div>
                    </div>
                </div>
            </div>
            <Bottom />
        </>
    );

    /**/
}