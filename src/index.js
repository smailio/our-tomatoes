import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "typeface-roboto";
import firebase from "@firebase/app";
import "@firebase/auth";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { add_personal_info, get_stats, observe_tomato } from "./db";
import store from "./store";

store.dispatch({ type: "FETCH_USER" });
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("onAuthStateChanged user", user);
    const uid = user.uid;
    const email = user.email;
    const display_name = user.displayName;
    const photo_url = user.photoURL;
    console.log("User is signed in." + uid);

    console.log("updating guy info in DB", uid, display_name, photo_url);
    add_personal_info(uid, display_name, photo_url);
    store.dispatch({
      type: "FETCH_USER_SUCCESS",
      uid,
      email,
      display_name,
      photo_url
    });
    observe_tomato(uid, tomato => {
      console.log("get tomato ", tomato);
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
          type: "GET_TOMATO_SUCCESS",
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
      // fetch all user tomatoes and put them in store
      // disable this as too many read are made to firebase
      // store.dispatch({ type: "GET_MY_TOMATOES" });
      // get_my_tomatoes(uid).then(my_tomatoes =>
      //   store.dispatch({ type: "GET_MY_TOMATOES_SUCCESS", my_tomatoes })
      // );
      store.dispatch({ type: "GET_STATS" });
      get_stats(uid).then(stats =>
        store.dispatch({ type: "GET_STATS_SUCCESS", stats })
      );
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
