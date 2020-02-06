import {createStore} from 'redux';
import eventReducer from '../reducers/eventReducer';
let initialState = [{id: new Date(),
    title:"sad",
    date:"12",
    startTime:"12",
    endTime:"12",
    allDayEvent:"12",
    editing:false}]
if( localStorage.getItem("events2") === null)
localStorage.setItem('events2',JSON.stringify(initialState));
else 
initialState = JSON.parse(localStorage.getItem('events2'));

export const store = createStore(eventReducer,initialState);
