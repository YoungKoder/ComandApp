import React from "react";

import Auth from "../../auth/Auth";

import "./loginPages.css";

const SigninPage = () => {
    return (
        <div className="Page">
            <div className="formWrapper">
                <Auth authForm ="signIn"/>
            </div>
        </div>
        
        
    )
}

export default SigninPage;