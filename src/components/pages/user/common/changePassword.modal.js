import Modal from '../../../common/Modal/Modal';
import Modal from "../../../common/Modal/Modal";
import "../UserPage.css";
import Input from "../../../common/Input/input";
import Button from "../../../common/Button/Button";
        
class ChangePassword extends React.Component {
    constructor(props){
        super(props)
    }
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
            valid={currentPassword.valid}
            errorMessege={currentPassword.errorMessege}
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
            className="btn sweep-to-right"
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
}

export default ChangePassword;
        
       