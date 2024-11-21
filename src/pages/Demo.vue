<template>
  <div class="row center"
       style="width: 100%;height: 100vh">
    <div class="login-box">
      <div class="label">欢迎登陆系统</div>
      <input class="my-input"
             v-model="username"
             placeholder="请输入用户名...">
      <input class="my-input"
             v-model="password"
             type="password"
             placeholder="请输入密码...">
      <div class="my-btn" @click="login">登陆</div>
    </div>

  </div>
</template>
<script>
import {MessagePlugin} from "tdesign-vue-next";

export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      if ((this.username === "admin")
          && (this.password === "123")) {
        MessagePlugin.success({content:"登陆成功",duration:1000})
      }else{
        MessagePlugin.error({content:"用户名或密码错误",duration:1000})
      }
    }
  }
}
</script>
<style>
.center {
  justify-content: center;
  align-items: center;
}

.row {
  display: flex;
  flex-direction: row;
}

.login-box {
  width: calc(400px * 1.5);
  height: calc(250px * 1.5);
  border-radius: 18px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.009);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.3s;
  border: 2px solid #02b3ff;
}

.label {
  font-size: 28px;
  margin: 40px;
}

.my-input {
  width: 400px;
  height: 40px;
  font-size: 20px;
  margin: 10px;
  padding: 0 10px;
}

.my-btn {
  margin-top: 20px;
  width: 420px;
  height: 50px;
  background: #02b3ff;
  border: 1px solid #02b3ff;
  border-radius: 8px;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  transition: 0.3s;
}

.my-btn:active {
  background: #009bdc;
}

.login-box:hover {
  transform: translate(-5px, -5px);
}
</style>