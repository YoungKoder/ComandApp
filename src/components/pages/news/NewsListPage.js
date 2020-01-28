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
        .then(newsData => this.setState({ newsList: newsData[0] }))
        .catch(error => console.error(error))
    }

    deleteNews = (event, newsItemId = '') => {
        News.delete(newsItemId)
        .then(newsList => this.setState({ newsList }))
        .catch(error => console.error(error));
    }

    viewNewsItem = (newsItemId) => {
        window.location.href += '?id=' + newsItemId;
    }

    init = () => {
        Promise.all([User.hasAdministrativePermissions(), News.get()])
        .then(result => this.setState({
            hasAdministrativePermissions: result[0],
            newsList: result[1] || {}
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
                <div className={classes['news-list']}> 
                    <div className={classes['news-list__controls']}>
                        <Button onClick={this.addNewsItem}>Add</Button>
                        {
                            this.state.hasAdministrativePermissions
                            ? <Button onClick={this.deleteNews}>Delete All</Button>
                            : null
                        }
                    </div>
                    <div className={classes['news-list__items']}>
                        { 
                            this.state.isLoading 
                            ? <div>Loading...</div> 
                            : Object.keys(this.state.newsList).map(newsItemid => {console.log('KEYS IS ',newsItemid );
                                return <NewsItem key={newsItemid}
                                                 appendClassName="list-item"
                                                 hasAdministrativePermissions={this.state.hasAdministrativePermissions}
                                                 data={this.state.newsList[newsItemid]}
                                                 controls={[
                                                    <Button key={newsItemid + 1} customClass={classes['news-item__button']} 
                                                            onClick={() => this.viewNewsItem(newsItemid)}>
                                                            View
                                                    </Button>,
                                                    this.state.hasAdministrativePermissions
                                                    ? <Button key={newsItemid + 2} customClass={classes['news-item__button']} 
                                                                onClick={() => this.deleteNews(null, newsItemid)}>
                                                                Delete
                                                      </Button>
                                                    : null
                                                 ]}
                                        />
                            })
                        }
                    </div>
                </div>
            </>
        );
    }
}