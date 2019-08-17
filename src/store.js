import { createStore, combineReducers, applyMiddleware } from "redux";
// Logger with default options
import logger from "redux-logger";
const TOMATO_TIME = 1;
const BREAK_TIME = 5;

function user(
  state = {
    uid: "",
    isConnected: false,
    fetchingConnectionState: false
  },
  action
) {
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        uid: action.uid,
        display_name: action.display_name,
        email: action.email,
        isConnected: true,
        fetchingConnectionState: false
      };
    case "FETCH_USER":
      return {
        fetchingConnectionState: true
      };
    case "FETCH_USER_ERROR":
      return {
        fetchingConnectionState: false
      };
    default:
      return state;
  }
}

const default_timer = {
  tomato_id: undefined,
  start_time: undefined,
  duration: undefined,
  is_on: false
};
function my_tomato(state = default_timer, action) {
  switch (action.type) {
    case "START_TOMATO":
      return {
        ...state,
        tomato_id: action.tomato_id,
        start_time: action.start_time,
        is_on: true,
        duration: TOMATO_TIME
      };
    case "START_BREAK":
      return {
        ...state,
        tomato_id: "break",
        start_time: action.start_time,
        is_on: true,
        duration: BREAK_TIME
      };
    case "STOP_TOMATO":
    case "STOP_BREAK":
      return {
        ...state,
        ...default_timer
      };
    default:
      return state;
  }
}

const reducer = combineReducers({
  user,
  my_tomato
});

// const store = createStore(reducer, applyMiddleware(enqueueNotification));
const store = createStore(reducer, applyMiddleware(logger));
export default store;
