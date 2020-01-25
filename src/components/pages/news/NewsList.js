import React from "react";

import Button from "../../common/Button/Button";
import classes from "./NewsList.module.css";

export default function NewsList(props) {
    console.log('newslist props are ', props);
    const NewsItem = props.NewsItem;
    const addNewsItem = props.addNewsItemFunction;
    return (
        <>
            {/* {<props.NewsItem />} */}
            <div className={classes['news__controls']}>
                <Button onClick={
                    () => addNewsItem()
                          .then(newsId => console.log('new news id ', newsId))
                          .catch(error => console.log(error))
                }>Add</Button>
            </div>
            {/* <div className={classes['news__list']}>{<NewsItem />}{<NewsItem />}</div> */}
            <div className={classes['news__list']}>{<NewsItem />}{<NewsItem />}</div>
        </>
    );
}