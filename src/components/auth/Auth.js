import React, { Fragment } from "react";

import AuthSignup from "../auth/AuthSignup";
import AuthSignin from "../auth/AuthSignin";

const authForms=[
    "signIn",
    "signUp"
]

const Auth = ({
    authForm,
}) => {
    console.log(authForm);
    let isSignup=false;
    let authSignup = <AuthSignin/>
    // if(authForm === "signIn" && authForms.includes(authForm)){
    //     isSignup=false;
    // }

    if(authForm == "signUp" && authForms.includes(authForm)){
        isSignup=true;
        authSignup=  <AuthSignup/>
    }

    
    return (
        <Fragment>
            {
                authSignup
            }
        </Fragment>
    )
}

export default Auth;