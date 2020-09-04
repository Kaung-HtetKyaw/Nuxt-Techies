<template>
  <div>
    <h1>This is admin article page</h1>
    <user-list :lazy="true" :params="{type:'all'}">
      <template v-slot="{users,lazyLoadUsers,loading,empty}">
        <div>
          <h1 v-if="loading">#Loading.....</h1>
          <div v-else>
            <h1 v-for="user in users" :key="user.uid">{{user.displayName}}</h1>
            <v-btn @click="lazyLoadUsers">Load More</v-btn>
            <h1 v-if="empty">#Empty</h1>
          </div>
        </div>
      </template>
    </user-list>
  </div>
</template>

<script>
import UserListModel from "@/components/CRUD_Model/UserListModel";
export default {
  components: {
    "user-list": UserListModel,
  },
};
</script>

<style>
</style>