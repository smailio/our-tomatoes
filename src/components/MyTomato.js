import connect from "react-redux/es/connect/connect";
import { stop_tomato } from "../actions";
import { Timer } from "./Timer";

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
)(Timer);

export default MyTomatoContainer;
