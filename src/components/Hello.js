import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import MyPage from "./MyPage";
import OtherGuyPage from "./OtherGuyPage";
import { useObserveFollowing } from "../useObserveFollowing";
import { Grid } from "@material-ui/core";

const Hello = ({ uid }) => {
  useObserveFollowing();
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
        <Switch>
          <Route path={`/${uid}`}>
            <MyPage />
          </Route>
          <Route path="/:uid">
            <OtherGuyPage />
          </Route>
          <Route path="/">
            <Redirect to={{ pathname: `/${uid}` }} />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
};

const HelloContainer = connect(state => ({
  display_name: state.user.display_name,
  uid: state.user.uid
}))(Hello);

export default HelloContainer;
