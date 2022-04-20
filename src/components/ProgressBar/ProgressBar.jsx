import { Link } from "react-router-dom";

import './styles.css'

export default function verifyUserInformations(address, card) {

    if (address.length === 0) {
        return (
            <>
                <div className="box">
                    <div className="percent">
                        <svg className='half'>
                            <circle cx="70" cy="70" r="70"></circle>
                            <circle cx="70" cy="70" r="70"></circle>
                        </svg>
                        <div className="num">
                            <h2>55%<span>%</span></h2>
                        </div>
                    </div>
                    <h2 className="text">Progress</h2>
                    <h2 className="text-red">Endereço preenchido X</h2>
                    <h2 className="text-red">Cartão preenchido X</h2>
                </div>
                <Link className="button" to='/adicionarendereco'>Adicionar endereço</Link>
            </>
        );
    } else if(address.length != 0 && card.length === 0){
        return (
            <>
            <div className="box">
                <div className="percent">
                    <svg className='semi-full'>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle cx="70" cy="70" r="70"></circle>
                    </svg>
                    <div className="num">
                        <h2>87<span>%</span></h2>
                    </div>
                </div>
                <h2 className="text">Perfil</h2>
                <h2 className="text-green">Endereço preenchido ✓</h2>
                <h2 className="text-red">Cartão preenchido X</h2>
            </div>
            <Link className="button" to='/editarperfil'>Editar Perfil</Link>
            <Link className="button" to='/adicionarendereco'>Adicionar novo endereço</Link>
            <Link className="button" to='/adicionarcartao'>Adicionar primeiro cartão</Link>
            </>
        );
    }else{
        return (
            <>
            <div className="box">
                <div className="percent">
                    <svg className='full'>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle cx="70" cy="70" r="70"></circle>
                    </svg>
                    <div className="num">
                        <h2>
                            <span className="span2">✔</span>
                        </h2>
                    </div>
                </div>
                <h2 className="text">Perfil</h2>
                <h2 className="text-green">Endereço preenchido ✓</h2>
                <h2 className="text-green">Cartão preenchido ✔</h2>
            </div>
            <Link className="button" to='/editarperfil'>Editar Perfil</Link>
            <Link className="button" to='/adicionarendereco'>Adicionar novo endereço</Link>
            <Link className="button" to='/adicionarcartao'>Adicionar novo cartão</Link>
            </>
        );
    }
}

