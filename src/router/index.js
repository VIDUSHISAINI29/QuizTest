import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         redirect:'/home'
      },
      {
         path: "/",
         component: () => import("@/layout/AppLayout.vue"),
         children: [
            {
               path: "/home",
               name: "home",
               component: () => import("@/pages/Home.vue")
            },
            {
               path: "/quiz",
               name: "quiz",
               component: () => import("@/pages/Quiz.vue")
            },
            {
               path: "/report",
               name: "report",
               component: () => import("@/pages/Report.vue")
            },
         ],
      },
   ],
});

export default router;
