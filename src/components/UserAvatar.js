import React from "react";
import Avatar from "@material-ui/core/Avatar/Avatar";
import { useUser, useOtherGuy } from "../selectors";

export function UserAvatar({ props }) {
  const user = useUser();
  return <Avatar src={user.photo_url} alt={user.display_name} />;
}

export function OtherGuyAvatar({ uid }) {
  const other_guy = useOtherGuy(uid);
  if (other_guy)
    return <Avatar src={other_guy.photo_url} alt={other_guy.display_name} />;
  else return <span />;
}
