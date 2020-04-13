import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetOtherGuyTomato, useGetPersonalInfoForUid } from "../actions";
import OtherGyTomato from "./OtherGuyTomato";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import { is_on, is_on_a_break } from "./Timer";
import { OtherGuyAvatar } from "./UserAvatar";

const OtherGuyPagePublic = () => {
  let { uid } = useParams();
  useGetOtherGuyTomato(uid);
  useGetPersonalInfoForUid(uid);
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
      spacing={4}
    >
      <Grid item>
        <OtherGuyAvatar uid={uid} />
      </Grid>
      {is_on(tomato) && !is_on_a_break(tomato) ? (
        <Grid
          container
          item
          xs={12}
          md={8}
          alignItems="center"
          justify="center"
          spacing={2}
        >
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h5">
              Hi, I'm focused and I'll be available in
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <OtherGyTomato uid={uid} />
          </Grid>

          <Grid item xs={12} md={7}>
            <iframe
              src="https://giphy.com/embed/w0CPP48tkM6Ag"
              width="100%"
              height="100%"
              frameBorder="0"
              className="giphy-embed"
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h6">What's this ? </Typography>
            <Typography>
              {" "}
              The person who sent you this page is using the pomodoro technique
              to focus, so he's currently focusing on a single task for 25
              minutes. see below to learn about the pomodoro technique and how
              to use this app.
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          item
          md={8}
          alignItems="center"
          justify="center"
          spacing={4}
        >
          <Grid item md={12} style={{ textAlign: "center" }}>
            <Typography variant="h5">
              Hi, I'm available feel free to ping me
            </Typography>
          </Grid>
          {is_on(tomato) && is_on_a_break(tomato) ? (
            <Grid item md={12} style={{ textAlign: "center" }}>
              <OtherGyTomato uid={uid} />
            </Grid>
          ) : (
            ""
          )}
          <Grid item md={7}>
            <iframe
              src="https://giphy.com/embed/8OJbtIc2iRiKa8FqyM"
              width="100%"
              height="100%"
              // style="position:absolute"
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            />
          </Grid>
          <Grid item md={12} style={{ textAlign: "center" }}>
            <Typography variant="h6">What's this ? </Typography>
            <Typography>
              {" "}
              The person who sent you this page is using the pomodoro technique
              to focus, his timer finished so he's free. See below to learn
              about the pomodoro technique and how to use this app.
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default OtherGuyPagePublic;
