import React from "react";
import connect from "react-redux/es/connect/connect";
import { stop_tomato } from "../actions";
import { Timer } from "./Timer";
import Typography from "@material-ui/core/Typography";

function MyTomato({ tomato, on_finish }) {
  return (
    <Typography variant="h3">
      <Timer tomato={tomato} on_finish={on_finish} />
    </Typography>
  );
}

const MyTomatoContainer = connect(
  state => ({ tomato: state.my_tomato }),
  dispatch => ({
    on_finish: (tomato_id, uid, is_on) =>
      stop_tomato(dispatch, tomato_id, uid, is_on)
  }),
  (state_props, dispatch_props) => ({
    ...state_props,
    on_finish: () =>
      dispatch_props.on_finish(
        state_props.tomato_id,
        state_props.uid,
        state_props.is_on
      )
  })
)(MyTomato);

export default MyTomatoContainer;
