<template>
  <img src="./../assets/pics/background.jpg" class="background pc" alt="">
  <img src="./../assets/pics/phone-bg-2.jpg" class="background mobile" alt="">
  <div class="my-container">
    <div class="login-box" ref="myLoginBox">
      <div class="login-header">澳門城市大學智能社區</div>
      <div class="username-box" style="margin-top: 40px;">
        <input type="text" placeholder="Username" class="login-input" v-model="userInput">
      </div>
      <div class="username-box" style="margin-top: 20px;">
        <input type="password" placeholder="Password" class="login-input" v-model="password">
      </div>
      <div class="username-box" style="margin-top: 20px;margin-bottom: 30px;">
        <div class="login-button" @click="login">Login</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import {ElLoading} from 'element-plus';
import MyRequest from "@/utils/LetoyService";
import 'element-plus/es/components/loading/style/css'
import {Options, Vue} from 'vue-class-component';
import md5 from "js-md5";
import {MessagePlugin} from "tdesign-vue-next";
import LTTips from "@/LTUI/LTTips"

@Options({
  data() {
    return {
      loadingInstance: "",
      userInput: "",
      password: "",
    }
  },
  components: {
    ElLoading
  },
  methods: {
    checkInputType(value: string) {
      let phoneRegExp = new RegExp("^1[3578]\\d{9}$");
      let emailRegExp = new RegExp(/^\w+@[a-z0-9]+\.[a-z]+$/i);
      if (phoneRegExp.test(value)) {
        return "phone_pwd";
      } else if (emailRegExp.test(value)) {
        return "email_pwd";
      } else {
        return "name_pwd";
      }
    },
    login() {
      LTTips.createLTTips({
        label: "登陆中...",
        toast_type: "loading",
        duration: 6000,
        type: "loading",
        top: false,
        showCover: true
      })
      MyRequest.noAuthRequest(
          "/MyLogin/LoginUserByUsernameAndPassword",
          {}, {username: this.userInput, password: md5(this.password)})
          .then((response: any) => {
            if (response.status === 0) {
              let data = response.data;
              sessionStorage.setItem('systemToken', data.token);
              sessionStorage.setItem('nickname', data.nickname);
              this.$store.commit("changeUserInfo", {
                username:data.username,
                token:data.token,
                role:data.role,
                nickname:data.nickname
              });
              this.$router.push("CustomerManage");
              LTTips.closeLTTips();
              MessagePlugin.success("登陆成功！");
            } else {
              MessagePlugin.error("用户名或密码错误！");
              LTTips.closeLTTips();
            }
          })
          .catch(() => {
            MessagePlugin.error("用户名或密码错误！");
            LTTips.closeLTTips();
          })
    },
    showLoading() {
      let options = {
        target: this.$refs.myLoginBox
      }
      this.loadingInstance = ElLoading.service(options)
    }
  },
})
export default class Login extends Vue {
}
</script>
<style scoped src="../assets/css/Login.css"></style>