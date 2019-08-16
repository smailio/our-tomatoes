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

export function stop_tomato(state, dispatch) {
  const end_time_current_tomato = new Date();
  const my_tomato = state.my_tomato;
  if (my_tomato.is_on) {
    db.stop_tomato(my_tomato.tomato_id, end_time_current_tomato);
    dispatch({ type: "STOP_TOMATO" });
  }
}

export function start_break(state, dispatch) {
  stop_tomato(state, dispatch);
  const start_time = new Date();
  dispatch({
    type: "START_TOMATO",
    start_time
  });
}
