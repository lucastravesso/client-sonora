import React from "react";
import {useHistory} from 'react-router-dom'

import './AdminPanelUsers.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function AdminPanelUsers() {

    const history = useHistory();


    return (
        <>
            <NavAdmin />
            <div className="container-home">
                <h1>teste usuarios</h1>
            </div>
        </>
    );
}