<template>
  <div class="l-row l-center" style="width: 200px">
    <img :src="device.realImg" class="real-img" alt="">
  </div>
  <div class="l-col" style="width: 300px;">
    <div class="my-row">
      <div class="item-title">月水用量（T）：</div>
      <div class="item-value">3454.323</div>
    </div>
    <div class="my-row">
      <div class="item-title">月電用量（kw/h）：</div>
      <div class="item-value">1325.56</div>
    </div>
    <div class="my-row">
      <div class="item-title">月天然氣用量（㎡）：</div>
      <div class="item-value">452.65</div>
    </div>
    <div class="my-row">
      <div class="item-title">月污水用量（T）：</div>
      <div class="item-value">3154.705</div>
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
  width: 150px;
  margin-right: 20px;
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