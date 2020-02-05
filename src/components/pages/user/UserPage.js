import React from "react";
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

    this.onChangeAge = this.onChangeAge.bind(this);

    this.onChangeForm = this.onChangeForm.bind(this);
    this.setNewPassword = this.setNewPassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isOpen: false,
      isOpenSecond: false,
      componentIsLoading: true,
      user: {
        name: "",
        lastname: "",
        email: "",
        age: "",
        gender: ""
      },
      initialPassword: {
        value: ""
      },
      currentPassword: {
        value: "",
        errorMessege: "",
        valid: false
      },
      passwordControl: {
        value: "",
        valid: false,
        errorMessege: ""
      },
      formErrors: "",
      formValid: false
    };
  }

  //Form Events

  onChangeForm(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState(prevState => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value
      }
    }));
  }

  changeHandler = async e => {
    const state = { ...this.state };
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      {
        ...state,
        [name]: { ...state[name], value: value }
      },

      () => this.validateControl(name, value)
    );
  };

  validateControl(controlName, value) {
    let firstPswValid = this.state.passwordControl.valid;

    switch (controlName) {
      case "passwordControl":
        firstPswValid = value.length >= 6;
        this.state.passwordControl.errorMessege = firstPswValid
          ? null
          : "Password must contains 6 symbols at least";
        break;
      default:
        break;
    }

    this.setState(
      {
        passwordControl: {
          ...this.state.passwordControl,
          valid: firstPswValid
        }
      },
      this.formValidate
    );
  }

  formValidate = () => {
    this.setState(
      {
        formValid: this.state.passwordControl.valid
      },
      this.setUserData
    );
  };

  setUserData = () => {
    this.setState({
      user: {
        ...this.state.user,
        password: this.state.passwordControl.value
      }
    });
  };
  onChangeAge(e) {
    this.setState({
      user: Object.assign(this.state.user, { age: e.target.value })
    });
  }

  getUserData() {
    Promise.all([Token.decode(), User.getUserData()])
      .then(result => {
        const { email } = result[0];
        const { password } = result[1];
        const { gender } = result[1];
        const { name } = result[1];
        const { lastname } = result[1];
        const { age } = result[1];
        this.setState({
          user: {
            ...this.state.user,
            email,
            gender: gender || "",
            name: name || "",
            lastname: lastname || "",
            age: age || ""
          },

          initialPassword: { value: password }
        });
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ componentIsLoading: false }));
  }

  setNewPassword() {
    if (this.state.initialPassword.value !== this.state.currentPassword.value) {
      alert("Current password is wrong!");
    } else {
      User.setNewPassword(this.state.passwordControl.value)
        .then(success => alert("Your password has been changed successful!"))
        .catch(err => console.error(err));
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const {
      passwordControl: { ...passwordControl },
      currentPassword: { ...currentPassword }
    } = this.state;
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
                    onChange={this.onChangeForm}
                    value={this.state.user.name}
                  ></Input>
                  <Input
                    customClass="input-field"
                    name="lastname"
                    label="Last Name"
                    inputType="text"
                    onChange={this.onChangeForm}
                    value={this.state.user.lastname}
                  ></Input>
                  <Input
                    customClass="input-field"
                    name="email"
                    label="Email"
                    inputType="email"
                    value={this.state.user.email}
                    onChange={this.onChangeForm}
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
                        onChange={this.onChangeForm}
                      />
                    </div>
                    <div className="userGender_female">
                      <Input
                        label="Female"
                        inputType="radio"
                        name="gender"
                        value="female"
                        checked={this.state.user.gender === "female"}
                        onChange={this.onChangeForm}
                      />
                    </div>
                  </div>

                  <Button
                    customClass="btn sweep-to-right"
                    onClick={e => this.setState({ isOpen: true })}
                  >
                    Change password
                  </Button>

                  <Button
                    type="button"
                    customClass="btn sweep-to-right"
                    onClick={() => {
                      User.saveToLocalStorage({
                        ...this.state.user,
                        password: this.state.initialPassword
                      });
                      this.setState({ isOpenSecond: true });
                    }}
                  >
                    Save
                  </Button>
                  <Modal
                    isOpen={this.state.isOpenSecond}
                    onClose={e => this.setState({ isOpenSecond: false })}
                    modalContent={
                      <div className="data-sended">Your data was saved</div>
                    }
                  ></Modal>
                </form>
              )}
            </div>
          </div>
          <Modal
            isOpen={this.state.isOpen}
            onClose={e => this.setState({ isOpen: false })}
            modalContent={
              <div>
                {this.state.formErrors ? (
                  <div className="errorMesege">
                    <p>{this.state.formErrors}</p>
                  </div>
                ) : null}
                <form onSubmit={this.onSubmit}>
                  <Input
                    customClass="input-field"
                    inputType="password"
                    label="Enter your current password"
                    name="currentPassword"
                    onChange={this.changeHandler}
                  ></Input>
                  <Input
                    template="stack"
                    customClass="input-field"
                    inputType="password"
                    label="Enter your new password"
                    name="passwordControl"
                    onChange={this.changeHandler}
                    valid={passwordControl.valid}
                    errorMessege={passwordControl.errorMessege}
                  ></Input>

                  <Button
                    type="submit"
                    customClass="btn sweep-to-right"
                    state="success"
                    variant="solid"
                    disabled={!this.state.formValid}
                    onClick={this.setNewPassword}
                  >
                    Save
                  </Button>
                </form>
              </div>
            }
          ></Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default UserPage;
