import React, { Component, Fragment } from "react";
import { render } from "@testing-library/react";

import Input from "../common/Input/input";
import Button from "../common/Button/Button";

export default class AuthSignup extends Component {

  state ={

  }

  submitHandler = () =>{

  }

  render(){
    return (
      <Fragment>
          <form className="form" onSubmit={this.submitHandler}>
            <Input label="Email" template="queue" />
            <Input label="Password" inputType="password" template="queue" />
            <Input label="Password" template="password" />
          </form>
      </Fragment>
    )
  }
}

