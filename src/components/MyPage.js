import React, { useState } from "react";
import MyTomato from "./MyTomato";
import ControlPanel from "./ControlPanel";
import Following from "./Following";
import { Grid } from "@material-ui/core";

const MyPage = () => {
  const [off_label, set_off_label] = useState("OFF");
  return (
    <Grid container alignItems="center" justify="center" spacing={8}>
      <Grid item xs={4}>
        <MyTomato
          off_label={off_label}
          over_write_label={off_label !== "OFF" ? off_label : ""}
        />
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={8}>
        <ControlPanel set_off_label={set_off_label} />
      </Grid>
      <Grid item xs={8}>
        <Following />
      </Grid>
    </Grid>
  );
};

export default MyPage;
