import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from '../../services/loginApi'
import Nav from '../Navigation/Nav'
import Bottom from '../BottomInfo/Bottom'

import instrument from '../../assets/guitarra-fender-american-acoustasonic-telecaster-canhota-097-2018-221-2.jpg'

import './ProductListPage.css'

export default function ProductListPage() {


    const [products, setProducts] = useState([]);

    const history = useHistory();

    async function getProducts(){
        
        try {
            await api.get(`products/listall/${localStorage.getItem('pesquisa')}`).then(resProd => {
                setProducts(resProd.data)
            })
            
        } catch (err) {
            alert("Nenhum produto encontrado")
            history.push('/')
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    async function getProduct(id){
        localStorage.setItem('id-produto-selecionado', id)
        history.push('/produto')
    }

    return (
        <>
            <Nav />
            <div className='products-listed'>
                <ul>
                    {products.map(prod => (
                        <li key={prod.id}>
                            <strong>Produto</strong>
                            <p>{prod.prod_name}</p>
                            <strong>Preço</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.prod_price)}</p>
                            <strong>Especificação</strong>
                            <p>{prod.prod_spec}</p>
                            <strong>Categoria</strong>
                            <p>{prod.categoryDto.categoryName}</p>
                            <img src={instrument} alt=""/>
                            <button className='buy' onClick={() => getProduct(prod.id)}>Ver produto</button>
                        </li>
                    ))}
                </ul>
            </div>
            <Bottom />
        </>
    );
}