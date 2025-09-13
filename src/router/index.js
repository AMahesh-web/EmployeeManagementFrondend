import Home from "./modules/home";
import employee from "./modules/employeemanagement";
import report from "./modules/report";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...Home, ...employee, ...report],
});

export default router;
