<template>
  <div>
    <md-tabs md-sync-route class="md-primary">
      <md-tab id="tab-staff" md-label="Staff" @click="routerPush('/admintop/stafflist', 'staff')"></md-tab>
      <md-tab id="tab-invite" md-label="Invite" @click="routerPush('/admintop/invitedata', 'invitation')"></md-tab>
      <md-tab id="tab-reservation" md-label="Reservation" @click="routerPush('/admintop/reservationdata', 'reservation')"></md-tab>
      <!-- <md-tab id="tab-home" md-label="Home" to="/admintop/stafflist"></md-tab>
      <md-tab id="tab-home" md-label="Home" to="/admintop/stafflist"></md-tab> -->
    </md-tabs>
    <vue-chart class="vue-chart" :dataType= 'currentData'></vue-chart>
    <router-view></router-view>
  </div>
</template>

<script>
import VueChart from '@/components/chart/VueChart'
 export default {
   components:{VueChart},
    name: 'TabRouter',
    data() {
      return {
        currentData: {
          selectType: 'staff',
          selectMonth: 11
        },
      }
    },
    methods: {
      routerPush(router, type){
        this.$router.push(router)
        this.currentData.selectType = type
    },
    },
    computed:{

    }
  }
</script>

<style scoped>
.md-tabs{
  margin-top: 60px;
  z-index: 1;

}

div.md-content {
  z-index: 1;
}

</style>
