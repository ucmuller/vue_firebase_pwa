<template>
    <div class="phone-viewport" v-if="userStatus">
      <md-bottom-bar class="md-primary bottom-bar" md-type="shift">
        <div class="bottom-bar-item">
          <md-bottom-bar-item @click="routerPush('/usertop')" id="bottom-bar-item-account">
            <md-icon>account_circle</md-icon>
            <span class="md-bottom-bar-label">プロフィール</span>
          </md-bottom-bar-item>
          <md-bottom-bar-item @click="routerPush('/inviteform')" id="bottom-bar-item-invite" md-label="inviteForm">
            <md-icon>email</md-icon>
            <span class="md-bottom-bar-label">招待作成</span>
          </md-bottom-bar-item>
          <md-bottom-bar-item @click="routerPush({name:'InviteList',params:{id:user.staff_uid}})" id="bottom-bar-item-playlist">
            <md-icon>playlist_add_check</md-icon>
            <span class="md-bottom-bar-label">招待リスト</span>
            <i class="badge" v-if="inviteDataLength">{{ inviteDataLength }}</i>
          </md-bottom-bar-item>
          <md-bottom-bar-item @click="routerPush({name:'ReservationList',params:{id:user.staff_uid}})" id="bottom-bar-item-pages">
            <md-icon>assignment</md-icon>
            <span class="md-bottom-bar-label">予約リスト</span>
            <i class="badge" v-if="reservationdataLength">{{ reservationdataLength }}</i>
          </md-bottom-bar-item>
        </div>
      </md-bottom-bar>
    </div>
</template>

<script>
import router from 'vue-router'
import { mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import Firestore from '@/api/firebase/firestore'


export default {
  name: 'Shift',
  created() {
    // Firebase.onAuth()
  },
  methods: {
    routerPush(router){
      this.$router.push(router)
    },
    getInviteData(){
      Firestore.getInviteData(this.user.staff_uid)
    },
    getReservationData(){
      Firestore.getReservationData(this.user.staff_uid)
    },
  },
  computed: {
    ...mapGetters({
      reservationdataLength: 'reservationdataLength',
      inviteDataLength: 'inviteDataLength',
      userStatus: 'isSignedIn',
      user: 'user',
      inviteData: 'inviteData',
    })
  },
  // watch: {
  //   user(){
  //     this.getInviteData()
  //     this.getReservationData()
  //   }
  // },
}
</script>

<style scoped>

  .phone-viewport {
    height: 57px;
    align-items: center;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
    position: fixed;
    bottom:-1px;
    width: 100%;
    z-index: 2;
    justify-content: center;
  }
  .bottom-bar-item{
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .badge {
    width: 19px;
    height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 6px;
    right: 6px;
    background: #FB6359;
    border-radius: 100%;
    color: white;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: -.05em;
    font-family: 'Roboto Mono', monospace;
  }

</style>