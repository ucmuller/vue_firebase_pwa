<template>
  <div class="table">
    <md-table v-model="allReservationData" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="店名" md-sort-by="shop">{{ item.shopName }}</md-table-cell>
        <md-table-cell md-label="名前" md-sort-by="name">{{ item.staffName }}</md-table-cell>
        <md-table-cell md-label="人数" md-sort-by="email">{{ item.people }}</md-table-cell>
        <md-table-cell md-label="日付" md-sort-by="Date">{{ item.date }}　{{item.time}}〜</md-table-cell>
        <md-table-cell md-label="作成日" md-sort-by="createdAt" v-if="item.createdAt">{{ timeStamp(item.createdAt) }}</md-table-cell>
        <md-table-cell md-label="作成日" md-sort-by="createdAt" v-if="!item.createdAt"></md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import Firestore from '@/api/firebase/firestore'
import router from '@/router'
import { mapGetters } from 'vuex'

export default {
  name: 'IndividualReservationData',
  data(){
    return {
      id: this.$route.params.id,
      loading: false,
    }
  },

  created: function(){
    Firebase.onAuth()
    // this.loadingOverlay()
    this.getIndividualReservationData()
  },

  computed: {
    url(){
      return 'https://social-plugins.line.me/lineit/share?url=http://localhost:8080/userpage/' + this.id
    },
    ...mapGetters({
      allReservationData: 'allReservationData',
      userStatus: 'isSignedIn',
      user: 'user'
    })

  },

  watch: {
    data() {
      console.log("data")
    },
  },

  methods: {
    logout() {
      Firebase.logout();
    },
    getIndividualReservationData(){
      let uid = String(this.$route.params.id)
      Firestore.getIndividualReservationData(uid)
    },
    routerPush(router){
      this.$router.push(router)
    },
    timeStamp(time){
      let allReservationData = this.$store.getters.allReservationData
      let seconds
      allReservationData.forEach((data) => {
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
    }
  }
}
</script>

<style scoped>
.table {
  margin-bottom: 55px;
  margin-top: 50px;

}

</style>