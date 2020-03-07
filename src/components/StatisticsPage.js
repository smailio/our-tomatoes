import React, { useState } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveLine } from "@nivo/line";
import { useStats } from "../selectors";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "lodash";
import dayjs from "dayjs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import weekYear from "dayjs/plugin/weekYear";
import WeekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(WeekOfYear);
dayjs.extend(weekYear);

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
        <Typography style={{ marginRight: "0.3em" }}>For</Typography>
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
              width: `${Math.max(1, n_days_str.length) + 0.5}em`
            }
          }}
        />
        <Typography>day{"s" ? n_days > 1 : ""}</Typography>
      </div>
      <Typography variant={"h2"}>
        {get_successful_tomatoes_for_last(n_days, my_tomatoes)}
      </Typography>
      <Typography style={{ marginTop: "1em" }}>pomodoro done !</Typography>
    </div>
  );
}

function count_per_week(daily_count_list) {
  // const d = dayjs();
  const _8week_ago = dayjs()
    .subtract(8, "week")
    .startOf("week");
  daily_count_list = daily_count_list.filter(c =>
    dayjs(c.day).isAfter(_8week_ago)
  );
  const daily_count_by_week = _.groupBy(daily_count_list, count_per_day => {
    const d = dayjs(count_per_day.day);
    return d.weekYear() + "-" + d.week();
  });
  const count_by_week = {};
  for (let i = 8; i >= 0; i--) {
    const d = dayjs()
      .subtract(i, "week")
      .startOf("week");
    const i_week = d.weekYear() + "-" + d.week();
    if (daily_count_by_week[i_week]) {
      count_by_week[i_week] = _.sum(
        daily_count_by_week[i_week].map(c => c.value)
      );
    } else {
      count_by_week[i_week] = 0;
    }
  }
  console.log("week ooo wek");
  // console.log(d.weekYear(), d.week());
  console.log(count_by_week);
  return Object.entries(count_by_week).map(([week, count]) => ({
    x: week,
    y: count
  }));
}

function ProgressOverTime({ daily_count_list }) {
  const stats = useStats();
  if (stats.value === undefined || stats.is_loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const responsible_line_date = [
    {
      id: "weekly_progress",
      color: "hsl(287, 70%, 50%)",
      data: count_per_week(daily_count_list)
    }
  ];

  return (
    <ResponsiveLine
      data={responsible_line_date}
      margin={{ top: 20, right: 20, bottom: 20, left: 25 }}
      xScale={{ type: "point" }}
      // yScale={{
      //   type: "linear",
      //   min: "auto",
      //   max: "auto",
      //   stacked: true,
      //   reverse: false
      // }}
      colors={{ scheme: "paired" }}
      pointSize={10}
      // pointColor={{ theme: "inherit" }}
      pointBorderWidth={2}
      // pointBorderColor={{ theme: "inherit" }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      enableGridX={false}
      enableGridY={true}
      // legends={[
      //   {
      //     anchor: "bottom-right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 100,
      //     translateY: 0,
      //     itemsSpacing: 0,
      //     itemDirection: "left-to-right",
      //     itemWidth: 80,
      //     itemHeight: 30,
      //     itemOpacity: 0.75,
      //     symbolSize: 12,
      //     symbolShape: "circle",
      //     symbolBorderColor: "rgba(0, 0, 0, .5)",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemBackground: "rgba(0, 0, 0, .03)",
      //           itemOpacity: 1
      //         }
      //       }
      //     ]
      //   }
      // ]}
    />
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
  console.log("ount_per_week");
  console.log(count_per_week(stats.value.most_recent_pomodoro));
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
      <div style={{ height: "30vh", width: "95vw", marginTop: "5vh" }}>
        <ProgressOverTime daily_count_list={stats.value.most_recent_pomodoro} />
      </div>
      <div style={{ height: "50vh", width: "95vw" }}>
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
