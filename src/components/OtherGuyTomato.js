import React from "react";
import { useSelector } from "react-redux";
import { Timer } from "./Timer";

function OtherGyTomato({ uid }) {
  const tomato = useSelector(state => state.other_guys_tomatoes[uid]);
  console.log("render other guy tomato ", tomato);
  return (
    <Timer
      tomato={{ ...tomato }}
      on_finish={() => {
        console.log("BLINK BLINK TOMATO FINISHES ", tomato);
      }}
    />
  );
}

export default OtherGyTomato;
