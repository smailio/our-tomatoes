import connect from "react-redux/es/connect/connect";
import { stop_tomato } from "../actions";
import { Timer } from "./Timer";

const MyTomatoContainer = connect(
  state => ({
    start_time: state.my_tomato.start_time,
    duration: state.my_tomato.duration,
    is_on: state.my_tomato.is_on,
    uid: state.user.uid,
    tomato_id: state.my_tomato.tomato_id
  }),
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
)(Timer);

export default MyTomatoContainer;
