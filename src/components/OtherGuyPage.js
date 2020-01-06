import React, { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetOtherGuyTomato } from "../actions";
import OtherGyTomato from "./OtherGuyTomato";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import HomeIcon from "@material-ui/icons/Home";

import { useFollowing, useMyUid } from "../selectors";
import * as db from "../db";

function FollowButton({ uid_to_follow }) {
  const following = useFollowing();
  const uid = useMyUid();
  const follow = useCallback(() => {
    db.add_following(uid, uid_to_follow);
  }, [uid, uid_to_follow]);
  if (following.includes(uid_to_follow)) {
    return (
      <Button variant="outlined" disabled>
        FOLLOW
      </Button>
    );
  }
  return (
    <Button variant="outlined" onClick={follow} color="primary">
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
    <div>
      <HomeButton />
      <OtherGyTomato uid={uid} />
      <FollowButton uid_to_follow={uid} />
    </div>
  );
};

export default OtherGuyPage;
