<template>
  <div class="head-container">
    <img src="./../assets/icons/logo-white-bg.png" alt="" class="head-logo" />
    <div class="head-title">澳門城市大學智能社區</div>
    <div class="welcome-text">
      欢迎，{{nickname}}
    </div>
    <el-dropdown trigger="click" style="margin-right: 20px;">
      <div class="head-img-box">
        <img src="./../assets/icons/setting.svg" alt="">
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item  @click="logout()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </div>
</template>

<script lang="ts">
/* eslint-disable */
import {ElDropdown, ElDropdownItem, ElDropdownMenu, ElLoading} from 'element-plus';
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/dropdown/style/css'
import 'element-plus/es/components/dropdown-item/style/css'
import 'element-plus/es/components/dropdown-menu/style/css'
import {Options, Vue} from 'vue-class-component';
@Options({
  data(){
    return {

    }
  },
  computed:{
    nickname(){
      return sessionStorage.getItem("nickname");
    }
  },
  components: {
    ElLoading,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
  },
  methods: {
    openPage(path:string){
      window.open(path);
    },
    logout(){
      this.$ElTip({
        title: '成功',
        message: '退出成功！',
        type: 'success',
      });
      sessionStorage.clear();
      this.$router.push("/");
    }
  },
})
export default class HeaderBar extends Vue {
}
</script>
<style scoped src="../assets/css/HeaderBar.css"></style>