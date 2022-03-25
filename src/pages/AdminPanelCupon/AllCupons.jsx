import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'

import api from '../../services/loginApi'
import Logo from '../../assets/logo_Musica.png'

import './Cupons.css'

export default function AllCupons() {

    const history = useHistory();

    const [cupons, setCupons] = useState([]);

    useEffect(() => {
        try {
            api.get('/cupon/list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res =>{
                setCupons(res.data)
            })
        } catch (err) {
            alert("falha ao trazer cupons")
        }
    }, [])

    async function deleteCupon(id){
        try {
            await api.delete(`/cupon/delete/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            alert("Cupom deletado com sucesso")
        } catch (err) {
            alert("Falha ao deletar cupom")
        }
    }

    async function handleCupon(id){

        try {
            localStorage.setItem('cupon-id', id)
            history.push(`/paineladministrativocuponaddalt`)
        } catch (error) {
            alert("Fail to load cupon")
        }
    }

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
            <div className="container-home-cupons">
                <table>
                    <thead>
                        <tr>
                            <td colSpan={3}>Cupons disponíveis no site</td>
                            <td><button className="button-c" onClick={() => handleCupon(0)}>Incluir novo cupom</button></td>
                        </tr>
                    </thead>
                    <br /><br />
                    <tbody>
                        <tr>
                            <td>Nome do Cupom</td>
                            <td>Desconto</td>
                            <td>Data de lançamento</td>
                            <td>Data de fechamento</td>
                        </tr>
                        {cupons.map(c => (
                            <>
                                <tr key={c.id}>
                                    <td>{c.c_name}</td>
                                    <td>{c.c_percentage + "%"}</td>
                                    <td>{c.c_register}</td>
                                    <td>{c.c_final}</td>
                                </tr>
                                <tr>
                                    <td ><button className="button-c" onClick={() => deleteCupon(c.id)}>Deletar</button></td>
                                    <td ><button className="button-c" onClick={() => handleCupon(c.id)}>Alterar</button></td>
                                </tr>
                                <br />
                                <br />
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}