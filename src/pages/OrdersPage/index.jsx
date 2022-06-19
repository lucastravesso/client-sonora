import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/loginApi";
import Nav from "../Navigation/Nav";
import './OrdersPage.css'

export default function OrdersPage() {

    const history = useHistory();

    const [ordersListSales, setOrdersListSales] = useState([]);

    async function handleRedirect(id){

        localStorage.setItem('order-id', id)
        history.push('/pedido')
    }

    useEffect(() => {getOrdersListSales()}, [])

    async function getOrdersListSales(){
        try {
            api.get('/order/findByUser', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res =>{
                setOrdersListSales(res.data)
            })

        } catch (err) {
            alert("Falha ao buscar pedidos . .")
        }
    }

    return (
        <>
        <Nav />
            <div className="container-orders">
                <table>
                    <tr>
                        <td><h1>TODOS OS PEDIDOS DA CONTA</h1></td>
                    </tr>
                    {ordersListSales
                    .sort((a, b) => {return a.id - b.id})
                    .reverse()
                    .map(o =>(
                        <>
                            <button onClick={() => handleRedirect(o.id)}>
                                <tr key={o.id}>
                                    <td>{'ID do Pedido ' +  o.id}</td>
                                    <td>{'Status do Pedido ' + o.status}</td>
                                    <td>{'Data do Pedido  ' + o.orderDate}</td>
                                </tr>
                            </button >
                            <br />
                        </>
                    ))}
                </table>
            </div>
        </>
    );

}