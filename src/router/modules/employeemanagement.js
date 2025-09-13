export default [
  {
    path: "/",
    component: import("@/layouts/default.vue"),
    children: [
      {
        path: "/employee",
        // component : import("..pages/index.vue")
        component: import("@/views/employee management/index.vue"),
        meta: {
          pageTitle: "employee management",
        },
      },
    ],
  },
];
