<template>
  <div class="l-row l-center" style="height: 100%;width: 300px;">
    <img :src="device.realImg" class="real-img" alt="">
  </div>
  <div class="l-col" style="width: 300px;">
    <div class="my-row">
      <div class="item-title">今日車流量（輛）：</div>
      <div class="item-value">54,323</div>
    </div>
    <div class="my-row">
      <div class="item-title">附近道路擁擠程度（級）：</div>
      <div class="item-value"><t-tag theme="success">5</t-tag></div>
    </div>
    <div class="my-row">
      <div class="item-title">違章率（100車）：</div>
      <div class="item-value"><t-tag theme="success">4.5</t-tag></div>
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
  width: 250px;
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