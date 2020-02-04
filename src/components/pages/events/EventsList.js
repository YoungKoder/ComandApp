import React, { Component } from 'react';
import Event from './Event'
import { connect } from 'react-redux';
import EventEditing from './EventEditing';
class EventsList extends Component {
  
  render() {
    
    console.log(this.props.events)
    return (
      <div>
      <h1 className="post_heading">All Posts</h1>
      {this.props.events.map((event) => (
          <div key={event.id}>
              {event.editing ? <EventEditing event={event} key={event.id} /> :
                  <Event key={event.id} event={event} />}
          </div>
      ))}
  </div>

    );
   }
}
const mapStateToProps = (state) => {
  
  return {
      events: state
      
  }
 
}

export default connect(mapStateToProps)(EventsList);