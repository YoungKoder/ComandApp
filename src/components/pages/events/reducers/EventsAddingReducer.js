import { User, Events } from "../../../../api/fakeApi";
//const newsJsonString = localStorage.getItem("events1");
//const news = JSON.parse(newsJsonString);1580780103413
const arr = localStorage.getItem("events") || {};
const arr1 = [];
//for (let key in localStorage.getItem("events7")){
for (let i = 0; i <= arr.length; i++) {
  console.log("/" + arr[1] + "/");
  Promise.resolve(Events.get("/" + arr[i] + "/")).then(
    function(value) {
      arr1.push(value);

      // "Success"
      // "Success"
    },
    function(error) {
      console.log(error);
    }
  );
}

console.log(arr1);
// }

const EventsAddingReducer = (state = arr1, action) => {
  switch (action.type) {
    case "ADD_EVENT":
      return state.concat([action.data]);

    case "DELETE_EVENT":
      return state.filter(event => event.id !== action.id);
    case "EDIT_POST":
      return state.map(event =>
        event.id === action.id ? { ...event, editing: !event.editing } : event
      );
    case "UPDATE":
      return state.map(event => {
        if (event.id === action.id) {
          return {
            ...event,
            title: action.data.newTitle,
            date: action.data.newDate,
            startTime: action.data.newStartTime,
            endTime: action.data.newEndTime,
            allDayEvent: action.data.newAllDayEvent,

            editing: !event.editing
          };
        } else return event;
      });
    default:
      return state;
  }
};
export default EventsAddingReducer;
