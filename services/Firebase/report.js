import * as firebase from "firebase/app";
import "firebase/firestore";
import reportFactory from "@/utils/factory/report";

let fetchMethods = {
  all: fetchAll,
  user: fetchUser
};
const limit = 10;
export async function fetchReportsByType({ params, lvState }) {
  return normalizeFetch({ params, lvState });
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

function normalizeFetch({ params, lvState }) {
  if (lvState) {
    return fetchMethods[params.type]({ param: params.param })
      .startAfter(lvState)
      .limit(limit)
      .get()
      .then(response => {
        const reports = normalizeComments(response.docs);

        return reports;
      });
  }
  return fetchMethods[params.type]({ param: params.param })
    .limit(limit)
    .get()
    .then(response => {
      const reports = normalizeComments(response.docs);
      return reports;
    });
}

export function normalizeComments(reports) {
  if (Array.isArray(reports)) {
    let arr = [];
    reports.forEach(report => {
      let report_obj = reportFactory.createReport({ data: report });
      arr.push({ ...report_obj });
    });
    return arr;
  }
  const report = reportFactory.createReport({ data: reports });
  return report;
}

export function fetchReport(id) {
  return firebase
    .firestore()
    .collection("reports")
    .doc(id)
    .get()
    .then(response => {
      const report = reportFactory.createReport({
        data: response
      });
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
      const report = reportFactory.createReport({
        data: { id: res.id, ...reportData }
      });

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
