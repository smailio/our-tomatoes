import * as db from "./db";

export function start_tomato(state, dispatch) {
  const uid = state.user.uid;
  const end_time_current_tomato = new Date();
  const start_time_next_tomato = new Date();
  const my_tomato = state.my_tomato;
  if (my_tomato.is_on) {
    db.stop_tomato(my_tomato.tomato_id, end_time_current_tomato);
    dispatch({ type: "STOP_TOMATO" });
  }
  db.start_tomato(start_time_next_tomato, uid).then(tomato_id => {
    dispatch({
      type: "START_TOMATO",
      tomato_id,
      start_time: start_time_next_tomato
    });
  });
}

export function stop_tomato(dispatch, tomato_id, is_on) {
  const end_time_current_tomato = new Date();
  if (is_on) {
    if (tomato_id !== "break") {
      db.stop_tomato(tomato_id, end_time_current_tomato);
    }
    dispatch({ type: "STOP_TOMATO" });
  }
}

export function start_break(state, dispatch) {
  const tomato = state.my_tomato;
  stop_tomato(dispatch, tomato.tomato_id, tomato.is_on);
  const start_time = new Date();
  dispatch({
    type: "START_BREAK",
    start_time
  });
}
