import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetOtherGuyTomato } from "../actions";
import OtherGyTomato from "./OtherGuyTomato";
import Grid from "@material-ui/core/Grid";

const OtherGuyPagePublic = () => {
  let { uid } = useParams();
  useGetOtherGuyTomato(uid);
  const tomato = useSelector(state => state.other_guys_tomatoes[uid]);
  if (!tomato || tomato.is_loading || tomato.not_found) {
    return <div />;
  }
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={3}
    >
      <Grid item>
        <OtherGyTomato uid={uid} />
      </Grid>
    </Grid>
  );
};

export default OtherGuyPagePublic;
