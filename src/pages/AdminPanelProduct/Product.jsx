import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom'
import NumberFormat from 'react-number-format'

import api from '../../services/loginApi'
import NavAdmin from '../NavAdmin/NavAdmin'


import './Product.css'

export default function NewProduct() {

    const [id, setId] = useState(null);
    const [prod_name, setProd_name] = useState('');
    const [prod_price, setProd_price] = useState('');
    const [prod_spec, setProd_spec] = useState('');
    const [prod_builder, setProd_builder] = useState('');
    const [prod_quantity, setProd_quantity] = useState('');
    const [categoryId, setCategoryId] = useState();
    const [categoryName, setCategoryName] = useState('');
    const [userId, setUserId] = useState();
    const [categoryList, setCategoryList] = useState([]);
    const [reason, setReason] = useState('');

    const { prodId } = useParams();

    const accessToken = localStorage.getItem('accessToken');

    const history = useHistory();

    useEffect(() => {
        api.get('category/list', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            setCategoryList(response.data)
        })
    })

    useEffect(() => {
        if (prodId === '0') return;
        else loadProd();
    }, [prodId])

    useEffect(() => {
        api.get('auth/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            setUserId(response.data.id)
        })
    })

    async function loadProd() {

        try {

            const response = await api.get(`products/list/${prodId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setId(response.data.id);
            setProd_name(response.data.prod_name);
            setReason(response.data.prod_act_reason);
            setProd_builder(response.data.prod_builder);
            setProd_spec(response.data.prod_spec);
            setProd_price(response.data.prod_price);
            setProd_quantity(response.data.prod_quantity);
            setCategoryId(response.data.categoryDto.categoryId)
            setCategoryName(response.data.categoryDto.categoryName)

        } catch (error) {
            alert('Erro ao carregar o produto')
            history.push('/paineladministrativo')
        }
    }

    function editActive(id) {

        try {
            api.put(`/products/update-act/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    motivo: reason
                }
            })
            history.push('/paineladministrativo/produtos')
        } catch (err) {
            alert('Falha ao mudar atividade')
        }
    }


    function SaveOrUpdate(e) {

        e.preventDefault();

        const userDto = {
            id: userId,
        }

        const categoryDto = {
            id: categoryId,
        }

        const data = {
            prod_name,
            prod_builder,
            prod_price,
            prod_spec,
            prod_quantity,
            categoryDto,
            userDto
        }

        try {
            if (prodId === '0') {
                api.post('products/register', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
            } else {
                data.id = id;
                api.put(`products/update/${id}`, data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
            }

            history.push('/paineladministrativo/produtos')
        } catch (err) {
            alert('Error while recoring product, try again')
        }
    }

    return (
        <>
            <NavAdmin />
            <div className="new-product-container">
                <div className="content">
                    <form name="form-save" onSubmit={SaveOrUpdate}>
                        <input
                            placeholder="Nome"
                            value={prod_name}
                            onChange={e => setProd_name(e.target.value)}
                        />
                        <input
                            placeholder="Fabricante"
                            value={prod_builder}
                            onChange={e => setProd_builder(e.target.value)}
                        />
                        <input
                            placeholder="Especifica????es"
                            value={prod_spec}
                            onChange={e => setProd_spec(e.target.value)}
                        />
                        <NumberFormat
                            //ARRUMAR DECIMAL SCALE, INSERT FALHANDO CASO NAO INSIRA CERTO
                            //decimalScale={2}
                            //fixedDecimalScale
                            //thousandSeparator={true}
                            placeholder="Pre??o"
                            value={prod_price}
                            onChange={e => setProd_price(e.target.value)}
                        />
                        <input
                            placeholder="Quantidade"
                            value={prod_quantity}
                            onChange={e => setProd_quantity(e.target.value)}
                        />
                        <select className="select-product" name="select_category" onChange={e => setCategoryId(e.target.value)}>
                            <option value={categoryId}>{categoryName}</option>
                            {categoryList.map(cat => (
                                <option key={cat.id} value={cat.id} >
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                        <button className="button" type="submit">Adicionar</button>
                    </form>
                </div>
                <div className="edit-status">
                    <form name="form-save-act" onSubmit={() => editActive(id)}>
                        <input
                            placeholder="Status da inativa????o/ativa????o"
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                        />
                        <button className="button" type="submit">Mudar Status</button>
                    </form>
                </div>
            </div>
        </>

    );

}