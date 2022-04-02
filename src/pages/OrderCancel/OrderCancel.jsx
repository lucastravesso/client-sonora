import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './OrderCancel.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function OrderCancel() {

    const [order, setOrder] = useState([]);
    const [cancel, setCancel] = useState('');

    const history = useHistory();

    useEffect(() => { getOrder() }, [])

    async function getOrder() {

        try {

            await api.get(`/order/${localStorage.getItem('id-pedido_cancel')}`, {
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

    async function handleRequest(e){
        e.preventDefault();

        const data = {
            change_reason : cancel,
        }

        try {
            await api.post(`/cancel/create/${localStorage.getItem('id-pedido_cancel')}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            history.push('/')
        } catch (err) {
            alert("falha na requisição de troca")
        }

    }

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
                            <td>{order.orderDate}</td>
                        </tr>
                    </table>
                    <div className="form-troca">
                    <form onSubmit={handleRequest}>
                        <input type='text'onChange={e => setCancel(e.target.value)}/>
                        <button className='button' type="submit">Enviar pedido de cancelamento</button>
                    </form>
                </div>
                </div>
            </div>
            <Bottom />
        </>
    );

}