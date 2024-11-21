<template>
  <div ref="main" style="height: 1300px;width: 1300px"></div>
</template>

<script>
import * as echarts from 'echarts';
import {MessagePlugin} from "tdesign-vue-next"
import {
  TitleComponent,
  TooltipComponent,
  GeoComponent
} from 'echarts/components';
import {LinesChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import axios from 'axios';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GeoComponent,
  LinesChart,
  CanvasRenderer,
  MessagePlugin
]);

export default {
  name: "Map.vue",
  components: {
    TitleComponent,
    TooltipComponent,
    GeoComponent
  },
  data() {
    return {
      chartDom:undefined,
      myChart:undefined,
    }
  },
  created() {

  },
  mounted() {
    this.chartDom = this.$refs.main;
    this.myChart = echarts.init(this.chartDom);
    this.getSVG();

    // this.initMap(svg);
  },
  methods: {
    getSVG(){
      axios.get('/localFileAPI/test4.svg')
          .then(response => {
            this.initMap(response.data)
          })
    },
    initMap(svg) {
      echarts.registerMap('test', {svg});
      let option = {
        title: {
          text: 'Visit Route',
          left: 'center',
          bottom: 10
        },
        tooltip: {},
        geo: {
          map: 'test',
          roam: true,
          emphasis: {
            itemStyle: {
              color: undefined
            },
            label: {
              show: false
            }
          }
        },
      };
      this.myChart.setOption(option);
      this.myChart.on('click', function (params) {
        let str = "您选择了：";
        str = str + params.name;
        MessagePlugin.success({content: str, duration: 1000})
        console.log('selected', params);
        console.log('selected', params.data);

      });
      option && this.myChart.setOption(option);
    }
  },
}
</script>

<style scoped src="./../assets/css/Map.css"></style>