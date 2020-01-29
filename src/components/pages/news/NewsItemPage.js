import React from "react";
import { User, News } from "../../../api/fakeApi";
import Button from "../../common/Button/Button";
import NewsItem from "./NewsItem";

import classes from "./NewsItemPage.module.css";

export default class NewsItemPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            componentIsLoading: true,
            hasAdministrativePermissions: false,
            newsItem: {},
            initialNewsItem: {}
        };
    }

    handleInputChange = event => {
        this.setState({
            newsItem: {
                ...this.state.newsItem,
                [event.target.name]: event.target.value 
            }
        });
    }

    saveChanges = () => {
        this.setState({ componentIsLoading:true });
        News.update(this.props.requestNewsItemId, this.state.newsItem)
        .catch(error => console.error(error))
        .finally(() => this.setState({ componentIsLoading:false }))
    }

    discardChanges = () => {
        this.setState({ newsItem: this.state.initialNewsItem });
    }

    delete = () => {
        this.setState({ componentIsLoading:true });
        News.delete(this.props.requestNewsItemId)
        .then(() => window.history.back())
        .catch(error => console.error(error));
    }

    init = () => {
        Promise.all([User.hasAdministrativePermissions(), News.get(this.props.requestNewsItemId)])
        .then(result => this.setState({
            hasAdministrativePermissions: result[0],
            newsItem: result[1],
            initialNewsItem: result[1]
        }))
        .catch(error => console.error(error))
        .finally(() => this.setState({ componentIsLoading: false }));
    }

    componentDidMount() {
        this.init();
    }

    render() {
        const doesItemExist = Boolean(Object.keys(this.state.newsItem).length);
        return (
            <>
                {
                    this.state.componentIsLoading
                    ? <div>Loading...</div>
                    : doesItemExist 
                      ? <NewsItem key={this.props.requestNewsItemId} 
                                  appendClassName="single-item"
                                  hasAdministrativePermissions={this.state.hasAdministrativePermissions}
                                  data={this.state.newsItem}
                                  mediaControls={
                                    this.state.hasAdministrativePermissions
                                    ? <input type="file" className={classes['news-item__uploader']} />
                                    : null
                                  }
                                  itemControls={
                                    this.state.hasAdministrativePermissions
                                    ? <>
                                        <Button customClass={classes['news-item__button']} 
                                                onClick={this.saveChanges}>
                                                Save
                                        </Button>
                                        <Button customClass={classes['news-item__button']} 
                                                onClick={this.discardChanges}>
                                                Discard
                                        </Button>
                                        <Button customClass={classes['news-item__button']} 
                                                onClick={this.delete}>
                                                Delete
                                        </Button>
                                      </>
                                    : null
                                  }
                                  handleInputChange={this.handleInputChange}
                        />
                      : <div>Requested news was not found</div>
                }
            </>
        );
    }
}