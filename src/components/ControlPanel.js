import React, { useCallback } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup/ButtonGroup";
import Button from "@material-ui/core/Button/Button";
import connect from "react-redux/es/connect/connect";
import { start_tomato } from "../actions";
import { TOMATO_TIME, BREAK_TIME } from "../constants";

const ControlPanel = ({
  start_pomodoro,
  start_break,
  set_off_label,
  my_tomato_is_loading
}) => {
  const off_label_tomato = useCallback(() => set_off_label(TOMATO_TIME), [
    set_off_label
  ]);
  const off_label_break = useCallback(() => set_off_label(BREAK_TIME), [
    set_off_label
  ]);
  const reset_off_label = useCallback(() => set_off_label("OFF"), [
    set_off_label
  ]);
  const start_pomodoro2 = useCallback(() => {
    start_pomodoro();
    set_off_label("OFF");
  }, [set_off_label, start_pomodoro]);
  const start_break2 = useCallback(() => {
    start_break();
    set_off_label("OFF");
  }, [set_off_label, start_break]);

  return (
    <div>
      <ButtonGroup color="primary" aria-label="control panel">
        <Button
          disabled={my_tomato_is_loading}
          onClick={start_pomodoro2}
          onMouseEnter={off_label_tomato}
          onMouseLeave={reset_off_label}
        >
          POMODORO
        </Button>
        <Button
          disabled={my_tomato_is_loading}
          onClick={start_break2}
          onMouseEnter={off_label_break}
          onMouseLeave={reset_off_label}
        >
          BREAK
        </Button>
      </ButtonGroup>
    </div>
  );
};

const ControlPanelContainer = connect(
  state => state,
  dispatch => ({ dispatch }),
  (state, { dispatch }, other_props) => {
    return {
      ...other_props,
      my_tomato_is_loading: state.my_tomato.is_loading,
      start_pomodoro: () => start_tomato(state, dispatch, "tomato"),
      start_break: () => start_tomato(state, dispatch, "break")
    };
  }
)(ControlPanel);

export default ControlPanelContainer;
