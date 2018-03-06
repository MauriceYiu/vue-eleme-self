<template>
  <div id="app">
    <transition name="router-mov" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
    </transition>
    
    <transition name="router-mov" mode="out-in">
          <router-view v-if="!$route.meta.keepAlive"/>
    </transition>
  </div>
</template>

<script>
import "./assets/css/normalize.css";
import "./assets/scss/base.scss";

export default {
  name: "App"
};
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
.router-mov-enter-active,
.router-mov-leave-active {
  transition: all 0.3s;
}
// .router-mov-enter,.router-mov-leave-active{
//   opacity: 0;
// }

.router-mov-enter {
  transform: translate3D(100%, 0, 0);
  transition: all 500ms linear;
}
.router-mov-enter-to {
  transform: translate3D(0, 0, 0);
}
// 向左滑出
.router-mov-leave {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 1;
  transform: translate3D(0, 0, 0);
  transition: all 500ms linear;
}
.router-mov-leave-to {
  opacity: 0.01;
  transform: translate3D(-100%, 0, 0);
}
</style>

