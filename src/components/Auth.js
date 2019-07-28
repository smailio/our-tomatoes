import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Typography, Grid } from "@material-ui/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import store from "../store.js";

const provider = new firebase.auth.GoogleAuthProvider();
let token;
let user;

// firebase.auth().onAuthStateChanged(function(_user) {
//   if (_user) {
//     // User is signed in
//     user = _user;
//   } else {
//     // No user is signed in.
//   }
// });
function setUser(user) {
  console.log("setUser", user);
  store.dispatch({ type: "SET_USER", ...user });
}

function signInWithGoogle() {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      var provider = new firebase.auth.GoogleAuthProvider();
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
        console.log("User is signed out.");
      }

      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.error({
        errorCode,
        errorMessage,
        email,
        credential
      });
      // ...
    });
}

const Auth = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ marginTop: "20vh" }}
      spacing={24}
    >
      <Grid item xs={12} style={{ margin: 20 }}>
        <Typography variant="h2">Log in</Typography>
      </Grid>
      <Grid item xs={12}>
        <GoogleLoginButton onClick={signInWithGoogle} />
      </Grid>
    </Grid>
  );
};

export default Auth;
