import React, { Component } from 'react';
import { User, News } from "../../../api/fakeApi";
import EventItem from './EventItem.jsx';

export default class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        componentIsLoading: true,
        hasAdministrativePermissions: false,
      
    };
}
  init = () => {
    Promise.all([User.hasAdministrativePermissions()])
    .then(result => this.setState({
        hasAdministrativePermissions: result[0],
        
    }))
    .catch(error => console.error(error))
    .finally(() => this.setState({ componentIsLoading: false }));
}
componentDidMount() {
  this.init();
}
    render() {
     
        let events = this.props.EventList;
        const trItem = events.map( (item,index) => <EventItem key={index} event={item} index={index} editEventSubmit={this.props.editEventSubmit} deleteEvent={this.props.deleteEvent}/>)
        const trItem1 = events.map( (item,index) => <EventItem key={index} event={item} index={index} editEventSubmit={this.props.editEventSubmit} deleteEvent={this.props.deleteEvent}/>)
      return (
       
            <tbody>{trItem}</tbody>
            
      );
    }
  }