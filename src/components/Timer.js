import React, { useState, useEffect } from "react";

const ONE_SECOND = 1000;

function is_on(tomato) {
  if (!tomato.start_time) {
    return false;
  }
  const now_ms = new Date().getTime();
  const start_time_ms = tomato.start_time.getTime();
  const end_time_ms = tomato.end_time ? tomato.end_time.getTime() : null;
  const duration_ms = tomato.duration * 60 * 1000;
  return now_ms < start_time_ms + duration_ms || now_ms < end_time_ms;
}

function elapsed_minutes_since(date) {
  if (!date) {
    console.error("date should not be undefined or null", date);
    throw new TypeError("date should not be undefined or null", date);
  }
  const today = new Date();
  const diffMs = date - today; // milliseconds between now & date
  const minutes = Math.ceil(diffMs / 60000) * -1; // minutes
  const seconds = Math.round((diffMs % 60000) / 1000) * -1; // seconds
  return {
    minutes,
    seconds
  };
}

function remaining_time(start_time, duration) {
  const elapsed = elapsed_minutes_since(start_time);
  return {
    minutes: duration - elapsed.minutes,
    seconds: (60 * duration - (elapsed.seconds + elapsed.minutes * 60)) % 60
  };
}

function useTimer(start_time, duration) {
  console.log("useTimer", { start_time, is_on, duration });
  const remaining_at_start = remaining_time(start_time, duration);
  const [m, setMinutes] = useState(remaining_at_start.minutes);
  const [s, setSeconds] = useState(remaining_at_start.seconds);
  useEffect(() => {
    const timerID = setInterval(() => {
      const { minutes, seconds } = elapsed_minutes_since(start_time);
      console.log("elapsed  ", start_time, minutes, ":", seconds);
      const remaining = remaining_time(start_time, duration);
      console.log(`remaining  `, remaining.minutes, " :", remaining.seconds);
      setMinutes(remaining.minutes);
      setSeconds(remaining.seconds);
    }, ONE_SECOND);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [start_time, duration]);

  return [m, s];
}

function TimerOn({ start_time, is_on, duration, on_finish }) {
  const [remaining_minutes, remaining_seconds] = useTimer(start_time, duration);
  useEffect(() => {
    if (is_on && remaining_minutes <= 0 && remaining_seconds <= 0) {
      console.log(
        `Timer is finnished calling on_finish ${is_on} ${remaining_minutes} ${remaining_seconds}`
      );
      on_finish();
    }
  }, [start_time, remaining_minutes, remaining_seconds, on_finish, is_on]);
  if (!is_on) {
    console.warn("THERE'S DEFINITELY AN ISSUE WITH THE PARENT COMPONENT");
    return <span>THERE'S DEFINITELY AN ISSUE WITH THE PARENT COMPONENT</span>;
  }
  if (remaining_minutes === 1) {
    return <span> {remaining_seconds}</span>;
  }
  return <span>{remaining_minutes}</span>;
}

function Timer({ tomato, on_finish }) {
  let [_is_on, setIsOn] = useState(is_on(tomato));
  _is_on = is_on(tomato);
  useEffect(() => {
    const timerID = setInterval(() => setIsOn(is_on(tomato)), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });
  if (!_is_on) {
    console.log("Timer is off", tomato);
    return <span>Timer off</span>;
  } else return <TimerOn {...{ is_on: _is_on, ...tomato, on_finish }} />;
}

export { Timer };
