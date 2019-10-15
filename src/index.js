import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "typeface-roboto";
import * as firebase from "firebase/app";
import store from "./store";
import { Provider } from "react-redux";
import { get_tomato } from "./db";
import { BrowserRouter as Router } from "react-router-dom";

// firebase.initializeApp(firebaseConfig);
store.dispatch({ type: "FETCH_USER" });
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const uid = user.uid;
    const email = user.email;
    const display_name = user.displayName;
    console.log("User is signed in." + uid);
    get_tomato(uid).then(tomato => {
      console.log("get tomato ", tomato);
      store.dispatch({
        type: "FETCH_USER_SUCCESS",
        uid,
        email,
        display_name
      });
      store.dispatch({
        type: "START_TOMATO",
        ...tomato
      });
    });
  } else {
    // No user is signed in.
    store.dispatch({ type: "FETCH_USER_ERROR" });
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
