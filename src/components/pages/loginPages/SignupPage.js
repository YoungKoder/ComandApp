import React from "react";

import Auth from "../../auth/Auth";

import Button from "../../common/Button/Button";

import { Link } from "react-router-dom";

import "./loginPages.css";

const SignupPage = () => {
    return (
        <div className="Page loginPages">
            <div className="toolbar">
                <div className="buttonControls toolbar__buttonControls">
                    <Button 
                    variant="outline"
                    noPadding>
                        <Link to="/sign-in">Sign In</Link>
                    </Button>
                    <Button
                    noPadding><Link to="/sign-up">Sign Up</Link></Button>
                </div>
            </div>
            <div className="page__content">
                <div className="formWrapper">
                    <h2>Sign Up</h2>
                    <Auth authForm ="signUp"/>
                </div>
            </div>
            
        </div>
        
    )
}

export default SignupPage;