import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

// Creamos la app y le añadimos el router
createApp(App).use(router).mount("#app");
