<template>
  <div id="city">
      <nav-header :doShowMe="false">
        <span class="back" slot="arrow-back" @click="back"><</span>
        <p class="title" slot="title">{{cityName}}</p>
        <router-link class="changeCity" slot="changeCity" tag="span" to="/" >切换城市</router-link>
      </nav-header>
      <div class="search-site">
          <div class="input">
              <input type="text" v-model="keyWord" @keydown.enter="search" placeholder="输入学校,商务楼,地址" />
          </div>
          <div class="search-btn">
              <span @click="search" >提交</span>
          </div>
      </div>
      <div class="search-res">
          <div class="res-wrap">
              <ul>
                  <li v-for="(item,index) in searchSite" :key="index" @click="toThisSiteMain(item)">
                      <p class="site-name">{{item.name}}</p>
                      <p class="site-location">{{item.address}}</p>
                  </li>
              </ul>
          </div>
      </div>
      <div class="search-history" v-if="historySite.length">
          <div class="history-tit">
              <span>搜索历史</span>
          </div>
          <div class="history-wrap">
              <ul>
                  <li v-for="(item,index) in historySite" :key="index" @click="toThisSiteMain(item)">
                      <p class="site-name">{{item.name}}</p>
                      <p class="site-location">{{item.address}}</p>
                  </li>
              </ul>
          </div>
          <p class="clearAll" @click="clearAll">清空所有</p>
      </div>
  </div>
</template>

<script>
import NavHeader from "../../components/navHeader/NavHeader";
import { searchSite, getNowCity } from "../../api/site";
import { saveLocal, getLocal, removeLocal } from "../../utils/localStorage";

export default {
  name: "City",
  data() {
    return {
      cityId: -1,
      keyWord: "",
      cityName: "",
      searchSite: [],
      historySite: []
    };
  },
  mounted() {
    this.cityId = this.$route.params.id;
    getNowCity(this.cityId).then(res => {
      this.cityName = res.name;
    });
    // 获取历史记录
    let historySiteStr = getLocal("selectedSite");
    if (historySiteStr) {
      this.historySite = JSON.parse(historySiteStr);
    }
  },
  components: {
    NavHeader
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    search() {
      searchSite(this.cityId, this.keyWord).then(res => {
        this.searchSite = res;
      });
    },
    toThisSiteMain(item) {
      let selectedSite = item; 
      let hadHistory = getLocal("selectedSite");
      let saveSelectedSite = [];
      let checkRepeat = true;
      if (hadHistory) {
        saveSelectedSite = JSON.parse(hadHistory);
        saveSelectedSite.forEach(per => {
          if (
            per.latitude == item.latitude &&
            per.longitude == item.longitude
          ) {
            checkRepeat = false;
          }
        });
      }
      if (checkRepeat) {
        saveSelectedSite.push(selectedSite);
      }
      saveLocal("selectedSite", JSON.stringify(saveSelectedSite));
      this.$router.push({path:'/main'});
    },
    clearAll() {
      removeLocal('selectedSite');
      this.historySite = [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixin.scss";

#city {
  .search-site {
    @include sidePad();
    background: #fff;
    margin-top: 1.2rem;
    position: relative;
    overflow: hidden;
    .input {
      width: 100%;
      input {
        width: 100%;
        height: 3rem;
        border-radius: 0.3rem;
        font-size: 1.5rem;
        padding-left: 1.2rem;
        @include setBd();
        margin: 1.2rem 0 1.2rem 0;
      }
    }
    .search-btn {
      width: 100%;
      margin-bottom: 1.2rem;
      span {
        display: block;
        width: 100%;
        height: 3rem;
        border-radius: 0.3rem;
        text-align: center;
        line-height: 3rem;
        font-size: 1.5rem;
        color: #fff;
        background: $norColor;
      }
    }
  }
  .search-history {
    font-size: 1.5rem;
    .history-tit {
      font-size: 1.2rem;
      padding: 0.6rem 1.2rem;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
    .history-wrap {
      background: #fff;
      li {
        position: relative;
        border-bottom: 1px solid #ddd;
        .site-name {
          color: #333;
          padding: 0.6rem 1.2rem;
        }
        .site-location {
          font-size: 1.2rem;
          color: #ddd;
          padding-bottom: 0.6rem;
          padding-left: 1.2rem;
          padding-right: 1.2rem;
        }
      }
    }
    p.clearAll {
      color: $norColor;
      font-size: 1.4rem;
      text-align: center;
      height: 4rem;
      line-height: 4rem;
      border-top: 1px solid #ddd;
      background: #fff;
    }
  }
  .search-res {
    font-size: 1.5rem;
    .res-wrap {
      background: #fff;
      li {
        position: relative;
        border-bottom: 1px solid #ddd;
        .site-name {
          color: #333;
          padding: 0.6rem 1.2rem;
        }
        .site-location {
          font-size: 1.2rem;
          color: #ddd;
          padding-bottom: 0.6rem;
          padding-left: 1.2rem;
          padding-right: 1.2rem;
        }
      }
    }
  }
}
</style>
