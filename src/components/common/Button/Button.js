import React from "react";

import './Button.css'

const states = [
    "primary",
    "warning",
    "error",
    "success"
];

const variants = [
    "solid",
    "outline"
];

const sizes = [
    "sm",
    "md",
    "lg",
];

const Button = ({
    children, 
    customClass="",
    type="button", 
    onClick, 
    state="primary", 
    size="md",
    variant="solid",
    disabled,
    noPadding
}) => {

    let classesNames = '';

    if(state !== "primary" && states.includes(state)){
        classesNames+= " btn--" + state;
    }
    else{
        classesNames+= " btn--primary";
    }

    if(variant !== "solid" && variants.includes(variant)){
        classesNames+=" btn--" + variant;
    }
    else{
        classesNames+=" btn--solid";
    }

    if(size !== "md" && sizes.includes(size)){
        classesNames += " btn--" + size;
    }
    else{
        classesNames+= " btn--md";
    }

    // if(!disabled){
    //     classesNames+= "  disabled"
    // }

    classesNames += !disabled ? " " : " disabled";
    classesNames += noPadding? " noPadding": " ";

    return(
        <button 
            className={"btn" + classesNames + " "+ customClass}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;