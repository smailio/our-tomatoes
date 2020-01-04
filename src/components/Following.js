import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useFollowingTomatoes } from "../selectors";
import { Timer } from "./Timer";
import { useGetPersonalInfos, useObseveFollowingTomatoes } from "../actions";

function FollowingTomato({ following }) {
  return (
    <Timer
      tomato={following.tomato}
      on_finish={() => {
        console.log(
          `${following.uid} ${
            following.personal_info.display_name
          } finished his pomodoro`
        );
      }}
    />
  );
}

export default function Following() {
  const following_tomatoes = useFollowingTomatoes();
  console.log("following_tomatoes", following_tomatoes);
  useObseveFollowingTomatoes();
  useGetPersonalInfos();
  return (
    <List>
      {following_tomatoes
        .filter(
          following =>
            following.personal_info &&
            following.tomato &&
            !following.tomato.is_loading &&
            !following.tomato.not_found
        )
        .map(following => {
          return (
            <ListItem key={following.uid}>
              <ListItemAvatar>
                <Avatar
                  alt={following.personal_info.display_name}
                  src={following.personal_info.photo_url}
                />
              </ListItemAvatar>
              <ListItemText
                primary={<FollowingTomato following={following} />}
                primaryTypographyProps={{ variant: "h4" }}
              />
            </ListItem>
          );
        })}
    </List>
  );
}
