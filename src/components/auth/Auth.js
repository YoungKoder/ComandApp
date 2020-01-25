import React, { Fragment } from "react";

import AuthSignup from "../auth/AuthSignup";
import AuthSignin from "../auth/AuthSignup";

const authForms=[
    "signIn",
    "signUp"
]

const Auth = ({
    authForm,
}) => {
    let isSignup=false;

    if(authForm === "signIn" && authForms.includes(authForm)){
        isSignup=false;
    }

    if(authForm === "signUp" && authForms.includes(authForm)){
        isSignup=true;
    }


    return (
        <Fragment>
            {
                isSignup ? 
                (
                    <AuthSignup/>
                ):<AuthSignin/>
            }
        </Fragment>
    )
}

export default Auth;