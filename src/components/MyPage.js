import React, { useState } from "react";
import MyTomato from "./MyTomato";
import ControlPanel from "./ControlPanel";
import Following from "./Following";
import { Grid } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { UserAvatar } from "./UserAvatar";
import Equalizer from "@material-ui/icons/Equalizer";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

const MyPage = () => {
  const [off_label, set_off_label] = useState("OFF");
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={2}
    >
      <Grid item style={{ height: "19VH" }}>
        <Grid container style={{ height: "19vh" }} alignItems="center">
          <Grid item>
            <UserAvatar />
          </Grid>
          <Grid item>
            <Link to={location => `${location.pathname}/statistics`}>
              <IconButton>
                <Equalizer color="action" />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <MyTomato
          off_label={off_label}
          over_write_label={off_label !== "OFF" ? off_label : ""}
        />
      </Grid>
      <Grid item>
        <ControlPanel set_off_label={set_off_label} />
      </Grid>
      <Divider variant="middle" />
      <Grid item>
        <Following />
      </Grid>
    </Grid>
  );
};

export default MyPage;
