import React, { useState, useEffect } from "react";

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
    const [address, setAddress] = useState([])
    const [cup, setCup] = useState([]);

    useEffect(() => { getProducts() }, []);
    useEffect(() => { getOrder() }, [])

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

    async function getOrder() {

        try {

            await api.get(`/order/${localStorage.getItem('selected-order')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res => {
                setOrder(res.data)
                setCup(res.data.cupon)
                setAddress(res.data.addressDto)
            })

        } catch (err) {
            alert("Falha ao trazer pedido")
        }
    }

    async function handleChangeStatus() {

        try {
            api.put(`/order/updateStatus/${localStorage.getItem('selected-order')}`, { status: status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            document.location.reload()
        } catch (err) {
            alert("Falha ao alterar status do pedido")
        }
    }

    function handleVerifyCupon() {
        if(cup !== null){
            return <table className="top-table">
                <tr>
                    <td><b>Id do Cupom</b></td>
                    <td><b>Nome do Cupom</b></td>
                    <td><b>Porcentagem de desconto</b></td>
                    <td><b>Preço final do pedido com cupom</b></td>
                </tr>
                <tr>
                    <td>{cup.id}</td>
                    <td>{cup.c_name}</td>
                    <td>{cup.c_percentage + "%"}</td>
                    <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice - (products.totalPrice / 100) * cup.c_percentage)}</td>
                </tr>
            </table>
        } else{
            return <table className="top-table">
                <tr>
                    <td><b>Não utilizou cupom de desconto.</b></td>
                </tr>
            </table>
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
                        <br />
                        <tr>
                            <td><b>Estado</b></td>
                            <td><b>Cidade</b></td>
                            <td><b>Bairro</b></td>
                            <td><b>Numero</b></td>
                        </tr>
                        <tr>
                            <td>{address.state}</td>
                            <td>{address.city}</td>
                            <td>{address.district}</td>
                            <td>{address.number}</td>
                        </tr>
                    </table>
                    <br />

                    {handleVerifyCupon()}

                    <br />
                    <table className="top-table">
                        <tr>
                            <td className="unique">Alterar Status do Pedido</td>
                            <td>
                                <DropDownStatus onChange={(e) => setStatus(e.target.value)} />
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
                            <tr key={p.productDTO.id}>
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