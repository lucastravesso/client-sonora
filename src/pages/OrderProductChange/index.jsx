import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './OrderProductChange.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";

export default function OrderProductChange(){

    const [product, setProduct] = useState([]);

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

    return (
        <>
            <Nav />
                <table>
                    <thead>
                        <tr>
                            <td>{product.prod_name}</td>
                            <td>{product.prod_price}</td>
                            <td>{product.prod_spec}</td>
                            <td>{product.prod_builder}</td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            <Bottom />
        </>
    );
}