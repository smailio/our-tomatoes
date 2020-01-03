import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as db from "./db";
import { TOMATO_TIME } from "./constants";
import { useFollowing } from "./selectors";

export function start_tomato(state, dispatch) {
  const uid = state.user.uid;
  const end_time_current_tomato = new Date();
  const start_time_next_tomato = new Date();
  const my_tomato = state.my_tomato;
  const duration = TOMATO_TIME;
  if (my_tomato.is_on) {
    db.update_tomato_end_date(
      my_tomato.tomato_id,
      uid,
      end_time_current_tomato
    );
    dispatch({ type: "STOP_TOMATO" });
  }
  db.add_tomato(start_time_next_tomato, duration, uid).then(tomato_id => {
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

export function useObseveFollowingTomatoes() {
  const following = useFollowing();
  const dispatch = useDispatch();
  useEffect(() => {
    for (let uid of following) {
      dispatch({ type: "GET_OTHER_GUY_TOMATO", uid });
      db.observe_tomato(uid, tomato => {
        dispatch({
          type: "GET_OTHER_GUY_TOMATO_SUCCESS",
          tomato,
          uid
        });
      });
    }
  }, [following, dispatch]);
}

export function stop_tomato(dispatch, tomato_id, uid, is_on) {
  const end_time_current_tomato = new Date();
  if (is_on) {
    if (tomato_id !== "break") {
      db.update_tomato_end_date(tomato_id, uid, end_time_current_tomato);
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

export function useGetPersonalInfos() {
  const following = useFollowing();
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all(following.map(uid => db.get_personal_info(uid))).then(
      personal_info_list =>
        dispatch({
          type: "SET_PERSONAL_INFO",
          personal_info_list
        })
    );
  }, [following, dispatch]);
}
