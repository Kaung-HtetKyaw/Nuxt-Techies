<template>
  <div>
    <h1>This is admin article page</h1>
    <user-list :lazy="true" :params="{type:'all'}">
      <template v-slot="{users,lazyLoadUsers,loading,empty}">
        <div>
          <h1 v-if="loading">#Loading.....</h1>
          <div v-else>
            <div v-for="user in users" :key="user.uid">
              <h1>{{user.displayName}}</h1>
              <set-authority type="admin" :user="user">
                <template v-slot="{setUserAsAuthority,loading:settingUser,changedType}">
                  <div>
                    <p>{{changedType}}</p>
                    <v-btn :loading="settingUser" @click="setUserAsAuthority">Set as Admin</v-btn>
                  </div>
                </template>
              </set-authority>
            </div>

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
import SetAuthority from "@/components/CRUD_Model/SetAuthorityModel";
export default {
  components: {
    "user-list": UserListModel,
    "set-authority": SetAuthority,
  },
};
</script>

<style>
</style>