import Home from "./modules/home";
import employee from "./modules/employeemanagement";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...Home, ...employee],
});

export default router;
