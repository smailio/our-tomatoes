import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import MyPage from "./MyPage";
import OtherGuyPage from "./OtherGuyPage";
import { useObserveFollowing } from "../useObserveFollowing";
import { Grid } from "@material-ui/core";
import StatisticsPage from "./StatisticsPage";

const Hello = ({ uid }) => {
  useObserveFollowing();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={0}
    >
      <Switch>
        <Route path={`/${uid}/statistics`}>
          <Grid item xs={12}>
            <StatisticsPage />
          </Grid>
        </Route>

        <Route path={`/${uid}`}>
          <Grid item xs={8}>
            <MyPage />
          </Grid>
        </Route>
        <Route path="/:uid">
          <Grid item xs={8}>
            <OtherGuyPage />
          </Grid>
        </Route>
        <Route path="/">
          <Redirect to={{ pathname: `/${uid}` }} />
        </Route>
      </Switch>
    </Grid>
  );
};

const HelloContainer = connect(state => ({
  display_name: state.user.display_name,
  uid: state.user.uid
}))(Hello);

export default HelloContainer;
