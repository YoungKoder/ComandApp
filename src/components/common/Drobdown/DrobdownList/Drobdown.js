import React, { Component } from "react";

import "./Drobdown.css";

import DrobdownListItem from "../DrobdownListItem/DrobdownListItem"

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
        const {label,menuItems} = this.props;

        const menuOptions = menuItems.map((item)=>{
            
            const{id,labelForOption}=item;

            return(
                <p key={id}>
                    <DrobdownListItem label={labelForOption}/>
                </p>
            )
        })
        return(
            <div className="drobdown">
                <p className="drobdown-label" onClick={this.toShowMenu}>
                    {label}
                </p>

                {
                    this.state.showMenu ?
                    (
                        <div className="drobdown-menu">
                            {menuOptions}
                        </div>
                    )
                    :(null)
                }
                
            </div>
        )
    }
}

