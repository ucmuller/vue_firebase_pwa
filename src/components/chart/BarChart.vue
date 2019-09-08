<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Bar,
  mixins: [reactiveProp],
  data () {
    return {
      //Chart.js options that control the appearance of the chart
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options) 
  },

  // methods: {
  //   setCurrentChartData(){
  //     this.renderChart({
  //     labels: this.setDate(),
  //     datasets: [
  //       {
  //         label: 'Data',
  //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //         borderColor: 'rgba(255, 99, 132, 1)',
  //         borderWidth: 1,
  //         data: this.setChartData
  //       }
  //     ]
  //   }, {responsive: true, maintainAspectRatio: false})
  //   },
  //   setDate(){
  //     let defaultDate = []
  //       for(let i = 1; i <= 31; i++){
  //         defaultDate.push(i)
  //       }
  //     return defaultDate
  //   },

  // }
}
</script>

<style scoped>
</style>