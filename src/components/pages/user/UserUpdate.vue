<template>
  <div v-if="userStatus">
      <md-card class="md-card">
        <md-card-area md-inset>
          <md-card-media v-if="shopImageURL" md-ratio="16:9">
            <img :src="shopImageURL" alt="Coffee House">
          </md-card-media>
        </md-card-area>
          <md-card-header>
            <md-field>
              <div>
                <label>店舗名</label>
                <md-input v-model="datas.shopName"></md-input>
              </div>
            </md-field>
            <md-field>
              <div>
                <label>名前</label>
                <md-input v-model="datas.name"></md-input>
              </div>
            </md-field>
            <md-field>
              <div>
                <label>ひとこと</label>
                <md-input v-model="datas.message"></md-input>
              </div>
            </md-field>
            <v-input prepend-icon="image">
              <label class="photo-label" for="file_photo">
                <input id="file_photo" @change="selectFile" type="file" name="file" style="display:none;" value="">
                <div id="errArea"> {{ infoMsg }}</div>
              </label>
            </v-input>
          </md-card-header>
          <md-button class="md-raised md-accent" @click="changeStaffProfile">変更</md-button>
          <md-button class="md-raised md-primary" @click="routerPush('/usertop')">キャンセル</md-button>
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
import { mapGetters } from 'vuex'

export default {
  name: 'UserTop',
  data(){
    return{
      datas: {
        shopName: this.$store.getters.user.shopName,
        name: this.$store.getters.user.name,
        message: this.$store.getters.user.message,
        shopImageURL_1: this.$store.getters.user.shopImageURL_1,
        shopImageName_1: this.$store.getters.user.shopImageURL_1,
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
    this.getShopImageURL()
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
    shopImageURL() {
      this.datas.shopImageURL_1 = this.$store.getters.shopImageURL
      this.getShopImageURL()
      console.log("shopImage更新");
    },

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
</style>
