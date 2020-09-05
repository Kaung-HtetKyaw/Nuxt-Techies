import colors from "vuetify/es5/util/colors";

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,300;0,400;1,400&display=swap"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#3b49df" },
  /*
   ** Global CSS
   */
  css: ["~/assets/base.scss", "~assets/style/transition.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/vue-placeholders.js",
    "~/plugins/vue-observe-visibility.client.js"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/markdownit",

    [
      "@nuxtjs/firebase",
      {
        config: {
          production: {
            apiKey: "AIzaSyDUYnB2wLuKChArUAJITeqeLw-60Lo8AVE",
            authDomain: "fb-test-4125a.firebaseapp.com",
            databaseURL: "https://fb-test-4125a.firebaseio.com",
            projectId: "fb-test-4125a",
            storageBucket: "fb-test-4125a.appspot.com",
            messagingSenderId: "658751976044",
            appId: "1:658751976044:web:4ca5df4afc398e75e2de49",
            measurementId: "G-R0LG59XNRD"
          },
          development: {
            apiKey: "AIzaSyDUYnB2wLuKChArUAJITeqeLw-60Lo8AVE",
            authDomain: "fb-test-4125a.firebaseapp.com",
            databaseURL: "https://fb-test-4125a.firebaseio.com",
            projectId: "fb-test-4125a",
            storageBucket: "fb-test-4125a.appspot.com",
            messagingSenderId: "658751976044",
            appId: "1:658751976044:web:4ca5df4afc398e75e2de49",
            measurementId: "G-R0LG59XNRD"
          }
        },
        customEnv: false,
        onFirebaseHosting: false,
        services: {
          auth: {
            persistence: "local",
            initialize: {
              onAuthStateChangedAction: "nuxtServerInit"
            },
            ssr: {
              // !! NEVER deploy a service account file to github or to a publicly accessible folder on your server !!
              credential: "~/assets/firebase/serviceAccount.json",

              // Experimental Feature, use with caution.
              serverLogin: {
                sessionLifetime: 60 * 60 * 1000, // one hour
                loginDelay: 50 // minimal recommended delay
              }
            }
          },
          firestore: {
            memoryOnly: false // default
          },
          functions: {
            location: "us-central1", // Default
            emulatorPort: 12345
          },
          storage: true,
          realtimeDb: true,
          performance: true,
          analytics: true,
          remoteConfig: {
            settings: {
              fetchTimeoutMillis: 60000, // Default
              minimumFetchIntervalMillis: 43200000 // Default
            },
            defaultConfig: {
              welcome_message: "Welcome"
            }
          },
          messaging: {
            createServiceWorker: true,
            actions: [
              {
                action: "<randomName>",
                url: "<randomUrl>"
              }
            ],
            fcmPublicVapidKey: "<publicVapidKey>" // OPTIONAL : Sets vapid key for FCM after initialization
          }
        }
      }
    ]
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  transition: {
    name: "fade",
    mode: "out-in"
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
