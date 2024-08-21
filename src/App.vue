<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <router-view v-slot="{Component,route }" v-if="isRouterAlive">
    <transition :name="route.meta.transition" appear>
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script>
export default{
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
};
</script>
<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
.slide-left-enter-active {
  transition: transform 0.5s ease;
}
.slide-left-leave-active {
  transition: none;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translate3d(100vw, 0, 0);
}
.slide-right-enter-active {
  transition: transform 0.5s ease;
}
.slide-right-leave-active {
  transition: none;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translate3d(-100vw, 0, 0);
}
.page {
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
}
</style>

