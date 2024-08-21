<template>
  <div v-if="addVisible" class="scroll-message-box" ref="scrollMessageBox">
    <div class="scroll-message-box-messages">
      <div class="scroll-message-box-projects-section-header">
        <p>新消息</p>
      </div>
      <div class="scroll-message-box-message-box" v-for="(item) in messageInfoItems" :key="item.userId">
        <img :src="item.icon" alt="profile image" @click="hrefToUserLink(item)" />
        <div class="scroll-message-box-message-content">
          <div class="scroll-message-box-message-header">
            <a class="name" @click="hrefToUserLink(item)">{{ item.nickName }}</a>
          </div>
          <p class="scroll-message-box-message-line">
            {{ item.messagePush }}
          </p>
          <p class="scroll-message-box-message-line time">Dec, 12</p>
        </div>
      </div>
    </div>
  </div>
</template>

  
<script>
import { toRefs, reactive, getCurrentInstance, ref} from 'vue';
import useClickOutside from '../index/js/useClickOutside';
export default {
  name: 'scrollMessageBox',
  data() {
    return {
      messages: []
    };
  },
  methods: {
    init() {
      this.addVisible = true;
    },
    addMessage(message) {
      this.messages.push(message);
      this.scrollMessageBoxToBottom();
    },
    clearMessages() {
      this.messages = [];
    },
    scrollMessageBoxToBottom() {
      const messageBox = this.$refs.messageBox;
      if (messageBox) {
        messageBox.scrollTop = messageBox.scrollHeight;
      }
    }
  },
  props: {
    basicVal: {
      type: Object
    }
  },
  setup(props,context) {

    const instance = getCurrentInstance();
    const router = instance.appContext.config.globalProperties.$router;

    const addVisible = ref(false)
    const scrollMessageBox = ref(null);
    const showAddVisible =ref(false)
    useClickOutside(scrollMessageBox,showAddVisible, () => {
      addVisible.value = false;
      showAddVisible.value=false;
      context.emit('scrollChildClick')
    });

    const messageInfoData = reactive({
      messageInfoItems: props.basicVal.messageInfoItems,
      iconUrl: props.basicVal.iconUrl
    });

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

    return {
      ...toRefs(messageInfoData), hrefToUserLink, addVisible, scrollMessageBox
    };
  }
};
</script>
  
<style lang="scss" scoped>
@import url("./css/scrollMessageBox.scss");
</style>