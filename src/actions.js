import * as db from "./db";
import { TOMATO_TIME } from "./constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export function start_tomato(state, dispatch) {
  const uid = state.user.uid;
  const end_time_current_tomato = new Date();
  const start_time_next_tomato = new Date();
  const my_tomato = state.my_tomato;
  const duration = TOMATO_TIME;
  if (my_tomato.is_on) {
    db.stop_tomato(my_tomato.tomato_id, uid, end_time_current_tomato);
    dispatch({ type: "STOP_TOMATO" });
  }
  db.start_tomato(start_time_next_tomato, duration, uid).then(tomato_id => {
    dispatch({
      type: "START_TOMATO",
      tomato_id,
      start_time: start_time_next_tomato
    });
  });
}

export function useGetOtherGuyTomato(uid) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_OTHER_GUY_TOMATO", uid });
    db.observe_tomato(uid, tomato => {
      dispatch({
        type: "GET_OTHER_GUY_TOMATO_SUCCESS",
        tomato,
        uid
      });
    });
  }, [uid, dispatch]);
}

export function stop_tomato(dispatch, tomato_id, uid, is_on) {
  const end_time_current_tomato = new Date();
  if (is_on) {
    if (tomato_id !== "break") {
      db.stop_tomato(tomato_id, uid, end_time_current_tomato);
    }
    dispatch({ type: "STOP_TOMATO" });
  }
}

export function start_break(state, dispatch) {
  const tomato = state.my_tomato;
  const uid = state.user.uid;
  stop_tomato(dispatch, tomato.tomato_id, uid, tomato.is_on);
  const start_time = new Date();
  dispatch({
    type: "START_BREAK",
    start_time
  });
}
