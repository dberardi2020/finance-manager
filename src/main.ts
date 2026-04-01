import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSimpleAlert from "vue-simple-alert";
import "./plugins/v-currency-field";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import UserAuthHandler from "@/mixins/UserAuthHandler";
import RoutesHandler from "@/mixins/RoutesHandler";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();

// Firebase exports
export { analytics, auth, db };

// Start Vue instance after firebase auth is checked
Vue.config.productionTip = false;

Vue.use(VueSimpleAlert);

UserAuthHandler.initializeUserStoreAuthListener().then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});

RoutesHandler.initializeRouterGuard();
