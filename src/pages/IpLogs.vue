<template>
  <div class="l-container">
    <div class="l-card">
      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px) ">
        <div class="page-head">
          系统日志
        </div>
      </div>


      <div class='card-l-row' style='margin-bottom: 10px;align-items: center'>
        日期筛选：
        <t-date-picker
            style='margin: 0 10px'
            :valueType="'YYYY-MM-DD'"
            placeholder='选择起始日期'
            v-model='startDate'
        ></t-date-picker>
        至
        <t-date-picker
            style='margin: 0 10px'
            :valueType="'YYYY-MM-DD'"
            placeholder='选择结束日期'
            v-model='endDate'
        ></t-date-picker>

      </div>

      <div class="card-l-row">
        <div class='log-text' id='scrollPanel' v-loading='!hasContent' v-html='textarea'></div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {ElTable, ElTableColumn, ElSelect, ElButton} from "element-plus";
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'
import {Options, Vue} from "vue-class-component";
import {AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon} from 'tdesign-icons-vue-next';
import MyRequest from "@/utils/LetoyService";
import {MessagePlugin} from "tdesign-vue-next";

@Options({
  data() {
    return {
      dataList: [],
      textarea: '',
      startDate: '',
      endDate: '',
      logTypeList: [1,3],
      searchUsername: '',
      options: [],
      uidList: [],
      list: [],
      loading: false,
      hasContent: false
    };
  },
  mounted() {
    this.getLogByConditions();
  },
  activated() {
    // this.scrollBottom(50);
  },
  components: {
    ElSelect,
    ElButton,
    SearchIcon
  },
  methods: {
    getData() {
      this.hasContent = false;
      this.textarea = "";
      MyRequest.authRequest(
          '/SystemLogInfo/GetAllSystemInfo',
          {},
          {},
      ).then((response: any) => {
        if (response.status === 0) {
          this.textarea = '';
          this.dataList = response.data;
          this.dataList.map((item: any) => {
            this.textarea = this.textarea + item.strSentence + '\n';
          });
          this.hasContent = true;
        }
        this.scrollBottom(50);
      });
    },
    scrollBottom(timeout: number) {
      const div = document.getElementById('scrollPanel');
      setTimeout(function () {
        if (div !== null) {
          div.scrollTop = div.scrollHeight;
        }
      }, timeout);
    },
    getLogByConditions() {
      this.hasContent = false;
      this.textarea = "";
      MyRequest.authRequest(
          '/SystemLogInfo/GetSystemLogInfoByUidListAndStartEndDateAndLogTypeList',
          {},
          {
            uidList: this.uidList,
            startDate: this.startDate,
            endDate: this.endDate,
            logTypeList: this.logTypeList
          },
      ).then((response: any) => {
        if (response.status === 0) {
          this.textarea = '';
          this.dataList = response.data;
          this.dataList.map((item: any) => {
            this.textarea = this.textarea + item.strSentence + '\n';
          });
          this.hasContent = true;
        }
        this.scrollBottom(50);
      });
    },
    remoteMethod(search: string) {
      console.log('search', search);
      if (search) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = [
            {
              value: `${search}_test1`,
              label: `${search}_test1`,
            },
            {
              value: `${search}_test2`,
              label: `${search}_test2`,
            },
            {
              value: `${search}_test3`,
              label: `${search}_test3`,
            },
          ];
        }, 500);
      }
    },
  },
})
export default class SetProjectManage extends Vue {
}
</script>

<style src="./../assets/css/SystemLogs.css"></style>
