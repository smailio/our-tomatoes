import store from "./store";
import * as firebase from "firebase";

export default function signInWithGoogle() {
  store.dispatch({ type: "FETCH_USER" });
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      // In memory persistence will be applied to the signed in Google user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
      return firebase.auth().signInWithPopup(provider);
    })
    .then(function(result) {
      // This gives you a Google Access Token.
      // You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      console.log("auth success", { token, user });
      return user;
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.error({
        errorCode,
        errorMessage,
        email,
        credential
      });
      store.dispatch({ type: "FETCH_USER_ERROR" });
    });
}
