import React from "react";
import { User, News } from "../../../api/fakeApi";
import Button from "../../common/Button/Button";
import NewsItem from "./NewsItem";

import classes from "./NewsListPage.module.css";

export default class NewsListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            hasAdministrativePermissions: false,
            newsList: {}
        };
    }

    addNewsItem = () => {
        News.add()
        .then(newsData => {
            console.log('newsList is ', newsData[0]);
            this.setState({ newsList: newsData[0] }, () => console.log('this state is ', this.state.newsList));
        })
        .catch(error => console.log(error))
    }

    deleteNews = (event, newsItemId = '') => {
        News.delete(newsItemId)
        .then(newsList => this.setState({ newsList }))
        .catch(error => console.error(error));
    }

    init = () => {
        Promise.all([User.hasAdministrativePermissions(), News.get()])
        .then(result => this.setState({
            hasAdministrativePermissions: result[0],
            newsList: result[1]
        }))
        .catch(error => console.error(error))
        .finally(() => this.setState({ isLoading: false }));
    }

    componentDidMount() {
        this.init();
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
                                return <NewsItem key={newsItemid}
                                                 appendClassName="list-item"
                                                 hasAdministrativePermissions={this.state.hasAdministrativePermissions}
                                                 data={this.state.newsList[newsItemid]} 
                                       />
                          })
                    }
                </div>
            </>
        );
    }
}