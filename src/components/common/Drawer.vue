<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary toolbar">
      <span class="md-title">Rendezvous</span>
      <md-button v-if="userStatus && (user.email == 'ucmuller@gmail.com' || user.email == 'str531@gmail.com')" @click="routerPush('/admintop/stafflist')" class="logout-button">Admin</md-button>
      <md-button v-if="userStatus" @click="logout" class="logout-button">logout</md-button>
    </md-toolbar>
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
  z-index: 6;
}

.drawer{
  position: fixed;
  z-index: 6;
}

.toolbar{
  display: flex;
  justify-content: space-between
}


</style>


