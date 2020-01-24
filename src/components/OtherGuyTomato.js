import React from "react";
import { useSelector } from "react-redux";
import Timer from "./Timer";
import Typography from "@material-ui/core/Typography/Typography";

function OtherGyTomato({ uid }) {
  const tomato = useSelector(state => state.other_guys_tomatoes[uid]);
  console.log("render other guy tomato ", tomato);
  return (
    <Typography variant="h1">
      <Timer
        tomato={{ ...tomato }}
        off_label={"OFF"}
        on_finish={() => {
          console.log("BLINK BLINK TOMATO FINISHES ", tomato);
        }}
      />
    </Typography>
  );
}

export default OtherGyTomato;
