import React from "react";
import PropTypes, { arrayOf } from 'prop-types';
import Input from "../../common/Input/input";

import classes from "./NewsItem.module.css";

export default function NewsItem({
        appendClassName,
        data,
        handleInputChange = () => {},
        hasAdministrativePermissions,
        mediaControls = null,
        itemControls
    }) {

    let itemClassName = classes['news-item'];
    appendClassName && appendClassName.split(' ').forEach((className) => {
        if (classes[className]) itemClassName += ' ' + classes[className];
    });

    return (
        <>
            <div className={itemClassName}>
                <div className={classes['news-item__data']}>
                    <Input name="title" 
                           value={data.title} 
                           customClass={`${classes['news-item__title']} ${classes['font-size--medium']}`}
                           onChange={handleInputChange}
                           disabled={!hasAdministrativePermissions}
                    />
                    <textarea className={`${classes['news-item__description']} ${classes['font-size--small']}`} 
                              name="description"
                              value={data.description}
                              onChange={handleInputChange}
                              disabled={!hasAdministrativePermissions}>
                    </textarea>
                    <div className={classes['news-item__media']}>
                        <img className={classes['news-item__image']} src={data.image} alt="er ego" />
                        {mediaControls}
                    </div>
                </div>
                <div className={classes['news-item__controls']}>
                    {itemControls}
                </div>
            </div>
        </>
    );
}

NewsItem.propTypes = {
    appendClassName: PropTypes.string,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
    handleInputChange: PropTypes.func,
    hasAdministrativePermissions: PropTypes.bool.isRequired,
    mediaControls: PropTypes.oneOfType([
        PropTypes.element, 
        arrayOf(PropTypes.element)
    ]),
    itemControls: PropTypes.oneOfType([
        PropTypes.element, 
        arrayOf(PropTypes.element)
    ])
};