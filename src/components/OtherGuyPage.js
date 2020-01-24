import React, { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetOtherGuyTomato } from "../actions";
import OtherGyTomato from "./OtherGuyTomato";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import Grid from "@material-ui/core/Grid";
import { useFollowing, useMyUid } from "../selectors";
import * as db from "../db";

function FollowButton({ uid_to_follow }) {
  const following = useFollowing();
  const uid = useMyUid();
  const follow = useCallback(() => {
    db.add_following(uid, uid_to_follow);
  }, [uid, uid_to_follow]);
  const un_follow = useCallback(() => {
    db.remove_following(uid, uid_to_follow);
  }, [uid, uid_to_follow]);
  if (following.includes(uid_to_follow)) {
    return (
      <Button variant="text" onClick={un_follow}>
        UN-FOLLOW
      </Button>
    );
  }
  return (
    <Button variant="text" onClick={follow} color="primary">
      FOLLOW
    </Button>
  );
}

function HomeButton(props) {
  return (
    <Button color="primary">
      <Link to="/">
        <HomeIcon />
      </Link>
    </Button>
  );
}

const OtherGuyPage = () => {
  let { uid } = useParams();
  useGetOtherGuyTomato(uid);
  const tomato = useSelector(state => state.other_guys_tomatoes[uid]);
  if (!tomato || tomato.is_loading) {
    return <div>loading</div>;
  }
  if (tomato.not_found) {
    return <div>This user is doesn't exists</div>;
  }
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={3}
    >
      <Grid item style={{ height: "19vh" }}>
        <Grid container style={{ height: "9vh" }} alignItems="flex-end">
          <Grid item>
            <HomeButton />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <OtherGyTomato uid={uid} />
      </Grid>
      <Grid item>
        <FollowButton uid_to_follow={uid} />
      </Grid>
    </Grid>
  );
};

export default OtherGuyPage;
