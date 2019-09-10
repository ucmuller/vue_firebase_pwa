<template>
  <div v-if="userStatus">
      <md-card class="md-card">
        <md-card-area md-inset>
          <!-- <md-card-media v-if="shopImageURL" md-ratio="16:9">
            <img :src="shopImageURL" alt="Coffee House">
          </md-card-media> -->
        </md-card-area>
          <md-card-header>
            <md-field>
              <div>
                <label>店舗名</label>
                <md-input v-model="datas.shopName" disabled></md-input>
              </div>
            </md-field>
            <md-field>
              <div>
                <label>店舗電話番号</label>
                <md-input v-if="datas.shopTelNumber" v-model="datas.shopTelNumber" disabled></md-input>
              </div>
            </md-field>
            <md-field>
              <div class="full-width">
                <label>店舗住所</label>
                <md-textarea v-model="datas.shopAddress" md-autogrow></md-textarea>
              </div>
            </md-field>
            <md-field>
              <div class="full-width">
                <label>店舗URL</label>
                <md-textarea v-model="datas.shopInfo" md-autogrow></md-textarea>
              </div>
            </md-field>
            <md-field>
              <div>
                <label>名前:漢字フルネーム(※在籍確認に必要です)</label>
                <md-input v-if="datas.fullname" v-model="datas.fullname"></md-input>
                <md-input v-if="!datas.fullname" v-model="datas.fullname"></md-input>
              </div>
            </md-field>
            <md-field>
              <div>
                <label>名前:フリガナ(※振込時に必要です)</label>
                <md-input v-if="datas.furigana" v-model="datas.furigana"></md-input>
                <md-input v-if="!datas.furigana" v-model="datas.furigana"></md-input>
              </div>
            </md-field>
            <md-field>
              <div>
                <label>ニックネーム(招待者に表示される名前です)</label>
                <md-input v-model="datas.name"></md-input>
              </div>
            </md-field>
            <md-field>
              <div>
                <label>email</label>
                <md-input v-model="datas.email" disabled></md-input>
              </div>
            </md-field>
            <md-field>
              <div class="full-width">
                <label>役職</label>
                <md-select v-model="datas.employmentStatus">
                  <md-option value="オーナー店長">オーナー 兼 店長</md-option>
                  <md-option value="オーナー">オーナー(※店長は別にいる)</md-option>
                  <md-option value="店長">店長(※オーナーは別にいる)</md-option>
                  <md-option value="正社員">正社員</md-option>
                  <md-option value="アルバイト">アルバイト</md-option>
                  <md-option value="その他">その他</md-option>
                </md-select>
               </div>
            </md-field>
            <md-field>
              <div>
                <label>ひとこと</label>
                <md-input v-model="datas.message"></md-input>
              </div>
            </md-field>
            <!-- <v-input prepend-icon="image">
              <label class="photo-label" for="file_photo">
                <input id="file_photo" @change="selectFile" type="file" name="file" style="display:none;" value="">
                <div id="errArea"> {{ infoMsg }}</div>
              </label>
            </v-input> -->
          </md-card-header>
          <md-button class="md-raised md-accent" @click="changeStaffProfile">変更</md-button>
          <md-button class="md-raised md-primary" @click="routerPush('/')">キャンセル</md-button>
      </md-card>
      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>
    </div>
  <div class="message" v-else-if="!userStatus">
      <router-link to="/signin">ブラウザがシークレットモードだと再ログインが必要です</router-link>
  </div>

</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import Firestore from '@/api/firebase/firestore'
import { mapGetters } from 'vuex'

export default {
  name: 'UserTop',
  data(){
    return{
      datas: {
        shopName: this.$store.getters.user.shopName,
        name: this.$store.getters.user.name,
        fullname: this.$store.getters.user.fullname ? this.$store.getters.user.fullname : '',
        furigana: this.$store.getters.user.furigana ? this.$store.getters.user.furigana : '',
        message: this.$store.getters.user.message,
        email: this.$store.getters.user.email,
        shopImageURL_1: this.$store.getters.user.shopImageURL_1,
        shopImageName_1: this.$store.getters.user.shopImageURL_1,
        shopInfo: this.$store.getters.user.shopInfo ? this.$store.getters.user.shopInfo : '',
        shopAddress: this.$store.getters.user.shopAddress ? this.$store.getters.user.shopAddress : '',
        shopTelNumber: this.$store.getters.user.shopTelNumber ? this.$store.getters.user.shopTelNumber : '',
        employmentStatus: this.$store.getters.user.employmentStatus ? this.$store.getters.user.employmentStatus : ''

      },
      email:'',
      password:'',
      photoURL:'',
      updateStatus: false,
      infoMsg:'＋写真を選択',
      loading: false,
    }
  },

  created: function(){
    Firebase.onAuth()
    Firestore.getStaffEachData(this.user.staff_uid)
    // this.getShopImageURL()
  },

  computed: {
    photo(){
      return this.$store.getters.imageURL;
    },
    ...mapGetters({
      photo: 'imageURL',
      userStatus: 'isSignedIn',
      user: 'user',
      shopImageURL: 'shopImageURL'
    })
  },
  watch: {
    user() {
      console.log("ユーザーデータ更新");
    },
    // shopImageURL() {
    //   this.datas.shopImageURL_1 = this.$store.getters.shopImageURL
    //   this.getShopImageURL()
    //   console.log("shopImage更新");
    // },

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
    changeStaffProfile(){
      console.log(this.user.staff_uid, this.datas)
      this.loading = true
      Firebase.changeStaffProfile(this.user.staff_uid, this.datas)
      setTimeout(() => {
        this.loading = false;
        this.$router.push("/")
      }, 4000);
    },
    selectFile: function (e) {
      e.preventDefault();
      let files = e.target.files;
      this.datas.shopImageURL_1 = files[0];
      console.log(files[0])
      this.infoMsg = this.datas.shopImageURL_1.name
    },
    getShopImageURL(){
      console.log(this.datas.shopImageURL_1)
      console.log(this.datas.shopImageName_1)
      Firebase.getShopImageURL(this.$store.getters.user.shopImageURL_1)
    }
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
input{
  width: 300px;
}
.md-button.md-theme-default.md-raised:not([disabled]).md-accent {
  color: white;
}

.photo-label {
  color: white;  
  background-color: #AAA;
  padding: 6px;
  border-radius: 12px;
}
.loading-overlay {
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.md-textarea{
  width: 100%;
}

.full-width{
  width: 100%;
}
</style>
