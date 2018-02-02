<template>
  <div id="main">
      <nav-header>
          <p class="search" slot="search">Search</p>          
          <p class="title" slot="title">{{cityName}}</p>
      </nav-header>
      <swiper class="class-menu" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in classItems" :key="index">
            <ul>
              <li class="class-item" v-for="(classItem,classIndex) in item" 
              @click="toFoodsPage(classItem)" :key="classIndex"
              >
                  <div class="class-img">
                      <img :src="imgUrl+classItem.image_url" alt="">
                      <p class="class-name">{{classItem.title}}</p>
                  </div>
              </li>
            </ul>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <div class="nearby-store">
        <h2>附近商家</h2>
        <StoreList :storeList="storeList"></StoreList>
      </div>
  </div>
</template>

<script>
import NavHeader from "../../components/navHeader/NavHeader";
import StoreList from "../../components/storeList/StoreList";
import { getCurrSite } from "../../api/site";
import { getClass, getNearByStore } from "../../api/main";
import { imgBaseUrl } from "../../api/config";
import { saveLocal, getLocal, removeLocal } from "../../utils/localStorage";
import { mapActions } from "vuex";

import "swiper/dist/css/swiper.min.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "Main",
  data() {
    return {
      cityName: "",
      geohash: "",
      imgUrl: imgBaseUrl,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active"
        }
      },
      classItems: [],
      storeList: []
    };
  },
  //activated这个函数是keep-alive激活时才会调用
  activated() {
    //   初始化地点
    this.initSite();
  },
  mounted() {
    // 获取类别菜单
    let nowSelectedSite = JSON.parse(getLocal("nowSelectedSite"));
    this.geohash = nowSelectedSite.latitude + "," + nowSelectedSite.longitude;
    this.getClassMenu();
    this.getStoreList();
  },
  methods: {
    initSite() {
      let nowSelectedSite = JSON.parse(getLocal("nowSelectedSite"));
      this.geohash = nowSelectedSite.latitude + "," + nowSelectedSite.longitude;
      getCurrSite(this.geohash).then(res => {
        this.cityName = "";
        this.cityName = res.name;
        if (this.cityName.length > 9) {
          this.cityName = this.cityName.substr(0, 9) + "...";
        }
      });
    },
    getClassMenu() {
      getClass(this.geohash).then(res => {
        let classArr = [...res];
        this.classItems = [];
        for (let i = 0, j = 0; i < res.length; i += 8, j++) {
          this.classItems[j] = classArr.splice(0, 8);
        }
      });
      this.saveGeohash(this.geohash);
    },
    getStoreList() {
      let nowSiteInfo = this.geohash.split(",");
      getNearByStore(nowSiteInfo[0], nowSiteInfo[1]).then(res => {
        this.storeList = res;
      });
    },
    toFoodsPage(classItem) {
      let urlData = decodeURIComponent(classItem.link.split("=")[1]).replace(
        "&target_name",
        ""
      );
      let restaurant_category_id = "";
      if (/restaurant_category_id/gi.test(urlData)) {
        urlData = JSON.parse(urlData);
        restaurant_category_id = urlData.restaurant_category_id.id;
      }
      this.$router.push({
        path: "/foods",
        query: {
          geohash: this.geohash,
          title: classItem.title,
          restaurant_category_id: restaurant_category_id
        }
      });
    },
    ...mapActions(["saveGeohash"])
  },
  components: {
    NavHeader,
    swiper,
    swiperSlide,
    StoreList
  }
};
</script>

<style lang="scss">
#main {
  .class-menu {
    font-size: 1.5rem;
    background: #fff;
    position: relative;
    overflow: hidden;
    padding-bottom: 1rem;
    ul {
      position: relative;
      overflow: hidden;
      li.class-item {
        width: 25%;
        text-align: center;
        float: left;
        padding: 1rem 0;
        .class-img {
          img {
            width: 3.6rem;
            height: 3.6rem;
          }
          .class-name {
            font-size: 1.4rem;
            color: #999;
          }
        }
      }
    }
  }
  .my-bullet {
    display: inline-block;
    width: 0.5rem !important;
    height: 0.5rem !important;
    border-radius: 100%;
    background: #999;
    margin: 0 0.25rem;
  }
  .my-bullet-active {
    background: rgb(109, 166, 241);
  }
  .nearby-store {
    h2 {
      font-size: 1.3rem;
      color: #999;
      padding: 1.2rem 1.2rem;
      background: #fff;
    }
  }
}
</style>
