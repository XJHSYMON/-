<template>
  <div class="l-row l-center" style="height: 100%;width: 150px;">
    <img :src="device.realImg" class="real-img" alt="">
  </div>
  <div class="l-col" style="width: 300px;">
    <div class="my-row">
      <div class="item-title">工作狀態：</div>
      <div class="item-value">
        <t-tag v-if="device.valueMap.onlineStatus===0" theme="default">關閉</t-tag>
        <t-tag v-if="device.valueMap.onlineStatus===1" theme="success">開啟</t-tag>
      </div>
    </div>
    <div class="my-row">
      <div class="item-title">設備網絡狀態：</div>
      <div class="item-value">
        <t-tag v-if="device.valueMap.onlineStatus===0" theme="default">離線</t-tag>
        <t-tag v-if="device.valueMap.onlineStatus!==0" theme="success">在線</t-tag>
      </div>
    </div>
    <div class="my-row">
      <div class="item-title">空氣質量（AQ）：</div>
      <div class="item-value">
        <t-tag theme="success">{{device.valueMap.airQuality}}</t-tag>
      </div>
    </div>
    <div class="my-row">
      <div class="item-title">天空亮度：</div>
      <div class="item-value">
        <t-tag theme="success" variant="outline">{{device.valueMap.skyBrightness}}</t-tag>
      </div>
    </div>
    <div class="my-row">
      <div class="item-title">工作電壓：</div>
      <div class="item-value">
        <t-tag theme="success" variant="outline">{{device.valueMap.workVoltage}} V</t-tag>
      </div>
    </div>
    <div class="my-row">
      <div class="item-title">紫外線強度：</div>
      <div class="item-value">
        <t-tag theme="warning">{{device.valueMap.uvLevel}}</t-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StreetLampInfoCard",
  props: {
    device: Object
  },
  mounted() {

  }
}
</script>

<style scoped>
.real-img {
  width: 50px;
}

.my-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
}

.item-title {
  font-size: 20px;
  color: #000000;
  margin: 0 10px;
}

.item-value {
  font-size: 20px;
  color: #1f4e7e;
}
</style>