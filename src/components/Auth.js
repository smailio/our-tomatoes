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
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";

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
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ margin: 0, width: "100%" }}
        spacing={8}
      >
        <Route path="/:uid">
          <Grid item md={12}>
            <OtherGuyPagePublic />

            <Divider inset style={{ marginTop: "2vh" }} />
          </Grid>
        </Route>
        <Grid item md={10}>
          <Typography variant="h2" style={{ textAlign: "center" }}>
            Our tomatoes
          </Typography>
        </Grid>

        <Grid item md={10}>
          <Typography variant="h5">
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
        <Grid item md={7}>
          <Card raised>
            <CardHeader
              title="FREE"
              subheader="Most popular"
              style={{ textAlign: "center" }}
            />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText alignItems="flex-start">
                    {"🍅"} Manage your time with a tomato timer
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText alignItems="flex-start">
                    {"😒"} Let the people who bothers you know you're busy by
                    sharing your page's link
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText alignItems="flex-start">
                    {"👀"} Watch if your friend is working on something
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText alignItems="flex-start">
                    {"📊"} Have statistics on your progress
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText alignItems="flex-start">
                    {" "}
                    {"👨‍💻"} Don't trust us with your data ? Fine, this website is
                    <a
                      style={{ marginLeft: "0.5em", marginRight: "0.5em" }}
                      href="https://github.com/smailio/our-tomatoes"
                    >
                      open source
                    </a>
                    feel free to fork it and manage your own data
                  </ListItemText>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
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
