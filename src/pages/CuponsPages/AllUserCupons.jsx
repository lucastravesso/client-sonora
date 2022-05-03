import React, { useState, useEffect } from "react";

import './cupons.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";

export default function AllUserCupons() {

    const [cupons, setCupons] = useState([]);

    useEffect(() => { getCupons() }, [])

    async function getCupons() {
        try {
            await api.get('/cupon/listbyuser', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {
                setCupons(res.data)
            })
        } catch (err) { }
    }

    function checkAvaible(qntd) {
        if (qntd === 1) {
            return "Não"
        } else {
            return "Sim"
        }
    }

    return (
        <>
            <Nav />
            <div className="user-cupons">
                <table className="cupons-table">
                    <thead>
                        <tr>
                            <td>LISTA DE CUPONS</td>
                        </tr>
                    </thead>
                    <br />
                    <tbody>
                        {cupons
                            .sort((a, b) => { return a.id - b.id })
                            .reverse()
                            .map(c => (
                                <>
                                    <tr key={c.id}>
                                        <td>Cupom : <label>{c.c_name}</label></td>
                                        <td>Data de obtenção : {c.c_register}</td>
                                        <td>Valor do cupom : R$ {c.c_percentage},00</td>
                                        <td>Cupom usado : {checkAvaible(c.c_quantity)}</td>
                                    </tr>
                                    <br />
                                </>
                            ))}
                    </tbody>
                </table>
            </div>
            <Bottom />
        </>
    );

}