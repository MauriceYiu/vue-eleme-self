<template>
  <div id="star">
      <div class="star-top-wrap" :style="{width:starWidth}">
          <ul>
              <li>★</li>
              <li>★</li>
              <li>★</li>
              <li>★</li>
              <li>★</li>
          </ul>
      </div>
      <div class="star-bot-wrap">
          <ul>
              <li>★</li>
              <li>★</li>
              <li>★</li>
              <li>★</li>
              <li>★</li>
          </ul>
      </div> 
  </div>
</template>

<script>
export default {
  props: {
    starWidth: {
      type: String,
      default: "10%"
    }
  }
};
</script>

<style lang="scss" scoped>
#star {
  position: relative;
  width: 5rem;
  height: 1.2rem;
  display: inline-block;
  line-height: 1.2rem;
  .star-top-wrap,
  .star-bot-wrap {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    ul {
        width:5rem;
        position: relative;
        overflow: hidden;
      li {
        font-size: 1.2rem;
        float: left;
        color: #999;
      }
    }
  }
  .star-top-wrap {
    z-index: 1000;
    ul {
      li {
        color: rgb(247, 176, 44);
      }
    }
  }
  .star-bot-wrap {
    font-size: 1.1rem;
    z-index: 999;
  }
}
</style>
