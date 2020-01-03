import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { useFollowingTomatoes } from "../selectors";
import { Timer } from "./Timer";
import { useGetPersonalInfos, useObseveFollowingTomatoes } from "../actions";

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
            following.tomato &&
            !following.tomato.is_loading &&
            !following.tomato.not_found
        )
        .map(following => {
          return (
            <ListItem key={<Typography>{following.uid}</Typography>}>
              <ListItemText
                primary={
                  following.personal_info
                    ? following.personal_info.display_name
                    : "XXXX"
                }
                secondary={<Timer tomato={following.tomato} />}
              />
            </ListItem>
          );
        })}
    </List>
  );
}
