<template>
  <div>
    <h1>This is admin article page</h1>

    <user-list :lazy="true" :params="{type:'all'}">
      <template v-slot="{users,lazyLoadUsers,loading,empty}">
        <div>
          <h1 v-if="loading">#Loading.....</h1>
          <div v-else>
            <v-card
              v-for="user in users"
              :key="user.uid"
              class="mx-auto"
              outlined
              elevation="0"
              color="#fff"
              tile
            >
              <v-card-actions class="pa-0">
                <v-list-item class="grow">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="6" class="px-0">
                        <nuxt-link :to="{name:'by',params:{by:user.uid}}" class="d-inline-block">
                          <v-list-item-avatar color="grey darken-3">
                            <v-img class="elevation-6" :src="user.photo.url"></v-img>
                          </v-list-item-avatar>
                        </nuxt-link>

                        <nuxt-link :to="{name:'by',params:{by:user.uid}}" class="d-inline-block">
                          <v-list-item-content>
                            <v-list-item-title>
                              {{user.displayName}}
                              <v-chip
                                class="ma-1 opacity-7"
                                x-small
                                light
                                label
                              >{{user.claims.type}}</v-chip>
                            </v-list-item-title>
                          </v-list-item-content>
                        </nuxt-link>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        class="pa-0 d-flex flex-row justify-center align-center"
                      >
                        <set-authority
                          v-for="type in ['admin','driver','customer']"
                          :key="type"
                          :type="type"
                          :user="user"
                          class="ma-1"
                        >
                          <template v-slot="{setUserAsAuthority,loading:changingClaim}">
                            <div class="d-flex justify-center align-center">
                              <v-btn
                                x-small
                                :loading="changingClaim"
                                depressed
                                color="primary"
                                @click="setUserAsAuthority"
                              >{{type}}</v-btn>
                            </div>
                          </template>
                        </set-authority>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-list-item>
              </v-card-actions>
              <v-divider></v-divider>
            </v-card>
          </div>
        </div>
      </template>
    </user-list>
  </div>
</template>

<script>
import UserListModel from "@/components/CRUD_Model/UserListModel";
import SetAuthority from "@/components/CRUD_Model/SetAuthorityModel";
import { getUserType } from "@/utils/utils";
export default {
  components: {
    "user-list": UserListModel,
    "set-authority": SetAuthority,
  },
};
</script>

<style>
</style>