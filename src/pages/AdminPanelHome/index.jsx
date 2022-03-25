import React from "react";
import {useHistory} from 'react-router-dom'

import api from '../../services/loginApi'
import Logo from '../../assets/logo_Musica.png'

import './AdminPanelHome.css'

export default function AdminPanelHome() {

    const history = useHistory();


    return (
        <>
            <div className="container-adm-home">
                <div className="navigation">
                    <table>
                        <thead>
                            <tr>
                                <td className="logo">
                                    <img src={Logo} alt="Logo MusicShop" className='nav-img-logo' onClick={() => history.push("/")} />
                                </td>
                                <td className="opt"><button> Usuarios </button></td>
                                <td className="opt"><button> Produtos </button></td>
                                <td className="opt"><button onClick={() => history.push('/paineladministrativocupons')}> Cupons </button></td>
                                <td className="opt"><button> Vendas </button></td>
                                <td className="opt"><button> Trocas/cancelamentos </button></td>
                                <td className="opt"><button> Sair </button></td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div className="container-home">

            </div>
        </>
    );
}