<template>
  <div id="loading">
      <div class="loading-img">
        <img src="./../../assets/images/loading.svg" alt="">
      </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#loading {
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  text-align: center;
  z-index: 1001;
  .loading-img {
    width: 5rem;
    height: 5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -2.5rem 0 0 -2.5rem;
    img{
        width: 5rem;
    }
  }
}
</style>
