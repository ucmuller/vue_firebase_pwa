<template>
  <section class="container">
    <ul>
    </ul>
    <h1>{{dataType.selectType}}</h1>
            <md-field>
          <label for="month">Month</label>
          <md-select v-model="month" name="month" id="month">
            <md-option value=1>January</md-option>
            <md-option value=2>February</md-option>
            <md-option value=3>March</md-option>
            <md-option value=4>April</md-option>
            <md-option value=5>May</md-option>
            <md-option value=6>June</md-option>
            <md-option value=7>July</md-option>
            <md-option value=8>August</md-option>
            <md-option value=9>September</md-option>
          </md-select>
        </md-field>
    <div class="columns">
      <div class="column">
        <bar-chart :chart-data="datacollection"></bar-chart>
      </div>
    </div>
  </section>
</template>
<script>
import BarChart from '@/components/chart/BarChart'
// import BubbleChart from '@/components/BubbleChart'
// import Reactive from '@/components/Reactive'

export default {
  name: 'VueChart',
  components: {
    BarChart,
  },
  data(){
    return {
      datacollection: null,
      month: 9
    }
  },
  props: {
    dataType: {
      selectType: '',
      selectMonth: ''
    }
  },
  created () { 
  //anytime the vue instance is created, call the fillData() function.
    this.fillData()
  },
  methods: {
    setInitialDateValue(){
      let initialDateValue = []
        for(let i = 1; i <= 31; i++){
          initialDateValue.push(0)
        }
      return initialDateValue
    },
    fillData () {
      this.datacollection = {
        // Data for the y-axis of the chart
        labels: this.setDate(),
        datasets: [
          {
            label: this.dataType.selectType,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: this.selectChartData(Number(this.month))
          }
        ]
      }
    },

    setDate(){
      let defaultDate = []
        for(let i = 1; i <= 31; i++){
          defaultDate.push(i)
        }
      return defaultDate
    },

    selectChartData(selectMonth){
      // console.log(this.$store.getters.everyStaffData)
      let DateValue = this.setInitialDateValue()
      let Data
      if(this.dataType.selectType == 'staff'){
        Data = this.$store.getters.everyStaffData
      } else if (this.dataType.selectType == 'invitation'){
        Data = this.$store.getters.everyInviteData
      } else if (this.dataType.selectType == 'reservation'){
        Data = this.$store.getters.everyReservationData
      }
      Data.forEach((data) => {
        var d = new Date( data.createdAt.seconds * 1000 );
        var month = d.getMonth() + 1;
        var day  = d.getDate();
        if(month == selectMonth){
          DateValue[day-1] += 1
        }
      })
      return DateValue
    },

    setInitialDateValue(){
      let initialDateValue = []
        for(let i = 1; i <= 31; i++){
          initialDateValue.push(0)
        }
      return initialDateValue
    }
  },
  watch: {
    '$props': {
      handler: function(){
        this.fillData()
      },
      deep: true
    },
    month: {
      handler: function(){
        this.fillData()
      },
      deep: true
    },

  },
}

</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
  .md-field {
    max-width: 300px;
  }
</style>