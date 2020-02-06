import React, { Component } from 'react';

import './EventsPage.css';
import EventList from './EventList.jsx';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {addEvent,deleteEvent,updateEvent} from './actions/eventActions'
import { PropTypes } from 'prop-types';

import Navbar from "../../layout/navbar/Navbar";
import Button from "../../common/Button/Button";
import Sidebar from "../../layout/sidebar/Sidebar";
import { User, News } from "../../../api/fakeApi";

class EventsPage extends Component {
  constructor(props)
  {
    super(props);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.editEventSubmit = this.editEventSubmit.bind(this);
    this.state= {hasAdministrativePermissions:false}
    
  }
  
  addNewEvent()
  {this.props.addEvent({id:new Date(),title:'',date:'',startTime:"",endTime:'',allDayEvent: Boolean()});
  }
 

  deleteEvent(id)
  {
      console.log(id)
    let r = window.confirm("Do you want to delete this item");
    if( r === true)
    {
    this.props.deleteEvent(id);
   
  }
  }
  editEventSubmit(id,title,date,startTime,endTime,allDayEvent)
  {
this.props.updateEvent({id:id,title:title,date:date,startTime:startTime,endTime:endTime,allDayEvent:allDayEvent});
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
    console.log(this.state)
    return (
      <>
      <Navbar/>
      <div className="content">
        <Sidebar/>

        <main className="event">
           {this.state.hasAdministrativePermissions?
      <div className="container-fluid">
      <div className="row mt-3"><div className="col-lg-12">
      <div className="card">
  <div className="card-header">
    Events List
  </div>
  <div className="card-body">
  <table className="table table-hover">
   
         <thead className="thead-dark"><tr><th>Title</th><th>Date</th><th>Start Time</th> <th>End Time</th> <th>Full Day Event</th><th>Edit/Save</th><th>Delete</th></tr></thead>
          <EventList deleteEvent={this.deleteEvent} EventList={this.props.eventList} editEventSubmit={this.editEventSubmit}/>
        </table>
        <Button className="btn btn-dark pull-left" onClick={this.addNewEvent}>Add New</Button>
      </div></div></div></div></div>
      :
      <table className="table table-hover">
  
         <thead className="thead-dark"><tr><th>Title</th><th>Date</th><th>Start Time</th> <th>End Time</th> <th>Full Day Event</th></tr></thead>
          <EventList deleteEvent={this.deleteEvent} EventList={this.props.eventList} editEventSubmit={this.editEventSubmit}/>
        </table>
      
  }
    </main>
      </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    eventList : state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addEvent:addEvent,
    deleteEvent:deleteEvent,
    updateEvent:updateEvent
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EventsPage);
