import React from "react";
import {useHistory} from 'react-router-dom'

import './AdminPanelChanges.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function AdminPanelChanges() {

    const history = useHistory();


    return (
        <>
            <NavAdmin />
            <div className="container-home">
                <h1>teste trocas</h1>
            </div>
        </>
    );
}