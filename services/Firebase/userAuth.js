import * as firebase from "firebase/app";
import "firebase/auth";
import { capitalize } from "@/utils/utils";
import userFactory from "@/utils/factory/user";

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
let limit = 10;

let fetchMethods = {
  all: fetchAll,
  popular: fetchPopular,
  topic: fetchTopic
};

export async function fetchUsersByType({ params, lvState }) {
  return normalizeFetch({ params, lvState });
}

export function fetchAll({ param }) {
  return firebase
    .firestore()
    .collection("users")
    .orderBy("joined_at", "desc");
}

export function fetchPopular() {
  return firebase
    .firestore()
    .collection("users")
    .orderBy("joined_at", "desc")
    .orderBy("followers", "desc");
}

export function fetchTopic({ param }) {
  return firebase
    .firestore()
    .collection("users")
    .orderBy("joined_at", "desc")
    .where("topics", "array-contains", param);
}

function normalizeFetch({ params, lvState }) {
  if (lvState) {
    return fetchMethods[params.type]({ param: params.param })
      .startAfter(lvState)
      .limit(limit)
      .get()
      .then(response => {
        const users = normalizeUsers(response.docs);

        return users;
      });
  }
  return fetchMethods[params.type]({ param: params.param })
    .limit(limit)
    .get()
    .then(response => {
      const users = normalizeUsers(response.docs);

      return users;
    });
}

export function normalizeUsers(users) {
  if (Array.isArray(users)) {
    let arr = [];
    users.forEach(user => {
      console.log(user.data());
      let user_obj = userFactory.createUser({ data: user });
      arr.push({ ...user_obj });
    });
    return arr;
  }

  const user = userFactory.createUser({ data: users });
  return user;
}

export function fetchUser(id) {
  return firebase
    .firestore()
    .collection("users")
    .doc(id)
    .get()
    .then(res => {
      return res.data();
    });
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

export function updateUser(user) {
  return firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set(user);
}
export function updateUsers(users) {
  return Promise.all(users.map(user => updateUser(user)));
}
function typesToFunName(string) {
  return `SignIn${capitalize(string)}FB`;
}
