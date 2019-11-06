<template>
  <div class="table">
    <md-table v-model="everyReservationData" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="店名" md-sort-by="shop">{{ item.shopName }}</md-table-cell>
        <md-table-cell md-label="名前" md-sort-by="name">{{ item.staffName }}</md-table-cell>
        <md-table-cell md-label="ゲスト" md-sort-by="guestName">{{ item.guestName }}</md-table-cell>
        <md-table-cell md-label="人数" md-sort-by="email">{{ item.people }}</md-table-cell>
        <md-table-cell md-label="日付" md-sort-by="Date">{{ item.date }}　{{item.time}}〜</md-table-cell>
        <md-table-cell md-label="招待作成日" md-sort-by="createdAt" v-if="item.createdAt">{{ timeStampOfInviteData(item.inviteId) }}</md-table-cell>
        <md-table-cell md-label="確定作成日" md-sort-by="createdAt" v-if="item.createdAt">{{ timeStampOfReservationData(item.createdAt) }}</md-table-cell>
        <md-table-cell md-label="作成日" md-sort-by="createdAt" v-if="!item.createdAt"></md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import Firebase from '@/api/firebase/firebase'
import Firestore from '@/api/firebase/firestore'
import router from '@/router'
import { mapGetters } from 'vuex'
export default {
  name: 'StaffList',

  created: function(){
    this.fetchAllInviteData()
    this.fetchAllReservationData()
  },

  computed: {
    ...mapGetters({
      everyStaffData: 'everyStaffData',
      everyInviteData: 'everyInviteData',
      everyReservationData: 'everyReservationData',
    }),

    
  },

  methods: {
    fetchAllStaffData(){
      Firestore.fetchAllStaffData()
    },
    fetchAllInviteData(){
      Firestore.fetchAllInviteData()
    },
    fetchAllReservationData(){
      Firestore.fetchAllReservationData()
    },
    numberOfInvite(uid){
      let invite = this.$store.getters.everyInviteData
      let inviteArray = []
      invite.forEach((data)=>{
        if(uid == data.from_uid){
          inviteArray.push(data)
        }
      })
      return inviteArray.length
    },
    timeStampOfReservationData(time){
      let everyReservationData = this.$store.getters.everyReservationData
      let seconds
      everyReservationData.forEach((data) => {
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
    timeStampOfInviteData(id){
      let everyInviteData = this.$store.getters.everyInviteData
      let seconds
      everyInviteData.forEach((data) => {
        if(data.id == id){
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
      return year ? `${year}-${month}-${day} ${hour}:${min}:${sec}` : "招待中"
    }

  }
}
</script>

<style scoped>
.table {
  margin-bottom: 55px;
}
</style>
