<template>
<div>
  <div v-if="userStatus" class="bonus-area">
    <div class="content-area">
      <div class="content">
        <div class="people">{{numberOfReservation(id)}}</div>
        <div class="people-number">集客人数</div>
      </div>
      <div class="border-line"></div>
      <div class="content">
        <div class="bonus">￥{{nominalPrice(id)}}</div>
        <div class="bonus-price">ボーナス金額</div>
      </div>
      <div class="border-line"></div>
      <div class="content">
        <div class="invite">{{numberOfReservationGroup(id)}}</div>
        <div class="invite-people">予約組</div>
      </div>
    </div>
  </div>
  <div v-if="userStatus">
    <md-list class="md-triple-line">
      <div v-for="(data, i) in getData"
            :key="i">
            
        <md-list-item v-if="data.inviteFlag == false">
            <md-avatar>
              <md-button class="md-icon-button md-primary">
                <md-icon class="md-primary">group</md-icon>
              </md-button>
            </md-avatar>
            <div class="md-list-item-text">
              <span>{{data.guestName}}様　{{data.people}}名</span>
              <span>{{data.date}}　{{data.time}}</span>
            </div>
            <md-button @click="routerPush({name:'InvitePage',params:{id:data.inviteID}})" class="md-raised md-primary">確定</md-button>
        </md-list-item>
        
        <md-list-item v-if="data.inviteFlag == true">
            <md-avatar>
              <md-button class="md-icon-button md-primary">
                <md-icon class="md-primary">group</md-icon>
              </md-button>
            </md-avatar>
            <div class="md-list-item-text">
              <span>{{data.guestName}}様　{{data.people}}名</span>
              <span>{{data.date}}　{{data.time}}</span>
            </div>
            <md-button @click="routerPush({name:'InvitePage',params:{id:data.inviteID}})" class="md-raised md-primary">招待中</md-button>
        </md-list-item>
        
        <md-divider  class="md-inset"></md-divider>
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
    this.getReservationData()
  },

  computed: {
    url(){
      return 'https://social-plugins.line.me/lineit/share?url=http://localhost:8080/userpage/' + this.id
    },
    ...mapGetters({
      getData: 'data',
      userStatus: 'isSignedIn',
      user: 'user',
      allReservationData: 'allReservationData',
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
    },
    getReservationData(){
      let uid = String(this.$route.params.id)
      Firestore.getReservationData(this.$route.params.id)
    },
    numberOfReservation(uid){
      let Reservation = this.$store.getters.allReservationData
      let ReservationPeople = 0
      Reservation.forEach((data)=>{
        if(uid == data.from_uid){
          ReservationPeople += data.people
        }
      })
      return ReservationPeople
    },
    nominalPrice(uid){
      let Reservation = this.$store.getters.allReservationData
      let ReservationPeople = 0
      Reservation.forEach((data)=>{
        if(uid == data.from_uid){
          ReservationPeople += data.people
        }
      })
      return ReservationPeople * 300
    },
    numberOfReservationGroup(uid){
      let Reservation = this.$store.getters.allReservationData
      let ReservationArray = []
      Reservation.forEach((data)=>{
        if(uid == data.from_uid){
          ReservationArray.push(data)
        }
      })
      return ReservationArray.length
    },

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

.md-title{
  color: #000;
  font-weight: 900;
}
.md-subhead{
  font-size: 20px;
  color: #fff;
  text-shadow: 1px 1px 1px #fff, -1px 1px 1px #fff, 1px -1px 1px #fff, -1px -1px 1px #fff, 1px 1px 1px #fff, -1px 1px 1px #fff, 1px -1px 1px #fff, -1px -1px 1px #fff;
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

.bonus-area{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  border:2px #ccc solid;
  height:300px;
  height: 100px;
  margin-top: 57px;
  background-color: #2979ff;
}

.content-area{
  display: flex;
  border-radius: 5px;
  background: #fff;
  margin: 0;
  width: auto;
}

.content {
  width: auto;
  height: 70px;
  text-align:center;
  margin: 0px;
}
.border-line{
  background: lightgrey;
  width: 2px;
  height: 60px;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 0;
}

.people{
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
  color: #8DCF3F;
}
.bonus{
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
  color: #33BFDB;
}
.invite {
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
  color: #FBA848;
}

.invite-people, .bonus-price, .people-number{
  font-size: 12px;
  margin: 0 10px 0 10px;
  font-weight: bold;
}




</style>
