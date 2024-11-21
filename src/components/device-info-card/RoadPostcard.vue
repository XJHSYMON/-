<template>
  <div class="l-row l-center" style="height: 100%;width: 300px;">
    <img :src="device.realImg" class="real-img" alt="">
  </div>
  <div class="l-col" style="width: 300px;">
    <div class="my-row">
      <div class="item-title">使用量（今日）：</div>
      <div class="item-value">13,423 次</div>
    </div>

    <div class="my-row">
      <div class="item-title">客流量（人）：</div>
      <div class="item-value">45,265</div>
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