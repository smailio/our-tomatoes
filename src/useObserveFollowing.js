import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMyUid } from "./selectors";
import * as db from "./db";

export function useObserveFollowing() {
  const uid = useMyUid();
  const dispatch = useDispatch();
  useEffect(() => {
    db.observe_following(uid, user_ids => {
      dispatch({
        type: "SET_FOLLOWING",
        user_ids: user_ids
      });
    });
  });
}
