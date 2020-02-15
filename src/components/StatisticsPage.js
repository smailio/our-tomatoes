import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { useMyTomatoes } from "../selectors";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "lodash";

function get_day_date(d) {
  return d.toISOString().substr(0, 10);
}

function count_successfyll_tomatoes_per_day(tomatoes) {
  console.log("count per day", tomatoes);
  const l = _.chain(tomatoes)
    .filter(
      tomato => tomato.start_time !== undefined && tomato.end_time !== undefined
    )
    .map(tomato => ({
      ...tomato,
      day_date: get_day_date(tomato.start_time.toDate())
    }))
    .groupBy("day_date")
    .map((array, day) => ({
      day,
      value: array.length
    }))
    .value();
  console.log(l);
  return l;
}

function get_fitst_tomato_date(my_tomatoes) {
  return get_day_date(
    _.min(my_tomatoes.map(tomato => tomato.start_time.toDate()))
  );
}

// function get_last_tomato_date(my_tomatoes) {}

function StatisticsPage() {
  const my_tomatoes = useMyTomatoes();
  if (my_tomatoes.value === undefined || my_tomatoes.is_loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const from = get_fitst_tomato_date(my_tomatoes.value);
  const to = get_day_date(new Date());

  return (
    <div style={{ height: "33vh", width: "95vw" }}>
      <ResponsiveCalendar
        data={count_successfyll_tomatoes_per_day(my_tomatoes.value)}
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
  );
}

export default StatisticsPage;
