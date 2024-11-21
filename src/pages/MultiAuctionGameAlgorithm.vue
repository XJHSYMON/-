<template>
  <div class="l-container">

    <div class="l-card" style="position: relative;">

      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px);">
        <div class="page-head">
          珠澳协同智能多属性拍卖博弈算法
        </div>
      </div>
      <div class="l-row" style="margin:10px 0 20px 20px;width: calc( 100% - 40px);flex-wrap: wrap">
        <t-button style="margin:5px;" theme="danger" @click="getData" :loading="syncLoading">
          生成虚拟数据
        </t-button>
        <t-button style="margin:5px;" theme="warning" @click="getData" :loading="syncLoading">
          训练数据
        </t-button>
        <t-button style="margin:5px;" theme="primary" @click="getData" :loading="syncLoading">
          打开LOSS结果
        </t-button>
        <t-button style="margin:5px;" theme="primary" @click="getData" :loading="syncLoading">
          打开Record结果
        </t-button>
        <t-button style="margin:5px;" theme="success" @click="getData" :loading="syncLoading">
          使用模型进行计算
        </t-button>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import {ElTable, ElTableColumn} from "element-plus";
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'
import {Options, Vue} from "vue-class-component";
import {AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon} from 'tdesign-icons-vue-next';
import MyRequest from "@/utils/LetoyService";
import {MessagePlugin} from "tdesign-vue-next";

@Options({
  components: {
    ElTable, ElTableColumn,
    AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon
  },
  data() {
    return {
      syncLoading: false
    }
  },

  mounted() {
  },
  methods: {
    getData() {
      this.syncLoading = true;
      MyRequest.noAuthRequest(
          "/GetData",
          {
            number: 10
          }, {number: 11})
          .then((response: any) => {
            console.log(response);
            this.syncLoading = false;
          })
    },
  },
  computed: {}
})
export default class MultiAuctionGameAlgorithm extends Vue {
}
</script>
<style scoped src="./../assets/css/SetProjectManage.css"></style>