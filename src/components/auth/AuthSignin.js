import React, { Component, Fragment } from "react";

import Input from "../common/Input/input";
import Button from "../common/Button/Button";

import {Auth} from "../../api/fakeApi";

import "./AuthSignIn.css"

export default class AuthSignin extends Component{

  constructor(props){
    super(props);

    this.state={
      emailControl:{
        value:"",
        valid: false,
        errorMessege: ""
      },
      passwordControl:{
        value:"",
        valid:false,
        errorMessege: ""
      },
      formErrors: "",
      formValid:false,
      user:{
        email:"",
        password:""
      }
    }
  }

  changeHandler = async (e) =>{
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
    let firstPswValid = this.state.passwordControl.valid;

    switch(controlName){
      case "emailControl":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        this.state.emailControl.errorMessege = emailValid ? null : 'Email не валидный';
        break;
      case "passwordControl":
        firstPswValid = value.length >= 6;
        this.state.passwordControl.errorMessege = firstPswValid ? null : "Пароль должен содержать не менее 6 символов";
        break;
    }

    this.setState({
      emailControl: {
        ...this.state.emailControl,
        valid:emailValid
      },
      passwordControl: {
        ...this.state.passwordControl,
        valid:firstPswValid
      }
    }, this.formValidate)

  }

  formValidate = () => {
    this.setState({
      formValid:(this.state.emailControl.valid && this.state.passwordControl.valid)
    }, this.setUserData)
  }

  setUserData = () =>{
    this.setState({
      user: {
        ...this.state.user,
        email:this.state.emailControl.value,
        password:this.state.passwordControl.value
      }
    });
  }

  logIn = () =>{
    Auth.signIn({email:this.state.user.email,password:this.state.user.password})
      .then(token => window.location.replace("/user"))
      .catch(error => this.setState({
        formErrors: error
      }))
  }

  submitHandler = (e) =>{
    e.preventDefault();
  }

  render(){
    const {
      emailControl:{...emailControl}, 
      passwordControl:{...passwordControl},
    } = this.state;
    return (
      <Fragment>
            {
              this.state.formErrors ? 
                <div className="errorMesege">
                  <p>{this.state.formErrors}</p>
                </div>
              : null
            }
          <form className="form" onSubmit={this.submitHandler}>
            <Input label="Email" 
                  template="queue" 
                  inputType="email"  
                  name = "emailControl" 
                  onChange={this.changeHandler}
                  valid={emailControl.valid}
                  errorMessege={emailControl.errorMessege}
            />
            <Input 
                  label="Password" 
                  template="queue"
                  inputType="password"
                  name = "passwordControl" 
                  onChange={this.changeHandler}
                  valid={passwordControl.valid}
                  errorMessege={passwordControl.errorMessege}
            />
            <div>
              <Button type="submit" onClick={this.logIn} state="success" variant="solid" disabled={!this.state.formValid}> SignIn </Button>
            </div>
          </form>
      </Fragment>
    )
  }
}




