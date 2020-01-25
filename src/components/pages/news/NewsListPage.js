import React from "react";
import { News } from "../../../api/fakeApi";
import Button from "../../common/Button/Button";
import NewsItem from "./NewsItem";

import classes from "./NewsListPage.module.css";

export default class NewsListPage extends React.Component {
    render() {
        console.log('newslistpage props are ', this.props);
        // const NewsItem = this.props.NewsItem;
        // const addNewsItem = this.props.addNewsItemFunction;
        return (
            <>
                {/* {<props.NewsItem />} */}
                <div className={classes['news__controls']}>
                    <Button onClick={
                        () => News.add()
                              .then(newsItem => console.log('new news id ', newsItem))
                              .catch(error => console.log(error))
                    }>Add</Button>
                </div>
                {/* <div className={classes['news__list']}>{<NewsItem />}{<NewsItem />}</div> */}
                <div className={classes['news__list']}>{<NewsItem />}{<NewsItem />}</div>
            </>
        );
    }
}