<template>
  <div v-if="userStatus">
      <md-card class="md-card">
        <!-- <md-avatar v-if="photo" class="md-large">
          <img :src="photo" alt="">
        </md-avatar>
        <md-avatar v-else-if="!photo" class="md-large">
          <md-icon  class="">account_circle</md-icon>
        </md-avatar> -->
        <div>
          <md-list class="">
            <md-list-item>
              <md-icon class="md-primary">store_mall_directory</md-icon>
              <span class="md-list-item-text">{{user.shopName}}</span>
            </md-list-item>

            <md-list-item>
              <md-icon class="md-primary">my_location</md-icon>
              <div class="full-width">
                <span v-if="user.shopAddress" class="md-list-item-text"><a class="md-accent" v-bind:href="mapURL">Google Mapで住所を確認</a></span>
                <span v-if="!user.shopAddress" class="md-list-item-text">店舗住所：未入力</span>
              </div>
            </md-list-item>

            <md-list-item>
              <md-icon class="md-primary">link</md-icon>
              <span v-if="user.shopInfo" class="md-list-item-text"><a class="md-accent" v-bind:href="user.shopInfo">店舗URLリンクを確認</a></span>
              <span v-if="!user.shopInfo" class="md-list-item-text">店舗URL：未入力</span>
            </md-list-item>

            <md-list-item>
              <md-icon class="md-primary">call</md-icon>
              <span v-if="user.shopTelNumber" class="md-list-item-text">{{user.shopTelNumber}}</span>
              <span v-if="!user.shopTelNumber" class="md-list-item-text">店舗電話番号：未入力</span>
            </md-list-item>

            <md-list-item>
              <md-icon class="md-primary">account_circle</md-icon>
              <span class="md-list-item-text">{{user.name}}</span>
            </md-list-item>

            <!-- <md-list-item v-if="user.message">
              <md-icon class="md-primary">comment</md-icon>
              <span class="md-list-item-text">{{user.message}}</span>
            </md-list-item> -->

            <md-list-item>
              <md-icon class="md-primary">email</md-icon>
              <span class="md-list-item-text">{{user.email}}</span>
            </md-list-item>

            <md-list-item>
              <md-icon class="md-primary">stars</md-icon>
              <span v-if="user.employmentStatus" class="md-list-item-text">{{user.employmentStatus}}</span>
              <span v-if="!user.employmentStatus" class="md-list-item-text">役職：未入力</span>
            </md-list-item>

            <md-list-item v-if="inviteAllDataLength">
              <md-icon class="md-primary">group_add</md-icon>
              <span class="md-list-item-text">招待数：{{inviteAllDataLength}}</span>
            </md-list-item>

            <md-list-item v-if="inviteDataLength">
              <md-icon class="md-primary">people_outline</md-icon>
              <span class="md-list-item-text">招待中：{{inviteDataLength}}</span>
            </md-list-item>

            <md-list-item >
              <md-icon class="md-primary">people</md-icon>
              <span class="md-list-item-text">確約数：{{reservationdataLength}}</span>
            </md-list-item>
          </md-list>
          <md-card-actions>
            <md-button class="md-raised md-primary" @click="routerPush('/userupdate')">変更</md-button>
          </md-card-actions>
          <!-- <div>
            <md-button class="md-raised md-primary" @click="routerPush('/inviteform')">代理予約画面へ</md-button>
          </div> -->
        </div>
    </md-card>
    </div>
  <div class="message" v-else>
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
      updateStatus: false,
      userData: '',
      mapURL: this.$store.getters.user.shopAddress ? 'https://maps.google.co.jp/maps?q=' + this.$store.getters.user.shopAddress : ''
    }
  },

  created: function(){

    Firebase.onAuth()
    this.getInviteData()
    this.getReservationData()

    // console.log(Vuelidate)
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
.message{
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

.full-width{
  width: 100%;
  word-wrap: break-word;
}

h5{
  width: 100px;
}

a{
  width: 100%;
}

.md-list-item-text{
  width: 100%;
  word-wrap: break-word;
}
</style>
