import { defaultReportObj } from "@/utils/constants";

let defaultReport = defaultReportObj();

class ReportFactory {
  constructor() {
    this.reportClass = FireBase;
  }
  createReport(options) {
    switch (options.type) {
      case "firebase":
        this.reportClass = FireBase;
        break;
    }
    return new this.reportClass(options.data);
  }
}

class FireBase {
  constructor(data) {
    this.id = data.id;
    if (typeof data.data === "function") {
      this.normalizeReport(data.data());
    } else {
      this.normalizeReport(data);
    }
  }
  normalizeReport(data) {
    const keys = Object.keys(data);
    for (const key in defaultReport) {
      if (keys.includes(key)) {
        this[key] = data[key];
      } else {
        this[key] = defaultReport[key];
      }
    }
  }
}

export default new ReportFactory();
