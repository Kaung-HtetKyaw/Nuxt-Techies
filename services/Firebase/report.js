import * as firebase from "firebase/app";
import "firebase/firestore";
import reportFactory from "@/utils/factory/report";
import { normalizeDataFB, normalizeFetchFB } from "@/utils/fb";

let fetchMethods = {
  all: fetchAll,
  user: fetchUser
};
const limit = 10;
export async function fetchReportsByType({ params, lvState }) {
  return normalizeFetchFB({ params, lvState }, fetchMethods, "report", 10);
}
function fetchAll({ param }) {
  return firebase
    .firestore()
    .collection("reports")
    .orderBy("timestamp", "desc");
}

export function fetchUser({ param }) {
  return firebase
    .firestore()
    .collection("reports")
    .orderBy("timestamp", "desc")
    .where("by", "==", param);
}

export function fetchReport(id) {
  return firebase
    .firestore()
    .collection("reports")
    .doc(id)
    .get()
    .then(response => {
      const report = normalizeDataFB(response, "report");
      return report;
    });
}
export function fetchReports(ids) {
  return Promise.all(ids.map(id => fetchComment(id)));
}
export function createReport(reportData) {
  return firebase
    .firestore()
    .collection("reports")
    .add({ ...reportData })
    .then(res => {
      const report = normalizeDataFB({ id: res.id, ...reportData }, "report");

      return report;
    });
}

export function deleteReport(id) {
  return firebase
    .firestore()
    .collection("reports")
    .doc(id)
    .delete();
}

export function deleteReports(ids) {
  return Promise.all(ids.map(id => deleteReport(id)));
}
