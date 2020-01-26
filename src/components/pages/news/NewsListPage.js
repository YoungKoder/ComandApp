import React from "react";
import { News } from "../../../api/fakeApi";
import Button from "../../common/Button/Button";
import NewsItem from "./NewsItem";

import classes from "./NewsListPage.module.css";

export default class NewsListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            newsList: {}
        };
    }

    addNewsItem = () => {
        News.add()
        .then(newsData => {
            console.log('newsList is ', newsData[0]);
            this.setState({newsList: newsData[0]}, () => console.log('this state is ', this.state.newsList));
        })
        .catch(error => console.log(error))
    }

    deleteNews = (event, newsItemId = '') => {
        console.log('newsItemId', newsItemId);
        News.delete(newsItemId)
        .then(newsList => this.setState({ newsList }))
        .catch(error => console.log(error));
    }

    getNewsList = () => {
        News.get()
        .then(newsList => newsList && this.setState({ newsList }))
        .catch(error => console.log(error))
        .finally(() => this.setState({ isLoading:false }));
    }

    componentDidMount() {
        this.getNewsList();
    }

    render() {
        return (
            <>   
                <div className={classes['news__controls']}>
                    <Button onClick={this.addNewsItem}>Add</Button>
                    <Button onClick={this.deleteNews}>Delete All</Button>
                </div>
                <div className={classes['news__list']}>
                    { 
                        this.state.isLoading 
                        ? <div>Loading...</div> 
                        : Object.keys(this.state.newsList).map(newsItemid => {
                                return <NewsItem key={newsItemid} data={this.state.newsList[newsItemid]} />
                          })
                    }
                </div>
            </>
        );
    }
}