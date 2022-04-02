import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'

import api from '../../services/loginApi'
import Logo from '../../assets/logo_Musica.png'

import './Cupons.css'
import NavAdmin from "../NavAdmin/NavAdmin";

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
            setCupons(cupons.filter(cup => cup.id !== id))
            alert("Cupom deletado com sucesso")
        } catch (err) {
            alert("Falha ao deletar cupom")
        }
    }

    async function handleCupon(id){

        try {
            localStorage.setItem('cupon-id', id)
            history.push(`/paineladministrativo/cupons/add-alt`)
        } catch (error) {
            alert("Fail to load cupon")
        }
    }

    return (
        <>
            <NavAdmin />
            <div className="container-home-cupons">
                <table>
                    <thead>
                        <tr>
                            <td colSpan={4}>Cupons disponíveis no site</td>
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
                            <td>Quantidade</td>
                        </tr>
                        <br />
                        {cupons.map(c => (
                            <>
                                <tr key={c.id}>
                                    <td>{c.c_name}</td>
                                    <td>{c.c_percentage + "%"}</td>
                                    <td>{c.c_register}</td>
                                    <td>{c.c_final}</td>
                                    <td>{c.c_quantity}</td>
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