<template>
  <div id="indexDashboard" class="app-container">
    <div class="app-header">
      <div class="app-header-left">
        <span class="app-icon"></span>
        <p class="app-name">H₂Record</p>
        <div class="search-wrapper">
          <input v-model="searchKeyword" class="search-input" type="text" placeholder="Search" />
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-search"
            viewBox="0 0 24 24">
            <defs></defs>
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </div>
        <div class="search-content" ref="search-wrapper" v-show="searchKeyword">
          <div class="search-box" v-for="item of searchList.searchListItems" :key="item.id" @click="hrefToUserLink(item)">
            <img :src="item.icon" alt="profile image"/>
            <div class="search-box-content">
              <div class="search-header">
                <a class="name" @click="hrefToUserLink(item)">{{ item.nickName }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="app-header-right">
        <button class="mode-switch" title="Switch Theme" @click="modeSwitch">
          <svg class="moon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2" width="24" height="24" viewBox="0 0 24 24">
            <defs></defs>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
          </svg>
        </button>
        <button class="add-btn" title="Add New Project" @click="addTodo">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-plus">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button class="notification-btn" @click="scrollMessageBox(); confirmMessage();">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-bell">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>

          <span v-if="unreadMessage > 0" class="unreadMessageCount">{{ unreadMessage }}</span>

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
        <a href="" class="app-sidebar-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-pie-chart"
            viewBox="0 0 24 24">
            <defs />
            <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
          </svg>
        </a>
        <a href="" class="app-sidebar-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-calendar">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </a>
        <a href="" class="app-sidebar-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-settings"
            viewBox="0 0 24 24">
            <defs />
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
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
                <div class="more-wrapper">
                  <el-popconfirm title="确认删除这条待办嘛?" @confirm="deleteToDoDetail(item)">
                    <template #reference>
                      <el-button>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                          t="1686559091001" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="3439" width="20"
                          height="20">
                          <path
                            d="M874.666667 241.066667h-202.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667h-170.666666c-40.533333 0-74.666667 34.133333-74.666667 74.666667v70.4H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h53.333334V853.333333c0 40.533333 34.133333 74.666667 74.666666 74.666667h469.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V305.066667H874.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM416 170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h170.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v70.4h-192V170.666667z m341.333333 682.666666c0 6.4-4.266667 10.666667-10.666666 10.666667H277.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667V309.333333h490.666666V853.333333z"
                            fill="#666666" p-id="3440" />
                          <path
                            d="M426.666667 736c17.066667 0 32-14.933333 32-32V490.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c0 17.066667 14.933333 32 32 32zM597.333333 736c17.066667 0 32-14.933333 32-32V490.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c0 17.066667 14.933333 32 32 32z"
                            fill="#666666" p-id="3441" />
                        </svg>
                      </el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </div>
              <div class="project-box-content-header">
                <p class="box-content-header">{{ item.toDo }}</p>
                <p class="box-content-subheader">{{ item.toDoDetail }}</p>
              </div>
              <div class="box-progress-wrapper">
                <p class="box-progress-header">Progress</p>
                <div class="box-progress-bar">
                  <el-slider v-model="item.progress" :show-tooltip="false" @change="changeProgress(item)" />
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
              <img :src="item.icon" alt="profile image" @click="hrefToUserLink(item)" />
              <div class="message-content">
                <div class="message-header">
                  <a class="name" @click="hrefToUserLink(item)">{{ item.nickName }}</a>
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
    <personal-info v-if="personalInfoVisible" ref="personalInfo" :basicVal="UserBasicInfoData"
      @pushUserBasicInfo="pushUserBasicInfo"></personal-info>
    <to-do-add v-if="toDoAddVisible" ref="toDoAdd"></to-do-add>
    <scroll-message-box v-if="scrollMessageBoxVisible" ref="scrollMessageBox"
      :basicVal="messageInfoNewData" @scrollChildClick="scrollChildClickEven"></scroll-message-box>
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
import { toRefs, reactive, onMounted, onUnmounted, getCurrentInstance, ref, watch } from 'vue';
import 'element-plus/es/components/message/style/css';
import toDoAdd from "@/components/toDoAdd.vue";
import personalInfo from '@/components/personalInfo.vue';
import scrollMessageBox from '@/components/scrollMessageBox.vue';
import { getCurrentDate } from './js/getCurrentDate';
import { useSocket } from './js/socket';
import cookies from "js-cookie";
import jquery from "jquery";
export default {
  components: {
    toDoAdd,
    personalInfo,
    scrollMessageBox
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
    const router = instance.appContext.config.globalProperties.$router;

    const unreadMessage = ref(0);
    const scrollMessageBoxVisible = ref(false);
    const messageInfoData = reactive({
      messageInfoItems: [],
      iconUrl: []
    });
    const messageInfoNewData = reactive({
      messageInfoItems: [],
      iconUrl: []
    });
    const socket = ref(null) // WebSocket实例
    const initWebSocket = () => {
      const options = {
        url: '/websocket/' + cookies.get('userIdentity'),
        greet: cookies.get('userIdentity')
      }
      socket.value = useSocket(options)
      socket.value.subscribe('open', () => {
        console.log('WebSocket连接成功!')
      })
      socket.value.subscribe('close', reason => {
        console.log('WebSocket连接关闭!', reason)
      })
      socket.value.subscribe('message', result => {
        unreadMessage.value = unreadMessage.value + 1;
        messageInfoData.messageInfoItems.push(result);
        messageInfoNewData.messageInfoItems.push(result);
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
      meToDoDetail();
      queryMessageInfo();
      queryUserBasicInfo();
      getCurrentDateInfo();
      document.addEventListener('click', closeTreeDropDown);
    });
    onUnmounted(() => {
      document.addEventListener('click', closeTreeDropDown);
    });
    function closeTreeDropDown() {
      searchKeyword.value = '';
    }

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
    function meToDoDetail() {
      axios
        .get("/dashBoard/user/meToDo")
        .then(response => {
          ToDoListData.ToDoitems = response.data.data.toDoDetails;
          ToDoListData.inProgress = response.data.data.inProgress;
          ToDoListData.inExplain = response.data.data.inExplain;
          ToDoListData.total = response.data.data.total;
        })
        .catch((err) => {
          ElMessage.error(err);
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
    function queryUserBasicInfo() {
      axios
        .get("/dashBoard/user/queryUserBasicInfo")
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

    function queryMessageInfo() {
      axios
        .get("/dashBoard/user/messageInfo")
        .then(response => {
          messageInfoData.messageInfoItems = response.data.data;
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].messageReceive == 0) {
              messageInfoNewData.messageInfoItems.push(response.data.data[i])
            }
          }
          unreadMessage.value = messageInfoNewData.messageInfoItems.length;
        })
        .catch((err) => {
          ElMessage.error(err);
        });
    }
    function hrefToUserLink(item) {
      let userId = item.userId;
      const url = router.resolve({
        path: '/indexDashboardView',
        query: {
          userIdentity: userId
        }
      });
      // 打开新窗口
      window.open(url.href, '_blank');
    }
    function confirmMessage() {
      let confirmData = JSON.parse(JSON.stringify(messageInfoNewData.messageInfoItems));
      if (confirmData.length > 0) {
        axios.post("/dashBoard/blog/confirmMessage", {
          userId: cookies.get('userIdentity')
        }).then(() => {
          messageInfoNewData.messageInfoItems = [];
          unreadMessage.value = 0;
        })
          .catch((err) => {
            ElMessage.error(err);
            return;
          })
      }
    }

    const searchKeyword = ref('');
    const timer = ref('')
    const hasNoData = ref('')
    const searchList = reactive({
      searchListItems: []
    });
    watch(searchKeyword, (newValue, oldValue) => {
      if (timer.value) {
        clearTimeout(timer.value)
      }
      if (!searchKeyword.value) {
        searchList.searchListItems = []
        return
      }
      timer.value = setTimeout(() => {
        const result = []
        async function searchListInfo() {
          await axios.get("/dashBoard/user/searchUserInfo",
            {
              params: {
                searchParam: searchKeyword.value
              }
            }
          ).then(response => {
            searchList.searchListItems = response.data.data;
            searchList.searchListItems.forEach((value) => {
              if (value.userId.toString().indexOf(searchKeyword.value) > -1 || value.nickName.indexOf(searchKeyword.value) > -1) {
                result.push(value)
              }
            })
            searchList.searchListItems = result
          })
          .catch((err) => {
              ElMessage.error(err);
            });
        }
        searchListInfo();
      }, 500)
    });

    function scrollChildClickEven(){
      scrollMessageBoxVisible.value=false;
    }
    return {
      ...toRefs(ToDoListData),
      ...toRefs(messageInfoData),
      ...toRefs(UserBasicInfoData),
      UserBasicInfoData, hrefToUserLink, currentDate, messageInfoData, unreadMessage, messageInfoNewData, confirmMessage,
      searchKeyword, timer, ...toRefs(searchList), searchList, hasNoData, scrollMessageBoxVisible,scrollChildClickEven
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
    addTodo() {
      this.toDoAddVisible = true;
      this.$nextTick(() => {
        this.$refs.toDoAdd.init();
      });
    },
    scrollMessageBox() {
      if (this.scrollMessageBoxVisible == true) {
        this.scrollMessageBoxVisible = false;
        return;
      }
      this.scrollMessageBoxVisible = true;
      this.$nextTick(() => {
        this.$refs.scrollMessageBox.init();
      });
    },
    personalInfo() {
      this.personalInfoVisible = true;
      this.$nextTick(() => {
        this.$refs.personalInfo.init();
      });
    },
    changeProgress(item) {
      let data = {
        progress: item.progress,
        todoId: item.todoId
      };
      this.$axios.post("/dashBoard/blog/changeProgress", data)
        .catch((err) => {
          ElMessage.error(err);
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
        messagePush: this.messageInput
      }).catch((err) => {
        ElMessage.error(err);
        return;
      })
      let data = { nickName: cookies.get("nickName"), messagePush: this.messageInput };
      this.messageInfoItems.push(data)
      this.messageInput = "";
    },
    deleteToDoDetail(item) {
      this.$axios.post("/dashBoard/user/deleteToDoDetail", {
        todoId: item.todoId,
        toDo: item.toDo
      }).catch((err) => {
        ElMessage.error(err);
      })
      this.ToDoitems.splice(this.ToDoitems.indexOf(item), 1)
      if(this.inExplain>0){
        this.inExplain=this.inExplain-1;

      }
      if(this.inProgress>0){
        this.inProgress=this.inProgress-1;
      }
      if(this.total>0){
        this.total=this.total-1;
      }
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
      jquery(setTimeout(function () {
        let nightsky = ["#280F36", "#632B6C", "#BE6590", "#FFC1A0", "#FE9C7F"];

        let star0 =
          "<div class='star star-0' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

        let star1 =
          "<div class='star star-1 blink' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

        let star2 =
          "<div class='star star-2 blink' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

        let star3 =
          "<div class='star star-3' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

        let star4 =
          "<div class='star star-4 blink' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;'></div>";

        let star5 =
          "<div class='star star-5' style='top:{{top}}vh;left:{{left}}vw;animation-duration:{{duration}}s;background-color:{{color}}'></div>";



        let star1pt =
          "<div class='star star-1 blink' style='top:{{top}}%;left:{{left}}%;animation-duration:{{duration}}s;background-color:{{color}};box-shadow:0px 0px 6px 1px {{shadow}}'></div>";

        let star2pt =
          "<div class='star star-2' style='top:{{top}}%;left:{{left}}%;animation-duration:{{duration}}s;background-color:{{color}};box-shadow:0px 0px 10px 1px {{shadow}};opacity:0.7'></div>";

        let blur =
          "<div class='blur' style='top:{{top}}%;left:{{left}}%;background-color:{{color}}'></div>";

        for (let i = 0; i < 150; i++) {
          jquery(".stars").append(
            star1
              .replace("{{top}}", getRandomInt(0, 40))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(2, 5))
          );

          jquery(".stars").append(
            star2
              .replace("{{top}}", getRandomInt(20, 70))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(4, 8))
          );
          jquery(".stars").append(
            star3
              .replace("{{top}}", getRandomInt(0, 40))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(2, 5))
          );
        }

        for (let i = 0; i < 100; i++) {
          jquery(".stars").append(
            star0
              .replace("{{top}}", getRandomInt(0, 50))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(1, 2.5))
          );

          jquery(".stars").append(
            star1
              .replace("{{top}}", getRandomInt(0, 50))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(2.5, 4))
          );

          jquery(".stars").append(
            star2
              .replace("{{top}}", getRandomInt(0, 50))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(4, 5))
          );
        }

        for (let i = 0; i < 100; i++) {
          jquery(".stars").append(
            star0
              .replace("{{top}}", getRandomInt(40, 75))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(1, 3))
          );

          jquery(".stars").append(
            star1
              .replace("{{top}}", getRandomInt(40, 75))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(2, 4))
          );
        }

        for (let i = 0; i < 150; i++) {
          jquery(".stars").append(
            star0
              .replace("{{top}}", getRandomInt(0, 100))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(1, 2))
          );

          jquery(".stars").append(
            star1
              .replace("{{top}}", getRandomInt(0, 100))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(2, 5))
          );

          jquery(".stars").append(
            star2
              .replace("{{top}}", getRandomInt(0, 100))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(1, 4))
          );

          jquery(".stars").append(
            star4
              .replace("{{top}}", getRandomInt(0, 70))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(5, 7))
          );
        }

        for (let i = 0; i < 100; i++) {

          jquery(".stars").append(
            star4
              .replace("{{top}}", getRandomInt(0, 100))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(5, 7))
          );

          jquery(".stars-cross").append(
            blur
              .replace("{{top}}", getRandomInt(0, 100))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace(
                "{{color}}",
                nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
              )
          );

          jquery(".stars-cross").append(
            star1pt
              .replace("{{top}}", getRandomInt(0, 100))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(6, 12)).replace(
                "{{color}}",
                nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
              ).
              replace(
                "{{shadow}}",
                nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
              )
          );
        }

        for (let i = 0; i < 100; i++) {

          if (i % 2 == 0) {
            jquery(".stars").append(
              star5
                .replace("{{top}}", getRandomInt(0, 50))
                .replace("{{left}}", getRandomInt(0, 100))
                .replace("{{duration}}", getRandomInt(5, 7))
                .replace(
                  "{{color}}",
                  nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
                )
            );
          }

          jquery(".stars-cross-aux").append(
            blur
              .replace("{{top}}", getRandomInt(0, 100))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace(
                "{{color}}",
                nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
              )
          );

          jquery(".stars-cross-aux").append(
            star2pt
              .replace("{{top}}", getRandomInt(0, 100))
              .replace("{{left}}", getRandomInt(0, 100))
              .replace("{{duration}}", getRandomInt(4, 10)).replace(
                "{{color}}",
                nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
              ).
              replace(
                "{{shadow}}",
                nightsky[Math.ceil(getRandomInt(0, nightsky.length - 1))]
              )
          );
        }

      },100));

      function getRandomInt(min, max) {
        return Math.random() * (max - min) + min;
      }
    },
  },
};
</script>
<style scoped>
@import url("./css/style-dashboard.css");
@import url("./css/element-dashBoard-style.css");
@import url("./css/darkBackGroundStyle.css");
</style>
<style lang="scss" scoped >
@import "@/index/css/submit-style.scss";
</style>