import { uniqueId } from "@/utils/utils";

export function defaultArticleObjFB() {
  const id = uniqueId();
  const timestamp = Date.now();
  return {
    likes: [],

    photo: {
      url: "",
      id
    },
    timestamp,
    kids: [],
    tags: [],
    description: "",
    likesNo: 0,
    title: "",
    topics: "",
    by: "",
    content: "",
    type: "article"
  };
}

export const defaultUserObjFB = {
  displayName: "Unknown",
  bio: "",
  claims: { c: true, type: "customer" },
  photo: {
    id: "",
    url:
      "https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown2-512.png"
  },
  followers: [],
  following: [],
  saved: [],
  topics: [],
  uid: "",
  type: "user",
  joined_at: Date.now(),
  profile_url: {
    facebook: "",
    github: "",
    stackoverflow: "",
    twitter: "",
    instagram: ""
  }
};

export function defaultTagObjFB() {
  const timestamp = Date.now();
  const id = uniqueId();
  return {
    name: "",
    description: "",
    bg_color: "#333",
    text_color: "#eee",
    timestamp,
    logo: {
      id,
      url: ""
    }
  };
}

export function defaultCommentObjFB() {
  const timestamp = Date.now();
  return {
    kids: [],
    timestamp,
    likes: [],
    message: "",
    type: "comment",
    by: ""
  };
}

export function defaultTopicObjFB() {
  const timestamp = Date.now();
  const id = uniqueId();
  return {
    about: {
      by: "",
      description: "",
      timestamp
    },
    cover: {
      id,
      url: ""
    },
    members: [],
    name: "",
    kids: []
  };
}
export const defaultTopicCover =
  "https://blogs.sas.com/content/sastraining/files/2015/03/black_background.png";
export function defaultReportObj() {
  const timestamp = Date.now();
  return {
    by: "",
    message: "",
    reported_item: {
      id: "",
      type: "article"
    },
    timestamp,
    type: "report"
  };
}

export const signInLogo = {
  google:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png",
  facebook: "https://cdn.worldvectorlogo.com/logos/facebook-icon.svg",
  github: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg"
};

export function defaultMeta(path) {
  const title = "Loading....";
  const meta = [
    { hid: "og:title", property: "og:title", content: "Loading...." },
    { hid: "description", name: "description", content: "Loading...." },
    {
      hid: "og:description",
      property: "og:description",
      content: "Loading...."
    },
    {
      hid: "og:image",
      property: "og:image",
      content: "https://upload.wikimedia.org/wikipedia/commons/7/71/Black.png"
    },
    {
      hid: "og:url",
      property: "og:url",
      content: process.env.appUrl + "/" + path
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image"
    }
  ];
  return { title, meta };
}
