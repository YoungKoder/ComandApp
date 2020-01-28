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
        this.setState({ isLoading:true });
        News.update(this.props.requestNewsItemId, this.state.newsItem)
        .catch(error => console.error(error))
        .finally(() => this.setState({ isLoading:false }))
    }

    discardChanges = () => {
        this.setState({ newsItem: this.state.initialNewsItem });
    }

    delete = () => {
        this.setState({ isLoading:true });
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
        .finally(() => this.setState({ isLoading: false }));
    }

    componentDidMount() {
        this.init();
    }

    render() {
        const doesItemExist = Boolean(Object.keys(this.state.newsItem).length);
        return (
            <>
                {
                    this.state.isLoading
                    ? <div>Loading...</div>
                    : doesItemExist 
                      ? <NewsItem key={this.props.requestNewsItemId} 
                                  appendClassName="single-item"
                                  hasAdministrativePermissions={this.state.hasAdministrativePermissions}
                                  data={this.state.newsItem}
                                  controls={
                                    this.state.hasAdministrativePermissions
                                    ? <><Button onClick={this.saveChanges}>Save</Button>
                                      <Button onClick={this.discardChanges}>Discard</Button>
                                      <Button onClick={this.delete}>Delete</Button></>
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