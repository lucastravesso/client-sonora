import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'

import api from '../../services/loginApi'
import './AdminPanelCancel.css'
import NavAdmin from '../NavAdmin/NavAdmin'
import DropDownStatus from '../../components/DropDowns/DdStatusChange'

export default function SelectedCancel() {

    const history = useHistory();

    const [cancel, setCancel] = useState([]);
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    async function getChange(){
        try {
            await api.get(`/cancel/list/${localStorage.getItem('selected-cancel')}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {
                setCancel(res.data)
            })
        } catch (err) {
            alert("Falha ao trazer troca")
        }
    }

    useEffect(()=>{getChange()}, [])


    async function handleChangeStatus(){

        try {
            await api.put(`/cancel/update/${localStorage.getItem('selected-cancel')}`, {status: status, change_reply: message} , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            document.location.reload()
        } catch (err) {
            alert("Falha ao alterar status do pedido")
        }
    }

    return (
        <>
            <NavAdmin />
            <div className="container-changes">
                <div className="selected-left">
                    <table className="top-table">
                        <tr>
                            <td><b>Nº Pedido</b></td>
                            <td><b>Status do Pedido</b></td>
                            <td><b>Data do Pedido</b></td>
                        </tr>
                        <tr>
                            <td>{cancel.id}</td>
                            <td>{cancel.status}</td>
                            <td>{cancel.change_date}</td>
                        </tr>
                        <tr>
                            <td className="unique">Alterar Status do Pedido</td>
                            <td>
                                <DropDownStatus onChange={(e) => setStatus(e.target.value)}/>
                            </td>
                            <td><button className="button" onClick={() => handleChangeStatus()}>Alterar</button></td>
                        </tr>
                        <tr>
                            <td className="unique">Mensagem de resposta</td>
                            <td>
                                <input onChange={(e) => setMessage(e.target.value)}/>
                            </td>
                        </tr>
                    </table>
                    <table className="bot-table">
                        <tr className="bar">
                            <td>Motivo da troca</td>
                        </tr>
                        <tr>
                            <td>{cancel.change_reason}</td>
                        </tr>
                        <tr className="bar">
                            <td>Resposta ao comprador</td>
                        </tr>
                        <tr>
                            <td>{cancel.change_reply}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    );
}