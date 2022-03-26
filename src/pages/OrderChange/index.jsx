import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './OrderChange.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function OrderChange() {

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


    return (
        <>
            <Nav />
            <div className="container-order-change">
                <div className="selected-change-left">
                    <div><h1>Só podera trocar um produto por vez . </h1></div>
                    <table className="middle-table-change">
                        <tr className="bar">
                            <td>Produto</td>
                            <td>Preço Unitario</td>
                            <td>Especificação</td>
                            <td>Fabricante</td>
                            <td>Quantidade total</td>
                            <td colSpan={2}>Preço Total</td>
                        </tr>
                        {cartProducts.map(p => (
                            <tr>
                                <td>{p.productDTO.prod_name}</td>
                                <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.productDTO.prod_price)}</td>
                                <td>{p.productDTO.prod_spec}</td>
                                <td>{p.productDTO.prod_builder}</td>
                                <td>{p.quantity}</td>
                                <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}</td>

                                <td><button className="button" onClick={()=> {
                                    localStorage.setItem('id-prod_troca',p.productDTO.id)
                                    history.push('/troca/produto')
                                }}>Trocar produto</button></td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
            <Bottom />
        </>
    );

}