import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'


import '../Navigation/Nav.css'

import { BsFillMicFill } from "react-icons/bs";
import { GiMagnifyingGlass, GiGuitarBassHead, GiSaxophone, GiDrumKit, GiUnplugged } from "react-icons/gi";
import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

import api from '../../services/loginApi'


import Logo from '../../assets/logo_Musica.png'

function Nav() {

  const history = useHistory();

  const [showLinks, setshowLinks] = useState(false);

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);


  async function getUser() {
    try {
      await api.get('user/findByToken', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }).then(response => {
        setUser(response.data)
      })
    } catch (err) {
    }
  }
  useEffect(() => { getUser() }, [])


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
    }
  }

  useEffect(() => {
    getProducts()
  }, []);

  async function checkLogin() {

    if (user.length === 0) {
      history.push('/login')
    } else {
      history.push('/carrinho')
    }

  }

  return (
    <div>
      <div className='Navbar'>
        <div className='nav-main-left'>
          <FiMenu className='nav-icon-menu-response' onClick={() => setshowLinks(!showLinks)} />
          <img src={Logo} alt="Logo MusicShop" className='nav-img-logo' onClick={() => history.push("/")} />
        </div>
        <div className='nav-main-center'>
          <div className='nav-align-search-button'>
            <BsFillMicFill className='nav-icon-mic' />
            <input type="text" placeholder='o que procura hoje?' className='nav-search-button' />
            <button className='nav-button-icon-glass'>
              <GiMagnifyingGlass className='nav-icon-glass' />
            </button>
          </div>
        </div>
        <div className='nav-main-right'>
          <div className='nav-align-options'>
            <div className='nav-align-options-left'>
              <button><BiUser className='nav-icon-user' onClick={() => history.push('/login')} /></button>
            </div>
            <div className='nav-align-options-center'>
              <button><AiOutlineShoppingCart className='nav-icon-cart' onClick={() => checkLogin()} /></button>
              <div className='pop-up'>{products.total}</div>
            </div>
            <div className='nav-align-options-right'>
              <button><BsTelephone className='nav-icon-whatsaap' /></button>
            </div>
          </div>
        </div>
      </div>
      <div className='nav-header-botom' id={showLinks ? "hidden" : ""}>
        <div className='nav-align-header-bottom'>
          <div className='nav-align-options-guitar'>
            <button><GiGuitarBassHead className='nav-icon-guitar' />⠀Corda</button>
          </div>
          <div className='nav-align-options-sax'>
            <button><GiSaxophone className='nav-icon-sax' />⠀Sopro</button>
          </div>
          <div className='nav-align-options-drum'>
            <button><GiDrumKit className='nav-icon-drum' />⠀Percussão</button>
          </div>
          <div className='nav-align-options-piano'>
            <button><GiUnplugged className='nav-icon-piano' />⠀Eletrofones</button>
          </div>
          <div className='nav-align-options-menu'>
            <button><FiMenu className='nav-icon-menu' />⠀Outros</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Nav