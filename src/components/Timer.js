import React, { useState, useEffect, memo } from "react";
import { Howl, Howler } from "howler";

const ONE_SECOND = 1000;

export function is_on(tomato) {
  if (!tomato.start_time) {
    return false;
  }
  const now_ms = new Date().getTime();
  const start_time_ms = tomato.start_time.getTime();
  const end_time_ms = tomato.end_time ? tomato.end_time.getTime() : null;
  const duration_ms = tomato.duration * 60 * 1000;
  return now_ms < start_time_ms + duration_ms || now_ms < end_time_ms;
}

export function is_on_a_break(tomato) {
  return is_on(tomato) && tomato.tomato_type === "break";
}

function elapsed_seconds_since(date) {
  if (!date) {
    console.error("date should not be undefined or null", date);
    throw new TypeError("date should not be undefined or null", date);
  }
  const today = new Date();
  const diffMs = date - today; // milliseconds between now & date
  return Math.ceil(diffMs / 1000) * -1; // seconds
}

function remaining_seconds(start_time, duration) {
  const elapsed = elapsed_seconds_since(start_time);
  return 60 * duration - elapsed;
}

function useTimer(start_time, duration) {
  // console.log("useTimer", { start_time, duration });
  const [s, setSeconds] = useState(remaining_seconds(start_time, duration));
  useEffect(() => {
    const timerID = setInterval(() => {
      const remaining = remaining_seconds(start_time, duration);
      // console.log(  `remaining  `,  remaining,  remaining / 60,  ":",  remaining % 60);
      setSeconds(remaining);
    }, ONE_SECOND);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [start_time, duration]);

  return s;
}

function TimerOn({ start_time, is_on, duration, on_finish }) {
  const remaining = useTimer(start_time, duration);
  // console.log("TimerOn", { start_time, is_on, duration, on_finish, remaining });
  useEffect(() => {
    if (is_on && remaining <= 0) {
      console.log(`Timer is finnished calling on_finish ${is_on} ${remaining}`);
      on_finish();
    }
  }, [start_time, remaining, on_finish, is_on]);
  if (!is_on) {
    console.warn("THERE'S DEFINITELY AN ISSUE WITH THE PARENT COMPONENT");
    return <span>THERE'S DEFINITELY AN ISSUE WITH THE PARENT COMPONENT</span>;
  }
  if (remaining < 60) {
    return <span> {remaining}</span>;
  }
  return <span>{Math.floor(remaining / 60)}</span>;
}

function Timer({ tomato, on_finish, off_label, over_write_label = null }) {
  let [_is_on, setIsOn] = useState(is_on(tomato));
  _is_on = is_on(tomato);
  useEffect(() => {
    const timerID = setInterval(() => setIsOn(is_on(tomato)), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });
  if (!_is_on) {
    return <span>{off_label}</span>;
  } else if (over_write_label) {
    return <span>{over_write_label}</span>;
  } else return <TimerOn {...{ is_on: _is_on, ...tomato, on_finish }} />;
}

export const TimerWithSound = memo(function({ on_finish, ...props }) {
  function on_finish_plus_sound() {
    const sound2 = new Howl({
      src: ["/jinglesncf.mp3"]
    });
    const sound = new Howl({
      src: ["/jinglesncf.mp3"],
      onend: () => sound2.play()
    });
    // Play the sound.
    sound.play();
    on_finish();
  }
  return <Timer on_finish={on_finish_plus_sound} {...props} />;
});

export default memo(Timer);
