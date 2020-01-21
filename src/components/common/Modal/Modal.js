import React, { Fragment } from "react";
import Button from "../Button/Button";

import "./modal.css"

const Modal = ({
    children,
    isOpen,
    onClose
}) =>{
    let modal = (
        <div className="overlay fade">
            <div className="popup">
                <div className="popup-close"><Button buttonSie="btn--small" onClick={onClose}>x</Button></div>
                <div>
                    {children}
                </div>
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