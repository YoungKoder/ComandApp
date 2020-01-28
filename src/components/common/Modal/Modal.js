import React, { Fragment } from "react";
import Button from "../Button/Button";

import "./modal.css"


const locations = [
    "top",
    "bottom",
    "left",
    "right",
]
const Modal = ({
    isOpen,
    customClass="",
    onClose,
    modalContent,
    modalFooter,
    locationX="center",
    locationY="center"
}) =>{

    let classeNames="";

    if(locationX !== "center" && locations.includes(locationX)){
        classeNames += " overlay--X--"+locationX;
    }

    if(locationY !== "center" && locations.includes(locationY)){
        classeNames += " overlay--Y--"+locationY;
    }
    

    let modal = (
        <div className={"overlay fade" + classeNames + " " + customClass}>
            <div className="popup">
                <div className="popup__close"><Button size="sm" onClick={onClose}>x</Button></div>
                <div className="popup__content">
                    {modalContent}
                </div>
                { modalFooter? <div className="popup__footer">{modalFooter}</div>:null}
            </div>
        </div>
    )

    if(!isOpen){
        modal= null;
    }
    return( 
        <Fragment>
            {modal}
        </Fragment>
    )
};

export default Modal;