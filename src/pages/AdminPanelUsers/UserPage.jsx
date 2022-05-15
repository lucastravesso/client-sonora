import React, { useState, useEffect } from "react";

import api from '../../services/loginApi'
import './AdminPanelUsers.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function UserPage() {

    const [user, setUser] = useState([])    

    async function getUser(){
        try {
            await api.get(`/user/findbyid/${localStorage.getItem('id-usuario-inf')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res =>{ setUser(res.data)})
        } catch (err) {
            console.log("erro ao trazer usuairo")
        }
    }

    useEffect(()=> {getUser()}, [])

    return (
        <>
            <NavAdmin />
                {user.id}
        </>
    );
}