import React from "react";
//import { Link } from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import "./UserPage.css";
import Input from "../../common/Input/input";
import Button from "../../common/Button/Button";
import Navbar from "../../layout/navbar/Navbar";
import Sidebar from "../../layout/sidebar/Sidebar";

import { User } from "../../../api/fakeApi";

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isOpen: false,
      componentIsLoading: true,
      userData: {
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

  /*saveToLocalStorage = props => {
    localStorage.setItem("user", JSON.stringify(this.state.userData));
  };
*/
  onChangeName(e) {
    this.setState({
      userData: Object.assign(this.state.userData, { name: e.target.value })
    });
  }

  onChangeLastName(e) {
    this.setState({
      userData: Object.assign(this.state.userData, { lastname: e.target.value })
    });
  }
  onChangeEmail(e) {
    this.setState({
      userData: Object.assign(this.state.userData, { email: e.target.value })
    });
  }
  onChangeAge(e) {
    this.setState({
      userData: Object.assign(this.state.userData, { age: e.target.value })
    });
  }

  onChangeGender(e) {
    this.setState({
      userData: Object.assign(this.state.userData, { gender: e.target.value })
    });
  }

  getUserData() {
    User.getUserData()
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
  }
  componentDidMount() {
    this.getUserData();
    /*this.userData = JSON.parse(localStorage.getItem("user"));

    if (localStorage.getItem("user")) {
      this.setState({
        userData: {
          name: this.userData.name,
          lastname: this.userData.lastname,
          email: this.userData.email,
          age: this.userData.age,
          gender: this.userData.gender
        }
      });
    } else {
      this.setState({
        user: {
          name: "",
          lastname: "",
          email: "",
          age: "",
          gender: ""
        }
      });
    }*/
  }

  onSubmit(e) {
    e.preventDefault();

    //console.log(this.state.props);
  }

  render() {
    //console.log("userInfo", userInfo);
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
                    name="name"
                    label="First Name"
                    type="text"
                    onChange={this.onChangeName}
                    value={this.state.userData.name}
                  ></Input>
                  <Input
                    name="lastname"
                    label="Last Name"
                    type="text"
                    onChange={this.onChangeLastName}
                    value={this.state.userData.lastname}
                  ></Input>
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    onChange={this.onChangeEmail}
                    value={this.state.userData.email}
                  ></Input>
                  <Input
                    label="Age"
                    type="number"
                    onChange={this.onChangeAge}
                    value={this.state.userData.age}
                  ></Input>

                  <div className="userGender">
                    <label htmlFor="gender"> Male</label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={this.state.userData.gender === "male"}
                      onChange={this.onChangeGender}
                    />

                    <label htmlFor="gender">Female</label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={this.state.userData.gender === "female"}
                      onChange={this.onChangeGender}
                    />
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
                        <Input customClass="test" inputType="password"></Input>
                        <Input customClass="test" type="password"></Input>
                      </div>
                    }
                  ></Modal>

                  <Button
                    type="button"
                    className="btn sweep-to-right"
                    onClick={() => {
                      User.saveToLocalStorage(this.state.userData);
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
