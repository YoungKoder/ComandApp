import React from "react";

import Auth from "../../auth/Auth";

import "./loginPages.css";

const SignupPage = () => {
    return (
        <div className="Page">
            <div className="formWrapper">
                <Auth authForm ="signUp"/>
            </div>
        </div>
        
    )
}

export default SignupPage;