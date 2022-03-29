import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FiPower } from 'react-icons/fi'

import verifyAddress from "../../components/VerifyAddress/VerifyAddress";
import verifyUserInformations from "../../components/ProgressBar/ProgressBar";
import api from '../../services/loginApi'
import Nav from '../Navigation/Nav'
import Bottom from '../BottomInfo/Bottom'


import './normalUserStyles.css'

export default function NormalPerfil() {

    const history = useHistory();

    const [user, setUser] = useState([]);
    const [address, setAddress] = useState([]);
    const [card, setCard] = useState([]);

    async function getUser(){
        try {
            await api.get('user/findByToken', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(response => {
                setUser(response.data)
                setAddress(response.data.addressDto)
            })
        } catch (err) {
            alert("Falha ao traer as informações de usuario")
        }
    }
    useEffect(() => {getUser()}, [])


    async function getCard(){
        try {
            await api.get('/card/listallbyid', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(response => {
                setCard(response.data)
            })
        } catch (err) {
            alert("Nao foi possivel trazer o cartão")
        }
    }
    useEffect(() => {getCard()}, [])

    async function cardFind(id){
        return card.find((c) =>{
            if(c.id === id)
            {
                let r = window.confirm("Voce deseja realmente excluir este cartão ?");
                if (r===true){
                    try {
                        api.delete(`/card/delete/${id}`,{
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                            }
                        })
                        getCard();
                    } catch (err) {
                        return alert("Falha ao deletar cartao . .")
                    }
                }
            }
            return null;
        })
    }

    async function deleteAccount(){

        let r = window.confirm("Voce deseja realmente inativar sua conta ?");
        if (r===true)
        {
            try {
                api.delete(`/user/delete/${user.id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                localStorage.clear()
                history.push('/');
            } catch (err) {
                alert("falha ao deletar conta")
            }
        }
    }

    async function logout() {
        localStorage.clear()
        history.push('/login')
    }

    const [auth, setAuth] = useState([]);

    async function handleAdmin(){
        api.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res =>{
            setAuth(res.data)
        })

        if(auth.profiles[0].name != "ROLE_ADMIN")
        {
            alert("Voce não é um administrador.")
        }else{
            history.push('/paineladministrativo');
        }
    }

    return (
        <>
            <Nav />
            <button className="button-adm" onClick={() => handleAdmin()}>Painel administrativo</button>
            <div className="full-container-user">
                <div className="cont-left-user">
                    <table className="table-left-user">
                        <thead>
                            <tr className="title-bar">
                                <td>
                                    <h1>Informações do usuário</h1>
                                </td>
                            </tr>
                            <tr className="lines-table">
                                <td>Nome : {user.firstName + ' ' + user.lastName}</td>
                            </tr>
                            <tr className="lines-table">
                                <td>CPF : {user.cpf}</td>
                            </tr>
                            <tr className="lines-table">
                                <td>RG : {user.rg}</td>
                            </tr>
                            <tr className="lines-table">
                                <td>Data de Nascimento : {user.born}</td>
                            </tr>
                            <tr className="lines-table">
                                <td>Email : {user.email}</td>
                            </tr>
                            <tr className="lines-table">
                                <td>Telefone : {user.phone}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="title-bar">
                                <td>
                                    <h1>Informações de endereço</h1>
                                </td>
                            </tr>
                            <tr className="lines-table">
                                <td>Pais : {verifyAddress(address, "country")}</td>
                            </tr>
                            <tr className="lines-table">
                                <td>Estado : {verifyAddress(address, "state")}</td>
                            </tr>
                            <tr className="lines-table">
                                <td>Cidade : {verifyAddress(address, "city")}</td>
                            </tr>
                            <tr className="lines-table">
                                <td>Bairro : {verifyAddress(address, "district")}</td>
                            </tr>
                            <tr className="lines-table">
                                <td>Rua : {verifyAddress(address, "street")}</td>
                            </tr>
                            <tr className="lines-table">
                                <td>Numero : {verifyAddress(address, "number")}</td>
                            </tr>
                            <tr className="lines-table">
                                <td>Complemento : {verifyAddress(address, "complement")}</td>
                            </tr>
                        </tbody>
                        <tfoot >
                            <tr className="title-bar">
                                <td>
                                    <h1>Informação dos cartões</h1>
                                </td>
                            </tr>
                            <div className="table-foot">
                                {
                                    card.map(card =>(
                                        <div className="each-row">
                                            <button className="button-remove" onClick={() => cardFind(card.id)}>Excluir cartão</button>
                                            <tr className="lines-table">
                                                <td>Nome no cartão : {card.card_name}</td>
                                            </tr>
                                            <tr className="lines-table">
                                                <td>Bandeira : {card.card_flag}</td>
                                            </tr>
                                            <tr className="lines-table">
                                                <td>Numero no cartão : {card.card_number}</td>
                                            </tr>
                                            <tr className="lines-table">
                                                <td>Validade do cartão : {card.card_valid}</td>
                                            </tr>
                                
                                            <br /><br />
                                        </div>
                                    ))
                                }
                            </div>
                        </tfoot>
                    </table>                    
 
               </div>
                <div className="cont-right-user">
                    <table className="table-right-user">
                        <thead>
                            <tr> 
                                <td>
                                    <button className="button1" onClick={logout} type="button">
                                        <FiPower size={18} color='251fc5' />
                                    </button>
                                    {verifyUserInformations(user, card)}
                                </td>
                            </tr>
                        </thead>
                        <br />
                        <tbody>
                            <tr>
                                <td>
                                    Deseja acompanhar seus pedidos ?<br />
                                    Clique no botão abaixo!
                                    <button className="button" onClick={() => history.push("/pedidos")}>Ver meus pedidos</button>
                                </td>
                            </tr>
                            <br />
                            <tr>
                                <td>
                                    Deseja acompanhar seus pedidos de troca ?<br />
                                    Clique no botão abaixo!
                                    <button className="button" onClick={() => history.push("/trocas")}>Ver minhas trocas</button>
                                </td>
                            </tr>
                        </tbody>
                        <br />
                        <tfoot>
                            <tr>
                                <td>
                                    Deseja inativar sua conta ?<br />
                                    Clique no botão abaixo!
                                    <button id ="alert" className="button" onClick={deleteAccount}>Inativar conta</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <Bottom />
        </>
    );
}