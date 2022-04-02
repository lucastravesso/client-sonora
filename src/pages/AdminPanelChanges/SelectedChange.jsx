import React, {useState, useEffect} from "react";

import api from '../../services/loginApi'
import './AdminPanelChanges.css'
import NavAdmin from '../NavAdmin/NavAdmin'
import DropDownStatus from '../../components/DropDowns/DdStatusChange'

export default function SelectedChange() {

    const [change, setChange] = useState([]);
    const [product, setProduct] = useState([]);
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
   
    useEffect(()=>{getChange()}, [])

    async function getChange(){
        try {
            await api.get(`/change/list/${localStorage.getItem('selected-change')}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {
                setChange(res.data)
                setProduct(res.data.product)
            })
        } catch (err) {
            alert("Falha ao trazer troca")
        }
    }

    async function handleChangeStatus(){

        try {
            await api.put(`/change/update/${localStorage.getItem('selected-change')}`, {status: status, change_reply: message} , {
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
                            <td>{change.id}</td>
                            <td>{change.status}</td>
                            <td>{change.change_date}</td>
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
                    <table className="middle-table">
                        <tr className="bar">
                            <td>Produto</td>
                            <td>Preço Unitario</td>
                            <td>Especificação</td>
                            <td>Fabricante</td>
                        </tr>
                        <tr>
                            <td>{product.prod_name}</td>
                            <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.prod_price)}</td>
                            <td>{product.prod_spec}</td>
                            <td>{product.prod_builder}</td>
                        </tr>
                    </table>
                    <table className="bot-table">
                        <tr className="bar">
                            <td>Motivo da troca</td>
                        </tr>
                        <tr>
                            <td>{change.change_reason}</td>
                        </tr>
                        <tr className="bar">
                            <td>Resposta ao comprador</td>
                        </tr>
                        <tr>
                            <td>{change.change_reply}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    );
}