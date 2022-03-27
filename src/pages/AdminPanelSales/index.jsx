import React from "react";
import {useHistory} from 'react-router-dom'

import './AdminPanelSales.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function AdminPanelSales() {

    const history = useHistory();


    return (
        <>
            <NavAdmin />
            <div className="container-home">
                <h1>teste vendas</h1>
            </div>
        </>
    );
}