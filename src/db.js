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
      return db
        .collection("tomato")
        .doc(uid)
        .set(
          {
            tomato_id: docRef.id,
            start_time,
            is_on: true
          },
          { merge: true }
        )
        .then(() => docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
      return error;
    });
}

export function stop_tomato(tomato_id, uid, end_time) {
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
      return db
        .collection("tomato")
        .doc(uid)
        .set(
          {
            end_time,
            is_on: false
          },
          { merge: true }
        )
        .then(() => {
          console.log(`Tomato ${tomato_id} successfully stopped!`);
          return true;
        });
    })
    .catch(function(error) {
      console.error(`Error stopping tomato: ${tomato_id}`, error);
    });
}
