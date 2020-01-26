import React from "react";
import { News } from "../../../api/fakeApi";
import Button from "../../common/Button/Button";
import NewsItem from "./NewsItem";

export default class NewsItemPage extends React.Component {
    render() {
        console.log('newsitempage props are ', this.props);
        // const NewsItem = this.props.NewsItem;
        // const addNewsItem = this.props.addNewsItemFunction;
        return (
            <>
                {/* {<props.NewsItem />} */}
                <NewsItem />
            </>
        );
    }
}