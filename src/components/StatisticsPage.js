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
  const l = _.chain(tomatoes.value)
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

function StatisticsPage() {
  const my_tomatoes = useMyTomatoes();
  if (my_tomatoes.is_loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <ResponsiveCalendar
        data={count_successfyll_tomatoes_per_day(my_tomatoes)}
        width={500}
        height={200}
        from="2019-03-01"
        to="2020-07-12"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
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
