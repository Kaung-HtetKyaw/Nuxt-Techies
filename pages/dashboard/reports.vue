<template>
  <div>
    <div class="my-4 white bs-border">
      <report-list :lazy="false" :params="{type:'all'}">
        <template v-slot="{reports,loading,lazyLoadReports}">
          <div>
            <div>
              <h1 class="text-h5 text-md-h4 pa-4 text-center">Review Reports</h1>
              <v-divider></v-divider>
              <data-table type="reports" :data="reports"></data-table>
              <div class="d-flex justify-center align-center pa-4">
                <v-btn
                  nuxt
                  color="purple"
                  class="white--text"
                  depressed
                  :loading="loading"
                  @click="lazyLoadReports"
                >Load More</v-btn>
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
export default {
  layout: "dashboard",
  middleware: ["auth", "driver"],
  components: {
    "report-list": ReportListModel,
    "data-table": DataTable,
  },
};
</script>

<style>
</style>