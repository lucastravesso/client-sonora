import React, { useState, useEffect } from "react";

import api from '../../services/loginApi'
import './AdminPanelUsers.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function UserPage() {

    const [user, setUser] = useState([])
    const [address, setAddress] = useState([])
    const [card, setCard] = useState([])
    const [orders, setOrders] = useState([])

    async function getUser() {
        try {
            await api.get(`/user/findbyid/${localStorage.getItem('id-usuario-inf')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {
                setUser(res.data)
                setAddress(res.data.addressDto)
            })
        } catch (err) {
            console.log("erro ao trazer usuairo")
        }
    }

    async function getCards() {
        try {
            await api.get(`/card/listallbyid/${localStorage.getItem('id-usuario-inf')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {
                setCard(res.data)
            })
        } catch (err) {
            console.log("erro ao trazer cartões")
        }
    }

    async function getOrders() {
        try {
            await api.get(`/order/findByUser/${localStorage.getItem('id-usuario-inf')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {
                setOrders(res.data)
            })
        } catch (err) {
            console.log("erro ao trazer cartões")
        }
    }

    useEffect(() => { getUser() }, [])
    useEffect(() => { getCards() }, [])
    useEffect(() => { getOrders() }, [])


    function verifyActive(){
        if(user.active === 1){
            return "Ativo"
        }else{
            return "Inativo"
        }
    }

    async function active(){
        if(user.active === 1){
            try {
                await api.put(`user/inactive/${localStorage.getItem('id-usuario-inf')}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
            } catch (err) {
                console.log("Falha ao ativar" + err)
            }
        }else{
            try {
                await api.put(`user/active/${localStorage.getItem('id-usuario-inf')}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
            } catch (err) {
                console.log("Falha ao inativar" + err)
            }
        }
    }

    return (
        <>
            <NavAdmin />
            <div className="container-user-adm">
                <div className="user-info-adm">
                    <ul>
                        <li>ID: {user.id}</li>
                        <li>Nome : {user.firstName} {user.lastName}</li>
                        <li>Nascimento : {user.born}</li>
                        <li>Email : {user.email}</li>
                        <li>Telefone : {user.phone}</li>
                        <li>RG : {user.rg}</li>
                        <li>CPF : {user.cpf}</li>
                        <li>Data de registro : {user.register}</li>
                    </ul>
                </div>
                <div className="user-address-info-adm">
                    <ul>
                        <li>Quantidade de endereços registrados : {address.length}</li>
                    </ul>
                </div>
                <div className="user-card-info-adm">
                    <ul>
                        <li>Quantidade de cartões registrados : {card.length}</li>
                    </ul>
                </div>
                <div className="user-fame-info-adm">
                    <ul>
                        <li>Quantidade de compras : {orders.length}</li>
                    </ul>
                </div>
                <div className="user-activated-info-adm">
                    <ul>
                        <li>Status : {verifyActive()}</li>
                        <li><button onClick={() => active()}>Ativar/inativar</button></li>
                    </ul>
                </div>
            </div>
        </>
    );
}