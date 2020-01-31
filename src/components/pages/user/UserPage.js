import React from "react";
//import { Link } from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import "./UserPage.css";
import Input from "../../common/Input/input";
import Button from "../../common/Button/Button";
import Navbar from "../../layout/navbar/Navbar";
import Sidebar from "../../layout/sidebar/Sidebar";

import { User, Token } from "../../../api/fakeApi";

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeInitialPassword = this.onChangeInitialPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isOpen: false,
      componentIsLoading: true,
      user: {
        name: "",
        lastname: "",
        email: "",
        age: "",
        gender: "",
        password: "",
        initialPassword: "useruser"
      }
    };

    //const { isOpen, user:{...user} } = this.state;
  }

  //Form Events

  onChangeName(e) {
    this.setState({
      user: Object.assign(this.state.user, { name: e.target.value })
    });
  }

  onChangeLastName(e) {
    this.setState({
      user: Object.assign(this.state.user, { lastname: e.target.value })
    });
  }
  onChangeEmail(e) {
    this.setState({
      user: Object.assign(this.state.user, { email: e.target.value })
    });
  }
  onChangeAge(e) {
    this.setState({
      user: Object.assign(this.state.user, { age: e.target.value })
    });
  }
  onChangePassword(e) {
    this.setState({
      user: Object.assign(this.state.user, { password: e.target.value })
    });
  }

  onChangeInitialPassword(e) {
    this.setState({
      user: Object.assign(this.state.user, { initialPassword: e.target.value })
    });
  }

  onChangeGender(e) {
    this.setState({
      user: Object.assign(this.state.user, { gender: e.target.value })
    });
  }

  getUserData() {
    Promise.all([Token.decode(), User.getUserData()])
      .then(result => {
        const { email } = result[0];
        console.log("email", email);
        const userAdditionalData = result[1];
        this.setState(
          {
            user: Object.assign(
              { email },
              Object.assign(
                { initialPassword: userAdditionalData.password },
                userAdditionalData
              )
            )
          },
          () => console.log("this is state", this.state)
        );
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ componentIsLoading: false }));

    /*User.getUserData()
      .then(userData => {
        this.setState(
          {
            userData
          },
          () => console.log("This state", this.state)
        );
      })
      .catch(error => console.error(error))
      .finally(() => this.setState({ componentIsLoading: false }));

      */
  }
  componentDidMount() {
    this.getUserData();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <div className="main">
          <Sidebar></Sidebar>
          <div className="content">
            <div className="user__block">
              <h1 className="user__block_title">Profile information</h1>
              {this.state.componentIsLoading ? (
                <div>loading...</div>
              ) : (
                <form onSubmit={this.onSubmit}>
                  <Input
                    customClass="input-field"
                    name="name"
                    label="First Name"
                    inputType="text"
                    onChange={this.onChangeName}
                    value={this.state.user.name}
                  ></Input>
                  <Input
                    customClass="input-field"
                    name="lastname"
                    label="Last Name"
                    inputType="text"
                    onChange={this.onChangeLastName}
                    value={this.state.user.lastname}
                  ></Input>
                  <Input
                    customClass="input-field"
                    name="email"
                    label="Email"
                    inputType="email"
                    value={this.state.user.email}
                    onChange={this.onChangeEmail}
                    disabled
                  ></Input>
                  <Input
                    customClass="input-field"
                    label="Age"
                    inputType="number"
                    onChange={this.onChangeAge}
                    value={this.state.user.age}
                  ></Input>

                  <div className="userGender">
                    <div className="userGender_male">
                      <Input
                        label="Male"
                        inputType="radio"
                        name="gender"
                        value="male"
                        checked={this.state.user.gender === "male"}
                        onChange={this.onChangeGender}
                      />
                    </div>
                    <div className="userGender_female">
                      <Input
                        label="Female"
                        inputType="radio"
                        name="gender"
                        value="female"
                        checked={this.state.user.gender === "female"}
                        onChange={this.onChangeGender}
                      />
                    </div>
                  </div>

                  <Button
                    className="btn sweep-to-right"
                    onClick={e => this.setState({ isOpen: true })}
                  >
                    Change password
                  </Button>

                  <Modal
                    isOpen={this.state.isOpen}
                    onClose={e => this.setState({ isOpen: false })}
                    modalContent={
                      <div>
                        <Input
                          customClass="input-field"
                          inputType="text"
                          label="Enter your password"
                          name="initialPassword"
                          onChange={this.onChangeInitialPassword}
                          value={this.state.user.initialPassword}
                        ></Input>
                        <Input
                          customClass="input-field"
                          inputType="text"
                          label="Enter your new password"
                          name="password"
                          onChange={this.onChangePassword}
                          value={this.state.user.password}
                        ></Input>

                        <Button
                          type="button"
                          className="btn sweep-to-right"
                          onClick={() => {
                            User.saveToLocalStorage(this.state.user);
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    }
                  ></Modal>

                  <Button
                    type="button"
                    className="btn sweep-to-right"
                    onClick={() => {
                      User.saveToLocalStorage(this.state.user);
                    }}
                  >
                    Save
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

/*comment for git */

export default UserPage;
