import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from '../../services/loginApi'
import Nav from '../Navigation/Nav'
import Bottom from '../BottomInfo/Bottom'

import instrument from '../../assets/guitarra-fender-american-acoustasonic-telecaster-canhota-097-2018-221-2.jpg'

import './ProductPage.css'
import { BsFillPlusCircleFill, BsFillDashCircleFill } from "react-icons/bs";

export default function LandPage() {

    const [product, setProduct] = useState([]);
    const [qntd, setQntd] = useState(1);

    const history = useHistory();

    useEffect(() => { getProduct() }, [])

    async function getProduct() {
        try {
            await api.get(`/products/list/${localStorage.getItem('id-produto-selecionado')}`).then(response => {
                setProduct(response.data)
            })
        } catch (err) {
            alert('Impossivel trazer produto . .')
        }
    }

    async function addCart() {

        if (product.prod_quantity === 0) {
            alert("Produto fora de estoque .")
            history.push('/')
        } else {
            if(qntd === 1)
            {
                try {
                    await api.post(`/cart/add-cart/${localStorage.getItem('id-produto-selecionado')}`, null, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                    history.push('/carrinho')
                } catch (err) {
                    alert('Necessario estar logado para adicionar ao carrinho . .')
                    history.push('/login')
                }
            }else if(qntd > 1)
            {
                try {
                    await api.post(`/cart/add-cart/${localStorage.getItem('id-produto-selecionado')}/${qntd}`, null, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                    history.push('/carrinho')
                } catch (err) {
                    alert('Necessario estar logado para adicionar ao carrinho . .')
                    history.push('/login')
                }
            }
        }
    }

    return (
        <>
            <Nav />
            <div className="container-product">
                <div className="cont-prod-left">
                    <div className="product-img">
                        <img src={instrument} alt="" />
                    </div>
                </div>
                <div className="cont-prod-center">
                    <div className="product-info-left">
                        <ul>
                            <li><b style={{ fontSize: 35 }}> Nome </b><br /><br />{product.prod_name}</li>
                            <li><b style={{ fontSize: 35 }}> Fabricante </b><br /><br />{product.prod_builder}</li>
                            <li><b style={{ fontSize: 35 }}> Especificações </b><br /><br />{product.prod_spec}</li>
                        </ul>
                    </div>
                </div>
                <div className="cont-prod-right">
                    <div className="product-info-right">
                        <ul>
                            <li><b style={{ fontSize: 22 }}> Preço - </b>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.prod_price)}
                            <div className="plusMinus">
                                <button className="qntd"><BsFillDashCircleFill onClick={() => {
                                    if (qntd <= 1) {
                                        alert("Impossivel remover")
                                    } else {
                                        setQntd(qntd - 1)
                                    }
                                }} /></button>
                                {qntd}
                                <button className="qntd"><BsFillPlusCircleFill onClick={() => {
                                    if (qntd + 1 > product.prod_quantity) {
                                        alert("Impossivel adicionar, quantidade fora de estoque")
                                    } else {
                                        setQntd(qntd + 1)
                                    }
                                }} />
                                </button>
                            </div></li>
                            <li><b style={{ fontSize: 22 }}> Quantidade em estoque - </b>{product.prod_quantity}</li>
                            <li><button className="button" onClick={() => addCart()}>Adicionar ao carrinho</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Bottom />
        </>
    );
}