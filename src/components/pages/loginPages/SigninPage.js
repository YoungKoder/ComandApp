import React, { Fragment } from "react";

import Auth from "../../auth/Auth";
import Button from "../../common/Button/Button";

import { Link } from "react-router-dom";
import "./loginPages.css";

const SigninPage = () => {
    return (
        <Fragment>
            <div className="Page loginPages">
                <div className="toolbar">
                    <div className="buttonControls toolbar__buttonControls">
                        <Button 
                        variant="outline">
                            <Link to="/sign-in">Sign In</Link>
                        </Button>
                        <Button><Link to="/sign-up">Sign Up</Link></Button>
                    </div>
                </div>
                <div className="page__content">
                    <div className="formWrapper">
                        <h2>Sign In</h2>
                        <Auth authForm ="signIn"/>
                    </div>
                </div> 
            </div>
        </Fragment>
    )
}

export default SigninPage;