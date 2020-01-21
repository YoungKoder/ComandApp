import React from "react";

const ChangePasswordForm = props => {
  return (
    <form className="form-change-password">
      <Field
        component="input"
        name="currentPassword"
        type="password"
        placeholder="Current Password"
        required="required"
        className="form-control"
      />

      <Field
        component="input"
        name="newPassword"
        type="password"
        placeholder="New Password"
        required="required"
        className="form-control"
      />

      <Field
        component="input"
        name="newPasswordRepeated"
        type="password"
        placeholder="New Password Repeated"
        required="required"
        className="form-control"
      />

      <Button type="submit" size="lg" block color="success">
        Change Password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
