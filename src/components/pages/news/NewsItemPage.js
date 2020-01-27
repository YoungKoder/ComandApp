import React from "react";
import { News } from "../../../api/fakeApi";
import Button from "../../common/Button/Button";
import NewsItem from "./NewsItem";

export default class NewsItemPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            newsItem: {}
        };
    }

    componentDidMount() {
        News.get(this.props.requestNewsItemId)
        .then(newsItem => this.setState({ newsItem }))
        .catch(error => console.log(error))
        .finally(() => this.setState({ isLoading: false }));
    }

    render() {
        console.log('newsitempage props are ', this.props);
        // const NewsItem = this.props.NewsItem;
        // const addNewsItem = this.props.addNewsItemFunction;
        console.log('this news item is ', this.state.newsItem);
        const newsItemId = Object.keys(this.state.newsItem)[0];
        console.log('sent data ', this.state.newsItem);
        return (
            <>
                {
                    this.state.isLoading
                    ? <div>Loading...</div>
                    : newsItemId 
                      ? <NewsItem key={newsItemId} 
                                  appendClassName="single-item"
                                  data={this.state.newsItem} 
                        />
                      : <div>Requested news was not found</div>
                }
            </>
        );
    }
}