import './Shipping.css'

export default function ShippingBar(status) {

    if (status === "PEDIDO_EFETUADO") {

        return (
            <>
                <div className="wrapper">
                    <div className="margin-area">
                        <div className="dot one">1</div>
                        <div className="dot two">2</div>
                        <div className="dot three">3</div>
                        <div className="dot four">4</div>
                        <div className="progress-bar first"></div>
                        <div className="progress-bar second"></div>
                        <div className="progress-bar third"></div>
                        <div className="message message-1">Pedido efetuado</div>
                        <div className="message message-2">Preparando pedido</div>
                        <div className="message message-3">Pedido a caminho</div>
                        <div className="message message-4">Entregue</div>
                    </div>
                </div>
            </>
        );
    }else if (status === "PEDIDO_EM_PRODUÇÃO")
    {
        return (
            <>
                <div className="wrapper">
                    <div className="margin-area">
                        <div className="dot one">1</div>
                        <div className="dot two2">2</div>
                        <div className="dot three">3</div>
                        <div className="dot four">4</div>
                        <div className="progress-bar first2"></div>
                        <div className="progress-bar second"></div>
                        <div className="progress-bar third"></div>
                        <div className="message message-1">Pedido efetuado</div>
                        <div className="message message-2">Preparando pedido</div>
                        <div className="message message-3">Pedido a caminho</div>
                        <div className="message message-4">Entregue</div>
                    </div>
                </div>
            </>
        );
    }else if (status === "PEDIDO_ENVIADO")
    {
        return (
            <>
                <div className="wrapper">
                    <div className="margin-area">
                        <div className="dot one">1</div>
                        <div className="dot two2">2</div>
                        <div className="dot three3">3</div>
                        <div className="dot four">4</div>
                        <div className="progress-bar first2"></div>
                        <div className="progress-bar second3"></div>
                        <div className="progress-bar third"></div>
                        <div className="message message-1">Pedido efetuado</div>
                        <div className="message message-2">Preparando pedido</div>
                        <div className="message message-3">Pedido a caminho</div>
                        <div className="message message-4">Entregue</div>
                    </div>
                </div>
            </>
        );
    }else if (status === "ENTREGUE")
    {
        return (
            <>
                <div className="wrapper">
                    <div className="margin-area">
                        <div className="dot one">1</div>
                        <div className="dot two2">2</div>
                        <div className="dot three3">3</div>
                        <div className="dot four4">4</div>
                        <div className="progress-bar first2"></div>
                        <div className="progress-bar second3"></div>
                        <div className="progress-bar third4"></div>
                        <div className="message message-1">Pedido efetuado</div>
                        <div className="message message-2">Preparando pedido</div>
                        <div className="message message-3">Pedido a caminho</div>
                        <div className="message message-4">Entregue</div>
                    </div>
                </div>
            </>
        );
    }else if (status === "CANCELADO")
    {
        return (
            <>
                <div className="wrapper">
                    <div className="margin-area">
                        <div className="dot one1">!</div>
                        <div className="dot four44">!</div>
                        <div className="progress-bar1 first22"></div>
                        <div className="progress-bar1 second33"></div>
                        <div className="progress-bar1 third44"></div>
                        <div className="message message-1">Pedido efetuado</div>
                        <div className="message message-4">Cancelado</div>
                    </div>
                </div>
            </>
        );
    }
}