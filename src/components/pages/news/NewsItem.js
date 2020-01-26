import React from "react";
import Input from "../../common/Input/input";
import classes from "./NewsItem.module.css";

export default function NewsItem(props) {
    const itemClassName = props.className 
                          ? classes.item + ' ' + props.className
                          : classes.item;
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