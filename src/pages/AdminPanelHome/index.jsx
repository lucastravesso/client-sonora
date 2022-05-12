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
        lineWidth: 2,
        legend: { position: "right" },
    };

    async function senddata(e) {
        e.preventDefault()
        getGraficInfo(ini, end)
    }

    function validateFields() {
        if (data.length < 2) {
            return <h1 className="h1-grafic">Insira os dados para consulta</h1>
        } else {
            return <>
            <h1 className="h1-grafic">Grafico de vendas entre {ini} a {end}</h1>
            <Chart
                chartType="LineChart"
                width="1000px"
                height="550px"
                loader={<div>Loading Chart</div>}
                data={data}
                options={options}
            />
            </>
        }
    }

    return (
        <>
            <NavAdmin />
            <div className="container-home-full">
                <div className="container-home-left">
                    {validateFields()}
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
                            <button className="button-grafics" type='submit'>Enviar</button>
                        </form>
                    </div>
                </div>
                <div className="container-home-right">

                </div>
            </div>
        </>
    );
}