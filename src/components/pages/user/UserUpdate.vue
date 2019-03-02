<template>
  <div v-if="userStatus">
      <md-card class="md-card">
        <md-avatar class="md-large">
          <img :src="photo" alt="">
        </md-avatar>
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
                <md-input v-model="datas.messeage"></md-input>
              </div>
            </md-field>
          </md-card-header>
          <md-button class="md-raised md-accent" @click="changeStaffProfile">変更</md-button>
          <md-button class="md-raised md-primary" @click="routerPush('/usertop')">キャンセル</md-button>
      </md-card>
    </div>
  <div class="messeage" v-else>
      <router-link to="/">ブラウザがシークレットモードだと再ログインが必要です</router-link>
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
        messeage: this.$store.getters.user.messeage,
      },
      email:'',
      password:'',
      photoURL:'',
      updateStatus: false
    }
  },

  created: function(){
    Firebase.onAuth()
  },

  computed: {
    photo(){
      return this.$store.getters.imageURL;
    },
    ...mapGetters({
      photo: 'imageURL',
      userStatus: 'isSignedIn',
      user: 'user'
    })
  },
  watch: {
    user() {
      console.log("ユーザーデータ更新");
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
    changeStaffProfile(){
      Firebase.changeStaffProfile(this.user.staff_uid, this.datas)
      console.log(this.user.staff_uid,this.datas)
      this.$router.push("/usertop")

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
</style>
