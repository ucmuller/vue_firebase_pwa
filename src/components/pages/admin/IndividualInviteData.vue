<template>

  <div class="table" md-name="ori">
    <md-table v-model="data" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id">{{ item.inviteID }}</md-table-cell>
        <md-table-cell md-label="店名" md-sort-by="shop">{{ item.shopName }}</md-table-cell>
        <md-table-cell md-label="名前" md-sort-by="name">{{ item.staffName }}</md-table-cell>
        <md-table-cell md-label="人数" md-sort-by="email">{{ item.people }}</md-table-cell>
        <md-table-cell md-label="日付" md-sort-by="Date">{{ item.date }}　{{item.time}}〜</md-table-cell>
        <md-table-cell md-label="Flag" md-sort-by="Flag" v-if="item.inviteFlag == true">招待中</md-table-cell>
        <md-table-cell md-label="Flag" md-sort-by="Flag" v-if="item.inviteFlag == false">確定</md-table-cell>
        <md-table-cell md-label="作成日" md-sort-by="createdAt" v-if="item.createdAt">{{ timeStamp(item.createdAt) }}</md-table-cell>
        <md-table-cell md-label="作成日" md-sort-by="createdAt" v-if="!item.createdAt"></md-table-cell>
        <md-table-cell md-label="" md-sort-by="delete">
          <md-button @click="onModal(item.inviteID)" class="md-raised">削除</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog-confirm
      :md-active.sync="modal"
      md-title="削除してよろしいですか?"
      md-confirm-text="OK"
      md-cancel-text="キャンセル"
      @md-cancel="modal = false"
      @md-confirm="deleteDocument()" />
  </div>
</template>

<script>
import Firebase from '@/api/firebase/firebase'
import Firestore from '@/api/firebase/firestore'
import router from '@/router'
import { mapGetters } from 'vuex'

export default {
  name: 'IndividualInviteData',
  data(){
    return {
      id: this.$route.params.id,
      loading: false,
      modal: false,
      ID: null
    }
  },

  created: function(){
    Firebase.onAuth()
    // this.loadingOverlay()
    this.getIndividualInviteData()
  },

  computed: {
    url(){
      return 'https://social-plugins.line.me/lineit/share?url=http://localhost:8080/userpage/' + this.id
    },
    ...mapGetters({
      data: 'data',
      userStatus: 'isSignedIn',
      user: 'user',
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
    getIndividualInviteData(){
      let uid = String(this.$route.params.id)
      Firestore.getIndividualInviteData(uid)
    },
    routerPush(router){
      this.$router.push(router)
    }, 
    timeStamp(time){
      let everyInviteData = this.$store.getters.everyInviteData
      let seconds
      everyInviteData.forEach((data) => {
        if(data.createdAt == time){
            seconds = data.createdAt.seconds
        }
      })
      var d = new Date( seconds * 1000 );
      var year  = d.getFullYear();
      var month = d.getMonth() + 1;
      var day  = d.getDate();
      var hour = ( d.getHours() < 10 ) ? '0' + d.getHours()   : d.getHours();
      var min  = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
      var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
      return `${year}-${month}-${day} ${hour}:${min}:${sec}` 
    },
    onModal(inviteID){
      this.modal = true
      this.ID = inviteID
    },
    deleteDocument(){
      console.log(this.ID)
      this.modal = false
      Firestore.deleteInviteDocument(this.ID)
    }
  }
}
</script>

<style scoped>
.table {
  margin-bottom: 55px;
  margin-top: 50px;
}

.md-dialog-actions .md-button-content {
  color: black;
}
</style>