import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetOtherGuyTomato } from "../actions";
import OtherGyTomato from "./OtherGuyTomato";

const OtherGuyPage = () => {
  let { uid } = useParams();
  useGetOtherGuyTomato(uid);
  const tomato = useSelector(state => state.other_guys_tomatoes[uid]);
  if (!tomato || tomato.is_loading) {
    return <div>loading</div>;
  }
  if (tomato.not_found) {
    return <div>This user is doesn't exists</div>;
  }
  // TODO add follow button
  return (
    <div>
      <OtherGyTomato uid={uid} />
    </div>
  );
};

export default OtherGuyPage;
