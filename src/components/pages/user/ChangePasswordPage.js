import React from "react";

import "./UserPage.css";
//import { User, Token } from "../../../api/fakeApi";
import Input from "../../common/Input/input";
import Button from "../../common/Button/Button";

class ChangePasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPassword: "",
      newPassword: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this);
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
  }

  getUserPassword() {
    const users = JSON.parse(localStorage.getItem("users"));
    const usersTakePassword = users.map(function(item) {
      return item.password;
    });

    console.log(usersTakePassword, "usersTakePassword");
  }

  onChangeCurrentPassword(e) {
    this.setState({ currentPassword: e.target.value });
  }

  onChangeNewPassword(e) {
    this.setState({ newPassword: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <>
        <Input
          customClass="input-field"
          inputType="text"
          label="Enter your password"
          name="currentPassword"
          onChange={this.onChangeCurrentPassword}
        ></Input>
        <Input
          customClass="input-field"
          inputType="text"
          label="Enter your new password"
          name="newPassword"
          onChange={this.onChangeNewPassword}
        ></Input>

        <Button
          type="button"
          className="btn sweep-to-right"
          onClick={this.getUserPassword()}
        >
          Save
        </Button>
      </>
    );
  }
}

export default ChangePasswordPage;
