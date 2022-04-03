import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from '../../services/loginApi'
import Nav from '../Navigation/Nav'
import Bottom from '../BottomInfo/Bottom'

import instrument from '../../assets/guitarra-fender-american-acoustasonic-telecaster-canhota-097-2018-221-2.jpg'

import './landPageStyles.css'

export default function LandPage() {

    const [products, setProducts] = useState([]);
    const [limits, setLimits] = useState([]);
    const [page, setPage] = useState(0);

    const history = useHistory();

    useEffect(() => {getProducts()}, [page])

    async function getProducts(){
        try {
            await api.get(`products/list?page=${page}&&size=6`).then(resProd => {
                setLimits(resProd.data)
                setProducts(resProd.data.content)
            })
        } catch (err) {
            alert("Nao foi possivel trazer os produtos")
        }
    } 

    async function increment(){
        if(page < limits.totalPages -1){
            setPage(page + 1)
        }else{
           return alert("Pagina indisponivel");
        }
    }

    async function decrement(){
        if(page > 0){
            setPage(page - 1)
        }else if(page === 0){
           return alert("Pagina indisponivel");;
        }
    }

    async function getProduct(id){
        localStorage.setItem('id-produto-selecionado', id)
        history.push('/produto')
    }

    return (
        <>
            <Nav />
            <div className='products'>
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
                            <p>{prod.category.categoryName}</p>
                            <img src={instrument} alt=""/>
                            <button className='buy' onClick={() => getProduct(prod.id)}>Ver produto</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <button className="button" onClick={() => increment()}>Proxima Pagina</button>
                <button className="button" onClick={() => decrement()}>Pagina Anterior</button>
            </div>
            <Bottom />
        </>
    );
}