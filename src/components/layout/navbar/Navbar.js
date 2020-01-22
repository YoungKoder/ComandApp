import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css"

import Drobdown from "../../common/Drobdown/DrobdownList/Drobdown";

const Navbar = ()=>{
    return(
        <div className="navbar">
            <div className="logo">
                <Link to="/content-page">Logo</Link>
            </div>
            <div className="user">
                    <Drobdown label={<p>User</p>}>
                        LOGOUT
                    </Drobdown>
            </div>
        </div>      
    )
}

export default Navbar;