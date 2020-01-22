
import React, { Component, Fragment } from "react";

import Button from "../../common/Button/Button";
import Input from "../../common/Input/input";

export default class HelloPage extends Component {
    render(){
        return(
            <Fragment>
                <Button 
                    onClick={(e)=>{console.log("it's",e.target)}}
                    state="error"
                    size="lg"
                    variant="outline"
                    >
                    click me!
                </Button>
                <Input 
                    label={<p>Label</p>}
                    valid = {false}
                    errorMessege = "Error"
                    />
            </Fragment>
        )
    }
}
