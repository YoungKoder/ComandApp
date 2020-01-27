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
    type="button", 
    onClick, 
    state="primary", 
    size="md",
    variant="solid",
    disabled
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

    return(
        <button 
            className={"btn" + classesNames}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;