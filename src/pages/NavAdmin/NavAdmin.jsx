import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

import Logo from '../../assets/logo_Musica.png'

import './NavAdmin.css'

export default function NavAdmin() {

    const history = useHistory();

    const [listCupons, setListCupons] = useState(false)

    return (
        <>
            <div className="container-adm-home">
                <div className="navigation">
                    <table>
                        <thead>
                            <tr>
                                <td className="logo">
                                    <img src={Logo} alt="Logo MusicShop" className='nav-img-logo' onClick={() => history.push("/paineladministrativo")} />
                                </td>
                                <td className="opt"><button onClick={() => history.push('/paineladministrativo/usuarios')}> Usuarios </button></td>
                                <td className="opt"><button onClick={() => history.push('/paineladministrativo/produtos')}> Produtos </button></td>

                                <td className="opt"><button onClick={() => listCupons ? setListCupons(false) : setListCupons(true)}> Cupons </button></td>
                                {listCupons === true && (
                                    <div className="modal-cpn">
                                        <button className="btn-cpn" onClick={() => history.push('/paineladministrativo/cupons')}>Promocional</button>
                                        <button className="btn-cpn" onClick={() => history.push('/paineladministrativo/cuponschange')}>Troca</button>
                                    </div>
                                )}
                                <td className="opt"><button onClick={() => history.push('/paineladministrativo/vendas')}> Vendas </button></td>
                                <td className="opt"><button onClick={() => history.push('/paineladministrativo/cancelamentos')}> Cancelamentos </button></td>
                                <td className="opt"><button onClick={() => history.push('/paineladministrativo/trocas')}> Trocas </button></td>
                                <td className="opt"><button onClick={() => {
                                    localStorage.clear()
                                    history.push('/')
                                }}> Sair </button></td>
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