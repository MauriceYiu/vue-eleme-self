<template>
  <div id="foods">
      <nav-header :doShowMe="false" :doShowGoBack="true">
        <p class="title" slot="title">{{title}}</p>
      </nav-header>
  </div>
</template>

<script>
import NavHeader from "../../components/navHeader/NavHeader";
import { getCategory } from "../../api/foods";
import { mapActions } from "vuex";

export default {
  name: "Foods",
  data() {
    return {
      title: ""
    };
  },
  beforeMount() {
    this.title = this.$route.query.title;
  },
  components: {
    NavHeader
  }
};
</script>

<style>

</style>
