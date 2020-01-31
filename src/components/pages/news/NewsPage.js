import React from "react";
import PropTypes from 'prop-types';
import Navbar from "../../layout/navbar/Navbar";
import Sidebar from "../../layout/sidebar/Sidebar";
import NewsItemPage from "./NewsItemPage";
import NewsListPage from "./NewsListPage";

import classes from "./NewsPage.module.css";

export default function NewsPage(props) {
    const newsIdQueryParameter = new URLSearchParams(props.location.search).get('id');
    return (
        <>
            <Navbar/>
            <div className={classes.content}>
                <Sidebar/>
                <main className={classes.news}>
                    {
                        newsIdQueryParameter
                        ? <NewsItemPage requestNewsItemId={newsIdQueryParameter} />
                        : <NewsListPage />
                    }
                </main>
            </div>
        </>
    );
}

NewsPage.propTypes = {
    location: PropTypes.shape({search:PropTypes.string})
}