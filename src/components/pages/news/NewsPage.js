import React, { Component } from "react";
import NewsItem from './NewsItem';

export default class NewsPage extends Component {
    constructor(props) {
        console.log('props are ', props);
        super(props);
    }

    render(){
        return(
            <h1>News!!!</h1>
        )
    }
}