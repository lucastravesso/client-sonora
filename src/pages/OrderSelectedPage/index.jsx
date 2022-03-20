import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './OrderSelectedPage.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function OrderSelectedPage() {

    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);

    const history = useHistory();

    async function getOrder(){

        try {
            
            await api.get(`/order/${localStorage.getItem('order-id')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res => {
                setOrder(res.data)
                setProducts(res.data.products)
            })

        } catch (err) {
            alert("Falha ao trazer pedido")
        }
    }

    useEffect(()=>{getOrder()}, [])

    return (
        <>
            <Nav />
            <div className="container-order-selected">
                <div className="selected-left">

                    <table>
                        <thead>
                                <tr>
                                    <td>{'ID do Pedido ' +  order.id}</td>
                                    <td>{'Status do Pedido ' + order.status}</td>
                                    <td>{'Data do Pedido  ' + order.orderDate}</td>
                                </tr>
                        </thead>
                        <tbody>
                            {products.map(p =>(
                                <tr key={p.id}>
                                    <td>{p.prod_name}</td>
                                    <td>{p.prod_price}</td>
                                    <td>{p.prod_spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div className="selected-right">

                </div>
            </div>
            <Bottom />
        </>
    );

}