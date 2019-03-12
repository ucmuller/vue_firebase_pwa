<template>
  <div>
    <md-tabs md-sync-route class="md-primary">
      <md-tab id="tab-staff" md-label="Staff" to="/admintop/stafflist"></md-tab>
      <md-tab id="tab-invite" md-label="Invite" to="/admintop/invitedata"></md-tab>
      <md-tab id="tab-reservation" md-label="Reservation" to="/admintop/reservationdata"></md-tab>
      <!-- <md-tab id="tab-home" md-label="Home" to="/admintop/stafflist"></md-tab>
      <md-tab id="tab-home" md-label="Home" to="/admintop/stafflist"></md-tab> -->
    </md-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
 export default {
    name: 'TabRouter',
    methods: {

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
