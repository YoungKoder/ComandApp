import React, { Component, Fragment } from "react";
import NewsItem from "./NewsItem";

import Navbar from "../../layout/navbar/Navbar";
import Sidebar from "../../layout/sidebar/Sidebar";

export default class NewsPage extends Component{
    constructor(props) {
        console.log('props are ', props);
        super(props);
    }

    render(){
        return(
            <Fragment>
                <Navbar/>
                <Sidebar/>
            </Fragment>
            
        )
    }
}