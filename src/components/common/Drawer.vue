<template>
    <div class="page-container md-layout-column">
    <md-toolbar class="md-primary toolbar">
      <!-- <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button> -->
      <span class="md-title">Rendezvous</span>
      <md-button v-if="userStatus" @click="logout" class="logout-button">logout</md-button>
    </md-toolbar>
<!-- 
    <md-drawer class="drawer" :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">My App name</span>
      </md-toolbar>
      <md-list
        v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          avatar
          >
        <md-list-item>
          <a class="md-list-item-text" @click="routerPush(link.to)" v-text="link.text"></a>
        </md-list-item>
      </md-list>
    </md-drawer> -->
  </div>
</template>

<script>
import Firebase from '@/api/firebase/firebase'
import types from '@/store/mutation-types'
import {store} from '@/store/'
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      drawer: false,
      id: '',
      photoURL: '',
      data:'',
      userdata: '',
      showNavigation: false,
      showSidepanel: false,
      // links: [
      //   {
      //     to: '/usertop',
      //     icon: 'mdi-account',
      //     text: 'User Profile'
      //   },
      //   {
      //     to: '/inviteform',
      //     icon: 'mdi-view-dashboard',
      //     text: 'Invite Form'
      //   },
      //   {
      //     to: {name:'UserPage',params:{id: this.$store.getters.user.uid}},
      //     icon: 'mdi-clipboard-outline',
      //     text: 'User Page'
      //   }
      // ]
    }
  },
  created: function(){
    Firebase.onAuth()
  },
  computed: {
    ...mapGetters({
      userStatus: 'isSignedIn',
      user: 'user',
    })
  },
  methods: {
    logout() {
      Firebase.logout();
    },
    routerPush(router){
      this.$router.push(router)
    },
  }
}

</script>

<style scoped>
.page-container{
  position: fixed;
  top:0px;
  width: 100%;
  z-index: 3;
}

.drawer{
  position: fixed;
  /* z-index: 2; */
}

.toolbar{
  display: flex;
  justify-content: space-between
}


</style>


