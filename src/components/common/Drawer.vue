<template>
<div class="page-container">
  <div class="md-layout-column">
    <md-toolbar class="toolbar">
      <img src="@/assets/img/logo.png" alt="" width="20%">
      <!-- <md-button v-if="userStatus" @click="test" class="logout-button">test</md-button>
      <md-button v-if="userStatus" @click="logout" class="logout-button">ログアウト</md-button> -->
    <div>
      <!-- <button v-if="userStatus" @click="test" class="logout-button">info</button> -->
      <!-- <button v-if="userStatus" @click="logout" class="logout-button">logout</button> -->
      <button v-if="user" @click="routerPush('/settings')"><md-icon >settings</md-icon></button>
      <md-button v-if="!user && !id" @click="routerPush('/signin')">ログインはこちら</md-button>
    </div>
    </md-toolbar>
  </div>
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
      id: this.$route.params.id,
      photoURL: '',
      data:'',
      userdata: '',
      showSidepanel: false
    }
  },
  created: function(){
    // Firebase.onAuth()
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
    test() {
      console.log("a")
    }
  }
}

</script>

<style scoped>
.page-container{
  position: fixed;
  top:0px;
  width: 100%;
  z-index: 10;
}

.drawer{
  position: fixed;
  z-index: 6;
}

.toolbar{
  display: flex;
  justify-content: space-between;
  max-width: 769px;
}


</style>


