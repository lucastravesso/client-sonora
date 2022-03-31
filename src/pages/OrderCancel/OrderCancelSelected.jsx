import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './OrderCancel.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function OrderCancelSelected() {

    const [order, setOrder] = useState([]);
    const [product, setProduct] = useState([]);

    const history = useHistory();

    async function getChange(){
        try {
            
            api.get(`/cancel/list/${localStorage.getItem('order-id')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res =>{
                setOrder(res.data)
                setProduct(res.data.product)
            })

        } catch (err) {
            alert("Falha ao trazer pedido")
        }
    }

    useEffect(() => {getChange()}, [])

    return (
        <>
            <Nav />
            <div className="container-order-selected">
                <div className="selected-left">

                    <table className="top-table">
                        <tr>
                            <td><b>Nº Pedido</b></td>
                            <td><b>Status do Pedido</b></td>
                            <td><b>Data do Pedido</b></td>
                        </tr>
                        <tr>
                            <td>{order.id}</td>
                            <td>{order.status}</td>
                            <td>{order.change_date}</td>
                        </tr>
                    </table>
                    <table className="bot-table">
                        <tr className="bar">
                            <td>Motivo do cancelamento</td>
                        </tr>
                        <tr>
                            <td>{order.change_reason}</td>
                        </tr>
                        <tr className="bar">
                            <td>Resposta da loja</td>
                        </tr>
                        <tr>
                            <td>{order.change_reply}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <Bottom />
        </>
    );

}