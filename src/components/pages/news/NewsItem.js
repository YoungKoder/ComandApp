import React from "react";
import Input from "../../common/Input/input";

import classes from "./NewsItem.module.css";

export default function NewsItem(props) {
    let itemClassName = classes['news-item'];
    props.appendClassName && props.appendClassName.split(' ').forEach((className) => {
        if (classes[className]) itemClassName += ' ' + classes[className];
    });
    return (
        <>
            <div className={itemClassName}>
                <div className={classes['news-item__data']}>
                    <Input name="title" 
                           value={props.data.title} 
                           customClass={classes['news-item__title']}
                           onChange={props.handleInputChange || (() => {})}
                    />
                    <textarea className={classes['news-item__description']} 
                              name="description"
                              value={props.data.description}
                              onChange={props.handleInputChange || (() => {})}>
                    </textarea>
                    <div className={classes['news-item__media']}>
                        <img className={classes['news-item__image']} src={props.data.image} />
                        <input type="file" className={classes['news-item__uploader']} />
                    </div>
                </div>
                <div className={classes['news-item__controls']}>
                    {props.controls}
                </div>
            </div>
        </>
    );
}