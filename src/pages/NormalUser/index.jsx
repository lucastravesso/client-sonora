import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FiPower } from 'react-icons/fi'

import verifyUserInformations from "../../components/ProgressBar/ProgressBar";
import api from '../../services/loginApi'
import Nav from '../Navigation/Nav'
import Bottom from '../BottomInfo/Bottom'

import './normalUserStyles.css'
//import OrdersPage from "../OrdersPage";
import ProductChangeOrder from "../ProductChangeOrder";

export default function NormalPerfil() {

    const history = useHistory();

    const [user, setUser] = useState([]);
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState([])
    const [card, setCard] = useState([]);
    const [auth, setAuth] = useState([]);
    //const [selectedSales, setSelectedSales] = useState(false);
    //const [ordersListSales, setOrdersListSales] = useState([]);
    const [selectedChanges, setSelectedChanges] = useState(false);
    const [ordersListChanges, setOrdersListChanges] = useState([]);

    const [changeNotifications, setChangeNotifications] = useState(0);

    useEffect(() => {getOrdersListChanges()}, [])

    async function getOrdersListChanges(){
        try {
            
            api.get('/change/list/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res =>{
                setOrdersListChanges(res.data)
            })

        } catch (err) {
            alert("Falha ao buscar pedidos . .")
        }
    }

    console.log(ordersListChanges)


    /*
    useEffect(() => {getOrdersListSales()}, [])

    async function getOrdersListSales(){
        try {
            api.get('/order/findByUser', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(res =>{
                setOrdersListSales(res.data)
            })

        } catch (err) {
            alert("Falha ao buscar pedidos . .")
        }
    }*/

    useEffect(() => { getCard() }, [])
    useEffect(() => { getUser() }, [])
    useEffect(() => {
        api.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => {
            setAuth(res.data)
        })
    }, [])

    async function getUser() {
        try {
            await api.get('user/findByToken', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(response => {
                setUser(response.data)
                setAddress(response.data.addressDto)
            })
        } catch (err) {
            alert("Falha ao traer as informações de usuario")
        }
    }

    async function getCard() {
        try {
            await api.get('/card/listallbyid', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(response => {
                setCard(response.data)
            })
        } catch (err) {
            alert("Nao foi possivel trazer o cartão")
        }
    }

    async function cardFind(id) {
        return card.find((c) => {
            if (c.id === id) {
                let r = window.confirm("Voce deseja realmente excluir este cartão ?");
                if (r === true) {
                    try {
                        api.delete(`/card/delete/${id}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                            }
                        })
                        setCard(card.filter(card => card.id !== id))
                    } catch (err) {
                        return alert("Falha ao deletar cartao . .")
                    }
                }
            }
            return null;
        })
    }

    async function deleteAccount() {

        let r = window.confirm("Voce deseja realmente inativar sua conta ?");
        if (r === true) {
            try {
                await api.put('/user/inactive', null, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                localStorage.clear()
                history.push('/');
            } catch (err) {
                alert("falha ao inativar a conta")
            }
        }
    }

    async function logout() {
        localStorage.clear()
        history.push('/login')
    }

    function handleAdmin() {

        if (auth.profiles[0].name !== "ROLE_ADMIN") {
            alert("Voce não é um administrador.")
        } else {
            history.push('/paineladministrativo');
        }
    }

    async function deleteAddress(id) {
        if (address.length > 1) {
            return address.find((c) => {
                if (c.id === id) {
                    let r = window.confirm("Voce deseja realmente excluir este endereço ?");
                    if (r === true) {
                        try {
                            api.delete(`/address/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                                }
                            })
                            setAddress(address.filter(address => address.id !== id))
                            document.getElementById('fechar-modal').click();

                        } catch (err) {
                            return alert("Falha ao deletar endereco . .")
                        }
                    }
                }
                return null;
            })
        } else {
            alert("Impossivel deletar, adicione mais algum endereço para isso.")
        }
    }

    function showAddressModal(id) {
        address.find(c => {
            if (c.id === id) {
                setSelectedAddress(c)
            }
            return null;
        })
    }

    function addressList() {
        if (address.length === 0) {
            return <tr className="naf"><td className="naf">Nada a informar</td></tr>
        } else {
            return address.map(a => (
                <><br />
                    <a className="anchor-address" href="#abrirModal" onClick={() => showAddressModal(a.id)}>{a.country}, {a.state} - {a.city}</a>
                    <div id="abrirModal" className="modal">
                        <a href="#fechar" id="fechar-modal" title="Fechar" className="fechar">X</a>
                        <h2>Endereço</h2>
                        <br />
                        <p>País : {selectedAddress.country}</p>
                        <p>Estado : {selectedAddress.state}</p>
                        <p>Cidade : {selectedAddress.city}</p>
                        <p>Bairro : {selectedAddress.district}</p>
                        <p>Rua : {selectedAddress.street}</p>
                        <p>Numero : {selectedAddress.number}</p>
                        <p>Logradouro : {selectedAddress.complement}</p>
                        <button className="button-remove-address" onClick={() => deleteAddress(selectedAddress.id)}>Excluir endereço</button>
                    </div>
                    <br />
                </>
            ))
        }
    }



    return (
        <>
            <Nav />
            {!!selectedChanges ? <ProductChangeOrder receiveProps={ordersListChanges} /> : (
                <>
                    <button data-cy="adminpanel" className="button-adm" onClick={() => handleAdmin()}>Painel administrativo</button>
                    <div className="full-container-user">
                        <div className="cont-left-user">
                            <table className="table-left-user">
                                <thead>
                                    <tr className="title-bar">
                                        <td>
                                            <h1>Informações do usuário</h1>
                                        </td>
                                    </tr>
                                    <tr className="lines-table">
                                        <td>Nome : {user.firstName + ' ' + user.lastName}</td>
                                    </tr>
                                    <tr className="lines-table">
                                        <td id="teste-cpf">CPF : {user.cpf}</td>
                                    </tr>
                                    <tr className="lines-table">
                                        <td>RG : {user.rg}</td>
                                    </tr>
                                    <tr className="lines-table">
                                        <td>Data de Nascimento : {user.born}</td>
                                    </tr>
                                    <tr className="lines-table">
                                        <td>Email : {user.email}</td>
                                    </tr>
                                    <tr className="lines-table">
                                        <td>Telefone : {user.phone}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="title-bar">
                                        <td>
                                            <h1>Informações de endereço</h1>
                                        </td>
                                    </tr>
                                    {addressList()}

                                </tbody>
                                <tfoot >
                                    <tr className="title-bar">
                                        <td>
                                            <h1>Informação dos cartões</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="table-foot">
                                                {
                                                    card.map(card => (
                                                        <div className="each-row" key={card.id}>
                                                            <button className="button-remove" onClick={() => cardFind(card.id)}>Excluir cartão</button>
                                                            <tr className="lines-table">
                                                                <td>Nome no cartão : {card.card_name}</td>
                                                            </tr>
                                                            <tr className="lines-table">
                                                                <td>Bandeira : {card.card_flag}</td>
                                                            </tr>
                                                            <tr className="lines-table">
                                                                <td>Numero no cartão : {card.card_number}</td>
                                                            </tr>
                                                            <tr className="lines-table">
                                                                <td>Código de segurança : {card.card_security}</td>
                                                            </tr>

                                                            <br /><br />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                        <div className="cont-right-user">
                            <table className="table-right-user">
                                <thead>
                                    <tr>
                                        <td>
                                            <button data-cy="logout" className="button1" onClick={logout} type="button">
                                                <FiPower size={18} color='251fc5' />
                                            </button>
                                            {verifyUserInformations(address, card)}
                                        </td>
                                    </tr>
                                </thead>
                                <br />
                                <tbody>
                                    <tr>
                                        <td>
                                            Para alterar a senha <br />
                                            Clique no botão abaixo!
                                            <button className="button" onClick={() => history.push("/mudarsenha")}>Alterar senha</button>
                                        </td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td>
                                            Para ver seus cupons <br />
                                            Clique no botão abaixo!
                                            <button className="button" onClick={() => history.push("/meuscupons")}>Meus cupons</button>
                                        </td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td>
                                            Deseja acompanhar seus pedidos ?<br />
                                            Clique no botão abaixo!
                                            <button className="button" >Ver meus pedidos</button>
                                        </td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td>
                                            Deseja acompanhar seus pedidos de troca ?<br />
                                            Clique no botão abaixo!
                                            <button className="button" onClick={() => setSelectedChanges(true)}>Ver minhas trocas</button>
                                        </td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td>
                                            Deseja acompanhar seus pedidos de cancelamento ?<br />
                                            Clique no botão abaixo!
                                            <button className="button" onClick={() => history.push("/cancelamentos")}>Ver meus cancelamentos</button>
                                        </td>
                                    </tr>
                                </tbody>
                                <br />
                                <tfoot>
                                    <tr>
                                        <td>
                                            Deseja inativar sua conta ?<br />
                                            Clique no botão abaixo!
                                            <button id="alert" className="button" onClick={deleteAccount}>Inativar conta</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <br />
                        </div>
                    </div>
                </>
            )}

            <Bottom />
        </>
    );
}