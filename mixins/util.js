import { pathToBreadCrumb } from "@/utils/utils";
export const breadCrumb = {
  computed: {
    breadCrumb() {
      return pathToBreadCrumb(this.$route.fullPath);
    }
  }
};
