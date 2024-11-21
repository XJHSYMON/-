<template xmlns="">
  <div class="l-container" style="position: relative">

    <div class="l-card" style="position: relative;background: #00abf5;" ref="pagePanel">
      <div class="chat-gpt-box" v-for="(item,index) in messageList" :key="index">
        <v-md-preview style="border-radius: 18px" :text="item.message"></v-md-preview>
      </div>
    </div>

    <div class="bottom-box">
      <div class="input-panel">
        <t-input size="large" v-model="text" placeholder="" style="width: 80%;margin: 10px 10px" />
        <t-button size="large" style="margin: 10px 0 10px 20px" @click="sendMessage">发送</t-button>
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
import {Stomp} from "@stomp/stompjs";

@Options({
  components: {
    ElTable, ElTableColumn,
    AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon
  },
  data() {
    return {
      messages: "",
      stompClient: null,
      messageList: [],
      text:""
    }
  },
  mounted() {
    this.initWS();
  },
  methods: {
    getData() {
      MyRequest.authRequest(
          "/ChatGPT/RealTest",
          {}, {
            "options": {},
            "prompt": "请给我一段Python爬虫的代码"
          })
          .then((response: any) => {
            console.log(response)
            this.messages.push(response.data)
          })
    },
    connectToSse() {
      const sseUrl = "http://localhost:8001/ChatGPT/Session/101";
      this.eventSource = new EventSource(sseUrl);
      this.eventSource.onmessage = (event: MessageEvent) => {
        this.messages.push(event.data.data);
      };
      this.eventSource.onerror = (error: Event) => {
        console.error("SSE error:", error);
      };

    },
    initWS: function () {
      // let socket = new SockJS("/api/ws")
      const stompClient = Stomp.over(function () {
        return new WebSocket("ws://localhost:8001/ws?wsToken=" + sessionStorage.getItem("systemToken"));
      });
      stompClient.connect({}, this.onConnected, this.onDisconnected);
      // this.stompClient.debug = this.debugCallback;
      this.stompClient = stompClient;
      this.stompClient.debug = function (msg: string) {
      };
      let that = this;
      this.heartCheck = {
        timeout: 15000,
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function () {
          clearTimeout(this.timeoutObj);
          clearInterval(this.serverTimeoutObj);
          return this;
        },
        start: function () {
          let self = this;
          this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            that.stompClient.send("/app/chat.sendUToUMessage", {}, JSON.stringify({
              content: 'client send keepalive message!',
              type: 9
            }))
            self.serverTimeoutObj = setInterval(function () {
              that.stompClient.send("/app/chat.sendUToUMessage", {}, JSON.stringify({
                content: 'client send keepalive message!',
                type: 9
              }))
            }, self.timeout);
          }, this.timeout);
        }
      };
    },
    onConnected() {
      MessagePlugin.success("服务器连接成功！")
      this.stompClient.subscribe("/topic/public", this.onMessage);
      this.stompClient.subscribe("/user/8BF53D27B06B4E288620F6FAD3FD8018/private", this.onMessage);
      this.heartCheck.reset().start();
      // this.stompClient.send("/app/chat.sendMessage",{},JSON.stringify({wsId:'hello'}))
    },
    sendMessage() {
      this.stompClient.send("/app/SendQuery", {}, JSON.stringify({
        from: "8BF53D27B06B4E288620F6FAD3FD8018",
        toId: "server",
        content: this.text
      }))
      this.messageList.push({
        message: ""
      })
    },
    onMessage(msg: any) {
      if (JSON.parse(msg.body).content !== "data: [DONE]") {
        let word = JSON.parse(JSON.parse(msg.body).content.replace("data: ", "")).choices[0].delta.content;
        if (word !== undefined) {
          this.messageList[this.messageList.length - 1].message += word;
        }
        this.scrollBottom(0);
      }else{
        this.text = ""
      }
    },
    onDisconnected() {
      MessagePlugin.warning("服务器连接失败！")
    },
    debugCallback(str: string) {
      MessagePlugin.error(str)
    },
    scrollBottom(timeout: number) {
      const div = document.getElementById('myContent');
      setTimeout(function () {
        if (div !== null) {
          div.scrollTop = div.scrollHeight;
        }

      }, timeout);
    },
  },
  computed: {}
})
export default class CustomerService extends Vue {
}
</script>
<style scoped src="./../assets/css/CustomerService.css"></style>
<style scoped src="./../assets/css/github-markdown.min.css"></style>
<style>
.vuepress-markdown-body {
  border-radius: 8px;
}
</style>