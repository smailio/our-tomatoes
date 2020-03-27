import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Grid } from "@material-ui/core";
import "firebase/auth";
import connect from "react-redux/es/connect/connect";
import CircularProgress from "@material-ui/core/CircularProgress";
import signInWithGoogle from "../signinWithGoogle";
import { Route } from "react-router-dom";
import OtherGuyPagePublic from "./OtherGuyPagePublic";
import Typography from "@material-ui/core/Typography/Typography";

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
    <div style={{ marginTop: "15vh" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ margin: 0, width: "100%" }}
        spacing={8}
      >
        <Grid item xs={12}>
          <Route path="/:uid">
            <OtherGuyPagePublic />
          </Route>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5" style={{ textAlign: "center  " }}>
            Join us and start using the{" "}
            <a
              href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
              target="_blank"
            >
              pomodoro technique
            </a>{" "}
            to increase your productivity {"💪 "}
          </Typography>{" "}
        </Grid>
        <Grid item xs={6}>
          <GoogleLoginButton onClick={handleOnClickSignIn} />
        </Grid>
      </Grid>
    </div>
  );
};

const AuthContainer = connect(state => ({
  fetchingConnectionState: state.user.fetchingConnectionState
}))(Auth);

export default AuthContainer;
