<template>

  <t-menu
      v-model:expanded="expanded"
      theme="light"
      width="100%"
      :defaultValue="currentPath"
      :value="selectPath"
      @onChange="changePath"
  >
    <!--    <t-menu-item value="Home" @click="changePath('Home')">-->
    <!--      <template #icon>-->
    <!--        <AppIcon/>-->
    <!--      </template>-->
    <!--      首頁-->
    <!--    </t-menu-item>-->
    <t-menu-item value="Home" @click="changePath('Home')">
      <template #icon>
        <AppIcon/>
      </template>
      首页
    </t-menu-item>
    <t-menu-item value="Map" @click="changePath('Map')">
      <template #icon>
        <LogoCodepenIcon/>
      </template>
      社區情況概覽
    </t-menu-item>
<!--    <t-menu-item value="UserManage" @click="changePath('UserManage')">-->
<!--      <template #icon>-->
<!--        <ControlPlatformIcon/>-->
<!--      </template>-->
<!--      設備情況管理-->
<!--    </t-menu-item>-->
<!--    <t-menu-item value="SystemNotification" @click="changePath('SystemNotification')">-->
<!--      <template #icon>-->
<!--        <NotificationIcon/>-->
<!--      </template>-->
<!--      系统公告管理-->
<!--    </t-menu-item>-->
<!--    <t-submenu value="Settings" title="系统设置">-->
<!--      <template #icon>-->
<!--        <SettingIcon />-->
<!--      </template>-->
<!--      <t-menu-item value="SystemLogs" @click="changePath('SystemLogs')">-->
<!--        <template #icon>-->
<!--          <RootListIcon/>-->
<!--        </template>-->
<!--        系统日志-->
<!--      </t-menu-item>-->
<!--      <t-menu-item value="IpLogs" @click="changePath('IpLogs')">-->
<!--        <template #icon>-->
<!--          <ChartIcon/>-->
<!--        </template>-->
<!--        系统访问日志-->
<!--      </t-menu-item>-->
<!--    </t-submenu>-->
    <!--    <t-menu-item value="edit1">-->
    <!--      <template #icon>-->
    <!--        <SettingIcon/>-->
    <!--      </template>-->
    <!--      系统设置-->
    <!--    </t-menu-item>-->
  </t-menu>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {
  LayersIcon,
  AppIcon,
  UserCircleIcon,
  ViewModuleIcon,
  SettingIcon,
  BrowseIcon,
  UsergroupIcon,
  UserIcon,
  RootListIcon,
  ChartIcon,
  NotificationIcon,
  LogoCodepenIcon,ControlPlatformIcon
} from 'tdesign-icons-vue-next';
import {MenuValue} from 'tdesign-vue-next';

@Options({
  components: {
    LayersIcon,
    AppIcon,
    UserCircleIcon,
    ViewModuleIcon,
    SettingIcon,
    BrowseIcon,
    UsergroupIcon,
    NotificationIcon,
    UserIcon,
    RootListIcon,
    ChartIcon,
    LogoCodepenIcon,
    ControlPlatformIcon,
  },
  computed: {
    currentPath() {
      this.selectPath = this.$route.path.replace("/", "");
      return this.$route.path.replace("/", "");
    }
  },
  props: {},
  methods: {
    changePath(path: string) {
      this.selectPath = path;
      this.$router.push(path)
    }
  },
  data() {
    return {
      expanded: [],
      selectPath: ""
    }
  }
})
export default class BottomBar extends Vue {
}
</script>
<style scoped src="./../assets/css/BottomBar.css"></style>