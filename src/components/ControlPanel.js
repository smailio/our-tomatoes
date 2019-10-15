import ButtonGroup from "@material-ui/core/ButtonGroup/ButtonGroup";
import Button from "@material-ui/core/Button/Button";
import connect from "react-redux/es/connect/connect";
import { start_break, start_tomato } from "../actions";
import React from "react";

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

export default ControlPanelContainer;
