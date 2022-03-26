import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './ProductChangeOrder.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function ProductChangeOrder() {

    const [orders, setOrders] = useState([]);

    const history = useHistory();

    async function getOrders(){
        try {
            
            api.get('/change/list/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res =>{
                setOrders(res.data)
            })

        } catch (err) {
            alert("Falha ao buscar pedidos . .")
        }
    }

    useEffect(() => {getOrders()}, [])

    async function handleRedirect(id){

        localStorage.setItem('order-prod-id', id)
        history.push('/trocas/produto')
    }

    return (
        <>
            <Nav />
            <div className="container-product-change">
                <table>
                    <tr>
                        <td><h1>TODOS OS PEDIDOS DE TROCA DA CONTA</h1></td>
                    </tr>
                    {orders.map(o =>(
                        <>
                            <button onClick={() => handleRedirect(o.id)}>
                                <tr key={o.id}>
                                    <td>{'ID do Pedido ' +  o.id}</td>
                                    <td>{'Status do Pedido ' + o.status}</td>
                                    <td>{'Data do Pedido  ' + o.change_date}</td>
                                </tr>
                            </button >
                            <br />
                        </>
                    ))}
                </table>
            </div>
            <Bottom />
        </>
    );

}