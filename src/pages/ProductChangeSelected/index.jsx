import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './PruductChangeSelected.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function ProductChangeSelected() {

    const [order, setOrder] = useState([]);
    const [product, setProduct] = useState([]);

    const history = useHistory();

    async function getChange(){
        try {
            
            api.get(`/change/list/${localStorage.getItem('order-prod-id')}`, {
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
                    <table className="middle-table">
                        <tr className="bar">
                            <td>Produto</td>
                            <td>Preço Unitario</td>
                            <td>Especificação</td>
                            <td>Fabricante</td>
                        </tr>
                        <tr>
                            <td>{product.prod_name}</td>
                            <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.prod_price)}</td>
                            <td>{product.prod_spec}</td>
                            <td>{product.prod_builder}</td>
                        </tr>
                    </table>
                    <table className="bot-table">
                        <tr className="bar">
                            <td>Motivo da troca</td>
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