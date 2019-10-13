import React, { useState } from "react";

function Timer({ start_time, is_on, timer_duration, on_finish }) {
  const [m, setMinutes] = useState(0);
  React.useEffect(() => {
    if (is_on) {
      const timerID = setInterval(
        () => refresh_times(start_time, on_finish, timer_duration, setMinutes),
        1000
      );
      return function cleanup() {
        clearInterval(timerID);
      };
    }
  });
  if (!is_on) {
    return <div>00</div>;
  }
  if (m <= 0) {
    return <div> 00</div>;
  }
  return <div>{m}</div>;
}

function elapsed_minutes_since(date) {
  const today = new Date();
  const diffMs = date - today; // milliseconds between now & Christmas
  const minutes = Math.ceil(diffMs / 60000) * -1; // minutes
  const seconds = Math.round((diffMs % 60000) / 1000) * -1; // seconds
  return {
    minutes,
    seconds
  };
}

function refresh_times(start_time, on_finish, timer_duration, setMinutes) {
  const { minutes, seconds } = elapsed_minutes_since(start_time);
  console.log("elapsed", minutes, ":", seconds);
  const remaining_minutes = timer_duration - minutes;
  console.log("remaining minutes ", minutes, "seconds", seconds);
  setMinutes(remaining_minutes);
  if (minutes >= timer_duration) {
    console.log("Timer is finnished calling on_finish");
    on_finish();
  }
}

export { Timer };
