import React, { Component } from "react";
import Navbar from "../../layout/navbar/Navbar";
import Sidebar from "../../layout/sidebar/Sidebar";
import NewsItem from "./NewsItem";
import NewsList from "./NewsList";
import { News } from "../../../api/fakeApi";

import classes from "./NewsPage.module.css";

export default class NewsPage extends Component {
    constructor(props) {
        console.log('props are ', props);
        super(props);
        this.state = {
            newsList: null,
            newsItem: null
        }

        this.newsIdQueryParameter = new URLSearchParams(this.props.location.search).get('id');
    }

    render(){
        return(
            <>
                <Navbar/>
                <div className={classes.content}>
                    <Sidebar/>
                    <main className={classes.news}>
                        {
                         this.newsIdQueryParameter
                         ? <NewsItem />
                         : <NewsList 
                            addNewsItemFunction={News.add} 
                            NewsItem={NewsItem}>
                           </NewsList>
                        }
                    </main>
                </div>
            </>
            
        )
    }
}