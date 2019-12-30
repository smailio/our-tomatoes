import React from "react";
import { connect } from "react-redux";
import ControlPanel from "./ControlPanel";
import MyTomato from "./MyTomato";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { useGetOtherGuyTomato } from "../actions";
import { useSelector } from "react-redux";
import OtherGyTomato from "./OtherGuyTomato";

const MyPage = () => {
  return (
    <div>
      <MyTomato />
      <ControlPanel />
    </div>
  );
};

const OtherGuyPage = () => {
  let { uid } = useParams();
  useGetOtherGuyTomato(uid);
  const tomato = useSelector(state => state.other_guys_tomatoes[uid]);
  if (!tomato || tomato.is_loading) {
    return <div>loading</div>;
  }
  if (tomato.not_found) {
    return <div>This user is doesn't exists</div>;
  }
  // TODO add follow button
  return (
    <div>
      <OtherGyTomato uid={uid} />
    </div>
  );
};

const Hello = ({ uid }) => {
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
