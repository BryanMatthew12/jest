import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home.vue";
// import Login from "@/layout/Login.vue";
import About from "@/pages/About.vue"
import Login from "@/pages/Login.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "login",
            component: Login
        },
        {
            path: "/home",
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            component: About
        }
    ]
})