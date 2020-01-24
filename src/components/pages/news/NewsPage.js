import React, { Component, Fragment } from "react";
import NewsItem from "./NewsItem";
import Navbar from "../../layout/navbar/Navbar";
import Sidebar from "../../layout/sidebar/Sidebar";

import classes from "./NewsPage.module.css";

export default class NewsPage extends Component{
    constructor(props) {
        console.log('props are ', props);
        super(props);

        this.newsIdQueryParameter = new URLSearchParams(this.props.location.search).get('id');
    }

    render(){
        return(
            <Fragment>
                <Navbar/>
                <div className={classes.content}>
                    <Sidebar/>
                    <main className={classes.news}>
                        {this.newsIdQueryParameter
                         ? <NewsItem />
                         : console.log('fail')
                        }
                    </main>
                </div>
            </Fragment>
            
        )
    }
}