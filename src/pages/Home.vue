<template>
  <div class="l-container">
    <div class="l-card" style="position: relative;">
      <div class="l-row">
        <div class="home-card">
          <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
            <t-progress theme="circle" :label="'6/40'" :percentage="(6/40)*100"/>
          </t-space>
          <div class="l-col">
            <div class="progress-title" style="color: #c2c2c2;font-size: 20px;margin-top: 20px;">道路設備</div>
            <div class="progress-title">已產生通知</div>
          </div>
        </div>

        <div class="home-card">
          <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
            <t-progress theme="circle" :label="'95%'" :status="'success'" :percentage="(95/100)*100"/>
          </t-space>
          <div class="l-col">
            <div class="progress-title" style="color: #c2c2c2;font-size: 20px;margin-top: 20px;">平台設備狀態</div>
            <div class="progress-title">健康度</div>
          </div>
        </div>

        <div class="home-card">
          <t-space align="center" direction="vertical" size="small" class="t-progress-demo-inner">
            <t-progress theme="circle" :label="'3 / 10'" :status="'warning'" :percentage="(30/100)*100"/>
          </t-space>
          <div class="l-col">
            <div class="progress-title" style="color: #c2c2c2;font-size: 20px;margin-top: 20px;">提示</div>
            <div class="progress-title">待處理事件</div>
          </div>
        </div>
      </div>

    </div>
    <div class="l-card" style="position: relative;">
      <div class="l-row" style="margin: 20px 0 10px 20px;">
        <div class="page-head">
          在線社區設備通知
        </div>
      </div>
      <div class="l-row" style="margin: 0 10px 20px 10px;width: calc( 100% - 20px)">
        <t-list style="max-height: 300px;height:300px;width:100%">
          <t-list-item v-for="(item,index) in listData" :key="index">
            <div class="l-row">
              <div class="list-item-date">{{ item.projectCreateDate.split(" ")[0] }}</div>
              <div class="list-item-time">{{ item.projectCreateDate.split(" ")[1] }}</div>
              <div class="list-item-username">{{ item.username }}</div>
              <div class="list-item-action-name">{{ item.actionName }}</div>
              <div class="list-item-project-name">{{ item.projectName }}</div>
              <!--              <div class="list-item-action-name" style="margin: 0"></div>-->
              <div class="list-item-link">查看相关情况</div>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>

    <div class="l-card" style="position: relative;">

      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px) ">
        <div class="page-head">
          所有本社區設備
        </div>
      </div>
      <div class="l-row" style="margin: 0 20px 20px 20px;width: calc( 100% - 40px)">
        <el-table :data="tableData" stripe border style="width: fit-content;">
          <el-table-column prop="id" label="設備編號" width="170" align="center"/>
          <el-table-column prop="name" label="設備名稱" width="200" align="center"/>
          <el-table-column prop="responsePersonName" label="所屬部門" width="130" align="center"/>
          <el-table-column prop="status" label="設備狀態" width="150" align="center">
            <template #default="scope">
              <t-tag theme="warning" v-if="scope.row.status === 1">維護中</t-tag>
              <t-tag theme="success" v-if="scope.row.status === 2">正常</t-tag>
            </template>
          </el-table-column>
          <el-table-column prop="progress" label="設備壽命" width="200" align="center">
            <template #default="scope">
              <t-progress theme="plump" :status="'warning'" :percentage="scope.row.progress"/>
            </template>
          </el-table-column>
          <el-table-column prop="startDate" label="開始日期" width="130" align="center"/>
        </el-table>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import {ElTable, ElTableColumn} from "element-plus";
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'
import {Options, Vue} from "vue-class-component";
import * as echarts from 'echarts';

@Options({
  components: {ElTable, ElTableColumn},
  data() {
    return {
      projectTypeMap: {
        1: "招標",
        2: "競標",
        3: "報價"
      },
      tableData: [
        {
          id: '00120220324143',
          name: '路燈 001',
          quotaSettlementMethod: 1,
          responsePersonName: "凼仔大馬路",
          status: 2,
          progress: 70,
          startDate: "2023-02-23"
        }, {
          id: '00120220324123',
          name: '路燈 002',
          quotaSettlementMethod: 2,
          responsePersonName: "凼仔大馬路",
          status: 2,
          progress: 100,
          startDate: "2023-02-23"
        }, {
          id: '00120220324121',
          name: '環境光傳感器 001',
          quotaSettlementMethod: 3,
          responsePersonName: "凼仔大馬路",
          status: 2,
          progress: 80,
          startDate: "2023-02-23"
        }, {
          id: '00120220324113',
          name: '公交站台 032',
          quotaSettlementMethod: 4,
          responsePersonName: "東北大馬路",
          status: 1,
          progress: 10,
          startDate: "2023-02-23"
        },
      ],
      listData: [
        {
          projectId: "1000001",
          projectCreateDate: "2023-03-14 10:23:03",
          username: "凼仔大馬路 路燈 001",
          actionName: "發布",
          projectName: "今日溫度指數",
          projectType: 2,
        }, {
          projectId: "1000001",
          projectCreateDate: "2023-03-14 10:23:03",
          username: "凼仔大馬路 路燈 002",
          actionName: "發布",
          projectName: "今日空氣質量",
          projectType: 2,
        }, {
          projectId: "1000001",
          projectCreateDate: "2023-03-14 10:23:03",
          username: "凼仔大馬路 環境光傳感器 001",
          actionName: "發布",
          projectName: "最新太陽情況",
          projectType: 2,
        }, {
          projectId: "1000001",
          projectCreateDate: "2023-03-14 10:23:03",
          username: "東北大馬路 公交站台 032",
          actionName: "通知",
          projectName: "公交線路34有路線變更",
          projectType: 2,
        }, {
          projectId: "1000001",
          projectCreateDate: "2023-03-14 10:23:03",
          username: "凼仔大馬路 人流量監控 034",
          actionName: "警告",
          projectName: "今日擋凼仔大馬路與東北大馬路交叉口人流量高",
          projectType: 2,
        },
      ]
    }
  },

  mounted() {
  },
  methods: {},
  computed: {}
})
export default class Home extends Vue {
}
</script>
<style scoped src="./../assets/css/Home.css"></style>