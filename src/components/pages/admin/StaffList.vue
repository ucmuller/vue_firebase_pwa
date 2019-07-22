<template>
  <div class="table">
    <md-table md-card>
      <md-table-row slot="md-table-row">
        <md-table-cell md-label="全招待数">全招待数:{{everyInviteData.length}}</md-table-cell>
        <md-table-cell md-label="全確約数">全確約数:{{everyReservationData.length}}</md-table-cell>
        <md-table-cell md-label="成約率">確定率:{{rate}}%</md-table-cell>
        <md-table-cell md-label="確定人数">確定人数:{{confirmedGuest}}</md-table-cell>
        <md-table-cell md-label="想定金額">想定金額:{{confirmedGuest * 300}}円</md-table-cell>
      </md-table-row>
    </md-table>
    <md-table v-model="everyStaffData" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="店名" md-sort-by="shop">{{ item.shopName }}</md-table-cell>
        <md-table-cell md-label="名前" md-sort-by="name">{{ item.name }}</md-table-cell>
        <!-- <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell> -->
        <md-table-cell md-label="招待数" md-sort-by="invite">{{ numberOfInvite(item.staff_uid) }}</md-table-cell>
        <!-- <md-table-cell md-label="招待中" md-sort-by="stillInvite">{{ numberOfStillInvite(item.staff_uid) }}</md-table-cell> -->
        <md-table-cell md-label="確定数" md-sort-by="Reservation">{{ numberOfReservation(item.staff_uid) }}</md-table-cell>
        <md-table-cell md-label="成約率" md-sort-by="Rate">{{ reservationRate(item.staff_uid) }}%</md-table-cell>
        <md-table-cell md-label="確定人数">{{ numberOfConfirmedGuest(item.staff_uid) }}</md-table-cell>
        <md-table-cell md-label="想定金額">{{ nominalPrice(item.staff_uid) }}円</md-table-cell>
        <md-table-cell md-label="作成日" md-sort-by="createdAt" v-if="item.createdAt">{{ timeStamp(item.createdAt) }}</md-table-cell>
        <md-table-cell md-label="作成日" md-sort-by="createdAt" v-if="!item.createdAt"></md-table-cell>
        <md-table-cell md-label="" md-sort-by="shop">
          <md-button @click="routerPush({name:'IndividualInviteData',params:{id:item.staff_uid}})" class="md-raised">招待リスト</md-button>
        </md-table-cell>
        <md-table-cell md-label="" md-sort-by="shop">
          <md-button @click="routerPush({name:'IndividualReservationData',params:{id:item.staff_uid}})" class="md-raised">確約リスト</md-button>
        </md-table-cell>
        <md-table-cell md-label="" md-sort-by="delete">
          <md-button @click="onModal(item.staff_uid)" class="md-raised">削除</md-button>
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
  name: 'StaffList',

  data(){
    return {
      modal: false,
      ID: null
    }
  },

  created: function(){
    this.fetchAllStaffData()
    this.fetchAllInviteData()
    this.fetchAllReservationData()
  },

  computed: {
    ...mapGetters({
      everyStaffData: 'everyStaffData',
      everyInviteData: 'everyInviteData',
      everyReservationData: 'everyReservationData',
      confirmedGuest: 'confirmedGuest'
    }),
    rate(){
      let rate = this.$store.getters.everyReservationData.length / this.$store.getters.everyInviteData.length * 100
      return rate.toFixed(2)
    }
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
    numberOfReservation(uid){
      let Reservation = this.$store.getters.everyReservationData
      let ReservationArray = []
      Reservation.forEach((data)=>{
        if(uid == data.from_uid){
          ReservationArray.push(data)
        }
      })
      return ReservationArray.length
    },
    numberOfConfirmedGuest(uid){
      let Reservation = this.$store.getters.everyReservationData
      let confirmedGuest = 0
      Reservation.forEach((data)=>{
        if(uid == data.from_uid){
          confirmedGuest += data.people
        }
      })
      return confirmedGuest
    },
    nominalPrice(uid){
      let Reservation = this.$store.getters.everyReservationData
      let confirmedGuest = 0
      Reservation.forEach((data)=>{
        if(uid == data.from_uid){
          confirmedGuest += data.people
        }
      })
      return confirmedGuest * 300
    },
    numberOfStillInvite(uid){
      return this.numberOfInvite(uid) - this.numberOfReservation(uid)
    },
    reservationRate(uid){
      let rate =  this.numberOfReservation(uid) / this.numberOfInvite(uid) * 100
      return rate.toFixed(2)
    },
    timeStamp(time){
      let everyStaffData = this.$store.getters.everyStaffData
      let seconds
      everyStaffData.forEach((data) => {
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
    routerPush(router){
      this.$router.push(router)
    },
    onModal(staff_uid){
      this.modal = true
      this.ID = staff_uid
    },
    deleteDocument(){
      console.log(this.ID)
      this.modal = false
      Firestore.deleteStaffDocument(this.ID)
    }
  }
}
</script>

<style scoped>
.table {
  
  margin-bottom: 55px;
}
</style>
