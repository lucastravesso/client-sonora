import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './OrderCancel.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function OrderCancelList() {

    const [orders, setOrders] = useState([]);

    const history = useHistory();

    useEffect(() => {getOrders()}, [])

    async function getOrders(){
        try {
            
            api.get('/cancel/list/user', {
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

    async function handleRedirect(id){

        localStorage.setItem('order-id', id)
        history.push('/cancelamento/pedido')
    }

    return (
        <>
            <Nav />
            <div className="container-orders">
                <table>
                    <tr>
                        <td><h1>TODOS OS PEDIDOS DE CANCELAMENTO</h1></td>
                    </tr>
                    {orders
                    .sort((a, b) => {return a.id - b.id})
                    .reverse()
                    .map(o =>(
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