import React, { useState } from "react";
import MyTomato from "./MyTomato";
import ControlPanel from "./ControlPanel";
import Following from "./Following";

const MyPage = () => {
  const [off_label, set_off_label] = useState("OFF");
  return (
    <div>
      <MyTomato
        off_label={off_label}
        over_write_label={off_label !== "OFF" ? off_label : ""}
      />
      <ControlPanel set_off_label={set_off_label} />
      <Following />
    </div>
  );
};

export default MyPage;
