
import React, { Component, Fragment } from "react";


import "./HelloPage.css"

import Button from "../../common/Button/Button";

import { Link } from "react-router-dom";

export default class HelloPage extends Component {
    render(){
        return(
            <Fragment>
                <section className="Page">
                    <div className="enterControl">
                        <div className="enterControl__title">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png" alt="logo"/>
                        </div>
                        <div className="buttonControls enterControl__buttonControls">
                            <Button 
                            variant="outline">
                                <Link to="/sign-in">Sign In</Link>
                            </Button>
                            <Button><Link to="/sign-up">Sign Up</Link></Button>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}
