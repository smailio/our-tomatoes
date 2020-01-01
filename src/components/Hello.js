import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import MyPage from "./MyPage";
import OtherGuyPage from "./OtherGuyPage";
import { useObserveFollowing } from "../useObserveFollowing";

const Hello = ({ uid }) => {
  useObserveFollowing();
  return (
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
  );
};

const HelloContainer = connect(state => ({
  display_name: state.user.display_name,
  uid: state.user.uid
}))(Hello);

export default HelloContainer;
