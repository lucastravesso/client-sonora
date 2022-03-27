import React from "react";
import {useHistory} from 'react-router-dom'

import './AdminPanelCancel.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function AdminPanelCancel() {

    const history = useHistory();


    return (
        <>
            <NavAdmin />
            <div className="container-home">
                <h1>teste cancelamento</h1>
            </div>
        </>
    );
}