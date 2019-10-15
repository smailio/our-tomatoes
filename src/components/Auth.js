import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Grid } from "@material-ui/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import store from "../store.js";
import connect from "react-redux/es/connect/connect";
import CircularProgress from "@material-ui/core/CircularProgress";
import signInWithGoogle from "../signinWithGoogle";

function handleOnClickSignIn() {
  signInWithGoogle().then(user => {
    store.dispatch({
      type: "FETCH_USER_SUCCESS",
      uid: user.uid,
      display_name: user.displayName,
      email: user.email
    });
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
        <GoogleLoginButton onClick={handleOnClickSignIn} />
      </Grid>
    </Grid>
  );
};

const AuthContainer = connect(state => ({
  fetchingConnectionState: state.user.fetchingConnectionState
}))(Auth);

export default AuthContainer;
