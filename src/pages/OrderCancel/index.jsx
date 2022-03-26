import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './OrderCancel.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";


export default function OrderCancel() {

    const [order, setOrder] = useState([]);

    const history = useHistory();

    async function getOrder() {

        try {

            await api.get(`/order/${localStorage.getItem('order-id')}`, {
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

    useEffect(() => { getOrder() }, [])


    return (
        <>
            <Nav />
            <div className="container-order-cancel">
                <form action="">
                    
                </form>
            </div>
            <Bottom />
        </>
    );

}