import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiPower } from 'react-icons/fi'

import verifyAddress from "../../components/VerifyAddress/VerifyAddress";
import verifyUserAddress from "../../components/ProgressBar/ProgressBar";
import api from '../../services/loginApi'
import Nav from '../Navigation/Nav'

import './styles.css'

export default function NormalPerfil() {

    const history = useHistory();

    const [user, setUser] = useState([]);
    const [address, setAddress] = useState([]);


    useEffect(() => {

        api.get('user/findByToken', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(response => {
            setUser(response.data)
            setAddress(response.data.addressDto)
        })
    }, [])

    
    async function deleteAccount(){

        let r = window.confirm("Voce deseja realmente excluir sua conta ?");
        if (r==true)
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
            <div className="full-container">
                <div className="cont-left">
                    <table className="table-left">
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
                                <td>Aniversário : {user.born}</td>
                            </tr>
                            <tr>
                                <td>Email : {user.email}</td>
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
                    </table>                    
 
               </div>
                <div className="cont-right">
                    <table>
                        <thead>
                            <tr>
                                <td>{verifyUserAddress(user)}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button className="button1" onClick={logout} type="button">
                                        <FiPower size={18} color='251fc5' />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    Deseja começar a vender?
                                    Clique no botão abaixo!
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Link className="button" to="/perfilvendedor">Ativar conta</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Deseja excluir sua conta ?
                                    Clique no botão abaixo!
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button id ="alert" className="button" onClick={deleteAccount}>Excluir conta</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    );
}