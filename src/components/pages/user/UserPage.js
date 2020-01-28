import React from "react";
//import { Link } from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import "./UserPage.css";
import Input from "../../common/Input/input";
import Button from "../../common/Button/Button";

import { User } from "../../../api/fakeApi";

class UserPage extends React.Component {
  userData;
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
      user: {
        name: "",
        lastname: "",
        email: "",
        age: "",
        gender: "male"
      }
    };

    //const { isOpen, user:{...user} } = this.state;
  }

  //Form Events

  saveToLocalStorage = props => {
    localStorage.setItem("user", JSON.stringify(this.state.user));
  };

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

  onChangeGender(e) {
    this.setState({
      user: Object.assign(this.state.user, { gender: e.target.value })
    });
  }

  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem("user"));

    if (localStorage.getItem("user")) {
      this.setState({
        user: {
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
    }
  }

  onSubmit(e) {
    e.preventDefault();

    //console.log(this.state.props);
  }

  render() {
    //console.log("userInfo", userInfo);
    return (
      <div className="user__block">
        <h1 className="user__block_title">Profile information</h1>
        <form onSubmit={this.onSubmit}>
          <Input
            name="name"
            label="First Name"
            type="text"
            onChange={this.onChangeName}
            value={this.state.user.name}
          ></Input>
          <Input
            name="lastname"
            label="Last Name"
            type="text"
            onChange={this.onChangeLastName}
            value={this.state.user.lastname}
          ></Input>
          <Input
            name="email"
            label="Email"
            type="email"
            onChange={this.onChangeEmail}
            value={this.state.user.email}
          ></Input>
          <Input
            label="Age"
            type="number"
            onChange={this.onChangeAge}
            value={this.state.user.age}
          ></Input>

          <div className="userGender">
            <label htmlFor="gender"> Male</label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={this.state.user.gender === "male"}
              onChange={this.onChangeGender}
            />

            <label htmlFor="gender">Female</label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={this.state.user.gender === "female"}
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
          >
            <Input type="password"></Input>
            <Input type="password"></Input>
            <Button></Button>
          </Modal>

          <Button
            type="button"
            className="btn sweep-to-right"
            onClick={this.saveToLocalStorage}
          >
            Save
          </Button>
        </form>
      </div>
    );
  }
}

/*comment for git */

export default UserPage;
