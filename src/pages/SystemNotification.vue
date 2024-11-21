<template>
  <div class="l-container">

    <div class="l-card" style="position: relative;">

      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px) ">
        <div class="page-head">
          系统通知
        </div>
      </div>
      <div class="l-row" style="margin:10px 0 20px 20px;width: calc( 100% - 40px)">
        <t-button theme="primary" @click="getData">
          <template #icon><add-icon /></template>
          新建消息
        </t-button>
      </div>
      <div class="l-row" style="margin: 0 20px 20px 20px;width: calc( 100% - 40px)">
        <el-table :data="tableData" stripe border max-height="700">
          <el-table-column prop="index" label="顺序" width="100" align="center"/>
          <el-table-column prop="content" width="800" label="内容"  align="center"/>
          <el-table-column prop="status" width="100" label="状态" align="center">
            <template #default="scope">
              <t-tag theme="primary">{{ statusMap[scope.row.status] }}</t-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="发布日期" width="200" align="center"/>
          <el-table-column prop="createUsername" label="发布用户" width="120" align="center"/>

          <el-table-column prop="progress" label="操作" width="250" align="center">
            <template #default="scope">
              <t-button theme="primary" style="margin: 5px 10px;" @click="editUser(scope.row)">编辑信息</t-button>
              <t-button theme="danger" style="margin: 5px 10px;" @click="delData(scope.row.uid,scope.row.nickname)">
                删除信息
              </t-button>
            </template>
          </el-table-column>

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
import {
  BrowseIcon,
  AddIcon,
  CloudUploadIcon,
  SearchIcon,
  CloudDownloadIcon,
  DiscountIcon
} from 'tdesign-icons-vue-next';
import MyRequest from "@/utils/LetoyService";
import {MessagePlugin} from "tdesign-vue-next";

@Options({
  components: {
    ElTable, ElTableColumn,
    BrowseIcon, AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon
  },
  data() {
    return {
      createForm: {},
      statusMap: {
        1: "已启用",
        2: "已停用"
      },
      tableData: [],
    }
  },

  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      MyRequest.authRequest(
          "/SystemNotification/GetAllSystemNotifications",
          {}, {})
          .then((response: any) => {
            if (response.status === 0) {
              this.tableData = Object.freeze(response.data);
            }
          })
    },
    delData(uid: string, nickname: string) {
      this.$dialog({
        header: '删除用户',
        body: '确定删除 ' + nickname + " 吗？",
        className: 't-dialog-new-class1 t-dialog-new-class2',
        style: 'color: rgba(0, 0, 0, 0.6)',
        onConfirm: () => {
          MyRequest.authRequest(
              "/UserInfo/DeleteUserInfoByUid",
              {uid}, {})
              .then((response: any) => {
                if (response.status === 0) {
                  MessagePlugin.success("删除成功！")
                } else {
                  MessagePlugin.success("网络错误，请联系管理员！")
                }
              })
          this.myDialog.hide();
        },
      });

    },
  },
  computed: {}
})
export default class SystemNotification extends Vue {
}
</script>
<style scoped src="./../assets/css/SetProjectManage.css"></style>
<style scoped src="./../assets/css/UserManage.css"></style>