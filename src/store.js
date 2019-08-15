import { createStore, combineReducers, applyMiddleware } from "redux";
// Logger with default options
import logger from "redux-logger";

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

function currentRoom(
  state = {
    roomLoaded: false,
    roomNotFound: false,
    error: false
  },
  action
) {
  switch (action.type) {
    case "SET_ROOM":
      return {
        ...state,
        roomLoaded: true,
        ...action.room
      };
    case "ROOM_NOT_FOUND":
      return {
        ...state,
        roomLoaded: true,
        roomNotFound: true
      };
    case "ROOM_ERROR":
      return {
        ...state,
        error: true
      };
    case "START_GAME_REQUEST":
      return {
        ...state,
        gameIsStarting: true
      };
    case "START_GAME_SUCCESS":
    case "START_GAME_FAILURE":
      return {
        ...state,
        gameIsStarting: false
      };
    case "CLEAR_ROOM":
      return {
        roomLoaded: false,
        roomNotFound: false,
        error: false
      };
    default:
      return state;
  }
}

function showJoinRoomSpinner(state = false, action) {
  switch (action.type) {
    case "JOINING_ROOM":
      return true;
    default:
      return false;
  }
}

const reducer = combineReducers({
  user,
  currentRoom
});

// const store = createStore(reducer, applyMiddleware(enqueueNotification));
const store = createStore(reducer, applyMiddleware(logger));
export default store;
