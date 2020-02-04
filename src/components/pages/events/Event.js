import React, { Component } from 'react';
import {connect} from 'react-redux';
class Event extends Component {
  render() {
    
   //console.log(this.props)
  return (
    <div className="post">
     
      <h2 className="post_title">{this.props.event.title}</h2>
      <p>{this.props.event.date}</p>
      <p>{this.props.event.startTime}</p>
      <p>{this.props.event.endTime}</p>
      <p>{this.props.event.allDayEvent ? "All day Event!!":null}</p>
      <div className="control-buttons">

      <button className="edit"  onClick={()=>this.props.dispatch({type:'EDIT_POST',id:this.props.event.id})}>Edit</button>
      <button className="delete"
 onClick={()=> this.props.dispatch({type:'DELETE_EVENT',id:this.props.event.id})}> Delete</button>
    </div>
    </div>
  );
 }
}
export default connect()(Event);