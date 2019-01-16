import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Detail = resolve => require(['@/views/Detail'], resolve)
const Admin = resolve => require(['@/views/Admin'], resolve)
const AdminDetail = resolve => require(['@/views/AdminDetail'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/items/:id/:id2',
        component: Detail
    },
    {
        path: '/items/:id',
        component: Detail
    },
    {
        path: '/admin2',
        component: Admin
    },
    {
        path: '/admin/item/add',
        component: AdminDetail
    },
    {
        path: '/admin/items/:id',
        component: AdminDetail
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
