import React from "react";
import { connect } from "react-redux";
import ControlPanel from "./ControlPanel";
import MyTomato from "./MyTomato";
import { Switch, Route, useParams } from "react-router-dom";

const MyPage = () => {
  return (
    <div>
      <MyTomato />
      <ControlPanel />
    </div>
  );
};

const OtherGuyPage = () => {
  let { id } = useParams();
  return <h3>{id}</h3>;
};

const Hello = () => {
  return (
    <Switch>
      <Route path="/:id">
        <OtherGuyPage />
      </Route>
      <Route path="/">
        <MyPage />
      </Route>
    </Switch>
  );
};

const HelloContainer = connect(state => ({
  display_name: state.user.display_name
}))(Hello);

export default HelloContainer;
