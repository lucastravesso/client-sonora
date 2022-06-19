import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"

import Login from './pages/Login';
import LandPage from './pages/LandPage/index';
import Register from './pages/RegisterPage/index';
import AddressAdd from './pages/AddressPage/index';
import NormalPerfil from './pages/NormalUser/index';
import EditUser from './pages/EditUser/index';
import AddCard from './pages/AddCard/index';
import CartPage from "./pages/CartPage";
import CartConfPage from "./pages/CartConfPage";
import OrderConfPage from "./pages/OrderConfPage";
import OrderSelectedPage from "./pages/OrderSelectedPage"
import AdminPanelHome from "./pages/AdminPanelHome"
import ProductPage from "./pages/ProductPage"
import ProductListPage from "./pages/ProductListPage"
import ProductListCategoryPage from "./pages/ProductListCategoryPage"
import AllCupons from "./pages/AdminPanelCupon/AllCupons"
import Cupon from "./pages/AdminPanelCupon/Cupon"
import OrderChange from "./pages/OrderChange";
import OrderProductChange from "./pages/OrderProductChange";
import AllProducts from "./pages/AdminPanelProduct/AllProducts";
import NewProduct from "./pages/AdminPanelProduct/Product";
import OrderCancel from "./pages/OrderCancel/OrderCancel";
import ProductChangeOrder from "./pages/ProductChangeOrder";
import ProductChangeSelected from "./pages/ProductChangeSelected";
import AdminPanelSales from "./pages/AdminPanelSales/index";
import AdminPanelSale from "./pages/AdminPanelSales/SelectedSale";
import AdminPanelCancel from "./pages/AdminPanelCancel";
import AdminPanelUsers from "./pages/AdminPanelUsers";
import AdminPanelChanges from "./pages/AdminPanelChanges";
import SelectedChange from "./pages/AdminPanelChanges/SelectedChange";
import OrderCancelList from "./pages/OrderCancel/OrderCancelList";
import OrderCancelSelected from "./pages/OrderCancel/OrderCancelSelected";
import SelectedCancel from "./pages/AdminPanelCancel/SelectedCancel";
import QRCodePayment from "./pages/QRCodePayment/index"
import QRPage from "./pages/QRPage";
import PasswordChange from "./pages/PasswordChange";
import AllCuponsChange from "./pages/AdminPanelCupon/AllCuponsChange";
import AllUserCupons from "./pages/CuponsPages/AllUserCupons";
import UserPage from "./pages/AdminPanelUsers/UserPage"
import AuditTable from "./pages/AdminPanelAudit/auditIndex";
import OrdersPage from "./pages/OrdersPage";

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/paineladministrativo/usuarios/informacoes' exact component={UserPage}/>
                <Route path='/paineladministrativo/auditoria' exact component={AuditTable}/>
                <Route path='/' exact component={LandPage}/>
                <Route path='/login' component={Login}/>
                <Route path='/meuscupons' component={AllUserCupons}/>
                <Route path='/mudarsenha' component={PasswordChange}/>
                <Route path='/register' component={Register}/>
                <Route path='/perfilsimples' component={NormalPerfil} />
                <Route path='/adicionarendereco' component={AddressAdd} />
                <Route path='/editarperfil' component={EditUser} />
                <Route path='/adicionarcartao' component={AddCard} />
                <Route path='/carrinho' component={CartPage}/>
                <Route path='/confirmacaodecompra' component={CartConfPage}/>
                <Route path='/confirmacaodepedido' component={OrderConfPage} />
                <Route path='/trocas' exact component={ProductChangeOrder} />
                <Route path='/trocas/produto' component={ProductChangeSelected} />
                <Route path='/pedido' component={OrderSelectedPage} />
                <Route path='/pedidos' component={OrdersPage} />
                <Route path='/paineladministrativo' exact component={AdminPanelHome} />
                <Route path='/paineladministrativo/cupons' exact component={AllCupons} />
                <Route path='/paineladministrativo/cuponschange' exact component={AllCuponsChange} />
                <Route path='/paineladministrativo/cupons/add-alt' component={Cupon} />
                <Route path='/paineladministrativo/produtos' exact component={AllProducts} />
                <Route path='/paineladministrativo/vendas' exact component={AdminPanelSales} />
                <Route path='/paineladministrativo/vendas/venda' exact component={AdminPanelSale} />
                <Route path='/paineladministrativo/usuarios' exact component={AdminPanelUsers} />
                <Route path='/paineladministrativo/trocas' exact component={AdminPanelChanges} />
                <Route path='/paineladministrativo/trocas/troca' exact component={SelectedChange} />
                <Route path='/paineladministrativo/cancelamentos' exact component={AdminPanelCancel} />
                <Route path='/paineladministrativo/cancelamentos/cancelamento' exact component={SelectedCancel}/>
                <Route path='/paineladministrativo/produtos/add-alt/:prodId' exact component={NewProduct} />
                <Route path='/produto' component={ProductPage}/>
                <Route path='/busca' component={ProductListPage}/>
                <Route path='/categoria' component={ProductListCategoryPage}/>
                <Route path='/troca' exact component={OrderChange}/>
                <Route path='/cancelamento' exact component={OrderCancel}/>
                <Route path='/cancelamentos' exact component={OrderCancelList}/>
                <Route path='/cancelamento/pedido' exact component={OrderCancelSelected}/>
                <Route path='/troca/produto' component={OrderProductChange}/>
                <Route path='/confirmacaodecompraqr' component={QRCodePayment}/>
                <Route path='/qrcode' component={QRPage}/>
            </Switch>
        </BrowserRouter>
    );
}