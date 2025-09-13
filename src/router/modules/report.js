export default [
  {
    path: "/",
    component: import("@/layouts/default.vue"),
    children: [
      {
        path: "/report",
        // component : import("..pages/index.vue")
        component: import("@/views/employee management/component/report.vue"),
        meta: {
          pageTitle: "Report",
        },
      },
    ],
  },
];
