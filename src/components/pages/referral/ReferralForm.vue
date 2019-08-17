<template>
<div>
  <div v-if="userStatus" class="main">
    <md-card-content>
      <div class="referral-card-title">
        <h2 class="center">
          <strong>
            <span style="border-bottom: solid 5px #ffcf07">
              飲食店で働いている友達のご紹介
            </span>
          </strong>
        </h2>
        <h2>のご協力をお願いします。</h2>
        <h3 class="form_alert">今なら、ご紹介者がRNDV[ランデブ]の<br>利用開始で500円キャッシュバック！！</h3>
      </div>
      <h3>↓LINEのトーク画面に反映されます↓</h3>
      <md-field>
        <label>紹介メッセージ(※自由に編集できます)</label>
        <md-textarea v-model="referralMessage"></md-textarea>
      </md-field>
      <h3>紹介リンク:</h3>
      <input id="input" class="referralURL-input" type="text" v-model="referralURL"/>
      <md-button @click="changeReferralMessageOfStaffData" class="line-button">LINEでスタッフを招待</md-button>
      <md-button @click="copyReferralLink" class="referral-button">紹介リンクをコピー</md-button>
    </md-card-content>
    <!-- <p>coming soon...</p> -->
    <md-list class="md-triple-line">
    <h2>
      <strong>
        <span style="border-bottom: solid 5px #ffcf07">
          {{user.name}}さん紹介の登録スタッフ
        </span>
      </strong>
    </h2>

      <div v-for="(data, i) in referralData"
            :key="i">
        <md-list-item v-if="data">
            <md-avatar>
              <md-button class="md-icon-button md-primary">
                <md-icon class="md-primary">done_outline</md-icon>
              </md-button>
            </md-avatar>
            <div class="md-list-item-text">
              <span>{{data.name}}さん</span>
            </div>
        </md-list-item>
      <md-divider v-if="data" class="md-inset"></md-divider>
      </div>
    </md-list>
  </div>
  <div v-else>
    <router-link to="/signin">sign in now!</router-link>
  </div>
  <div class="example-modal-window">
      <!-- コンポーネント MyModal -->
    <Modal @close="closeModal" v-if="modal">
      <!-- default スロットコンテンツ -->
      <h3>紹介リンクをコピーしました。</h3>
      <div>
      </div>
      <!-- /default -->
      <!-- footer スロットコンテンツ -->
      <template slot="footer">
        <md-button @click="closeModal" class="referral-button">閉じる</md-button>
      </template>
      <!-- /footer -->
    </Modal>
  </div>
</div>
</template>
<script>
// import { mapActions, mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import Firestore from '@/api/firebase/firestore'
import router from '@/router'
import { mapGetters } from 'vuex'
import Modal from '@/components/parts/Modal'


export default {
  name: 'ReferralForm',
  components:{Modal},
  data(){
    return {
      id: this.$route.params.id,
      loading: false,
      referralMessage: this.$store.getters.user.referralMessage ? this.$store.getters.user.referralMessage : '「接客力をキャッシュに変えるRNDV[ランデブ]」という、飲食店で働く人用のサービスの紹介です。',
      referralURL: 'https://rndv.jp/referralpage/' + this.$route.params.id,
      modal: false
    }
  },
  created: function(){
    Firebase.onAuth()
    // this.loadingOverlay()
    this.getIndividualReferralData()
    
  },
  computed: {
    url(){
      let domain = document.domain
      console.log(domain)
      if(domain == "localhost"){
        return `https://social-plugins.line.me/lineit/share?url=http://localhost:8080/referralpage/${this.id}`
        // return `http://line.me/R/msg/text/?${this.data.lineMessage}%0D%0Ahttp://localhost:8080/invitepage/${this.documentID}`
      } else {
        // return `https://social-plugins.line.me/lineit/share?url=https://${domain}/referralpage/${this.id}`
        return `http://line.me/R/msg/text/?${this.referralMessage}%0D%0Ahttps://rndv.jp/referralpage/${this.id}`
      }
    },
    ...mapGetters({
      getData: 'data',
      userStatus: 'isSignedIn',
      user: 'user',
      referralData: 'referralData'
    })
  },
  watch: {
    data() {
      console.log("data")
    },
  },
  methods: {
    launchLine(){
      location.href = this.url;
    },
    getIndividualReferralData(){
      let uid = String(this.$route.params.id)
      Firestore.getIndividualReferralData(uid)
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
    changeReferralMessageOfStaffData(){
      Firestore.changeReferralMessageOfStaffData(this.id, this.referralMessage)
      this.launchLine()
    },
    copyReferralLink(){
      // var copyText = document.querySelector("#input");
      // copyText.select();
      // document.execCommand("copy");
      let obj = document.getElementById("input");
      let range = document.createRange();
      range.selectNode(obj);
      window.getSelection().addRange(range);
      document.execCommand('copy');
      this.openModal()
    },
    openModal(){
      this.modal = true
    },
    closeModal(){
      this.modal = false
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: #42b983;
}

.line-button{
  color: white;
  background-color:#6cc655;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 
              0 2px 2px 0 rgba(0,0,0,.14),
              0 1px 5px 0 rgba(0,0,0,.12);
  min-width: 88px;
  height: 36px;
  margin: 10px 8px;
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
.referral-button{
  color: black;
  background-color:#EEEEEE;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 
              0 2px 2px 0 rgba(0,0,0,.14),
              0 1px 5px 0 rgba(0,0,0,.12);
  min-width: 88px;
  height: 36px;
  margin: 10px 8px;
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
.referral-card-title{
  margin: auto;
  margin-top: 32px;
  color: black
}
.referral-card-title h2{
  line-height: 1.5;
}
.form_alert {
  color: red;
  margin-bottom: 16px;
}
.referralURL-input{
  width: 100%;
}
</style>
