import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css"

import{Token} from"../../../api/fakeApi";
import Button from "../../common/Button/Button";
import Drobdown from "../../common/Drobdown/DrobdownList/Drobdown";

const Navbar = ()=>{

    const clickItem = () =>{
        Token.destroy()
        .then(succes => window.location.href="/sign-in")
        .catch( error => console.error(error))
    }

    return(
        <div className="navbar">
            <div className="logo">
                <Link to="/news">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png" alt="logo"/>
                </Link>
            </div>
            <div className="user">
                    <Drobdown label={<span> user</span>} clickOnMenuItem={()=>clickItem()}>
                        <Button size="sm" state="warning"  >Log Out</Button>
                    </Drobdown>
            </div>
        </div>      
    )
}

export default Navbar;