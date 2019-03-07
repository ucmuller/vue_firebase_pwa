<template>
  <md-card class="md-card" v-if="userStatus">
      <md-card-area md-inset>
        <md-card-media md-ratio="16:9">
          <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="Coffee House">
        </md-card-media>

        <!-- <md-card-header>
          <h2 class="md-title">{{user.shopName}}</h2>
          <div class="md-subhead">
            <md-icon>location_on</md-icon>
            <span>2 miles</span>
          </div>
        </md-card-header> -->
        <!-- <md-card-content>
          Shop Detail Shop Detail 
          Shop Detail Shop Detail 
        </md-card-content> -->
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

      <md-card-actions>
        <md-button @click="saveInviteData" class="md-raised md-accent">予約リストに追加</md-button>
        <!-- <router-link :to="{name:'InviteList',params:{id:user.staff_uid}}">InviteList!</router-link> -->
      </md-card-actions>
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
        lineMesseage: ''
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
    }
  },
  created: function(){
    Firebase.onAuth()
    console.log(this.userStatus)
  },
  computed: {
    user() {
      this.shopName = this.$store.getters.user.shopName
      return this.$store.getters.user;
    },
    userStatus() {
      return this.$store.getters.isSignedIn;
    }
  },
  methods: {
    logout() {
      Firebase.logout();
    },
    saveInviteData(){
      Firestore.saveInviteData(this.user, this.data)
      console.log(this.$store.getters.user.shopName)
      router.push({name:'InviteList',params:{id:this.$store.getters.user.staff_uid}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: #42b983;
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
