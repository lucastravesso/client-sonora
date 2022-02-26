import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiPower} from 'react-icons/fi'

import api from '../../services/loginApi'

import Nav from '../Navigation/Nav'

import './styles.css'

export default function NormalPerfil()
{
    const history = useHistory();

    const [user, setUser] = useState([]);

    useEffect(() => {
    
        api.get('user/findByToken',{
            headers: {
                 Authorization : `Bearer ${localStorage.getItem("accessToken")}`
                }
        }).then(response =>{
            setUser(response.data)
        })
    }, [])


    async function logout()
    {
        localStorage.clear()
        history.push('/login')
    }


    return (
        <>
            <Nav />
            <div className="full-container">
                <div className="cont-left">
                    <table>
                        <tr>
                            <p className="tb-p">{user.firstName + ' ' + user.lastName}</p>
                        </tr>
                        <tr>
                            <p className="tb-p">{user.cpf}</p>
                        </tr>
                        <tr>
                            <p className="tb-p">{user.rg}</p>
                        </tr>
                        <tr>
                            <p className="tb-p">{user.born}</p>
                        </tr>
                        <tr>
                            <p className="tb-p">{user.email}</p>
                        </tr>
                    </table>
                </div>
                <div className="cont-right">
                    <table>
                        <tr>
                            <td>
                                <p>Sair</p>
                                <button onClick={logout} type="button">
                                    <FiPower size={18} color='251fc5' />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <p>
                                Deseja começar a vender?
                                Clique no botão abaixo!
                            </p>
                        </tr>
                        <tr>
                            <Link className="button" to="/">Ativar conta</Link>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    );
}