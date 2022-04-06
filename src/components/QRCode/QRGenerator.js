import React, {useEffect, useRef} from "react";
import {useHistory} from "react-router-dom"
import QRCode from 'qrcode';

export default function QRCodeGenerator({text}){
    
    const useCanvas = useRef();
    const history = useHistory();
    
    useEffect(() =>{
        QRCode.toCanvas(useCanvas.current,text, (error) => {
            console.log(error);
        });
    }, [text])

    return (
        <div>
            <canvas ref={useCanvas} id="canvas"></canvas>
        </div>
    );
}