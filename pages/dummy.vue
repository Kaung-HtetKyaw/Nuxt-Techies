<template>
  <div>
    <h1>Test</h1>
  </div>
</template>

<script>
import { fetchUsersByID } from "@/services/Firebase/userAuth";
export default {
  async fetch() {
    const users = await fetchUsersByID([
      "cOkLB2hnFENnN3T3vUKJkgPfgj43",
      "fmHnndrKukO3GXV9aWqagTtuclH3",
      "aklf987af797"
    ]);
    console.log(users);
  },

  data() {
    return {};
  }
};
</script>

<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
