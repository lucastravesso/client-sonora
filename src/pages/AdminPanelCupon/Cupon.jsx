import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'
import InputMask from 'react-input-mask';


import api from '../../services/loginApi'
import Logo from '../../assets/logo_Musica.png'

import './Cupons.css'

export default function Cupon() {

    const history = useHistory();

    const [name, setName] = useState('')
    const [procentagem, setProcentagem] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFinal, setDataFinal] = useState('')

    async function loadCupon(){
        try {
            
            api.get(`/cupon/list/${localStorage.getItem('cupon-id')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {
                setName(res.data.c_name)
                setProcentagem(res.data.c_percentage)
                setDataInicio(res.data.c_register)
                setDataFinal(res.data.c_final)
            })

        } catch (err) {
            alert("Falha ao carregar cupom")
        }
    }

    useEffect(() => {
        if (localStorage.getItem('cupon-id') === '0') return;
        else loadCupon();
    }, [])


    async function saveOrUpdate(e){
        e.preventDefault()

        const data = {
            c_name : name,
            c_percentage : procentagem,
            c_register : dataInicio,
            c_final: dataFinal,
        }

        if (localStorage.getItem('cupon-id') === '0'){
            try {
                api.post('/cupon/insert', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                alert("Cupon inserido com sucesso")
                history.push('/paineladministrativocupons')
            } catch (err) {
                alert("falha ao inserir cupom")
            }
        }else{
            try {
                api.put(`/cupon/update/${localStorage.getItem('cupon-id')}`, data,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                alert("Cupon atualizado com sucesso")
                history.push('/paineladministrativocupons')
            } catch (error) {
                alert("falha ao atualizar cupom")
            }
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
                <div className="form-cupom">
                    <form onSubmit={saveOrUpdate}>
                        <input
                            placeholder="Nome do cupom"
                            value={name}
                            name='nome'
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            placeholder="Porcentagem de desconto"
                            value={procentagem}
                            name='porcentagem'
                            onChange={e => setProcentagem(e.target.value)}
                        />
                        <InputMask
                            name='data-inicio'
                            mask="99-99-9999"
                            placeholder='Data de inicio'
                            value={dataInicio}
                            onChange={e => setDataInicio(e.target.value)}
                        />
                        <InputMask
                            name='data-fim'
                            mask="99-99-9999"
                            placeholder='Data de termino'
                            value={dataFinal}
                            onChange={e => setDataFinal(e.target.value)}
                        />
                        <button type="submit" className="button">Atualizar / Inserir</button>
                    </form>
                </div>
            </div>
        </>
    );
}