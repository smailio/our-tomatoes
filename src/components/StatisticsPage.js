import React, { useState } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { useStats } from "../selectors";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "lodash";
import dayjs from "dayjs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

function get_day_date(d) {
  return d.toISOString().substr(0, 10);
}

function get_first_tomato_date(per_day_count) {
  return get_day_date(_.min(per_day_count.map(count => count.date.toDate())));
}

function get_successful_tomatoes_for_last(n_days, per_day_count) {
  return _.chain(per_day_count)
    .filter(count =>
      dayjs.unix(count.date.seconds).isAfter(dayjs().subtract(n_days, "day"))
    )
    .map(count => count.value)
    .sum()
    .value();
}

function SuccessfulTomatoesNLastDays({ my_tomatoes }) {
  const [n_days, set_n_days] = useState(1);
  const n_days_str = n_days + "";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "1em"
        }}
      >
        <Typography style={{ marginRight: "0.3em" }}>Successful</Typography>
        <Typography style={{ marginRight: "0.3em" }}>pomodoro</Typography>
        <Typography style={{ marginRight: "0.3em" }}>for</Typography>
        <Typography style={{ marginRight: "0.3em" }}>the</Typography>
        <Typography style={{ marginRight: "0.3em" }}>last</Typography>
        <TextField
          size="small"
          type="number"
          value={n_days}
          onChange={e => set_n_days(Math.max(1, e.target.value))}
          margin="none"
          inputProps={{
            style: {
              width: `${n_days_str.length + 1}em`
              // marginLeft: "1em",
              // marginRight: "1em"
            }
          }}
        />
        <Typography style={{ marginRight: "0.5em" }}>days</Typography>
      </div>
      <Typography variant={"h2"}>
        {get_successful_tomatoes_for_last(n_days, my_tomatoes)}
      </Typography>
    </div>
  );
}

function StatisticsPage() {
  const stats = useStats();
  if (stats.value === undefined || stats.is_loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const from = get_first_tomato_date(stats.value.most_recent_pomodoro);
  const to = get_day_date(new Date());

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <div style={{ width: "70vw", marginLeft: "10vw", marginTop: "10vh" }}>
        <SuccessfulTomatoesNLastDays
          my_tomatoes={stats.value.most_recent_pomodoro}
        />
      </div>
      <div style={{ height: "40vh", width: "95vw" }}>
        <ResponsiveCalendar
          data={stats.value.most_recent_pomodoro}
          from={from}
          to={to}
          emptyColor="#eeeeee"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          margin={{ top: 40, right: 10, bottom: 10, left: 10 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left"
            }
          ]}
        />
      </div>
    </div>
  );
}

export default StatisticsPage;
