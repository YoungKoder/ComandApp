import React from "react";

import './Button.css'

const styles = [
    "btn--primary--solid",
    "btn--warning--solid",
    "btn--danger--solid",
    "btn--success--solid",
    "btn--primary--outline",
    "btn--warning--outline",
    "btn--danger--outline",
    "btn--success--outline",
];

const sizes = [
    "btn--small",
    "btn--medium",
    "btn--large",
];

const Button = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize,
}) => {

    let classesNames = 'btn';

    if(styles.includes(buttonStyle)){
        classesNames+= " " + buttonStyle;
    }else{
        classesNames+= " " + styles[0];
    }

    if(sizes.includes(buttonSize)){
        classesNames += " " + buttonSize;
    }else{
        classesNames+= " " + sizes[0];
    }

    return(
        <button 
            className={classesNames}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button;