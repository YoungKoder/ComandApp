import React from "react";

import "./input.css";

const Input = ({
    inputType = "text",
    label,
    value,
    onChange,
    errorMessege,
    valid,
    shouldValidate,
    touched,
    name
  }) => {
    let classNames = "input";
    const htmlFor = `${Math.floor(Math.random() * 10000)}`;
  
    if (!valid && shouldValidate && touched) {
      classNames += " invalid";
    }
    
    return (
      <div className={classNames}>
        <label htmlFor={htmlFor}>{label}</label>
        <input type={inputType} id={htmlFor} name={name} value={value} onChange={onChange} />
        {!valid && shouldValidate && touched ? <span>{errorMessege}</span> : null}
      </div>
    );
  };
  
  export default Input;
