import React from "react";

import "./input.css";

const templates = [
  "queue",
  "stack"
]

const Input = ({
    inputType = "text",
    label,
    value,
    onChange,
    errorMessege,
    valid = true,
    template = "stack",
    name
  }) => {

    let classNames = "";
    const htmlFor = `${Math.floor(Math.random() * 10000)}`;
  
    if (!valid) {
      classNames += " invalid";
    }
    
    if(template !== "stack" && templates.includes(template)){
      classNames += " input--"+template;
    }

    return (
      <div className={"input" + classNames}>
        {label? <label htmlFor={htmlFor}>{label}</label> :null}

        <input type={inputType} id={htmlFor} name={name} value={value} onChange={(e) => {onChange(e)}}/>

        {!valid && errorMessege ? <span>{errorMessege}</span> : null}
      </div>
    );
  };
  
  export default Input;
