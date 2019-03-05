import Vue from 'vue'
import Router from 'vue-router'
import UserTop from '@/components/pages/user/UserTop'
import Signup from '@/components/pages/auth/Signup'
import Signin from '@/components/pages/auth/Signin'
import InviteForm from '@/components/pages/invite/InviteForm'
import UserPage from '@/components/pages/user/UserPage'
import UserUpdate from '@/components/pages/user/UserUpdate'
import InvitePage from '@/components/pages/invite/InvitePage'
import InvitePageUpdate from '@/components/pages/invite/InvitePageUpdate'
import ReservationPage from '@/components/pages/reservation/ReservationPage'
import InviteList from '@/components/pages/invite/InviteList'
import ReservationList from '@/components/pages/reservation/ReservationList'
import AdminTop from '@/components/pages/admin/AdminTop'
import StaffList from '@/components/pages/admin/StaffList'
import InviteData from '@/components/pages/admin/InviteData'
import ReservationData from '@/components/pages/admin/ReservationData'
import IndividualInviteData from '@/components/pages/admin/IndividualInviteData'
import IndividualReservationData from '@/components/pages/admin/IndividualReservationData'
import firebase from 'firebase'

Vue.use(Router)
Vue.component('router-link', Vue.options.components.RouterLink);
let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/usertop',
      name: 'UserTop',
      component: UserTop,
      meta: { requiresAuth: true }
    },
    {
      path: '/userupdate',
      name: 'UserUpdate',
      component: UserUpdate,
      meta: { requiresAuth: true }
    },
    {
      path: '/admintop',
      component: AdminTop,
      // meta: { requiresAuth: true },
      children: [
        {
          path: 'stafflist',
          component: StaffList,
        },
        {
          path: 'invitedata',
          component: InviteData,
        },
        {
          path: 'ReservationData',
          component: ReservationData,
        },
      ]
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/inviteform',
      name: 'Inviteform',
      component: InviteForm
    },
    {
      path: '/invitelist/:id',
      name: 'InviteList',
      component: InviteList,
      props: route => ({
        id: Number(route.params.id)
      })
    },
    {
      path: '/reservationlist/:id',
      name: 'ReservationList',
      component: ReservationList,
      props: route => ({
        id: Number(route.params.id)
      })
    },
    {
      path: '/userpage/:id',
      name: 'UserPage',
      component: UserPage,
      props: route => ({
        id: Number(route.params.id)
      })
    },
    {
      path: '/invitepage/:id',
      name: 'InvitePage',
      component: InvitePage,
      props: route => ({
        id: Number(route.params.id)
      })
    },
    {
      path: '/invitepageupdate/:id',
      name: 'InvitePageUpdate',
      component: InvitePageUpdate,
      props: route => ({
        id: Number(route.params.id)
      })
    },
    {
      path: '/reservationpage/:id',
      name: 'ReservationPage',
      component: ReservationPage,
      props: route => ({
        id: Number(route.params.id)
      })
    },
    {
      path: '/IndividualInviteData/:id',
      name: 'IndividualInviteData',
      component: IndividualInviteData,
      props: route => ({
        id: Number(route.params.id)
      })
    },
    {
      path: '/IndividualReservationData/:id',
      name: 'IndividualReservationData',
      component: IndividualReservationData,
      props: route => ({
        id: Number(route.params.id)
      })
    },
  ]
})

// router.beforeEach((to, from, next)=>{
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   let currentUser = firebase.auth().currentUser
//   if (requiresAuth){
//   if (!currentUser){
//     next({
//       path: '/signin',
//       query: {redirect: to.fullPath}
//     })
//   }else{
//     next()
//   }
// }else{
//   next()
// }
// })


export default router