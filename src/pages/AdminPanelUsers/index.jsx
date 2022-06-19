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

    const [id, setId] = useState('')
    const [email, setEmail] = useState('')

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

    async function showUsers(e) {
        e.preventDefault();
        if (id === '') {
            getUser()
        } else {
            try {
                await api.get(`/user/findbyname/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }).then(res => { setUser(res.data) })
            } catch (err) {
                console.log(err)
            }
        }
    }

    async function showUsersEmail(e) {
        e.preventDefault();
        if (email === '') {
            getUser()
        } else {
            try {
                await api.get(`/user/findbyemail/${email}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }).then(res => { setUser(res.data) })
            } catch (err) {
                console.log(err)
            }
        }
    }

    async function showInatives() {
        try {
            await api.get(`/user/findstatus`, {
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
            <button className="botao-filtrar" onClick={() => consulta ? setConsulta(false) : setConsulta(true)}>Filtrar</button>
            <button className="botao-filtrar" onClick={() => getUser()}>Limpar filtros</button>
            <button className="botao-filtrar" onClick={() => showInatives()}>Ver inativos</button>
            <div className="container-pesquisa">
                {consulta === true && (
                    <div className="modal-filter">
                        <div className="filtro-usuario">
                            <form onSubmit={showUsers}>
                                <button className="botao-filtrar" type="submit">Filtrar usuario</button>
                                <input
                                    className="input-filtro"
                                    type="text"
                                    placeholder="Nome do usuario"
                                    onChange={e => setId(e.target.value)}
                                />
                            </form>
                        </div>
                        <div className="filtro-email">
                            <form onSubmit={showUsersEmail}>
                                <button className="botao-filtrar" type="submit">Filtrar email</button>
                                <input
                                    className="input-filtro"
                                    type="text"
                                    placeholder="Email do usuario"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div className="container-home">
                {user
                    .sort((a, b) => { return b.usu_rank - a.usu_rank })
                    .map(u => (
                        <UserCard usu_rank={"Ranking - Numero de pedidos : " + u.usu_rank}
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