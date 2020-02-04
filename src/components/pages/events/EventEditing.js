import React, { Component } from 'react';
import { connect } from 'react-redux';


class EventEditing extends Component {
handleEdit = (e) => {
  e.preventDefault();
  
  const newTitle = this.getTitle.value;
  const newDate =  this.getDate.value;
  const newStartTime =  this.getStartTime.value;
  const newEndTime =  this.getEndTime.value;
  const newAllDayEvent =  this.getAllDayEvent.checked;
  const data = {
    newTitle,
    newDate,
    newStartTime,
    newEndTime,
    newAllDayEvent
  }
  this.props.dispatch({ type: 'UPDATE', id: this.props.event.id, data: data })
}
render() {
return (
<div className="post-container">
  <form className="form" onSubmit={this.handleEdit}>
  <input required type="text" ref={(input)=>this.getTitle = input}  defaultValue={this.props.event.title} placeholder="Enter Event  Title" /><br /><br />
   <input type="date" ref={(input)=>this.getDate = input}  defaultValue={this.props.event.date}/><br /><br />
   <p>Start</p>
   <input className ="time" type="time" ref={(input)=>this.getStartTime = input} defaultValue={this.props.event.startTime} /><br /><br />
   <p>End</p>
   <input className ="time" type="time" ref={(input)=>this.getEndTime = input} defaultValue={this.props.event.endTime} /><br /><br />
   <span>All day Event</span>
   <input type="checkbox" onClick ={()=> this.getAllDayEvent.checked ? (document.querySelectorAll(".time").forEach(e=>{e.disabled = true})) : (document.querySelectorAll(".time").forEach(e=>{e.disabled = false}))} ref={(input)=>this.getAllDayEvent = input} ref={(input)=>this.getAllDayEvent = input}  /><br /><br />

    <button>Update</button>
  </form>
</div>
);
}
}
export default connect()(EventEditing);