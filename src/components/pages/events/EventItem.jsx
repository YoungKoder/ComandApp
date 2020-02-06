import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { User, News } from "../../../api/fakeApi";


export default class EventItem extends Component {
  constructor(props)
  {
    super(props);
    this.state ={isEdit:false}
    this.editEvent = this.editEvent.bind(this);
    this.editEventSubmit = this.editEventSubmit.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.hasAdministrativePermissions= false
  } 
  
  

  deleteEvent()
  {
    const {id} = this.props.event;
this.props.deleteEvent(id);
  }
  editEvent()
  {
    this.setState((prevState,props) => ({
      isEdit : !prevState.isEdit
    }))
  }
  
  editEventSubmit()
  {
    this.setState((prevState,props) => ({
      isEdit : !prevState.isEdit
    }));
    
    this.props.editEventSubmit(this.props.event.id,this.nameInput.value,this.dateInput.value,this.startTimeInput.value,this.endTimeInput.value,this.allDayEventInput.checked);
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
        
        const {title,date,startTime,endTime,allDayEvent} = this.props.event;
        console.log(this.state.hasAdministrativePermissions)
      return (
        this.state.hasAdministrativePermissions?(
        this.state.isEdit === true ? 
        
        <tr className="bg-warning" key={this.props.index}><td><input ref={nameInput => this.nameInput = nameInput}  defaultValue ={title} required/></td><td><input type="date" min="2020-01-01" max="2022-12-31"  defaultValue={date} ref={dateInput => this.dateInput = dateInput}/></td><td><input className ="time"  type="time" min="09:00" max="18:00" required ref={startTimeInput => this.startTimeInput = startTimeInput} defaultValue={startTime}/></td><td><input  className ="time" type="time" ref={endTimeInput => this.endTimeInput = endTimeInput} defaultValue ={endTime}/></td><td><input id = "checkbox" type="checkbox" onClick ={()=> this.allDayEventInput.checked ? (document.querySelectorAll(".time").forEach(e=>{e.disabled = true;})) : (document.querySelectorAll(".time").forEach(e=>{e.disabled = false}))} ref={allDayEventInput => this.allDayEventInput = allDayEventInput} /></td><td><i className="far fa-save" onClick={this.editEventSubmit}></i></td><td><i className="fas fa-trash"></i></td></tr>
 :
        
      <tr key={this.props.index}><td>{title}</td><td>{date}</td><td>{allDayEvent? "7.00": startTime}</td><td>{allDayEvent?"All DAY!":endTime}</td><td>{allDayEvent?"Yeah":"Nope"}</td><td><i className="far fa-edit" onClick={this.editEvent}></i></td><td><i className="fas fa-trash" onClick={this.deleteEvent}></i></td></tr>
        ):
      <tr key={this.props.index}><td>{title}</td><td>{date}</td><td>{allDayEvent? "7.00": startTime}</td><td>{allDayEvent?"All DAY!":endTime}</td><td>{allDayEvent?"Yeah":"Nope"}</td></tr>
      );
    }
  }
 
  