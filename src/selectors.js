import { useSelector } from "react-redux";

export function useFollowing() {
  return useSelector(state => state.following);
}

export function useMyUid() {
  return useSelector(state => state.user.uid);
}
