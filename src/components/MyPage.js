import React from "react";
import MyTomato from "./MyTomato";
import ControlPanel from "./ControlPanel";
import Following from "./Following";

const MyPage = () => {
  return (
    <div>
      <MyTomato />
      <ControlPanel />
      <Following />
    </div>
  );
};

export default MyPage;
