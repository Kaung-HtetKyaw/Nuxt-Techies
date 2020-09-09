<template>
  <div>
    <h1>This is admin Report page</h1>
    <report-list :lazy="true" :params="{type:'all'}">
      <template v-slot="{reports,lazyLoadReports,loading,empty}">
        <div>
          <h1 v-if="loading">#Loading.....</h1>
          <div v-else>
            <h1 v-for="report in reports" :key="report.id">{{report.message}}</h1>
            <v-btn @click="lazyLoadReports">Load More</v-btn>
            <h1 v-if="empty">#Empty</h1>
          </div>
        </div>
      </template>
    </report-list>
  </div>
</template>

<script>
import ReportListModel from "@/components/CRUD_Model/ReportListModel";
export default {
  layout: "dashboard",
  components: {
    "report-list": ReportListModel,
  },
};
</script>

<style>
</style>