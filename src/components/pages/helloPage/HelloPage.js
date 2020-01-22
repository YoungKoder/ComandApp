
import React, { Component, Fragment } from "react";

import Button from "../../common/Button/Button";
import Input from "../../common/Input/input";
import Modal from "../../common/Modal/Modal";

export default class HelloPage extends Component {
    state ={
        showModal:false
    }
    render(){
        return(
            <Fragment>
                <Button 
                    onClick={()=>{this.setState({showModal:true})}}
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
                    isOpen={this.state.showModal}
                    onClose={()=>{this.setState({showModal:false})}}
                    modalContent = {<p>Something here</p>}
                    modalFooter = {
                        <Button state="success" size="sm" variant="outline" onClick={()=>{this.setState({showModal:false})}}>Save</Button>
                    }
                    locationX="right"
                    locationY="top"/>
            </Fragment>
        )
    }
}
