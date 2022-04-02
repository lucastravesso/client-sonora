import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'

import api from '../../services/loginApi'
import './AdminPanelSales.css'
import NavAdmin from '../NavAdmin/NavAdmin'
import DropDownStatus from '../../components/DropDowns/DdStatusChange'

export default function SelectedSales() {

    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [status, setStatus] = useState('');

    const history = useHistory();

    async function getProducts() {
        try {
            await api.get(`/order/prod/${localStorage.getItem('selected-order')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(resProd => {
                setUser(resProd.data.user)
                setProducts(resProd.data)
                setCartProducts(resProd.data.cartProducts)
            })

        } catch (err) {
            alert("Nao foi possivel buscar produtos")
        }
    }

    useEffect(() => {
        getProducts()
    }, []);

    async function getOrder() {

        try {

            await api.get(`/order/${localStorage.getItem('selected-order')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res => {
                setOrder(res.data)
            })

        } catch (err) {
            alert("Falha ao trazer pedido")
        }
    }

    useEffect(() => { getOrder() }, [])

    async function handleChangeStatus(){

        try {
            api.put(`/order/updateStatus/${localStorage.getItem('selected-order')}`, {status: status} , {
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
            <div className="container-sales">
                <div className="selected-left">
                    <table className="top-table">
                        <tr>
                            <td><b>Nº Pedido</b></td>
                            <td><b>Status do Pedido</b></td>
                            <td><b>Data do Pedido</b></td>
                            <td colSpan={2}><b>Preço total do pedido</b></td>
                        </tr>
                        <tr>
                            <td>{order.id}</td>
                            <td>{order.status}</td>
                            <td>{order.orderDate}</td>
                            <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)}</td>
                        </tr>
                        <br />
                        <tr>
                            <td><b>Usuario</b></td>
                            <td><b>CPF</b></td>
                            <td><b>Email</b></td>
                            <td><b>Telefone</b></td>
                        </tr>
                        <tr>
                            <td>{user.firstName + " " + user.lastName}</td>
                            <td>{user.cpf}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    </table>
                    <br />
                    <table className="top-table">
                        <tr>
                            <td className="unique">Alterar Status do Pedido</td>
                            <td>
                                <DropDownStatus onChange={(e) => setStatus(e.target.value)}/>
                            </td>
                            <td><button className="button" onClick={() => handleChangeStatus()}>Alterar</button></td>
                        </tr>
                    </table>
                    <br />
                    <table className="middle-table">
                        <tr className="bar">
                            <td>Produto</td>
                            <td>Preço Unitario</td>
                            <td>Especificação</td>
                            <td>Fabricante</td>
                            <td>Quantidade total</td>
                            <td>Preço Total</td>
                        </tr>
                        {cartProducts.map(p => (
                            <tr>
                                <td>{p.productDTO.prod_name}</td>
                                <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.productDTO.prod_price)}</td>
                                <td>{p.productDTO.prod_spec}</td>
                                <td>{p.productDTO.prod_builder}</td>
                                <td>{p.quantity}</td>
                                <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </>
    );
}