import { createStore, combineReducers, applyMiddleware } from "redux";
// Logger with default options
import logger from "redux-logger";
import { TOMATO_TIME, BREAK_TIME } from "./constants";

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
  tomato_id: null,
  start_time: null,
  duration: null,
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
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        tomato_id: action.tomato_id,
        start_time: action.start_time,
        is_on: action.is_on
      };
    default:
      return state;
  }
}

function other_guys_tomatoes(state = {}, action) {
  switch (action.type) {
    case "GET_OTHER_GUY_TOMATO":
      return {
        ...state,
        [action.uid]: {
          is_loading: true,
          not_found: false
        }
      };
    case "GET_OTHER_GUY_TOMATO_SUCCESS":
      return {
        ...state,
        [action.uid]: {
          ...action.tomato,
          is_loading: false,
          not_found: false
        }
      };
    case "GET_OTHER_GUY_TOMATO_FAILED":
      return {
        ...state,
        [action.uid]: {
          is_loading: false,
          not_found: true
        }
      };
    default:
      return state;
  }
}
const reducer = combineReducers({
  user,
  my_tomato,
  other_guys_tomatoes
});

// const store = createStore(reducer, applyMiddleware(enqueueNotification));
const store = createStore(reducer, applyMiddleware(logger));
export default store;
