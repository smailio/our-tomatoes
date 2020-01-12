import { shallowEqual, useSelector } from "react-redux";

export function useFollowing() {
  return useSelector(state => state.following, shallowEqual);
}

export function useMyUid() {
  return useSelector(state => state.user.uid, shallowEqual);
}

export function useFollowingTomatoes() {
  const following = useFollowing();
  return useSelector(state => {
    const other_guys_tomatoes = state.other_guys_tomatoes;
    const personal_info = state.personal_info;
    return following.map(uid => {
      return {
        uid,
        personal_info: personal_info[uid],
        tomato: other_guys_tomatoes[uid]
      };
    });
  }, shallowEqual);
}
