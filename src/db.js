import { db } from "./initFirebase";

export function start_tomato(start_time, uid) {
  return db
    .collection("tomatoes")
    .add({
      start_time,
      uid
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
      return error;
    });
}

export function stop_tomato(tomato_id, end_time) {
  return db
    .collection("tomatoes")
    .doc(tomato_id)
    .set(
      {
        end_time
      },
      { merge: true }
    )
    .then(function() {
      console.log(`Tomato ${tomato_id} successfully stopped!`);
    })
    .catch(function(error) {
      console.error(`Error stopping tomato: ${tomato_id}`, error);
    });
}
