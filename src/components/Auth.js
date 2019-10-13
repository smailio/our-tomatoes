import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Grid } from "@material-ui/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import store from "../store.js";
import connect from "react-redux/es/connect/connect";
import CircularProgress from "@material-ui/core/CircularProgress";

let token;
let user;

function setUser(user) {
  console.log("setUser", user);
  store.dispatch({ type: "FETCH_USER_SUCCESS", ...user });
}

function signInWithGoogle() {
  store.dispatch({ type: "FETCH_USER" });
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      // In memory persistence will be applied to the signed in Google user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
      return firebase.auth().signInWithPopup(provider);
    })
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      token = result.credential.accessToken;
      // The signed-in user info.
      user = result.user;
      console.log("auth success", { token, user });
      if (user) {
        const uid = user.uid;
        const email = user.email;
        const display_name = user.displayName;
        console.log("User is signed in." + uid);
        setUser({
          uid,
          display_name,
          email
        });
      } else {
        store.dispatch({ type: "FETCH_USER_ERROR" });
        console.log("User is signed out.");
      }

      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.error({
        errorCode,
        errorMessage,
        email,
        credential
      });
      store.dispatch({ type: "FETCH_USER_ERROR" });
      // ...
    });
}

const Auth = ({ fetchingConnectionState }) => {
  if (fetchingConnectionState) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ marginTop: "20vh" }}
        spacing={8}
      >
        <Grid item xs={12} style={{ margin: 20 }}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ marginTop: "20vh" }}
      spacing={8}
    >
      <Grid item xs={12}>
        <GoogleLoginButton onClick={signInWithGoogle} />
      </Grid>
    </Grid>
  );
};

const AuthContainer = connect(state => ({
  fetchingConnectionState: state.user.fetchingConnectionState
}))(Auth);

export default AuthContainer;
