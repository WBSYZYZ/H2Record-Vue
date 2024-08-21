<template>
  <div id="indexDashboard" class="app-container">
    <div class="app-header">
      <div class="app-header-left">
        <span class="app-icon"></span>
        <p class="app-name">H₂Record</p>
      </div>
      <div class="app-header-right">
        <button class="mode-switch" title="Switch Theme" @click="modeSwitch">
          <svg class="moon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2" width="24" height="24" viewBox="0 0 24 24">
            <defs></defs>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
          </svg>
        </button>
        <button class="profile-btn" @click="personalInfo">
          <img :style="{ 'background-image': 'url(' + icon + ')' }" />
          <span>{{ nickName }}</span>
        </button>
      </div>
      <button class="messages-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-message-circle">
          <path
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
    </div>
    <div class="app-content">
      <div class="app-sidebar">
        <a href="" class="app-sidebar-link active">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-home">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </a>
      </div>
      <div class="projects-section">
        <div class="projects-section-header">
          <p>计划</p>
          <p class="time">{{ currentDate }}</p>
        </div>
        <div class="projects-section-line">
          <div class="projects-status">
            <div class="item-status">
              <span class="status-number">{{ inProgress }}</span>
              <span class="status-type">进行中</span>
            </div>
            <div class="item-status">
              <span class="status-number">{{ inExplain }}</span>
              <span class="status-type">计划中</span>
            </div>
            <div class="item-status">
              <span class="status-number">{{ total }}</span>
              <span class="status-type">全部计划</span>
            </div>
          </div>
          <div class="view-actions">
            <button class="view-btn list-view" title="List View" @click="listView">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="feather feather-list">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
            <button class="view-btn grid-view active" title="Grid View" @click="gridView">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="feather feather-grid">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
          </div>
        </div>
        <div class="project-boxes jsGridView">
          <div class="project-box-wrapper" v-for="item in ToDoitems" :key="item.toDoId">
            <div class="project-box" :style="{ 'background-color': item.backgroundColor }">
              <div class="project-box-header">
                <span>{{ item.expectTime }}</span>
              </div>
              <div class="project-box-content-header">
                <p class="box-content-header">{{ item.toDo }}</p>
                <p class="box-content-subheader">{{ item.toDoDetail }}</p>
              </div>
              <div class="box-progress-wrapper">
                <p class="box-progress-header">Progress</p>
                <div class="box-progress-bar">
                  <el-slider v-model="item.progress" :show-tooltip="false" :disabled="true" />
                </div>
                <p class="box-progress-percentage">{{ item.progress }}%</p>
              </div>
              <div class="project-box-footer">
                <div class="participants">
                  <img
                    src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    alt="participant" />
                  <img
                    src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80"
                    alt="participant" />
                  <button class="add-participant" :style="{ 'color': item.backgroundColor }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-plus">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div class="days-left" :style="{ 'color': item.backgroundColor }">
                  {{ item.daysLeft }} Days Left
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="messages-section">
          <button class="messages-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-x-circle">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </button>
          <div class="projects-section-header">
            <p>消息</p>
          </div>
          <div class="messages">
            <div class="message-box" v-for="(item, index) in messageInfoItems" :key="item.userId">
              <img :src="item.icon" alt="profile image" />
              <div class="message-content">
                <div class="message-header">
                  <a class="name">{{ item.nickName }}</a>
                  <div class="star-checkbox">
                    <input type="checkbox" :id="index" :checked="item.clickStar" />
                    <label :for="index">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-star">
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </label>
                  </div>
                </div>
                <p class="message-line">
                  {{ item.messagePush }}
                </p>
                <p class="message-line time">Dec, 12</p>
              </div>
            </div>
          </div>
        </div>
        <div class="messages-Input">
          <el-input v-model="messageInput" autosize type="textarea" resize="none" minlength=1 maxlength=500
            placeholder="善语结善缘，恶言伤人心" />
          <button class="messagePush" @click="messagePush">Send</button>
        </div>
      </div>
    </div>
    <personal-info-view v-if="personalInfoVisible" ref="personalInfo" :basicVal="UserBasicInfoData"
      @pushUserBasicInfo="pushUserBasicInfo"></personal-info-view>
    <div class="sky" v-if="darkBackGround">
      <div class="mountains">
        <div class="mountain-1"></div>
        <div class="mountain-2"></div>
        <div class="land-1"></div>
        <div class="land-2"></div>
        <div class="land-3"></div>
      </div>
      <div class="mountains-base"></div>
      <div class="light-base"></div>
      <div class="stars"></div>
      <div class="stars-cross"></div>
      <div class="stars-cross-aux"></div>
    </div>
  </div>
