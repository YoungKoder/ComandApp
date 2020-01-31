import React from "react";
//import { Link } from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import "./UserPage.css";
import Input from "../../common/Input/input";
import Button from "../../common/Button/Button";
import Navbar from "../../layout/navbar/Navbar";
import Sidebar from "../../layout/sidebar/Sidebar";
import ChangePasswordPage from "./ChangePasswordPage";
import { User, Token } from "../../../api/fakeApi";
import { func } from "prop-types";

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeUserData = this.onChangeUserData.bind(this);
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
      }
    };

    //const { isOpen, user:{...user} } = this.state;
  }

  //Form Events

  onChangeUserData(e) {
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

  getUserData() {
    Promise.all([Token.decode(), User.getUserData()])
      .then(result => {
        const { email } = result[0];
        console.log("email", email);
        this.setState(
          {
            user: Object.assign({ email })
          },
          () => console.log("this is state", this.state)
        );
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ componentIsLoading: false }));
  }

  getUserPassword() {
    const users = JSON.parse(localStorage.getItem("users"));
    const usersTakePassword = users.map(function(item) {
      return item.id;
    });
    console.log(usersTakePassword, "usersTakePassword");
  }

  changeuserPassword() {}
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
                    onChange={this.onChangeUserData}
                    value={this.state.user.name}
                  ></Input>
                  <Input
                    customClass="input-field"
                    name="lastname"
                    label="Last Name"
                    inputType="text"
                    onChange={this.onChangeUserData}
                    value={this.state.user.lastname}
                  ></Input>
                  <Input
                    customClass="input-field"
                    name="email"
                    label="Email"
                    inputType="email"
                    onChange={this.onChangeUserData}
                    value={this.state.user.email}
                    disabled
                  ></Input>
                  <Input
                    name="age"
                    customClass="input-field"
                    label="Age"
                    inputType="number"
                    onChange={this.onChangeUserData}
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
                        onChange={this.onChangeUserData}
                      />
                    </div>
                    <div className="userGender_female">
                      <Input
                        label="Female"
                        inputType="radio"
                        name="gender"
                        value="female"
                        checked={this.state.user.gender === "female"}
                        onChange={this.onChangeUserData}
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
                    modalContent={<ChangePasswordPage></ChangePasswordPage>}
                  ></Modal>

                  <Button
                    type="button"
                    className="btn sweep-to-right"
                    onClick={() => {
                      User.saveToLocalStorage(this.state.user);
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
        </div>
      </React.Fragment>
    );
  }
}

/*comment for git */

export default UserPage;
