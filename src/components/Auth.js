import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Grid } from "@material-ui/core";
import "firebase/auth";
import connect from "react-redux/es/connect/connect";
import CircularProgress from "@material-ui/core/CircularProgress";
import signInWithGoogle from "../signinWithGoogle";
import { Route } from "react-router-dom";
import OtherGuyPagePublic from "./OtherGuyPagePublic";

function handleOnClickSignIn() {
  signInWithGoogle();
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
        <Route path="/:uid">
          <OtherGuyPagePublic />
        </Route>
      </Grid>
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
