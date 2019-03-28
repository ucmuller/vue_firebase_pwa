<template>
  <md-card class="md-card" v-if="userStatus">
      <md-card-area md-inset>
        <md-card-media md-ratio="16:9">
          <img v-if="data.shopImageURL_1" :src="data.shopImageURL_1" alt="Coffee House">
          <img v-else src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="Coffee House">
        </md-card-media>
      </md-card-area>

      <md-card-content>
        <h3 class="md-subheading">Invite Detail</h3>
        <div class="card-reservation">
          <div class="md-layout-item">
          <md-field class="md-field">
            <label>店名</label>
            <md-input v-model="user.shopName"></md-input>
          </md-field>
          <md-field>
            <label>日付</label>
            <md-select v-model="data.date" id="date">
              <md-option :value="today">本日:{{today}}</md-option>
              <md-option :value="tomorrow">明日:{{tomorrow}}</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>時間</label>
            <md-select v-model="data.time" id="time">
              <md-option 
                v-for="(time, i) in times"
                :key="i" 
                :value="time">{{time}}
              </md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>ゲスト名</label>
            <md-input v-model="data.guestName"></md-input>
          </md-field>
          <md-field>
            <label>人数</label>
            <md-select v-model="data.people" id="people">
              <md-option 
                v-for="(people, i) in peoples"
                :key="i" 
                :value="people">{{people}}
              </md-option>            </md-select>
          </md-field>
          <md-field>
            <label>TEL</label>
            <md-input v-model="data.tel"></md-input>
          </md-field>
          <md-field>
            <label>メッセージ</label>
            <md-textarea v-model="data.lineMesseage"></md-textarea>
          </md-field>
          </div>
        </div>
      </md-card-content>
      <button @click="saveInviteData" class="line-button">LINE送信</button>
        <!-- <router-link :to="{name:'InviteList',params:{id:user.staff_uid}}">InviteList!</router-link> -->
    </md-card>
  <div v-else>
      <router-link to="/">sign in now!</router-link>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import Firestore from '@/api/firebase/firestore'
import router from '@/router'
import { mapGetters } from 'vuex'

export default {
  name: 'InviteForm',
  data() {
    return {
      data: {
        tel: '',
        date: '',
        time:'',
        guestName:'',
        people:'',
        shopName: '',
        lineMesseage: this.$store.getters.user.lineMesseage,
        shopImageURL_1: this.$store.getters.shopImageURL
      },
      today:`${new Date().getMonth()+1}/${new Date().getDate()}`,
      tomorrow: `${new Date().getMonth()+1}/${new Date().getDate() + 1}`,
      times:
        [
        "17:00","17:30",
        "18:00","18:30",
        "19:00","19:30",
        "20:00","20:30",
        "21:00","21:30",
        "22:00","22:30",
        "23:00","23:30",
        "24:00","24:30",
        ],
      peoples: [1,2,3,4,5,6,7,8,9,10],
      documentID: ''
    }
  },
  created: function(){
    Firebase.onAuth()
    this.getShopImageURL()
    console.log(this.userStatus)
  },
  computed: {
    ...mapGetters({
      userStatus: 'isSignedIn',
      user: 'user',
      shopImageURL: 'shopImageURL'
    }),
    url(){
      let domain = document.domain
      console.log(domain)
      if(domain == "localhost"){
        // return `https://social-plugins.line.me/lineit/share?url=http://localhost:8080/invitepage/${this.id}`
        return `http://line.me/R/msg/text/?${this.data.lineMesseage}%0D%0Ahttp://localhost:8080/invitepage/${this.documentID}`
      } else {
        // return `https://social-plugins.line.me/lineit/share?url=https://${domain}/invitepage/${this.id}`
        return `http://line.me/R/msg/text/?${this.data.lineMesseage}%0D%0Ahttps://${domain}/invitepage/${this.documentID}`
      }
    },
  },
  watch: {
    shopImageURL() {
      this.data.shopImageURL_1 = this.$store.getters.shopImageURL
      this.getShopImageURL()
      console.log("shopImage更新");
    },
  },
  methods: {
    logout() {
      Firebase.logout();
    },
    saveInviteData(){
      this.documentID = this.user.staff_uid + Date.now()
      Firestore.saveInviteData(this.user, this.data, this.documentID)
      Firestore.changeLineMesseageOfStaffData(this.user.staff_uid, this.data)
      this.launchLine()
      router.push({name:'InviteList',params:{id:this.$store.getters.user.staff_uid}})
    },
    getShopImageURL(){
      console.log(this.$store.getters.user.shopImageURL_1)
      Firebase.getShopImageURL(this.$store.getters.user.shopImageURL_1)
    },
    launchLine(){
      location.href = this.url;
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
.md-field{
  height: 10px;
  margin-bottom: 10px;
}
.md-has-textarea{
  height: 150px;
  margin-bottom: 10px;
}

.md-field:after {
  height: 0px;
  border-bottom: solid 1px #E0E0E0;
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
</style>
