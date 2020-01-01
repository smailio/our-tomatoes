import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "typeface-roboto";
import * as firebase from "firebase/app";
import store from "./store";
import { Provider } from "react-redux";
import { observe_tomato } from "./db";
import { BrowserRouter as Router } from "react-router-dom";

// firebase.initializeApp(firebaseConfig);
store.dispatch({ type: "FETCH_USER" });
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const uid = user.uid;
    const email = user.email;
    const display_name = user.displayName;
    console.log("User is signed in." + uid);
    observe_tomato(uid, tomato => {
      console.log("get tomato ", tomato);
      store.dispatch({
        type: "FETCH_USER_SUCCESS",
        uid,
        email,
        display_name
      });
      if (!tomato) {
        console.log(
          "tomato doesn't exist yet in database, this is the" +
            " first time the user connect or something bad happened"
        );
        return;
      }
      // if tomato is still valid start it
      const now = new Date();
      if (
        now.getTime() <
        tomato.start_time.getTime() + tomato.duration * 60 * 1000
      ) {
        store.dispatch({
          type: "START_TOMATO",
          ...tomato
        });
      } else {
        console.log(
          `
          Tomato finish time is   ${tomato.end_time} 
          and the current time is ${now} so there is no point to start it`,
          tomato,
          tomato.start_time.getTime(),
          tomato.duration
        );
      }
    });
  } else {
    // No user is signed in.
    console.error("Dunno why the user is undefined at this point", user);
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
