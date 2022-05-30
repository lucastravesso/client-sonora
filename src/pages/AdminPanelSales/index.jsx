import React, { useState, useEffect } from "react";

import api from '../../services/loginApi'
import './AdminPanelSales.css'
import NavAdmin from '../NavAdmin/NavAdmin'

import SelectedSale from "./SelectedSale";

export default function AdminPanelSales() {

    const [orders, setOrders] = useState([]);
    const [selected, setSelected] = useState();

    useEffect(() => { getOrders() }, [])

    async function getOrders() {
        try {
            await api.get('/order/findAll', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => { setOrders(res.data) })
        } catch (err) {
            alert("Não foi encontrado nenhuma venda")
        }
    }

    return (
        <>
            <NavAdmin />
            { !!selected ? <SelectedSale item={ selected } /> : (
                <div className="container-sales">
                <table className="table-sales">
                    <thead>
                        <tr>
                            <td>LISTA DE VENDAS</td>
                        </tr>
                    </thead>
                    <br />
                    <br />
                    {orders
                        .sort((a, b) => { return a.id - b.id })
                        .reverse()
                        .map(o => (
                            <button className="button" onClick={() => {
                                setSelected(o.id)
                            }}>
                                <tr key={o.id}>
                                    <td>ID : {o.id}</td>
                                    <td>STATUS : {o.status}</td>
                                    <td>Data do pedido : {o.orderDate}</td>
                                    <td>Email : {o.user.email}</td>
                                </tr>
                            </button>
                        ))}
                </table>
            </div>
            )}
            
        </>
    );
}