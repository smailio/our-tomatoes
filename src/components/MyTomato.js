import React from "react";
import connect from "react-redux/es/connect/connect";
import { stop_tomato } from "../actions";
import Timer from "./Timer";
import Typography from "@material-ui/core/Typography";

function MyTomato(props) {
  return (
    <Typography variant="h1">
      <Timer {...props} />
    </Typography>
  );
}

const MyTomatoContainer = connect(
  state => ({ tomato: state.my_tomato, uid: state.user.uid }),
  dispatch => ({
    on_finish: (tomato_id, uid, is_on, is_loading) =>
      stop_tomato(dispatch, tomato_id, uid, is_on, is_loading)
  }),
  (state_props, dispatch_props, other_props) => ({
    ...other_props,
    ...state_props,
    on_finish: () =>
      dispatch_props.on_finish(
        state_props.tomato.tomato_id,
        state_props.uid,
        state_props.tomato.is_on,
        state_props.tomato.is_loading
      )
  })
)(MyTomato);

export default MyTomatoContainer;
