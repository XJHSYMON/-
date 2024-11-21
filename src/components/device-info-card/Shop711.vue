<template>
  <div class="l-row l-center" style="height: 100%;width: 350px;">
    <img :src="device.realImg" class="real-img" alt="">
  </div>
  <div class="l-col" style="width: 300px;">
    <div class="my-row">
      <div class="item-title">客流量（人/日）：</div>
      <div class="item-value">323</div>
    </div>
    <div class="my-row">
      <div class="item-title">當地排名：</div>
      <div class="item-value"><t-tag theme="warning">32</t-tag></div>
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
  width: 300px;
  border-radius: 15px;
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