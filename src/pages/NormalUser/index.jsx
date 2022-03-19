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

        let r = window.confirm("Voce deseja realmente excluir sua conta ?");
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


    return (
        <>
            <Nav />
            <div className="full-container-user">
                <div className="cont-left-user">
                    <table className="table-left-user">
                        <thead>
                            <tr>
                                <td>
                                    <h1>Informações do usuário</h1>
                                </td>
                            </tr>
                            <tr>
                                <td>Nome : {user.firstName + ' ' + user.lastName}</td>
                            </tr>
                            <tr>
                                <td>CPF : {user.cpf}</td>
                            </tr>
                            <tr>
                                <td>RG : {user.rg}</td>
                            </tr>
                            <tr>
                                <td>Data de Nascimento : {user.born}</td>
                            </tr>
                            <tr>
                                <td>Email : {user.email}</td>
                            </tr>
                            <tr>
                                <td>Telefone : {user.phone}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <h1>Informações de endereço</h1>
                                </td>
                            </tr>
                            <tr>
                                <td>Pais : {verifyAddress(address, "country")}</td>
                            </tr>
                            <tr>
                                <td>Estado : {verifyAddress(address, "state")}</td>
                            </tr>
                            <tr>
                                <td>Cidade : {verifyAddress(address, "city")}</td>
                            </tr>
                            <tr>
                                <td>Bairro : {verifyAddress(address, "district")}</td>
                            </tr>
                            <tr>
                                <td>Rua : {verifyAddress(address, "street")}</td>
                            </tr>
                            <tr>
                                <td>Numero : {verifyAddress(address, "number")}</td>
                            </tr>
                            <tr>
                                <td>Complemento : {verifyAddress(address, "complement")}</td>
                            </tr>
                        </tbody>
                        <tfoot >
                            <tr>
                                <td>
                                    <h1>Informação dos cartões</h1>
                                </td>
                            </tr>
                            <div className="table-foot">
                                {
                                    card.map(card =>(
                                        <div className="each-row">
                                            <button className="button-remove" onClick={() => cardFind(card.id)}>Excluir cartão</button>
                                            <tr>
                                                <td>Nome no cartão : {card.card_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Bandeira : {card.card_flag}</td>
                                            </tr>
                                            <tr>
                                                <td>Numero no cartão : {card.card_number}</td>
                                            </tr>
                                            <tr>
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
                        </tbody>
                        <br />
                        <tfoot>
                            <tr>
                                <td>
                                    Deseja excluir sua conta ?<br />
                                    Clique no botão abaixo!
                                    <button id ="alert" className="button" onClick={deleteAccount}>Excluir conta</button>
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