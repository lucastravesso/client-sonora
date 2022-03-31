import React , {useState, useEffect}from "react";
import {useHistory} from 'react-router-dom'

import api from '../../services/loginApi'

import './AdminPanelCancel.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function AdminPanelCancel() {

    const history = useHistory();
    const [cancel, setCancel] = useState([]);

    async function getCancels(){
        try {
            await api.get('/cancel/list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {setCancel(res.data)})
        } catch (err) {
            alert("Falha ao trazer trocas")
        }
    }
    useEffect(()=>{getCancels()},[])


    return (
        <>
            <NavAdmin />
            <div className="container-cancel">
                <table className="table-cancel">
                    <thead>
                        <tr>
                            <td>LISTA DE PEDIDOS DE CANCELAMENTO</td>
                        </tr>
                    </thead>
                    <br />
                    <br />
                    <tbody>
                        {cancel.map(c => (
                            <button className="button" onClick={() => {
                                localStorage.setItem('selected-cancel',c.id);
                                history.push('/paineladministrativo/cancelamentos/cancelamento')
                            }}>
                                <tr key={c.id}>
                                    <td>ID : {c.id}</td>
                                    <td>STATUS : {c.status}</td>
                                    <td>Data do pedido : {c.change_date}</td>
                                </tr>
                            </button>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </>
    );
}