import { isDriver } from "@/utils/utils";
export const authority = {
  computed: {
    isDriver() {
      return this.user ? isDriver(this.user) : false;
    }
  }
};
