import React, { memo } from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useFollowingTomatoes } from "../selectors";
import Timer, { is_on_a_break, is_on } from "./Timer";
import { useGetPersonalInfos, useObserveFollowingTomatoes } from "../actions";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

function FollowingTomato({ following }) {
  return (
    <Timer
      tomato={following.tomato}
      off_label={"is just chilling"}
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

export default memo(function Following() {
  const following_tomatoes = useFollowingTomatoes();
  console.log("following_tomatoes", following_tomatoes);
  const following_tomatoes_on = following_tomatoes.filter(
    following =>
      following.personal_info &&
      following.tomato &&
      is_on(following.tomato) &&
      !following.tomato.is_loading &&
      !following.tomato.not_found
  );
  const following_tomatoes_off = following_tomatoes.filter(
    following =>
      following.personal_info &&
      following.tomato &&
      !is_on(following.tomato) &&
      !following.tomato.is_loading &&
      !following.tomato.not_found
  );

  useObserveFollowingTomatoes();
  useGetPersonalInfos();
  return (
    <List>
      {following_tomatoes_on
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
                <Link to={`/${following.uid}`}>
                  {" "}
                  <Avatar
                    alt={following.personal_info.display_name}
                    src={following.personal_info.photo_url}
                  />
                </Link>
              </ListItemAvatar>
              <ListItemText
                primary={<FollowingTomato following={following} />}
                secondary={is_on_a_break(following.tomato) ? "On a break" : ""}
                primaryTypographyProps={{ variant: "h4" }}
              />
            </ListItem>
          );
        })}
      {following_tomatoes_off.length > 0 && (
        <ListItem>
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginTop: "2vh" }}
          >
            <Grid item xs={12}>
              <Typography variant="h4">Slackers</Typography>
            </Grid>
            {following_tomatoes_off.map(following => (
              <Grid item key={following.uid}>
                <Link to={`/${following.uid}`}>
                  <Avatar
                    alt={following.personal_info.display_name}
                    src={following.personal_info.photo_url}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </ListItem>
      )}
    </List>
  );
});
