import React from "react";

import Button from "../../common/Button/Button";
import classes from "./NewsList.module.css";

export default function NewsList(props) {
    const NewsItem = props.NewsItem;
    return (
        <>
            {/* {<props.NewsItem />} */}
            <div className={classes['news__controls']}><Button>Add</Button></div>
    <div className={classes['news__list']}>{<NewsItem />}{<NewsItem />}</div>
        </>
    );
}