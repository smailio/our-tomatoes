import { db } from "./initFirebase";
import _ from "lodash";
import { useMyTomatoes } from "./selectors";

function useGetTomatoesStats(uid) {
  return db;
}
