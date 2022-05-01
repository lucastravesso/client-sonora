import React , {useState, useEffect}from "react";
import {useHistory} from 'react-router-dom'

import api from '../../services/loginApi'

import './AdminPanelChanges.css'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function AdminPanelChanges() {

    const history = useHistory();
    const [changes, setChanges] = useState([]);

    useEffect(()=>{getChanges()},[])

    async function getChanges(){
        try {
            await api.get('/change/list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {setChanges(res.data)})
        } catch (err) {
            alert("Falha ao trazer trocas")
        }
    }

    return (
        <>
            <NavAdmin />
            <div className="container-changes">
                <table className="table-changes">
                    <thead>
                        <tr>
                            <td>LISTA DE PEDIDOS DE TROCAS</td>
                        </tr>
                    </thead>
                    <br />
                    <br />
                    <tbody>
                        {changes
                        .sort((a, b) => { return a.id - b.id })
                        .reverse()
                        .map(c => (
                            <button className="button" onClick={() => {
                                localStorage.setItem('selected-change',c.id);
                                history.push('/paineladministrativo/trocas/troca')
                            }}>
                                <tr key={c.id}>
                                    <td>ID : {c.id}</td>
                                    <td>STATUS : {c.status}</td>
                                    <td>Data do pedido : {c.change_date}</td>
                                    <td>Produtos : {c.product.prod_name}</td>
                                </tr>
                            </button>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </>
    );
}