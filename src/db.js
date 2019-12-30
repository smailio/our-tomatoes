import firebase from "firebase/app";
import { db } from "./initFirebase";

export function start_tomato(start_time, duration, uid) {
  return db
    .collection("tomatoes")
    .add({
      start_time,
      duration,
      uid
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      return db
        .collection("tomato")
        .doc(uid)
        .set({
          tomato_id: docRef.id,
          start_time,
          duration,
          is_on: true
        })
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

export function get_tomato(uid) {
  return db
    .collection("tomato")
    .doc(uid)
    .get()
    .then(doc => doc.data())
    .then(tomato => {
      console.log("getting tomato", tomato);
      return tomato
        ? {
            ...tomato,
            start_time: tomato.start_time ? tomato.start_time.toDate() : null,
            end_time: tomato.end_time ? tomato.end_time.toDate() : null
          }
        : null;
    });
}

function fix_dates(tomato) {
  if (!tomato) return tomato;
  else {
    return {
      ...tomato,
      start_time: tomato.start_time ? tomato.start_time.toDate() : null,
      end_time: tomato.end_time ? tomato.end_time.toDate() : null
    };
  }
}

export function subscribe_to_tomato(uid, callback) {
  return db
    .collection("tomato")
    .doc(uid)
    .onSnapshot(doc => {
      const tomato = doc.data();
      console.log("receive snapshot of tomato", tomato);
      callback(fix_dates(tomato));
    });
}

export function follow(my_uid, uid_to_follow) {
  return db
    .collection("following")
    .doc(my_uid)
    .set(
      { users: firebase.firestore.FieldValue.arrayUnion(uid_to_follow) },
      { merge: true }
    )
    .then(() => {
      console.log(`successfully followed user ${uid_to_follow}!`);
      return true;
    })
    .catch(error => {
      console.log(`Error following user ${uid_to_follow}`, error);
    });
}
