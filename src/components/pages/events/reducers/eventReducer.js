const eventReducer = (state = [],action) => {

switch(action.type){

case 'ADD_EVENT':
let stateCopy = [...state,action.payload];
localStorage.setItem('events2',JSON.stringify(stateCopy));
return stateCopy

case 'DELETE_EVENT':
stateCopy = state.filter( x => x.id !== action.payload);
localStorage.setItem('events2',JSON.stringify(stateCopy));
return stateCopy
    
case 'UPDATE_EVENT':

stateCopy = state.map((event) => {
    const {id,title,date,startTime,endTime,allDayEvent} = action.payload;
    if(event.id === id)
    {
    event.title = title;
    event.date = date;
    event.startTime = startTime;
    event.endTime = endTime;
    event.allDayEvent = allDayEvent;
    }
    return event;
})
localStorage.setItem('events2',JSON.stringify(stateCopy));
return stateCopy

default:
    return state;
}

}
export default eventReducer;