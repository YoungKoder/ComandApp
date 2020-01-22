
import React, { Component, Fragment } from "react";

import Button from "../../common/Button/Button";
import Input from "../../common/Input/input";
import Modal from "../../common/Modal/Modal";

export default class HelloPage extends Component {
    render(){

        let openModal = false;

        return(
            <Fragment>
                <Button 
                    onClick={()=>{openModal=true}}
                    state="error"
                    size="lg"
                    variant="outline"
                    >
                    Open Modal!
                </Button>
                <Input 
                    label={<p>Label</p>}
                    valid = {false}
                    errorMessege = "Error"
                    />
                <Modal
                    isOpen={openModal}
                    onClose={()=>{openModal=false}}
                    modalContent = {<p>Some text</p>}
                    modalFooter = {<Button state="success" varian="ouline" onClick={()=>{openModal=false}}/>}/>
            </Fragment>
        )
    }
}
