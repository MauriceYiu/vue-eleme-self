<template>
  <div id="nav-header">
      <slot name='logo'></slot>
      <span class="me" v-if="doShowMe">Me</span>
      <slot class="back" name="arrow-back"></slot>
      <slot class="search" name="search"></slot>
      <slot class="title" name="title"></slot>
      <slot class="changeCity" name="changeCity"></slot>
  </div>
</template>

<script>
export default {
    props:{
        doShowMe:{
            type:Boolean,
            default:true
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../../assets/scss/mixin.scss';

    #nav-header{
        height: 4rem;
        line-height: 4rem;
        background: $norColor;
        font-size: 1.6rem;
        color: #fff;
        padding: 0 1.2rem;
        .logo{
            float: left;
        }
        .me,.changeCity{
            float: right;
        }
        .changeCity{
            font-size: 1.2rem;
            position: absolute;
            right: 1.2rem;
            top: 0;
            z-index: 1001;
        }
        .back{
            @include back();
            z-index:1001;
            position: absolute;
            left: 1.2rem;
            z-index: 1001;
        }
        .search{
            position: absolute;
            font-size: 1.2rem;
            left: 1.2rem;
            z-index: 1001;
        }
        .title{
            text-align: center;
            z-index: 1000;
        }
    }
</style>
