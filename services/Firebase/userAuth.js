import * as firebase from "firebase/app";
import "firebase/auth";
import { capitalize } from "@/utils/utils";

let signInMethods = {
  facebook: signInFacebookFB,
  google: signInGoogleFB,
  github: signInGithubFB,
  twitter: signInTwitterFB
};

export function signInFB(types) {
  let methods = {};
  types.forEach(type => {
    methods[type] = signInMethods[type];
  });
  return methods;
}

export function signInGoogleFB() {
  var provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

export function signInTwitterFB() {
  let provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithPopup(provider);
}
export function signInGithubFB() {
  let provider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

export function signInFacebookFB() {
  let provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

export function signOutFB() {
  return firebase.auth().signOut();
}

export function currentUserFB() {
  return firebase.auth().currentUser;
}

//fetch user
export function fetchUser(id) {
  return firebase
    .firestore()
    .collection("users")
    .doc(id)
    .get();
}

export function fetchUsersByID(ids) {
  return Promise.all(ids.map(id => fetchUser(id)));
}

//create user
export function createUser(user) {
  return firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set(user);
}

function typesToFunName(string) {
  return `SignIn${capitalize(string)}FB`;
}
