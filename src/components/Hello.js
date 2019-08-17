import React from "react";
import { connect } from "react-redux";
import { Timer } from "./Timer";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { start_tomato, stop_tomato, start_break } from "../actions";

const ControlPanel = ({ start_pomodoro, start_break }) => (
  <div>
    <ButtonGroup color="primary" aria-label="control panel">
      <Button onClick={start_pomodoro}>POMODORO</Button>
      <Button onClick={start_break}>BREAK</Button>
    </ButtonGroup>
  </div>
);

const ControlPanelContainer = connect(
  state => state,
  dispatch => ({ dispatch }),
  (state, { dispatch }) => {
    return {
      start_pomodoro: () => start_tomato(state, dispatch),
      start_break: () => start_break(state, dispatch)
    };
  }
)(ControlPanel);

const MyTomatoContainer = connect(
  state => ({
    start_time: state.my_tomato.start_time,
    timer_duration: state.my_tomato.duration,
    is_on: state.my_tomato.is_on,
    tomato_id: state.my_tomato.tomato_id
  }),
  dispatch => ({
    on_finish: (tomato_id, is_on) => stop_tomato(dispatch, tomato_id, is_on)
  }),
  (state_props, dispatch_props) => ({
    ...state_props,
    on_finish: () =>
      dispatch_props.on_finish(state_props.tomato_id, state_props.is_on)
  })
)(Timer);

// const MyTimerControl = ({start_tomato, start_break, })
const Hello = ({ display_name }) => {
  return (
    <div>
      <h1>Hello {display_name}</h1>
      <MyTomatoContainer />
      <ControlPanelContainer />
    </div>
  );
};

const HelloContainer = connect(state => ({
  display_name: state.user.display_name
}))(Hello);

// const MyTimer = connect(state => ({
//   start_time: state.my_timer.start_time,
//   is_on: state.my_timer.is_on,
//   timer_duration: state.my_timer.timer_duration
// }))(Timer);

export default HelloContainer;
