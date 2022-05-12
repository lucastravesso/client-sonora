import React, { useState, useEffect } from "react";

import api from '../../services/loginApi'
import './AdminPanelUsers.css'
import NavAdmin from '../NavAdmin/NavAdmin'
import '../../components/Card/UserCard'
import UserCard from "../../components/Card/UserCard";

export default function AdminPanelUsers() {

    const [user, setUser] = useState([])

    useEffect(() => { getUser() }, [])

    async function getUser() {
        try {
            await api.get('/user/list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => { setUser(res.data) })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <NavAdmin />
            <div className="container-home">
                {user.map(u => (
                    <UserCard titulo={"Usuario : " + u.firstName}>
                        <ul key={u.id}>
                            <li>Nome : {u.firstName} {u.lastName}</li><br />
                            <li>CPF : {u.cpf}</li><br />
                            <li>RG : {u.rg}</li><br />
                            <li>Telefone : {u.phone}</li><br />
                            <li>Data de Nascimento : {u.born}</li><br />
                            <li>Data de registro : {u.register}</li><br />
                            <li>Email : {u.email}</li>
                        </ul>
                        <button className="button-users">Ver usuario</button>
                    </UserCard>
                ))}

            </div>
        </>
    );
}