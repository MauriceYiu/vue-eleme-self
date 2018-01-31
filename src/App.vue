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
import './assets/css/normalize.css'
import './assets/scss/base.scss'

export default {
  name: 'App'
}
</script>
<style lang="scss" scoped>
  #app{
    width: 100%;
    height: 100%;
  }
  .router-mov-enter-active,
  .router-mov-leave-active{
    transition: opacity .3s;
  }
  .router-mov-enter,.router-mov-leave-active{
    opacity: 0;
  }
</style>

