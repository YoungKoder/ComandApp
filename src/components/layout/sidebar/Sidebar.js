import React from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
    return(
        <aside className="sidebar">
            <ul className="sidebar-nav">
                <li className="sidebar-nav-item">
                    <Link to="/news">News</Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link to ="/events">Events</Link>
                </li>
            </ul>
            <p className="profile"><Link to="/user">profile</Link></p>
        </aside>
    )
}

export default Sidebar;