import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as db from "./db";
import { TOMATO_TIME, BREAK_TIME } from "./constants";
import { useFollowing } from "./selectors";

function duration_of_tomato_type(tomato_type) {
  switch (tomato_type) {
    case "tomato":
      return TOMATO_TIME;
    case "break":
      return BREAK_TIME;
    default:
      throw new TypeError(
        `tomato type can be "tomato" or "break" not ${tomato_type}`
      );
  }
}

export function start_tomato(state, dispatch, tomato_type) {
  const uid = state.user.uid;
  const end_time_current_tomato = new Date();
  const start_time_next_tomato = new Date();
  const my_tomato = state.my_tomato;
  const duration = duration_of_tomato_type(tomato_type);
  if (my_tomato.is_on && !my_tomato.is_loading) {
    db.update_tomato_end_date(
      my_tomato.tomato_id,
      uid,
      end_time_current_tomato
    );
    dispatch({ type: "STOP_TOMATO" });
  }
  dispatch({
    type: "GETTING_TOMATO",
    start_time: start_time_next_tomato,
    duration,
    uid,
    tomato_id: "will receive soon from server",
    tomato_type
  });
  db.add_tomato(start_time_next_tomato, duration, uid, tomato_type);
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

export function useObserveFollowingTomatoes() {
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

export function stop_tomato(dispatch, tomato_id, uid, is_on, is_loading) {
  const end_time_current_tomato = new Date();
  if (is_on && !is_loading) {
    db.update_tomato_end_date(tomato_id, uid, end_time_current_tomato);
    dispatch({ type: "STOP_TOMATO" });
  }
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
