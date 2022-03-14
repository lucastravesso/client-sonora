import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from '../../services/loginApi'
import Nav from '../Navigation/Nav'
import Bottom from '../BottomInfo/Bottom'

import instrument from '../../assets/guitarra-fender-american-acoustasonic-telecaster-canhota-097-2018-221-2.jpg'

import './styles.css'

export default function LandPage() {

    const [products, setProducts] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    const history = useHistory();


    async function addCart(id) {
        try{
            await api.post(`cart/add-cart/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            alert("Prod add")
        }catch(err){
            alert("Falha ao adicionar no carrinho, necessario criar uma conta para continuar . .");
            history.push('/login');
        }
    }

    async function getProducts(){
        try {
            await api.get(`products/list`).then(resProd => {
                setProducts(resProd.data)
            })
        } catch (err) {
            alert("Nao foi possivel trazer os produtos")
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <Nav />
            <div className='products'>
                <ul>
                    {products.map(prod => (
                        <li key={prod.id}>
                            <strong>Produto:</strong>
                            <p>{prod.prod_name}</p>
                            <strong>Preço:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.prod_price)}</p>
                            <strong>Especificação:</strong>
                            <p>{prod.prod_spec}</p>
                            <strong>Categoria:</strong>
                            <p>{prod.categoryDto.categoryName}</p>
                            <img src={instrument} alt=""/>
                            <button className='buy' onClick={() => addCart(prod.id)}>Adicionar ao carrinho</button>
                        </li>
                    ))}
                </ul>
            </div>
            <Bottom />
        </>
    );
}