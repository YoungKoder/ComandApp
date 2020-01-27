import React, { Component, Fragment } from "react";
import { render } from "@testing-library/react";

import Input from "../common/Input/input";
import Button from "../common/Button/Button";

export default class AuthSignup extends Component {

  constructor(props) {
    super(props);
  
    this.state ={
      emailControl:{
        value:"",
        valid: false,
        errorMessege: ""
      },
      firstPasswordControl:{
        value:"",
        valid:false,
        errorMessege: ""
      },
      secondPasswordControl:{
        value:"",
        valid:false,
        errorMessege: "",
        isFirstPasswordControlHere: false
      },
      formValid: false
    }
  }

  submitHandler = (e) =>{
    e.preventDefault();
  }

  changeHandler = async (e) =>{
    console.log("value is", e.target.value);
    const state = {...this.state}
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      ...state, 
      [name]:{...state[name],value:value}
    },()=> {this.validateControl(name, value)});
  }

  validateControl(controlName, value){
    let emailValid = this.state.emailControl.valid;
    let firstPswValid = this.state.firstPasswordControl.valid;
    let secondPswValid = this.state.secondPasswordControl.valid;
    

    switch(controlName){
      case "emailControl":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        this.state.emailControl.errorMessege = emailValid ? null : 'Email не валидный';
        break;
      case "firstPasswordControl":
        firstPswValid = value.length >= 6;
        this.state.secondPasswordControl.isFirstPasswordControlHere = firstPswValid ? true : false
        this.state.firstPasswordControl.errorMessege = firstPswValid ? null : "Пароль должен содержать не менее 6 символов";
        break;
      case "secondPasswordControl":
        if(this.state.firstPasswordControl.value === value){
          secondPswValid = true;
          firstPswValid = true;
        }
        else{
          secondPswValid = false;
          firstPswValid = false;
          this.state.firstPasswordControl.errorMessege = "Пароли не совпадают";
          this.state.secondPasswordControl.errorMessege = "Пароли не совпадают";
        }
    }

    this.setState({
      emailControl: {
        ...this.state.emailControl,
        valid:emailValid
      },
      firstPasswordControl: {
        ...this.state.firstPasswordControl,
        valid:firstPswValid
      },
      secondPasswordControl: {
        ...this.state.secondPasswordControl,
        valid:secondPswValid
      }
    }, this.formValidate)
  }

  formValidate = () => {
    this.setState({
      formValid:this.state.emailControl.valid && this.state.firstPasswordControl.valid && this.state.secondPasswordControl
    })
  }

  isPasswordsimilar = () =>{
    if(this.state.firstPasswordControl.value === this.state.secondPasswordControl.value){
      return true;
    }
    return false;
  }

  render(){
    const {
      emailControl:{...emailControl}, 
      firstPasswordControl:{...firstPasswordControl},
      secondPasswordControl:{...secondPasswordControl}
    } = this.state;


    return (
      <Fragment>
          <form className="form" onSubmit={this.submitHandler}>
            <Input label="Email" 
                  inputType="email"  
                  name = "emailControl" 
                  template="queue"
                  onChange={this.changeHandler}
                  valid={emailControl.valid}
                  errorMessege={emailControl.errorMessege}
                  required
            />
            <Input 
              label="Password" 
              name = "firstPasswordControl" 
              inputType="password" 
              template="queue"
              onChange={this.changeHandler}
              valid={firstPasswordControl.valid}
              errorMessege={firstPasswordControl.errorMessege}
              required
            />
            <Input 
              label="Password" 
              inputType="password" 
              name ="secondPasswordControl" 
              template="queue"
              onChange={this.changeHandler}
              disable = {!secondPasswordControl.isFirstPasswordControlHere}
              valid={secondPasswordControl.valid}
              errorMessege={secondPasswordControl.errorMessege}
              required
            />
            <div>
              <Button type="submit" state="success" variant="solid" disabled={!this.state.formValid}> Confirm </Button>
            </div>
          </form>
      </Fragment>
    )
  }
}

