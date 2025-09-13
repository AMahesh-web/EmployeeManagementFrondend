/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
//boostrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Plugins
import { registerPlugins } from "@/plugins";

import commonmixins from "./Mixins/commonmixins";

import "@/styles/settings.scss";
import "@/assets/scss/sidebar.scss";
import "@/assets/scss/admin.scss";
import "@/assets/scss/home.scss";
import "@/assets/scss/header.scss";
import "@/assets/scss/employee.scss";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Styles
import "unfonts.css";
//import pinia
import { createPinia } from "pinia";

const app = createApp(App);

//use mixin
app.mixin(commonmixins);

app.use(createPinia()); // register Pinia

registerPlugins(app);

app.mount("#app");
