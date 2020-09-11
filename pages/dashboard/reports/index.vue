<template>
  <div>
    <div class="my-4 white bs-border">
      <report-list :lazy="false" :params="{type:'all'}">
        <template v-slot="{reports,loading,lazyLoadReports,empty}">
          <div>
            <div>
              <h1 class="text-h5 text-md-h4 pa-4 text-center">Review Reports</h1>
              <p
                class="text-body-2 opacity-7 text-center"
              >A report will be removed as soon as you review it</p>
              <transition-group name="vertical" tag="div">
                <report-card
                  v-for="(report,i) in reports"
                  :key="report.id"
                  :report="report"
                  v-observe-visibility="
                              i === reports.length - 1
                                ? lazyLoadReports
                                : false
                            "
                ></report-card>
              </transition-group>

              <div v-if="loading" class="d-flex justify-center align-center">
                <v-progress-circular indeterminate color="purple"></v-progress-circular>
              </div>
              <div v-if="empty" class="d-flex justify-center align-center my-2">
                <empty-alert></empty-alert>
              </div>
            </div>
          </div>
        </template>
      </report-list>
    </div>
  </div>
</template>

<script>
import ReportListModel from "@/components/CRUD_Model/ReportListModel";
import DataTable from "@/components/Table/DataTable";
import ReportCard from "@/components/UI/ReportCardDashboard";
export default {
  layout: "dashboard",
  middleware: ["auth", "driver"],
  components: {
    "report-list": ReportListModel,
    "data-table": DataTable,
    "report-card": ReportCard,
  },
};
</script>

<style>
</style>