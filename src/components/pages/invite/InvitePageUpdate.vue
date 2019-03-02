<template>
<div>
  <md-card class="md-card" v-if="dataStatus">
    <md-card-area md-inset>
      <!-- <md-card-media md-ratio="16:9">
        <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="Coffee House">
      </md-card-media> -->

      <md-card-header>
        <h2 class="md-title">{{inviteData.shopName}}</h2>
        <div class="md-subhead">
          <!-- <md-icon>location_on</md-icon>
          <span>2 miles</span> -->
        </div>
      </md-card-header>
    </md-card-area>

    <md-card-content>
      <h1 class="md-title">{{inviteData.staffName}}さんからの招待</h1>
      <div class="card-reservation">
        <md-list class="md-double-line"
          v-for="(data, i) in getEachData"
            :key="i"
            >
          <md-list-item>
            <!-- <md-field>
              <div>
                <label>{{data.text}}</label>
                <md-input v-model="datas[i].value"></md-input>
              </div>
            </md-field> -->
            <md-field>
              <div>
                <label>{{data.value}}</label>

                <md-input v-if="!data.time  && !data.date && !data.peoples" v-model="datas[i].value"></md-input>
                
                <div v-if="data.time">
                  <md-select v-model="datas[i].value" id="time">
                    <md-option 
                      v-for="(time, j) in data.time"
                      :key="j" 
                      :value="time">{{time}}
                    </md-option>
                  </md-select>
                </div>
                <div v-if="data.date">
                  <md-select v-model="datas[i].value" id="date">
                    <md-option 
                      v-for="(date, k) in data.date"
                      :key="k" 
                      :value="date">{{date}}
                    </md-option>
                  </md-select>
                </div>
                <div v-if="data.peoples">
                  <md-select v-model="datas[i].value" id="date">
                    <md-option 
                      v-for="(people, k) in data.peoples"
                      :key="k" 
                      :value="people">{{people}}
                    </md-option>
                  </md-select>
                </div>
              </div>
              </md-field>
          </md-list-item>
        </md-list>
      </div>
    </md-card-content>
  <!-- 
    <md-card-actions>
    </md-card-actions> -->
    <div v-if="inviteData.inviteFlag">
      <md-button class="md-raised" @click="routerPush({name:'InvitePage',params:{id:id}})">キャンセル</md-button>
      <md-button class="md-raised md-accent" @click="changeInviteEachData">変更</md-button>
    </div>
    <md-dialog-confirm
        :md-active.sync="active"
        md-title="招待内容を変更しました。"
        md-confirm-text="招待ページに戻る"
        md-cancel-text="閉じる"
        @md-cancel="onInvitePage"
        @md-confirm="onInvitePage" />
  </md-card>
  <div class="loading-overlay" v-if="loading">
    <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
  </div>
</div>
</template>

<script>

// import { mapActions, mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import Firestore from '@/api/firebase/firestore'
import OAuth from "@/components/OAuth";
import { mapGetters } from 'vuex'

export default {
  name: 'UserPage',

  components: {
    OAuth
  },

  data(){
    return {
        id: this.$route.params.id,
        inviteFlag: true,
        loading: false,
        active: false,
        datas:  [
        {
          value: this.$store.getters.inviteData.guestName,
        },
        {
          value: this.$store.getters.inviteData.people,
        },
        {
          value: this.$store.getters.inviteData.date,
        },
        {
          value: this.$store.getters.inviteData.time,
        },
        {
          value: this.$store.getters.inviteData.tel,
        },
      ]
    }
  },

  created: function(){
    Firebase.onAuth()
    this.loadingOverlay()
    this.getInviteEachData()
    console.log(new Date().getDate())
  },

  computed: {
    url(){
      let domain = document.domain
      console.log(domain)
      if(domain == "localhost"){
        return `https://social-plugins.line.me/lineit/share?url=http://localhost:8080/invitepage/${this.id}`
      } else {
        return `https://social-plugins.line.me/lineit/share?url=https://${domain}/invitepage/${this.id}`
      }
    },
    getEachData() {
      let date = new Date()
      let today = `${date.getMonth()+1}/${date.getDate()}`
      let tomorrow = `${date.getMonth()+1}/${date.getDate() + 1}`
     let datas =  [
        {
          text: 'name',
          value: this.$store.getters.inviteData.guestName + '様',
          icon: 'account_circle'
        },
        {
          text: '人数',
          value: this.$store.getters.inviteData.people + '名様',
          icon: 'people',
          peoples: [1,2,3,4,5,6,7,8,9,10]
        },
        {
          text: '日付',
          value: this.$store.getters.inviteData.date,
          icon: 'calendar_today',
          date: [today,tomorrow]
        },
        {
          text: '時間',
          value: this.$store.getters.inviteData.time + '〜',
          icon: 'access_time',
          time:
            [
            "17:00","17:30",
            "18:00","18:30",
            "19:00","19:30",
            "20:00","20:30",
            "21:00","21:30",
            "22:00","22:30",
            "23:00","23:30",
            "24:00","24:30",
            ]
        },
        {
          text: 'TEL',
          value: this.$store.getters.inviteData.tel,
          icon: 'phone_in_talk'
        },
      ]
      return datas
    },
    ...mapGetters({
      dataStatus: 'inviteDataStatus',
      userStatus: 'isSignedIn',
      user: 'user',
      inviteData: 'inviteData',
    })
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
      console.log(this.$store.getters.inviteData, this.$route.params.id)
      Firestore.saveReservationData(this.$store.getters.inviteData, this.$route.params.id)
      Firestore.inviteCompletion(this.$route.params.id)
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
    changeInviteEachData(){
      let changeData = {
        'time': this.datas[3].value,
        'date': this.datas[2].value,
        'guestName': this.datas[0].value,
        'people': this.datas[1].value,
        'tel': this.datas[4].value,
      }
      Firestore.changeInviteData(this.$route.params.id, changeData)
      this.active = true
    },
    onInviteList(){
      this.routerPush({name:'InviteList',params:{id:this.user.staff_uid}})
    },
    onInvitePage(){
      this.routerPush({name:'InvitePage',params:{id:this.id}})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: black;
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

.md-field{
  height: 10px;
  margin-bottom: 10px;
}

.md-list-item {
    height: 55px;
}

.md-button.md-theme-default.md-raised:not([disabled]).md-accent {
    color: white;
}
</style>
