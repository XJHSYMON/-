<template>
  <div class="l-row">
    <div class="l-col" style="width: 100%;margin-right: 35px">
      <div class="device-card-title">閘機實拍圖</div>
      <img :src="device.realImg" class="real-img" alt="">
    </div>

    <div class="l-col">
      <div id="main" style="width: 600px;height: 400px"></div>
    </div>
  </div>

</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "StreetLampInfoCard",
  props: {
    device: Object
  },
  mounted() {
    this.initChart()
  },
  methods:{
    initChart(){
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '人流量統計',
          // subtext: 'Fake Data'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // prettier-ignore
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 人'
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 6,
              color: 'green'
            },
            {
              gt: 6,
              lte: 8,
              color: 'red'
            },
            {
              gt: 8,
              lte: 14,
              color: 'green'
            },
            {
              gt: 14,
              lte: 17,
              color: 'red'
            },
            {
              gt: 17,
              color: 'green'
            }
          ]
        },
        series: [
          {
            name: '通行人數',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [10, 30, 60, 120, 200, 180, 190, 340, 400, 420, 430, 500, 600, 700, 850, 900, 1110, 1500, 1520, 1540],
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: [
                [
                  {
                    name: '早高峰',
                    xAxis: '07:30'
                  },
                  {
                    xAxis: '10:00'
                  }
                ],
                [
                  {
                    name: '晚高峰',
                    xAxis: '17:30'
                  },
                  {
                    xAxis: '21:15'
                  }
                ]
              ]
            }
          }
        ]
      };

      option && myChart.setOption(option);

    }

  }
}
</script>

<style scoped>
.real-img {
  width: 350px;
  border-radius: 15px;
}
.device-card-title{
  font-size: 20px;
  color: #000000;
  margin-bottom: 20px;;
}
</style>