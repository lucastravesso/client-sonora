import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'

import api from '../../services/loginApi'
import './AdminPanelSales.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function AdminPanelSales() {

    const history = useHistory();
    const [orders, setOrders] = useState([]);

    async function getOrders(){
        try {
            await api.get('/order/findAll', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {setOrders(res.data)})
        } catch (err) {
            alert("Não foi encontrado nenhuma venda")
        }
    }
    useEffect(() =>{getOrders()}, [])
    

    return (
        <>
            <NavAdmin />
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
                    .sort((a, b) => {return a.orderDate.localeCompare(b.orderDate)})
                    .map(o =>(
                        <button className="button" onClick={() => {
                            localStorage.setItem('selected-order',o.id);
                            history.push('/paineladministrativo/vendas/venda')
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
        </>
    );
}