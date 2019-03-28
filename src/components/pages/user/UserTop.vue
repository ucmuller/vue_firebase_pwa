<template>
  <div v-if="userStatus">
      <md-card class="md-card">
        <md-avatar class="md-large">
          <img :src="photo" alt="">
        </md-avatar>
        <div>
          <md-list class="md-double-line">
            <md-list-item>
              <md-icon class="md-accent">store_mall_directory</md-icon>
              <span class="md-list-item-text">{{user.shopName}}</span>
            </md-list-item>

            <md-list-item>
              <md-icon class="md-accent">account_circle</md-icon>
              <span class="md-list-item-text">{{user.name}}</span>
            </md-list-item>

            <md-list-item v-if="user.messeage">
              <md-icon class="md-accent">comment</md-icon>
              <span class="md-list-item-text">{{user.messeage}}</span>
            </md-list-item>

            <md-list-item>
              <md-icon class="md-accent">email</md-icon>
              <span class="md-list-item-text">{{user.email}}</span>
            </md-list-item>

            <md-list-item>
              <md-icon class="md-accent">group_add</md-icon>
              <span class="md-list-item-text">招待数：{{inviteAllDataLength}}</span>
            </md-list-item>

            <md-list-item>
              <md-icon class="md-accent">people_outline</md-icon>
              <span class="md-list-item-text">招待中：{{inviteDataLength}}</span>
            </md-list-item>

            <md-list-item>
              <md-icon class="md-accent">people</md-icon>
              <span class="md-list-item-text">確約数：{{reservationdataLength}}</span>
            </md-list-item>
          </md-list>
          <md-card-actions>
            <md-button class="md-raised md-accent" @click="routerPush('/userupdate')">表示名変更</md-button>
          </md-card-actions>
        </div>
    </md-card>
    </div>
  <div class="messeage" v-else>
      <router-link to="/signin" class="md-accent">ブラウザがシークレットモードだと再ログインが必要です</router-link>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import Firestore from '@/api/firebase/firestore'
import { mapGetters } from 'vuex'
import router from 'vue-router'
import Vuelidate from 'vuelidate'

export default {
  name: 'UserTop',
  data(){
    return{
      shopName: '',
      name: '',
      email:'',
      password:'',
      photoURL:'',
      updateStatus: false
    }
  },

  created: function(){
    Firebase.onAuth()
    this.getInviteData()
    this.getReservationData()
    console.log(Vuelidate)
  },
  mounted() {
    // this.reject()
  },

  computed: {
    photo(){
      return this.$store.getters.imageURL;
    },
    ...mapGetters({
      photo: 'imageURL',
      userStatus: 'isSignedIn',
      user: 'user',
      inviteAllDataLength: 'inviteAllDataLength',
      reservationdataLength: 'reservationdataLength',
      inviteDataLength: 'inviteDataLength',
      peopleOfReservationData: 'peopleOfReservationData'
    })
  },
   watch: {
    reservationdataLength(){
      this.getInviteData()
      this.getReservationData()
    }
  },

  methods: {
    login() {
      Firebase.login();
    },
    logout() {
      Firebase.logout();
    },
    routerPush(router){
      this.$router.push(router)
    },
    reject(){
      if(!this.userStatus){
        this.$router.push("/signin")
      }
    },
    getInviteData(){
      Firestore.getInviteData(this.user.staff_uid)
    },
    getReservationData(){
      Firestore.getReservationData(this.user.staff_uid)
    },
  }
}
</script>

<style scoped>

  .md-card {
    width: 90%;
    margin-top: 70px;
    display: inline-block;
    vertical-align: top;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 80px;
  }
  .messeage{
    width: 90%;
    margin-top: 70px;
    display: inline-block;
    vertical-align: top;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 80px;
  }

  .md-button.md-theme-default.md-raised:not([disabled]).md-accent {
    color: white;
}
</style>
