import React, { Component } from 'react';
import {connect} from 'react-redux';
import { User, Events } from "../../../api/fakeApi";

class EventsAdding extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.getTitle.value;
        const date =  this.getDate.value;
        const startTime =  this.getStartTime.value;
        const endTime =  this.getEndTime.value;
        const allDayEvent =  this.getAllDayEvent.checked;
        const data = {
          id: new Date(),
          title,
          date,
          startTime,
          endTime,
          allDayEvent,
          editing:false
        }
        
        Events.add(data)
        this.props.dispatch({
            type:'ADD_EVENT',
            data,
          });
         }
    
render() {
  
return (
<div className="post-">
  <h1 className="post_heading">Create Post</h1>
  <form className="form" onSubmit={this.handleSubmit}>
   <input required type="text" ref={(input)=>this.getTitle = input} placeholder="Enter Event  Title" /><br /><br />
   <input type="date" ref={(input)=>this.getDate = input}/><br /><br />
   <p>Start</p>
   <input className = "time" type="time" ref={(input)=>this.getStartTime = input} /><br /><br />
   <p>End</p>
   <input className = "time" type="time"  ref={(input)=>this.getEndTime = input} /><br /><br />
   <span>All day Event</span>
   <input type="checkbox" onClick ={()=> this.getAllDayEvent.checked ? (document.querySelectorAll(".time").forEach(e=>{e.disabled = true})) : (document.querySelectorAll(".time").forEach(e=>{e.disabled = false}))} ref={(input)=>this.getAllDayEvent = input} /><br /><br />
   
   <button>Post</button>
  </form>
</div>
);
}
}
export default connect()( EventsAdding);