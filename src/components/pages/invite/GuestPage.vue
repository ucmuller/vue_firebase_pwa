<template>
       <!-- <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1642220448&redirect_uri=http://localhost:8080/&state=12sadd43sdffgg&scope=profile">LINEログインする</a>
          <v-spacer></v-spacer>
          <OAuth/> -->
<div>
  <md-card class="md-card" v-if="dataStatus">
    <md-card-area md-inset>
      <md-card-header>
        <h2 class="md-title">{{inviteData.shopName}}</h2>
        <!-- <h4 v-if="inviteData.shopAddress" class="md-subhead">住所：{{inviteData.shopAddress}}</h4> -->
        <div class="margin-top">
          <md-icon>info</md-icon>
          <span><a v-if="inviteData.shopInfo" v-bind:href="inviteData.shopInfo" class="md-accent">店舗情報はこちら</a></span>
        </div>
        <div class="margin-top">
          <md-icon>location_on</md-icon>
          <span><a v-if="inviteData.shopAddress" v-bind:href="mapURL" class="md-accent margin-top">Google Mapで場所を確認</a></span>
        </div>
      </md-card-header>

    </md-card-area>

    <md-card-content>
      <h3 v-if="!inviteData.inviteFlag && !userStatus">こちらのご予約は確定しています。</h3>
      <br>
      <h1 class="md-title">{{inviteData.staffName}}さんからの招待</h1>
      <h2 class="md-subhead">{{inviteData.message}}</h2>
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
      <md-button v-if="inviteFlag && !userStatus" @click="openModal" class="md-raised md-accent">予約を確定</md-button>
    </div>
    <md-dialog-alert
        :md-active.sync="alert"
        md-title="予約を確定しました。"
        md-content="ご来店お待ちしております。" />
  </md-card>
  <div class="example-modal-window">
      <!-- コンポーネント MyModal -->
    <Modal @close="closeModal" v-if="modal">
      <!-- default スロットコンテンツ -->
      <p>確認連絡をする場合がありますので、<br>ご自身の電話番号の入力をおねがいします。</p>
      <div>
        <md-field>
          <md-icon>phone_in_talk</md-icon>
          <label>電話番号</label>
          <md-input v-model="telNumber"/>
        </md-field>
      </div>
      <!-- /default -->
      <!-- footer スロットコンテンツ -->
      <template slot="footer">
        <md-button v-if="inviteFlag && !userStatus" @click="saveReservationData" class="md-raised md-accent" :disabled="$v.$invalid">予約を確定</md-button>
      </template>
      <!-- /footer -->
    </Modal>
  </div>
        <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>
</div>
</template>

<script>

// import { mapActions, mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import Firestore from '@/api/firebase/firestore'
import Modal from '@/components/parts/Modal'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'

// import OAuth from "@/components/OAuth";
import { mapGetters } from 'vuex'

export default {
  // name: 'UserPage',
  components:{Modal},
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
      modal: false,
      telNumber: '',
      mapURL: this.$store.getters.inviteData.shopAddress ? 'https://maps.google.co.jp/maps?q=' + this.$store.getters.inviteData.shopAddress : ''

    }
  },

   validations: {
    telNumber: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(12),
    },
  },

  created: function(){
    // Firebase.onAuth()
    // this.getShopImageURL()
    this.loadingOverlay()
    this.getInviteEachData()
    console.log(document.domain == "localhost")
    this.signInAnonymously()
  },

  computed: {
    url(){
      let domain = document.domain
      console.log(domain)
      if(domain == "localhost"){
        // return `https://social-plugins.line.me/lineit/share?url=http://localhost:8080/invitepage/${this.id}`
        return `http://line.me/R/msg/text/?${this.$store.getters.inviteData.lineMessage}%0D%0Ahttp://localhost:8080/invitepage/${this.id}`
      } else {
        // return `https://social-plugins.line.me/lineit/share?url=https://${domain}/invitepage/${this.id}`
        return `http://line.me/R/msg/text/?${this.$store.getters.inviteData.lineMessage}%0D%0Ahttps://${domain}/invitepage/${this.id}`
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
          value: this.$store.getters.isSignedIn && this.$store.getters.inviteData.guestTelNumber ? this.$store.getters.inviteData.guestTelNumber : this.$store.getters.inviteData.tel,
          icon: this.$store.getters.isSignedIn && this.$store.getters.inviteData.guestTelNumber ? 'phone_in_talk' : 'store'
        },
        // {
        //   text: 'LINEメッセージ',
        //   value: this.$store.getters.inviteData.lineMessage,
        //   icon: 'message'
        // },
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
      this.$v.$touch()
      if(!this.$v.$invalid){
        Firestore.saveReservationData(this.$store.getters.inviteData, this.$route.params.id, this.telNumber)
        Firestore.inviteCompletion(this.$route.params.id, this.telNumber)
        this.alert = true
        this.inviteFlag = false
        this.closeModal()
      }
      // console.log(this.$store.getters.inviteData, this.$route.params.id)
    },
    routerPush(router){
      this.$router.push(router)
    },
    loadingOverlay(){
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    launchLine(){
    location.href = this.url;
    },
    openModal(){
      this.modal = true
    },
    closeModal(){
      this.modal = false
    },
    signInAnonymously(){
      if(!this.userStatus){
        Firebase.signInAnonymously()
      }else{
        console.log("user")
      }
      
    }
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
.md-field.md-theme-default:before {
    background-color: #F8F2E3;
    background-color: var(--md-theme-default-accent, #FB6359);
}
.md-field.md-theme-default.md-focused label {
    color: var(--md-theme-default-accent, #FB6359);
}
.md-field.md-theme-default.md-focused > .md-icon {
    color: var(--md-theme-default-accent, #FB6359);
}

button.md-button.md-theme-default.md-primary {
  color: #FB6359;
}

.margin-top{
  margin-top: 10px;
  margin-bottom: 0px;
}

</style>
