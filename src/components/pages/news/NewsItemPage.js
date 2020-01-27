import React from "react";
import { User, News } from "../../../api/fakeApi";
import Button from "../../common/Button/Button";
import NewsItem from "./NewsItem";

export default class NewsItemPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            hasAdministrativePermissions: false,
            newsItem: {}
        };
    }

    init = () => {
        Promise.all([User.hasAdministrativePermissions(), News.get(this.props.requestNewsItemId)])
        .then(result => this.setState({
            hasAdministrativePermissions: result[0],
            newsItem: result[1]
        }))
        .catch(error => console.error(error))
        .finally(() => this.setState({ isLoading: false }));
    }

    componentDidMount() {
        this.init();
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
                                  hasAdministrativePermissions={this.state.hasAdministrativePermissions}
                                  data={this.state.newsItem}
                                  controls={
                                    this.state.hasAdministrativePermissions
                                    ? <><Button>Save</Button>
                                      <Button>Cancel</Button>
                                      <Button>Delete</Button></>
                                    : null
                                  }
                        />
                      : <div>Requested news was not found</div>
                }
            </>
        );
    }
}