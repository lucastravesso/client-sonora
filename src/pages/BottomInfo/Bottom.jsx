import react from "react";

import '../BottomInfo/bottom.css'
import Logo from '../../assets/logo_Musica.png'
import { BsWhatsapp, BsFacebook, BsInstagram } from "react-icons/bs";


export default function Bottom() {

    return (
        <div className="bottom-page">
            <div className="bot-left">
                <img src={Logo} alt="Logo MusicShop" className='nav-img-logo'/>
            </div>
            <div className="bot-center">
                <table>
                    <thead>
                        <tr>
                            <td className="">
                                <p>Sonora s.a / CNPJ: 99.999.999/0009-99 </p>
                                <p>Inscrição Estadual: 123.123.123.123</p>
                                <p>Email para contato : sonorastore@sonora.net</p>
                            </td>
                            <td>
                                <p>Endereço: Rua dos Instrumentos, 99</p>
                                <p>São Paulo, SP - 08900.0000</p>
                                <p>telefone para contato : 11 982736485</p>
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="bot-right">
                <table>
                    <thead>
                        <tr>
                            <td>
                                <button>
                                    <BsWhatsapp className="icons"/>
                                </button>
                            </td>
                            <td>
                                <button>
                                    <BsFacebook className="icons"/>
                                </button>
                            </td>
                            <td>
                                <button>
                                    <BsInstagram className="icons"/>
                                </button>
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}