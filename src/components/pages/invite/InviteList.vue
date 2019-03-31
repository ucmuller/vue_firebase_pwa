<template>
<div>
  <div v-if="userStatus" class="main">
    <md-list class="md-triple-line">
      <div v-for="(data, i) in getData"
            :key="i">
        <md-list-item v-if="data.inviteFlag">
            <md-avatar>
              <md-button class="md-icon-button md-raised md-primary">
                <md-icon class="md-accent">contact_mail</md-icon>
              </md-button>
            </md-avatar>
            <div class="md-list-item-text">
              <span>{{data.guestName}}様　{{data.people}}名</span>
              <span>{{data.date}}　{{data.time}}</span>
            </div>
            <md-button @click="routerPush({name:'InvitePage',params:{id:data.inviteID}})" class="md-raised md-accent">詳細</md-button>
        </md-list-item>
      <md-divider v-if="data.inviteFlag" class="md-inset"></md-divider>
      </div>
    </md-list>
  </div>
  <div v-else>
      <router-link to="/signin">sign in now!</router-link>
  </div>
  <!-- <div class="loading-overlay" v-if="loading">
    <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
  </div> -->
</div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import Firestore from '@/api/firebase/firestore'
import router from '@/router'
import { mapGetters } from 'vuex'

export default {
  name: 'InviteList',
  components: {
    OAuth
  },
  data(){
    return {
      id: this.$route.params.id,
      loading: false,
    }
  },

  created: function(){
    Firebase.onAuth()
    // this.loadingOverlay()
    this.getInviteData()
  },

  computed: {
    url(){
      return 'https://social-plugins.line.me/lineit/share?url=http://localhost:8080/userpage/' + this.id
    },
    ...mapGetters({
      getData: 'data',
      userStatus: 'isSignedIn',
      user: 'user'
    })

  },

  watch: {
    data() {
      console.log("data")
    },
  },

  methods: {
    login() {
      Firebase.login();
    },
    logout() {
      Firebase.logout();
    },
    getInviteData(){
      let uid = String(this.$route.params.id)
      Firestore.getInviteData(uid)
    },
    routerPush(router){
      this.$router.push(router)
    },
    loadingOverlay(){
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: #42b983;
}
.md-card-example{
  padding: 10px;
  padding-bottom: 60px;

}
.md-list-item-text{
  text-align: center
}
.main{
  margin-top: 50px;
}
.loading-overlay {
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
}

.md-list {
  margin-bottom: 46px;
}

.md-button.md-theme-default.md-raised:not([disabled]).md-accent {
    color: white;
}

</style>
