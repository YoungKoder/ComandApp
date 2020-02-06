import Input from "../../common/Input/input";
import Button from "../../common/Button/Button";

class UserForm extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
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
          className="btn sweep-to-right"
          onClick={e => this.setState({ isOpen: true })}
        >
          Change password
        </Button>

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
      </form>
    );
  }
}

export default UserForm;
