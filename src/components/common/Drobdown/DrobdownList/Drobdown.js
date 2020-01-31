import React, { Component, Fragment } from "react";

import "./Drobdown.css";


export default class Drobdown extends Component{

    state = {
        showMenu: false
    }

    toShowMenu=(e)=>{
        e.preventDefault();

        this.setState({
            showMenu:true
        },()=>{
            document.addEventListener('click', this.toCloseMenu);
        })
    }

    toCloseMenu = () =>{
        this.setState({
            showMenu:false
        },()=>{
            document.removeEventListener('click', this.toCloseMenu);
        })
    }

    render(){
        const {label,children, customClass="", clickOnMenuItem} = this.props;

        return(
            <div className={"drobdown" + " "+ customClass }>
                <p className="drobdown__label" >
                   {label}
                    
                </p>
                <p className="drobdown__button" onClick={this.toShowMenu}>
                    <i className="fas fa-sort-down"></i>
                </p>
                {
                    this.state.showMenu ?
                    (
                        <div className="drobdown__menu"><p onClick={clickOnMenuItem}>{children}</p></div>
                    )
                    :(null)
                }
                
            </div>
        )
    }
}

