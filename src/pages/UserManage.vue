<template>
  <div class="l-container">

    <div class="l-card" style="position: relative;">

      <div class="l-row" style="margin: 20px 0 10px 20px;width:calc( 100% - 40px) ">
        <div class="page-head">
          系统用户管理
        </div>
      </div>
      <div class="l-row" style="margin:10px 0 20px 20px;width: calc( 100% - 40px)">
        <t-input style="margin-left: auto;margin-right: 10px;width: 200px;" placeholder="搜索用户昵称"
                 v-model="fuzzyQueryNickname">
          <template #prefix-icon>
            <search-icon/>
          </template>
        </t-input>
        <t-button theme="primary" @click="getData">
          搜索
        </t-button>
      </div>
      <div class="l-row" style="margin: 0 20px 20px 20px;width: calc( 100% - 40px)">
        <el-table :data="tableData" stripe border max-height="700">
          <el-table-column prop="nickname" label="用户名" width="140" align="center" fixed/>
          <el-table-column prop="avatar" label="头像" width="80" align="center">
            <template #default="scope">
              <t-avatar shape="round" :image="scope.row.avatar"></t-avatar>
            </template>
          </el-table-column>
          <el-table-column prop="phoneNumber" label="手机号" width="120" align="center"/>
          <!--          <el-table-column prop="active" label="账户状态" width="100" align="center">-->
          <!--            <template #default="scope">-->
          <!--              <t-tag v-if="scope.row.active" shape="round" theme="success" variant="light-outline">-->
          <!--                已激活-->
          <!--              </t-tag>-->
          <!--              <t-tag v-if="!scope.row.active" shape="round" theme="danger" variant="light-outline">-->
          <!--                未激活-->
          <!--              </t-tag>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column prop="customerName" label="公司名称" width="300" align="center"/>

          <el-table-column prop="role" width="300" label="绑定的公司" align="center">
            <template #default="scope">
              <t-link style="margin: 0 10px" theme="primary">{{ scope.row.customerName }}
              </t-link>
              {{ (scope.row.customerId === null) ? "暂未绑定公司" : "" }}
            </template>
          </el-table-column>

          <el-table-column prop="representative" label="法人" width="100" align="center"/>
          <el-table-column prop="mobile" label="法人手机" width="120" align="center"/>
          <el-table-column prop="idCardNo" label="法人身份证" width="160" align="center"/>

          <el-table-column prop="taxpayerCode" label="税号" width="160" align="center"/>

          <el-table-column prop="role" label="权限" width="100" align="center">
            <template #default="scope">
              <t-tag v-if="scope.row.role===55" shape="round" theme="default" variant="light-outline">
                普通用户
              </t-tag>
              <t-tag v-if="scope.row.role===66" shape="round" theme="primary" variant="light-outline">
                管理员
              </t-tag>
            </template>
          </el-table-column>
          <el-table-column prop="progress" label="操作" width="250" align="center" :fixed="'right'">
            <template #default="scope">
              <t-button theme="primary" style="margin: 5px 10px;" @click="editUser(scope.row)">编辑用户</t-button>
              <t-button theme="danger" style="margin: 5px 10px;" @click="delData(scope.row.uid,scope.row.nickname)">
                删除用户
              </t-button>
            </template>
          </el-table-column>


        </el-table>
      </div>
      <t-pagination
          style="margin: 30px 0"
          v-model="currentPage"
          v-model:pageSize="pageSize"
          :total="totalPage"
          :totalContent="false"
          @current-change="getData"
          @page-size-change="getData"
      />
    </div>

  </div>
  <t-dialog v-model:visible="editUserDialogVisible"
            header="编辑用户"
            confirm-btn="保存"
            @confirm="updateData">
    <div class="l-col">
      <div class="l-row">
        <div class="row-content">用户登录名：</div>
        <div class="row-content" style="width: calc(100% - 30px)">
          <t-input v-model="currentUser.username"></t-input>
        </div>
      </div>
      <div class="l-row">
        <div class="row-content">用户昵称：</div>
        <div class="row-content" style="width: calc(100% - 30px)">
          <t-input v-model="currentUser.nickname"></t-input>
        </div>
      </div>
      <div class="l-row">
        <div class="row-content">用户手机号：</div>
        <div class="row-content" style="width: calc(100% - 30px)">
          <t-input v-model="currentUser.phoneNumber"></t-input>
        </div>
      </div>
      <div class="l-row">
        <div class="row-content">公司名称：</div>
        <div class="row-content" style="width: calc(100% - 30px)">
          <t-input v-model="currentUser.customerName"></t-input>
        </div>
      </div>
      <div class="l-row">
        <div class="row-content">法人：</div>
        <div class="row-content" style="width: calc(100% - 30px)">
          <t-input v-model="currentUser.representative"></t-input>
        </div>
      </div>
      <div class="l-row">
        <div class="row-content">法人手机：</div>
        <div class="row-content" style="width: calc(100% - 30px)">
          <t-input v-model="currentUser.mobile"></t-input>
        </div>
      </div>
      <div class="l-row">
        <div class="row-content">税号：</div>
        <div class="row-content" style="width: calc(100% - 30px)">
          <t-input v-model="currentUser.taxpayerCode"></t-input>
        </div>
      </div>


      <div class="l-row" style="margin: 10px 0;">
        <div class="row-head">绑定公司</div>
      </div>
      <div class="l-row">
        <t-select
            v-model="bindCustomerId"
            @change="bindComp"
            filterable
            placeholder="请输入公司名"
            :options="customerBaseInfoData"
            :loading="bindCompLoading"
            reserve-keyword
            style="width: 400px; display: inline-block"
            @search="getCustomerBaseInfoByFuzzyQuery"
        />
      </div>

      <div class="l-row" style="margin: 10px 0;">
        <div class="row-head">已绑定公司</div>
      </div>
      <div class="l-row" style="flex-wrap: wrap">
        <t-tag theme="primary" v-if="currentUser.companyId&&currentUser.companyId!==0" style="margin: 2.5px"
               @close="cancelBindComp(currentUser.customerId,currentUser.customerName)"
               closable>{{ currentUser.customerName }}
        </t-tag>
      </div>

    </div>
  </t-dialog>

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
      roleMap: {
        55: "普通用户",
        66: "系统管理员"
      },
      createNewProjectDialogVisible: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalPage: 0,
      currentUser: {
        uid: "1C15C104440E47C58DBF8FFF6643CDD9",
        phoneNumber: "18019465682",
        username: "18019465682",
        password: null,
        nickname: "用户359101",
        active: true,
        role: 55,
        token: null,
        avatar: null,
        customerBaseInfoList: [
          {
            "customerId": 176893,
            "customerType": "5",
            "companyId": 3594409,
            "customerName": "珠海市圣亚制冷科技有限公司",
          },
          {
            "customerId": 176893,
            "customerType": "5",
            "companyId": 3594409,
            "customerName": "珠海市圣亚制冷科技有限公司",
          },
          {
            "customerId": 176893,
            "customerType": "5",
            "companyId": 3594409,
            "customerName": "珠海市圣亚制冷科技有限公司",
          },
          {
            "customerId": 176893,
            "customerType": "5",
            "companyId": 3594409,
            "customerName": "珠海市圣亚制冷科技有限公司",
          },

        ]

      },
      editUserDialogVisible: false,
      avatarVisible: false,
      bindCustomerId: "",
      bindCompOption: [],
      bindCompLoading: false,
      fuzzyQueryNickname: "",
      fuzzyQueryCustomerName: "",
      customerBaseInfoData: []
    }
  },

  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      MyRequest.authRequest(
          "/CustomerBaseInfo/GetUserInfoCustomerBaseInfoByFuzzyQueryNicknameWithPaginationPageData",
          {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            nickname: this.fuzzyQueryNickname
          }, {})
          .then((response: any) => {
            if (response.status === 0) {
              this.tableData = Object.freeze(response.data.data);
              this.totalPage = response.data.totalPage
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
    fuzzyQueryData() {

    },
    cancelBindComp(customerId: number, customerName: string) {
      let dialog = this.$dialog({
        header: '解绑公司',
        body: '确定要取消绑定 ' + customerName + " 吗？",
        className: 't-dialog-new-class1 t-dialog-new-class2',
        style: 'color: rgba(0, 0, 0, 0.6)',
        onConfirm: () => {
          MyRequest.authRequest(
              "/CustomerBaseInfo/CancelBindUserInfoAndCustomerInfo",
              {}, {
                customerId,
                uid: this.currentUser.uid
              })
              .then((response: any) => {
                if (response.status === 0) {
                  MessagePlugin.success("解绑成功！");
                  this.currentUser.companyId = 0;
                  this.getData();
                  dialog.hide()
                }
              })
        },
      });
    },
    updateData() {
      MyRequest.authRequest(
          "/CustomerBaseInfo/UpdateUserInfoCustomerBaseByUserInfoCustomerBaseByUid",
          {}, this.currentUser)
          .then((response: any) => {
            if (response.status === 0) {
              MessagePlugin.success("更新成功！");
              this.editUserDialogVisible = false;
              this.getData();
            }
          })
    },
    editUser(user: any) {
      this.currentUser = user;
      this.editUserDialogVisible = true;
    },
    getCustomerBaseInfoByFuzzyQuery(customerName: string) {
      this.bindCompLoading = true
      MyRequest.authRequest(
          "/CustomerBaseInfo/GetCustomerNameAndCustomerIdByFuzzyQueryCustomerNameToSelectOption",
          {
            customerName
          }, {})
          .then((response: any) => {
            if (response.status === 0) {
              this.customerBaseInfoData = Object.freeze(response.data);
            }
            this.bindCompLoading = false;
          })
    },
    bindComp() {
      let dialog = this.$dialog({
        header: '绑定公司',
        body: '确定要绑定这家公司吗？',
        className: 't-dialog-new-class1 t-dialog-new-class2',
        style: 'color: rgba(0, 0, 0, 0.6)',
        onConfirm: () => {
          MyRequest.authRequest(
              "/CustomerBaseInfo/BindUserInfoAndCustomerInfo",
              {}, {
                uid: this.currentUser.uid,
                customerId: this.bindCustomerId
              })
              .then((response: any) => {
                if (response.status === 0) {
                  MessagePlugin.success({
                    content: "绑定成功！"
                  })
                  dialog.hide();
                  this.getData();
                }
              })
        },
        onClose: () => {
          this.bindCustomerId = ""
          dialog.hide();
        }
      });
      // alert(this.bindCompId)
    }
  },
  computed: {}
})
export default class UserManage extends Vue {
}
</script>
<style scoped src="./../assets/css/SetProjectManage.css"></style>
<style scoped src="./../assets/css/UserManage.css"></style>