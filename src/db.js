import firebase from "firebase/app";
import { db } from "./initFirebase";

export function add_tomato(start_time, duration, uid, tomato_type) {
  return db
    .collection("tomatoes")
    .add({
      start_time,
      duration,
      uid,
      tomato_type
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
          is_on: true,
          tomato_type
        })
        .then(() => docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
      return error;
    });
}

export function update_tomato_end_date(tomato_id, uid, end_time) {
  console.log("DB update_tomato_end_date", tomato_id, uid, end_time);
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

export function observe_tomato(uid, callback) {
  return db
    .collection("tomato")
    .doc(uid)
    .onSnapshot(doc => {
      const tomato = doc.data();
      console.log("receive snapshot of tomato", tomato);
      callback(fix_dates(tomato));
    });
}

export function add_following(my_uid, uid_to_follow) {
  return db
    .collection("following")
    .doc(my_uid)
    .set(
      { user_ids: firebase.firestore.FieldValue.arrayUnion(uid_to_follow) },
      { merge: true }
    )
    .then(doc => {
      console.log(`successfully followed user ${uid_to_follow}!`, doc);
      return true;
    })
    .catch(error => {
      console.log(`Error following user ${uid_to_follow}`, error);
    });
}

export function remove_following(my_uid, uid_to_follow) {
  return db
    .collection("following")
    .doc(my_uid)
    .set(
      { user_ids: firebase.firestore.FieldValue.arrayRemove(uid_to_follow) },
      { merge: true }
    )
    .then(doc => {
      console.log(`successfully un-followed user ${uid_to_follow}!`, doc);
      return true;
    })
    .catch(error => {
      console.log(`Error un-following user ${uid_to_follow}`, error);
    });
}

export function observe_following(uid, callback) {
  return db
    .collection("following")
    .doc(uid)
    .onSnapshot(doc => {
      const following = doc.data();
      console.log(
        `receive snapshot of following for uid ${uid}`,
        doc,
        following
      );
      callback(following ? following.user_ids : []);
    });
}

export function add_personal_info(uid, display_name, photo_url) {
  db.collection("personal_info")
    .doc(uid)
    .set({
      display_name,
      photo_url,
      uid
    })
    .then(doc => {
      console.log(
        `Successfulled added personal_info ${[
          uid,
          display_name,
          photo_url
        ]} into doc`,
        doc
      );
    })
    .catch(error => {
      console.error(
        "Somthing wrong happend when trying to add personal_info",
        uid
      );
    });
}

export function get_personal_info(uid) {
  return db
    .collection("personal_info")
    .doc(uid)
    .get()
    .then(doc => {
      const personal_info = doc.data();
      console.log("Success ! get personal_info", doc, personal_info);
      return personal_info;
    });
}
