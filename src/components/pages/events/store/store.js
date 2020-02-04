import { createStore } from 'redux';
import EventsAddingReducer from '../reducers/EventsAddingReducer';
import { User, Events } from "../../../../api/fakeApi";   

export const store = createStore(EventsAddingReducer);

