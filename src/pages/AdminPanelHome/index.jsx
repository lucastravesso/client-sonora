import React from "react";
import {useHistory} from 'react-router-dom'

import './AdminPanelHome.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function AdminPanelHome() {

    const history = useHistory();


    return (
        <>
            <NavAdmin />
            <div className="container-home">

            </div>
        </>
    );
}