</template>
<script>
import { ElMessage } from 'element-plus';
import { toRefs, reactive, onMounted, getCurrentInstance, ref } from 'vue';
import 'element-plus/es/components/message/style/css';
import personalInfoView from '@/view/personalInfoView.vue';
import { getCurrentDate } from '../index/js/getCurrentDate';
import { useSocket } from '../index/js/socket';
import cookies from "js-cookie";
import jquery from "jquery";
export default {
  components: {
    personalInfoView
  },
  data() {
    return {
      isTaskListVisible: false,
      toDoAddVisible: false,
      personalInfoVisible: false,
      darkBackGround: false,
      toDoId: "",
      messageInput: "",
    };
  },
  setup() {
    const instance = getCurrentInstance();
    const axios = instance.appContext.config.globalProperties.$axios;
    const route = instance.appContext.config.globalProperties.$route;

    const socket = ref(null) // WebSocket实例
const initWebSocket = () => {
  const options = {
    url: '/websocket/'+cookies.get('userIdentity'),
    greet:cookies.get('userIdentity')
  }
  socket.value = useSocket(options)
  socket.value.subscribe('open', () => {
    console.log('WebSocket连接成功!')
  })
  socket.value.subscribe('close', reason => {
    console.log('WebSocket连接关闭!', reason)
  })
  socket.value.subscribe('message', result => {
    console.log('WebSocket接收到消息:', result)
  })
  socket.value.subscribe('error', err => {
    console.log('WebSocket捕获错误:', err)
  })
  socket.value.subscribe('reconnect', _socket => {
    console.log('WebSocket断开重连:', _socket)
    socket.value = _socket
  })
}
initWebSocket()

    onMounted(() => {
      viewToDoDetail();
      messageViewInfo();
      queryViewUserBasicInfo();
      getCurrentDateInfo();
    });

    const currentDate = ref("");
    function getCurrentDateInfo() {
      currentDate.value = getCurrentDate()
    }

    const ToDoListData = reactive({
      inProgress: "",
      inExplain: "",
      total: "",
      ToDoitems: []
    });
    function viewToDoDetail() {
      axios
        .get("/dashBoard/user/viewToDo", {
          params: {
            userIdentity: route.query.userIdentity
          }
        })
        .then(response => {
          ToDoListData.ToDoitems = response.data.data.toDoDetails;
          ToDoListData.inProgress = response.data.data.inProgress;
          ToDoListData.inExplain = response.data.data.inExplain;
          ToDoListData.total = response.data.data.total;
        })
        .catch((err) => {
          ElMessage.error(err.errorMsg);
        });
    }

    const UserBasicInfoData = reactive({
      phone: "",
      post: "",
      nickName: "",
      address: "",
      email: "",
      intro: "",
      experience: [],
      icon: ""
    });
    function queryViewUserBasicInfo() {
      axios
        .get("/dashBoard/user/queryViewUserBasicInfo", {
          params: {
            userIdentity: route.query.userIdentity
          }
        })
        .then(response => {
          UserBasicInfoData.phone = response.data.data.phone;
          UserBasicInfoData.nickName = response.data.data.nickName;
          UserBasicInfoData.post = response.data.data.post;
          UserBasicInfoData.address = response.data.data.address;
          UserBasicInfoData.email = response.data.data.email;
          UserBasicInfoData.intro = response.data.data.intro;
          UserBasicInfoData.experience = response.data.data.experience;
          UserBasicInfoData.icon = response.data.data.icon;
        })
        .catch((err) => {
          ElMessage.error(err);
        });
    }
    const messageInfoData = reactive({
      messageInfoItems: [],
      iconUrl: []
    });
    function messageViewInfo() {
      axios
        .get("/dashBoard/user/messageViewInfo", {
          params: {
            userIdentity: route.query.userIdentity
          }
        })
        .then(response => {
          messageInfoData.messageInfoItems = response.data.data;
          for (let i = 0; i < response.data.data.length; i++) {
            messageInfoData.iconUrl[i] = response.data.data[i].icon;
          }
        })
        .catch((err) => {
          ElMessage.error(err);
        });
    }
    return {
      ...toRefs(ToDoListData),
      ...toRefs(messageInfoData),
      ...toRefs(UserBasicInfoData),
      UserBasicInfoData, currentDate
    };
  },
  methods: {

    listView() {
      var listView = document.querySelector(".list-view");
      var gridView = document.querySelector(".grid-view");
      var projectsList = document.querySelector(".project-boxes");
      gridView.classList.remove("active");
      listView.classList.add("active");
      projectsList.classList.remove("jsGridView");
      projectsList.classList.add("jsListView");
    },
    gridView() {
      var listView = document.querySelector(".list-view");
      var gridView = document.querySelector(".grid-view");
      var projectsList = document.querySelector(".project-boxes");
      gridView.classList.add("active");
      listView.classList.remove("active");
      projectsList.classList.remove("jsListView");
      projectsList.classList.add("jsGridView");
    },
    personalInfo() {
      this.personalInfoVisible = true;
      this.$nextTick(() => {
        this.$refs.personalInfo.init();
      });
    },
    messagePush() {
      if (this.messageInput == "") {
        ElMessage.error("不能发送空白消息哦！");
        return;
      }
      let messagePush = document.querySelector(".messagePush");
      messagePush.classList.add('is-active');
      setTimeout(function () {
        messagePush.classList.remove('is-active');
      }, 2500)
      this.$axios.post("/dashBoard/blog/messagePush", {
        messagePush: this.messageInput,
        targetUserId: this.$route.query.userIdentity
      }).catch((err) => {
        ElMessage.error(err);
        return;
      })
      let data = { nickName: sessionStorage.getItem("nickName"), messagePush: this.messageInput };
      this.messageInfoItems.push(data)
      this.messageInput = "";
    },
    pushUserBasicInfo(data) {
      this.nickName = data.UserBasicInfoData.nickName;
      this.icon = data.avatarUrl
    },
    modeSwitch() {
      document.documentElement.classList.toggle("dark");
      if (this.darkBackGround == false) {
        this.darkBackGround = true;
      } else {
        this.darkBackGround = false;
      }
      // jquery(setTimeout(function () {
      //   let nightsky = ["#280F36", "#632B6C", "#BE6590", "#FFC1A0", "#FE9C7F"];

      //   let star0 =
      //     "<div class='star star-0' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

      //   let star1 =
      //     "<div class='star star-1 blink' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

      //   let star2 =
      //     "<div class='star star-2 blink' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

      //   let star3 =
      //     "<div class='star star-3' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

      //   let star4 =
      //     "<div class='star star-4 blink' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

      //   let star5 =
      //     "<div class='star star-5' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;background-color:{{color}}'></div>";



      //   let star1pt =
      //     "<div class='star star-1 blink' style='top:{{top}}%;left:{{left}}%;animation-duration:{{duration}}s;background-color:{{color}};box-shadow:0px 0px 6px 1px {{shadow}}'></div>";

      //   let star2pt =
      //     "<div class='star star-2' style='top:{{top}}%;left:{{left}}%;animation-duration:{{duration}}s;background-color:{{color}};box-shadow:0px 0px 10px 1px {{shadow}};opacity:0.7'></div>";

      //   let blur =
      //     "<div class='blur' style='top:{{top}}%;left:{{left}}%;background-color:{{color}}'></div>";

      //   for (let i = 0; i < 500; i++) {
      //     jquery(".stars").append(
      //       star1
      //         .replace("{{top}}", getRandomInt(0, 40))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(2, 5))
      //     );

      //     jquery(".stars").append(
      //       star2
      //         .replace("{{top}}", getRandomInt(20, 70))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(4, 8))
      //     );
      //   }

      //   for (let i = 0; i < 150; i++) {
      //     jquery(".stars").append(
      //       star0
      //         .replace("{{top}}", getRandomInt(0, 50))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(1, 2.5))
      //     );

      //     jquery(".stars").append(
      //       star1
      //         .replace("{{top}}", getRandomInt(0, 50))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(2.5, 4))
      //     );

      //     jquery(".stars").append(
      //       star2
      //         .replace("{{top}}", getRandomInt(0, 50))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(4, 5))
      //     );
      //   }

      //   for (let i = 0; i < 100; i++) {
      //     jquery(".stars").append(
      //       star0
      //         .replace("{{top}}", getRandomInt(40, 75))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(1, 3))
      //     );

      //     jquery(".stars").append(
      //       star1
      //         .replace("{{top}}", getRandomInt(40, 75))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(2, 4))
      //     );
      //   }

      //   for (let i = 0; i < 250; i++) {
      //     jquery(".stars").append(
      //       star0
      //         .replace("{{top}}", getRandomInt(0, 100))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(1, 2))
      //     );

      //     jquery(".stars").append(
      //       star1
      //         .replace("{{top}}", getRandomInt(0, 100))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(2, 5))
      //     );

      //     jquery(".stars").append(
      //       star2
      //         .replace("{{top}}", getRandomInt(0, 100))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(1, 4))
      //     );

      //     jquery(".stars").append(
      //       star4
      //         .replace("{{top}}", getRandomInt(0, 70))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(5, 7))
      //     );
      //   }

      //   for (let i = 0; i < 150; i++) {

      //     jquery(".stars").append(
      //       star4
      //         .replace("{{top}}", getRandomInt(0, 100))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(5, 7))
      //     );

      //     jquery(".stars-cross").append(
      //       blur
      //         .replace("{{top}}", getRandomInt(0, 100))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace(
      //           "{{color}}",
      //           nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
      //         )
      //     );

      //     jquery(".stars-cross").append(
      //       star1pt
      //         .replace("{{top}}", getRandomInt(0, 100))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(6, 12)).replace(
      //           "{{color}}",
      //           nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
      //         ).
      //         replace(
      //           "{{shadow}}",
      //           nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
      //         )
      //     );
      //   }

      //   for (let i = 0; i < 50; i++) {

      //     if (i % 2 == 0) {
      //       jquery(".stars").append(
      //         star5
      //           .replace("{{top}}", getRandomInt(0, 50))
      //           .replace("{{left}}", getRandomInt(0, 100))
      //           .replace("{{duration}}", getRandomInt(5, 7))
      //           .replace(
      //             "{{color}}",
      //             nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
      //           )
      //       );
      //     }

      //     jquery(".stars-cross-aux").append(
      //       blur
      //         .replace("{{top}}", getRandomInt(0, 100))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace(
      //           "{{color}}",
      //           nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
      //         )
      //     );

      //     jquery(".stars-cross-aux").append(
      //       star2pt
      //         .replace("{{top}}", getRandomInt(0, 100))
      //         .replace("{{left}}", getRandomInt(0, 100))
      //         .replace("{{duration}}", getRandomInt(4, 10)).replace(
      //           "{{color}}",
      //           nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
      //         ).
      //         replace(
      //           "{{shadow}}",
      //           nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
      //         )
      //     );
      //   }

      // },100));

      function getRandomInt(min, max) {
        return Math.random() * (max - min) + min;
      }
    },
  },
};
</script>
<style scoped>
@import url("../index/css/style-dashboard.css");
@import url("../index/css/element-dashBoard-style.css");
@import url("../index/css/darkBackGroundStyle.css");
</style>
<style lang="scss" scoped >
@import "@/index/css/submit-style.scss";
</style>