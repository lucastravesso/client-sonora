import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

import api from '../../services/loginApi'
import './AdminPanelUsers.css'
import NavAdmin from '../NavAdmin/NavAdmin'
import '../../components/Card/UserCard'
import UserCard from "../../components/Card/UserCard";

export default function AdminPanelUsers() {

    const history = useHistory()

    const [consulta, setConsulta] = useState(false)

    const [user, setUser] = useState([])

    const [id, setId] = useState()

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

    function showUsers(e) {
        e.preventDefault();
        return (
            <>

            </>
        )
    }


    return (
        <>
            <NavAdmin />
            <button onClick={() => consulta ? setConsulta(false) : setConsulta(true)}>Filtrar</button>
            <div className="container-home">
                {consulta === true && (
                    <div className="modal-filter">
                        <form onSubmit={showUsers}>
                            <input
                                type="text"
                                placeholder="ID do usuario"
                                onChange={e => setId(e.target.value)}
                            />
                            <button className="button" type="submit">Filtrar</button>
                        </form>
                    </div>
                )}
                {user
                    .map(u => (
                        <UserCard titulo={"Usuario : " + u.firstName}
                            id={u.id}
                            nome={u.firstName}
                            sobrenome={u.lastName}
                            cpf={u.cpf}
                            rg={u.rg}
                            phone={u.phone}
                            born={u.born}
                            email={u.email}
                        >

                            <button className="button-users" onClick={() => {
                                localStorage.setItem('id-usuario-inf', u.id)
                                history.push('/paineladministrativo/usuarios/informacoes')
                            }}>Ver usuario</button>
                        </UserCard>
                    ))}


            </div>
        </>
    );
}