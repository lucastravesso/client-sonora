import React, {useEffect, useRef} from "react";
import QRCode from 'qrcode';

export default function QRCodeGenerator({text}){
    
    const useCanvas = useRef();
    
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