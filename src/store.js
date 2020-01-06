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
        photo_url: action.photo_url,
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
  is_on: false
};

function my_tomato(state = default_timer, action) {
  switch (action.type) {
    case "GET_TOMATO_SUCCESS":
      return {
        ...state,
        tomato_id: action.tomato_id,
        start_time: action.start_time,
        is_on: true,
        duration: action.duration,
        type: "TOMATO",
        tomato_type: action.tomato_type
      };
    case "STOP_TOMATO":
      return default_timer;
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

function following(user_ids = [], action) {
  switch (action.type) {
    case "SET_FOLLOWING":
      return action.user_ids;
    default:
      return user_ids;
  }
}

function personal_info(state = {}, action) {
  switch (action.type) {
    case "SET_PERSONAL_INFO":
      const personal_info_by_uid = {};
      for (let personal_info of action.personal_info_list) {
        personal_info_by_uid[personal_info.uid] = personal_info;
      }
      return personal_info_by_uid;
    default:
      return state;
  }
}

const reducer = combineReducers({
  user,
  my_tomato,
  other_guys_tomatoes,
  following,
  personal_info
});

// const store = createStore(reducer, applyMiddleware(enqueueNotification));
const store = createStore(reducer, applyMiddleware(logger));
export default store;
