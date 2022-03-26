import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './OrderProductChange.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";

export default function OrderProductChange(){

    const [product, setProduct] = useState([]);
    const [change_reason, setChange_reason] = useState([]);

    const history = useHistory();

    useEffect(()=> {getProduct()}, [])

    async function getProduct(){
        try {
            await api.get(`/products/list/${localStorage.getItem('id-prod_troca')}`).then(response =>{
                setProduct(response.data)
            })
        } catch (err) {
            alert('Impossivel trazer produto . .')
        }
    }

    async function handleRequest(e){
        e.preventDefault();

        const data = {
            change_reason : change_reason,
        }

        try {
            await api.post(`/change/create/${localStorage.getItem('id-prod_troca')}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            history.push('/')
        } catch (err) {
            alert("falha na requisição de troca")
        }

    }

    return (
        <>
            <Nav />
                <table className="table-product-change">
                    <thead>
                        <tr>
                            <td>{product.prod_name}</td>
                            <td>{product.prod_price}</td>
                            <td>{product.prod_spec}</td>
                            <td>{product.prod_builder}</td>
                        </tr>
                    </thead>
                    
                </table>

                <div className="form-troca">
                    <form onSubmit={handleRequest}>
                        <input type='text'onChange={e => setChange_reason(e.target.value)}/>
                        <button className='button' type="submit">Enviar pedido de troca</button>
                    </form>
                </div>
            <Bottom />
        </>
    );
}