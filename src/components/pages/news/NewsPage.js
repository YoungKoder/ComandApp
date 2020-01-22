import React, { Component, Fragment } from "react"

import Navbar from "../../layout/navbar/Navbar";
import Sidebar from "../../layout/sidebar/Sidebar";

export default class NewsPage extends Component{
    render(){
        return(
            <Fragment>
                <Navbar/>
                <Sidebar/>
            </Fragment>
            
        )
    }
}