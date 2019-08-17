import React, { useState } from "react";

function Timer({ start_time, is_on, timer_duration, on_finish }) {
  const [m, setMinutes] = useState(0);
  const [s, setSeconds] = useState(0);
  React.useEffect(() => {
    const timerID = setInterval(
      () =>
        refresh_times(
          start_time,
          on_finish,
          timer_duration,
          setMinutes,
          setSeconds
        ),
      1000
    );
    return function cleanup() {
      clearInterval(timerID);
    };
  });
  if (m >= timer_duration) {
    return <div> DONE !</div>;
  }
  if (!is_on) {
    return <div> 00 : 00</div>;
  }
  return (
    <div>
      {m} : {s}
    </div>
  );
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

function refresh_times(
  start_time,
  on_finish,
  timer_duration,
  setMinutes,
  setSeconds
) {
  const { minutes, seconds } = elapsed_minutes_since(start_time);
  setMinutes(minutes);
  setSeconds(seconds);
  if (minutes >= timer_duration) {
    console.log("Timer is finnished calling on_finish");
    on_finish();
  }
}

export { Timer };
