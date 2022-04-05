import React, {useState, useEffect} from "react";

import './QRPage.css'

import Nav from '../Navigation/Nav'
import Bottom from "../BottomInfo/Bottom";

import api from "../../services/loginApi";
import QRCodeGenerator from "../../components/QRCode/QRGenerator";


export default function QRPage() {

    
    const [products, setProducts] = useState([]);

    let precoTotal = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalPrice)
    let String = `Preço total do pedido : ${precoTotal}
                \nConta para envio do pagamento : 2496777-5
                \nInstituição de pagamento : Nu Pagamentos S.A.
                \nAgência : 0001
                \nPIX : 48502475800`

    useEffect(() => { getProducts() }, []);

    async function getProducts() {
        try {
            await api.get('cart/get-product', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(resProd => {
                setProducts(resProd.data)
            })

        } catch (err) {
            alert("Nao foi possivel buscar produtos")
        }
    }

    return (
        <>
            <Nav />
            <div className="qr-container">
                <QRCodeGenerator text={String}></QRCodeGenerator>
            </div>
            <Bottom />
        </>
    );
}