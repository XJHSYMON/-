<template>
  <div id="container"></div>
  <t-dialog v-model:visible="modelDialogVisible"
            width="fit-content"
            :showOverlay="false"
            :header="currentObj.name">
    <div class="l-row">
      <street-lamp-info-card :device="currentObj" v-if="currentObj.type === 'street-lamp'"></street-lamp-info-card>
      <gate-info-card :device="currentObj" v-if="currentObj.type === 'gate'"></gate-info-card>
      <flat-info-card :device="currentObj" v-if="currentObj.type === 'flat'"></flat-info-card>
      <road-camera :device="currentObj" v-if="currentObj.type === 'road-camera'"></road-camera>
      <road-postcard :device="currentObj" v-if="currentObj.type === 'road-postcard'"></road-postcard>
      <shop711 :device="currentObj" v-if="currentObj.type === 'shop-711'"></shop711>
      <weather-station :device="currentObj" v-if="currentObj.type === 'weather-station'"></weather-station>
    </div>
  </t-dialog>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import {shallowRef} from '@vue/reactivity'
import {MessagePlugin} from "tdesign-vue-next";
import StreetLampInfoCard from "@/components/device-info-card/StreetLampInfoCard.vue";
import GateInfoCard from "@/components/device-info-card/GateInfoCard.vue";
import FlatInfoCard from "@/components/device-info-card/FlatInfoCard.vue"
import RoadCamera from "@/components/device-info-card/RoadCamera.vue"
import RoadPostcard from "@/components/device-info-card/RoadPostcard.vue";
import Shop711 from "@/components/device-info-card/Shop711.vue";
import WeatherStation from "@/components/device-info-card/WeatherStation.vue";
import * as echarts from 'echarts';

const map = shallowRef(null);
const data = require("./../assets/data/markers")
let markerList = data.markerList;
let imgResMap = {
  "street-lamp": {
    offset: [-17, -42.5],
    src: "https://letoy-resource-1311015785.cos.ap-nanjing.myqcloud.com/MacauCommunity%2Fpics%2Fstreet-lamp.png",
    htmlClass: "marker-img-street-lamp"
  },
  "gate": {
    offset: [-20, -20.45],
    src: "https://letoy-resource-1311015785.cos.ap-nanjing.myqcloud.com/MacauCommunity%2Fpics%2Fgate.png",
    htmlClass: "marker-img-gate"
  },
  "flat": {
    offset: [-20, -20],
    src: "https://letoy-resource-1311015785.cos.ap-nanjing.myqcloud.com/MacauCommunity%2Fpics%2Fflat.png",
    htmlClass: "flat"
  },
  "shop-711": {
    offset: [-20, -15],
    src: "https://letoy-resource-1311015785.cos.ap-nanjing.myqcloud.com/MacauCommunity%2Fpics%2F711.png",
    htmlClass: "shop-711"
  },
  "road-postcard": {
    offset: [-25, -14.25],
    src: "https://letoy-resource-1311015785.cos.ap-nanjing.myqcloud.com/MacauCommunity%2Fpics%2Froad-postcard.png",
    htmlClass: "road-postcard"
  },
  "road-camera": {
    offset: [-20, -26],
    src: "https://letoy-resource-1311015785.cos.ap-nanjing.myqcloud.com/MacauCommunity%2Fpics%2Froad-camera.png",
    htmlClass: "road-camera"
  },
  "weather-station": {
    offset: [-12, -42.5],
    src: "https://letoy-resource-1311015785.cos.ap-nanjing.myqcloud.com/MacauCommunity%2Fpics%2Fweather-station.png",
    htmlClass: "weather-station"
  }
}
export default {
  name: "Map.vue",
  components: {
    StreetLampInfoCard,
    GateInfoCard,
    FlatInfoCard,
    RoadCamera,
    RoadPostcard,
    Shop711,
    WeatherStation
  },
  data() {
    return {
      map: null,
      aMap: null,
      makers: [],
      modelDialogVisible: false,
      gateDialogVisible: false,
      currentObj: {
        name: "",
        valueMap: {}
      }
    }
  },
  created() {
    window.openDialog = this.openDialog
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "dc976fd5bb1601621688623f0ca4dda2",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.aMap = AMap
        this.map = new AMap.Map("container", {  //设置地图容器id
          viewMode: "3D",    //是否为3D地图模式
          zoom: 19,           //初始化地图级别
          center: [113.562276, 22.16136], //初始化地图中心点位置
        });
        this.map.on('click', (e) => {
          if (!e && !e.lnglat) {
            return
          }
          console.log(e.lnglat.lng + "," + e.lnglat.lat);
          // this.createNewMarker(e.lnglat.lng, e.lnglat.lat);
        })
        this.readMarkers();
      }).catch(e => {
        console.log(e);
      })
    },
    createMarkers(type, x, y, index) {
      let AMap = this.aMap;
      const markerContent = '' +
          '<div class="marker-box" onclick="openDialog(' + index + ')">' +
          '   <img class="' + imgResMap[type].htmlClass + '" src="' + imgResMap[type].src + '" alt="">' +
          '</div>';
      const position = new AMap.LngLat(x, y); // Marker经纬度
      return new AMap.Marker({
        position: position,
        content: markerContent, // 将 html 传给 content
        offset: new AMap.Pixel(imgResMap[type].offset[0], imgResMap[type].offset[1]) // 以 icon 的 [center bottom] 为原点
      });
    },
    readMarkers() {
      let index = 0;
      markerList.forEach((item) => {
        let obj = this.createMarkers(item.type, item.positions[0], item.positions[1], index);
        this.map.add(obj);
        index++;
      })
    },
    openDialog(index) {
      console.log(markerList[index])
      this.currentObj = markerList[index]
      this.modelDialogVisible = true
    },
    createNewMarker(x, y) {
      let obj = this.createMarkers("street-lamp", x, y, markerList.length);
      this.map.add(obj);
      markerList.push({
        positions: [x, y]
      })
    }
  },
}
</script>

<style scoped src="./../assets/css/Map.css"></style>
<style>
.marker-img-street-lamp {
  width: 14px;
  height: 65px;
}

.marker-img-gate {
  width: 40px;
  height: fit-content;
}

.flat {
  width: 40px;
  height: 40px;
}
.shop-711{
  width: 40px;
  height: 30px;
}
.road-postcard{
  width: 50px;
  height: 28.5px;
}
.road-camera{
  width: 40px;
  height: 52px;
}
.weather-station{
  width: 24px;
  height: 85.5px;
}

.marker-box {
  padding: 10px;
  border-radius: 5px;
  transition: 0.5s;
}

.marker-box:hover {
  background: #c2c2c2;
}

</style>