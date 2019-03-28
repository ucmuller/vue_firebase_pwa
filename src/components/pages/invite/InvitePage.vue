<template>
       <!-- <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1642220448&redirect_uri=http://localhost:8080/&state=12sadd43sdffgg&scope=profile">LINEログインする</a>
          <v-spacer></v-spacer>
          <OAuth/> -->
<div>
  <md-card class="md-card" v-if="dataStatus">
    <md-card-area md-inset>
      <md-card-media md-ratio="16:9">
        <img v-if="!inviteData.shopImageURL_1" src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="Coffee House">
        <img v-if="inviteData.shopImageURL_1" :src="inviteData.shopImageURL_1" alt="Coffee House">
      </md-card-media>

      <md-card-header>
        <h2 class="md-title">{{inviteData.shopName}}</h2>
        <div class="md-subhead">
          <!-- <md-icon>location_on</md-icon>
          <span>2 miles</span> -->
        </div>
      </md-card-header>
<!-- 
      <md-card-content>
        Shop Detail Shop Detail 
        Shop Detail Shop Detail 
      </md-card-content> -->
    </md-card-area>

    <md-card-content>
      <h1 class="md-title">{{inviteData.staffName}}さんからの招待</h1>
      <h2 class="md-subhead">{{inviteData.messeage}}</h2>
      <div class="card-reservation">
        <md-list class="md-double-line"
          v-for="(data, i) in getEachData"
            :key="i"
            >
          <div class="md-layout md-gutter md-alignment-center-center">
            <div>
              <md-icon class="md-accent">{{data.icon}}</md-icon>
            </div>
            <div class="data-value">
              <h1 class="md-title">{{data.value}}</h1>
            </div>
          </div>
        </md-list>
      </div>
    </md-card-content>
  <!-- 
    <md-card-actions>
    </md-card-actions> -->
    <div v-if="inviteData.inviteFlag">
      <!-- <md-button v-if="inviteFlag" class="md-raised" @click="routerPush({name:'InvitePageUpdate',params:{id:id}})">内容変更</md-button> -->
      <!-- <md-button v-if="userStatus" :href="url" class="md-raised md-primary">LINE送信
        <img src="@/assets/share-a.png" alt="" srcset="" width="100%">
      </md-button> -->
      <!-- <button v-if="userStatus" @click="launchLine" class="line-button">LINE送信</button> -->
      <md-button v-if="inviteFlag && !userStatus" @click="saveReservationData" class="md-raised md-accent">予約を確定</md-button>
    </div>
    <md-dialog-alert
        :md-active.sync="alert"
        md-title="予約を確定しました。"
        md-content="ご来店お待ちしております。" />
  </md-card>
</div>
</template>

<script>

// import { mapActions, mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import Firestore from '@/api/firebase/firestore'
// import OAuth from "@/components/OAuth";
import { mapGetters } from 'vuex'

export default {
  name: 'UserPage',

  data(){
    return {
      shopName: '',
      staffName: '',
      id: this.$route.params.id,
      date:'',
      email:'',
      guestName:'',
      people:'',
      datas: '',
      alert: false,
      inviteFlag: true,
      loading: false,
    }
  },

  created: function(){
    // Firebase.onAuth()
    // this.getShopImageURL()
    // this.loadingOverlay()
    this.getInviteEachData()
    console.log(document.domain == "localhost")
  },

  computed: {
    url(){
      let domain = document.domain
      console.log(domain)
      if(domain == "localhost"){
        // return `https://social-plugins.line.me/lineit/share?url=http://localhost:8080/invitepage/${this.id}`
        return `http://line.me/R/msg/text/?${this.$store.getters.inviteData.lineMesseage}%0D%0Ahttp://localhost:8080/invitepage/${this.id}`
      } else {
        // return `https://social-plugins.line.me/lineit/share?url=https://${domain}/invitepage/${this.id}`
        return `http://line.me/R/msg/text/?${this.$store.getters.inviteData.lineMesseage}%0D%0Ahttps://${domain}/invitepage/${this.id}`
      }
    },
    getEachData() {
      let datas =  [
        {
          text: 'ゲスト名',
          value: this.$store.getters.inviteData.guestName + '様',
          icon: 'account_circle'
        },
        {
          text: '人数',
          value: this.$store.getters.inviteData.people + '名様',
          icon: 'people'
        },
        {
          text: '日付',
          value: this.$store.getters.inviteData.date,
          icon: 'calendar_today'
        },
        {
          text: '時間',
          value: this.$store.getters.inviteData.time + '〜',
          icon: 'access_time'
        },
        {
          text: 'TEL',
          value: this.$store.getters.inviteData.tel,
          icon: 'phone_in_talk'
        },
        {
          text: 'LINEメッセージ',
          value: this.$store.getters.inviteData.lineMesseage,
          icon: 'message'
        },
      ]
      return datas
    },
    ...mapGetters({
      dataStatus: 'inviteDataStatus',
      userStatus: 'isSignedIn',
      // user: 'user',
      inviteData: 'inviteData',
      shopImageURL: 'shopImageURL'
    }),

  },

  watch: {
  },

  methods: {
    login() {
      Firebase.login();
    },
    logout() {
      Firebase.logout();
    },
    getInviteEachData(){
      Firestore.getInviteEachData(this.$route.params.id)
    },
    saveReservationData(){
      // console.log(this.$store.getters.inviteData, this.$route.params.id)
      Firestore.saveReservationData(this.$store.getters.inviteData, this.$route.params.id)
      Firestore.inviteCompletion(this.$route.params.id)
      this.alert = true
      this.inviteFlag = false
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
    launchLine(){
    location.href = this.url;
    },
    // getShopImageURL(){
    //   Firebase.getShopImageURL(this.$store.getters.inviteData.shopImageURL_1)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: black;
}

.data-value h1{
  font-size: 20px;
}

.md-card{
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
.md-list-item-text h1{
  font-size: 20px;
}

.md-list-item-text{
  text-align: center;
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

.data-value{
  width: 80%;
}

.line-button{
  color: white;
  background-color:#6cc655;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 
              0 2px 2px 0 rgba(0,0,0,.14),
              0 1px 5px 0 rgba(0,0,0,.12);
  min-width: 88px;
  height: 36px;
  margin: 6px 8px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  transition:0.4s;
}

.line-button:hover {
  opacity:0.7;
}

.md-button.md-theme-default.md-raised:not([disabled]).md-accent {
  color: white;
}

button.md-button.md-theme-default.md-primary {
  color: #FB6359;
}

</style>
