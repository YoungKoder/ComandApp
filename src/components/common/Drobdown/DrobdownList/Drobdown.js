import React, { Component } from "react";

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
        const {label,children} = this.props;

        return(
            <div className="drobdown">
                <p className="drobdown__label" >
                    {label}
                </p>
                <p className="drobdown__button" onClick={this.toShowMenu}>
                    <i className="fas fa-sort-down"></i>
                </p>
                {
                    this.state.showMenu ?
                    (
                        <div className="drobdown__menu">{children}</div>
                    )
                    :(null)
                }
                
            </div>
        )
    }
}

