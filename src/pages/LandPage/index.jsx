import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from '../../services/loginApi'
import Nav from '../Navigation/Nav'
import Bottom from '../BottomInfo/Bottom'

import instrument from '../../assets/guitarra-fender-american-acoustasonic-telecaster-canhota-097-2018-221-2.jpg'

import './landPageStyles.css'

export default function LandPage() {

    const [products, setProducts] = useState([]);
    const [mostView, setMostView] = useState([]);
    const [limits, setLimits] = useState([]);
    const [page, setPage] = useState(0);

    const history = useHistory();

    useEffect(() => {getProducts()}, [page])
    useEffect(() => {getTopProducts()}, [])

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
    async function getTopProducts(){
        try {
            await api.get(`products/listtop`).then(resProd => {
                setMostView(resProd.data)
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
                            <strong>Fabricante</strong>
                            <p>{prod.prod_builder}</p>
                            <strong>Preço</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.prod_price)}</p>
                            <strong>Categoria</strong>
                            <p>{prod.category.categoryName}</p>
                            <img src={instrument} alt=""/>
                            <button className='buy' onClick={() => getProduct(prod.id)}>Ver produto</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="buttons">
                <button data-cy="prev-page" className="btn-effect" onClick={() => decrement()}>Pagina Anterior</button>
                <button data-cy="next-page" className="btn-effect" onClick={() => increment()}>Proxima Pagina</button>
            </div>
            <br />
                <span className="prod-alert">Produtos mais visualizados</span>
            <br />
            <div className="products">
                <ul>
                    {mostView.map(mv => (
                        <li key={mv.id}>
                            <strong>Produto</strong>
                            <p data-cy="prod-name">{mv.prod_name}</p>
                            <strong>Fabricante</strong>
                            <p>{mv.prod_builder}</p>
                            <strong>Preço</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(mv.prod_price)}</p>
                            <strong>Categoria</strong>
                            <p>{mv.categoryDto.categoryName}</p>
                            <img src={instrument} alt=""/>
                            <button className='buy' onClick={() => getProduct(mv.id)}>Ver produto</button>
                        </li>
                    ))}
                </ul>
            </div>
            <Bottom />
        </>
    );
}