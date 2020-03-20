import React from "react";
import { useSelector } from "react-redux";
import { TimerWithSound2, is_on } from "./Timer";
import Typography from "@material-ui/core/Typography/Typography";

function OtherGyTomato({ uid }) {
  const tomato = useSelector(state => state.other_guys_tomatoes[uid]);
  console.log("render other guy tomato ", tomato);
  return (
    <div>
      <Typography variant="h1">
        <TimerWithSound2
          tomato={{ ...tomato }}
          off_label={"OFF"}
          on_finish={() => {
            console.log("BLINK BLINK TOMATO FINISHES ", tomato);
          }}
        />
      </Typography>
      {is_on(tomato) && tomato.tomato_type === "break" ? (
        <Typography variant="caption">On a break</Typography>
      ) : (
        ""
      )}
    </div>
  );
}

export default OtherGyTomato;
