import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './OrdersPage.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function OrdersPage() {

    const [isModalVisible, setIsModalVisible] = useState(true);

    const [orders, setOrders] = useState([]);

    async function getOrders(){
        try {
            
            api.get('/order/findByUser', {
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

    

    return (
        <>
            <Nav />
            <div className="container-orders">
                <table>
                    {orders.map(o =>(
                        <>
                            <tr key={o.id}>
                                <td>{o.id}</td>
                                <td>{o.status}</td>
                                <td>{o.orderDate}</td>
                            </tr>
                            <br />
                        </>
                    ))}
                </table>
            </div>
            <Bottom />
        </>
    );

}