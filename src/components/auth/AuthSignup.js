import React, { Component, Fragment } from "react";
import { render } from "@testing-library/react";

import Input from "../common/Input/input";
import Button from "../common/Button/Button";

export default class AuthSignup extends Component {

  state ={
    emailControl:{
      value:"",
      valid: true,
      errorMessege: "Введите коректный EMAIL"
    },
    firstPasswordControl:{
      value:"",
      valid:true,
      errorMessege: "Пароли не совпадают"
    },
    secondPasswordControl:{
      value:"",
      valid:true,
      errorMessege: "Пароли не совпадают"
    }
  }

  submitHandler = (e) =>{
    e.preventDefault();
  }

  changeHandler = async (e) =>{
    console.log("value is", e.target.value);
    const state = {...this.state}
    console.log("state is", state)
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      ...state, 
      [name]:{...state[name],value:value}
    })
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
            <Input label="Email" name = "emailControl" template="queue"
              onChange={event => this.changeHandler(event)}/>
            <Input 
              label="Password" 
              valid = {firstPasswordControl.valid} 
              name = "firstPasswordControl" 
              value = {this.state.firstPasswordControl.value}
              inputType="password" 
              template="queue"
              onChange={this.changeHandler}
            />
            <Input label="Password" name ="secondPasswordControl" template="queue"
              onChange={event => this.changeHandler(event)}/>
          </form>
      </Fragment>
    )
  }
}

