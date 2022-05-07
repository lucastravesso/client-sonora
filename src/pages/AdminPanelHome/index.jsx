import React, {useState, useEffect} from "react";

import { Chart } from "react-google-charts";

import api from '../../services/loginApi'

import './AdminPanelHome.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function AdminPanelHome() {

    const [infos, setInfos] = useState([])

    useEffect(() => {getGraficInfo()}, [])

    function getGraficInfo(){
        try {
            api.get('/order/grafics', {
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

    console.log(infos)

    const data = [
        ["Year", "Cordas", "Sopro", "Percussão", "eletrofones", "outros"],
        ["2004", 655, 400, 600, 200, 100],
        ["2005", 344, 460, 500, 500, 100],
        ["2006", 123, 1120, 100, 300, 20],
        ["2007", 104, 540, 300, 800, 1200],
        ["2007", 104, 540, 300, 800, 1200],
        ["2007", 104, 540, 300, 800, 1200],
        ["2007", 104, 540, 300, 800, 1200],
        ["2007", 104, 540, 300, 800, 1200],
        ["2007", 104, 540, 300, 800, 1200],
        ["2007", 104, 540, 300, 800, 1200],
    ];

    const options = {
        title: "Volume de vendas",
        curveType: "function",
        legend: { position: "bottom" },
    };

    return (
        <>
            <NavAdmin />
            <div className="container-home">

                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
            </div>
        </>
    );
}