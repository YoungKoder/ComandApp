import React from "react";
import Input from "../../common/Input/input";
import classes from "./NewsItem.module.css";

export default function NewsItem(props) {
    let itemClassName = classes.item;
    props.appendClassName && props.appendClassName.split(' ').forEach((className) => {
            if (classes[className]) itemClassName += ' ' + classes[className];
    });

    return (
        <>
            <div className={itemClassName}>
                <div className={classes.data}>
                    <Input name="title" value={props.data.title} />
                    <textarea name="description">{props.data.description}</textarea>
                    <div className={classes.media}></div>
                </div>
                <div className={classes.controls}>
                    <img src={props.data.image} />
                </div>
            </div>
        </>
    );
}