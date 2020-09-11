import {
  fetchReportsByType,
  createReport,
  deleteReport
} from "@/services/Firebase/report";
import { removeByID, replaceByID } from "@/utils/utils";

export const strict = false;
export const state = () => {
  return {
    reports: [],
    lastVisible: null
  };
};

export const mutations = {
  SET_REPORTS(state, { reports, lazy }) {
    if (lazy) {
      state.reports = state.reports.concat(reports);
    } else {
      state.reports = reports;
    }
  },
  ADD_REPORT(state, { report }) {
    state.reports.push(report);
  },
  DELETE_REPORT(state, { id }) {
    removeByID(state.reports, id);
  },
  SET_LAST_VISIBLE(state, lvState) {
    state.lastVisible = lvState;
  }
};
export const actions = {
  getReports({ commit, state }, { lazy, params }) {
    if (!lazy) {
      commit("SET_LAST_VISIBLE", null);
    }
    const lvState = state.lastVisible;
    return fetchReportsByType({ params, lvState })
      .then(reports => {
        //referencing querysnapshot has circular references so it wont work
        //instead get the data by timestamp
        if (reports.length > 0) {
          commit("SET_LAST_VISIBLE", reports[reports.length - 1].timestamp);
        }
        commit("SET_REPORTS", { reports, lazy });
        return reports;
      })
      .catch(e => console.log(e));
  },
  createReport({ commit }, params) {
    return createReport(params).then(report => {
      commit("ADD_REPORT", { report });
      return report;
    });
  },
  deleteReport({ commit }, params) {
    return deleteReport(params.id).then(() => {
      commit("DELETE_REPORT", { id: params.id });
    });
  }
};

export const getters = {
  getReportByID: state => id => {
    return state.reports.find(el => el.id === id);
  }
};
