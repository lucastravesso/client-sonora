import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';


import { Chart } from "react-google-charts";

import api from '../../services/loginApi'

import './AdminPanelHome.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function AdminPanelHome() {

    const [infos, setInfos] = useState([])
    const [ini, setIni] = useState('')
    const [end, setEnd] = useState('')

    useEffect(() => { getGraficInfo() }, [])

    function getGraficInfo(dtIni, dtFim) {
        try {
            api.get(`/order/grafics/${dtIni}/${dtFim}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {
                setInfos(res.data)
            })
        } catch (err) {
            console.log("falha ao buscar info")
        }
    }

    var dtTable = [];

    dtTable = infos.map(i => {
        return [i.cat_sale_date, i.getCat_corda, i.getCat_sopro, i.getCat_percussao, i.getCat_eletronicos, i.getCat_outros]
    })

    const data = [
        ["Dia", "Cordas", "Sopro", "Percussão", "eletrofones", "outros"],
        ...dtTable
    ];

    const options = {
        title: "Volume de vendas",
        curveType: "function",
        legend: { position: "bottom" },
    };

    async function senddata(e){
        e.preventDefault()
        getGraficInfo(ini,end)
    }

    return (
        <>
            <NavAdmin />
            <div className="container-home">

                <Chart
                    chartType="LineChart"
                    width="80%"
                    height="450px"
                    data={data}
                    options={options}
                />
                <div className="form-grafics">
                    <form onSubmit={senddata}>
                        <InputMask
                            mask="9999-99-99"
                            placeholder='Data inicio'
                            value={ini}
                            onChange={e => setIni(e.target.value)}
                        />
                        <InputMask
                            mask="9999-99-99"
                            placeholder='Data final'
                            value={end}
                            onChange={e => setEnd(e.target.value)}
                        />
                        <button className="button" type='submit'>Enviar</button>
                    </form>
                </div>
            </div>
        </>
    );
}