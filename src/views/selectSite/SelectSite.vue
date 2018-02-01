<template>
  <div id="select-site">
      <nav-header>
          <span class="logo" slot="logo">ele.me</span>
      </nav-header>
      <div class="now-location-tit">
          <span class="tit-left">当前定位城市：</span>
          <span class="tit-right">定位不准时，请在城市列表中选择</span>
      </div>
      <div class="now-site" @click="toCity(nowSite.id)">
          <span class="site" >{{nowSite.name}}</span>
          <span class="arrow-right">></span>
      </div>
      <div class="hot-city">
          <div class="hot-city-tit">
              <span>热门城市</span>
          </div>
          <div class="hot-city-cont">
               <ul>
                  <li v-for="(item,index) in hotCities" @click="toCity(item.id)" :key="index">{{item.name}}</li>
              </ul>
          </div>
      </div>
      <div class="other-city">
        <ul>
          <li class="city-group" v-for="(item,index) in groupCitits" :key="index">
            <div class="other-city-tit">
                <span>{{item.orderBy}}</span>
            </div>
            <div class="other-city-cont">
                <ul>
                    <li v-for="(city,cityIndex) in item.groupCitits" @click="toCity(city.id)" :key="cityIndex"> {{ city.name }} </li>
                </ul>
            </div>
          </li>
        </ul>
      </div>
      <Loading v-if="showLoading"></Loading>
  </div>
</template>

<script>
import NavHeader from "../../components/navHeader/NavHeader";
import { getNowSite, getHotCities, getGroupCities } from "../../api/site";
import Loading from "../../components/loading/Loading";
import { mapActions } from "vuex";

export default {
  name: "SelectSite",
  data() {
    return {
      nowSite: {},
      hotCities: [],
      groupCitits: [],
      showLoading: true
    };
  },
  mounted() {
    // 获取当前城市
    getNowSite().then(res => {
      this.nowSite = res;
    });
    // 获取热门城市
    getHotCities().then(res => {
      this.hotCities = res;
    });
    // 获取其他城市(按字母分别)
    getGroupCities().then(res => {
      let newArr = Object.keys(res).sort();
      let newObj = [];
      newArr.forEach((item, index) => {
        newObj.push({
          orderBy: item,
          groupCitits: res[item]
        });
      });
      this.groupCitits = newObj;
      this.showLoading = false;
    });
  },
  methods: {
    toCity(cityId) {
      this.$router.push({ name: "City", params: { id: cityId } });
      this.saveCityId(cityId);
    },
    ...mapActions(["saveCityId"])
  },
  components: {
    NavHeader,
    Loading
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/mixin.scss";

#select-site {
  font-size: 1.5rem;
  .now-location-tit {
    height: 4rem;
    line-height: 4rem;
    color: #999;
    background: #fff;
    @include setBd("border-bottom",#ddd);
    @include sidePad();
    font-size: 1.4rem;
    .tit-right {
      color: #333;
      float: right;
    }
  }
  .now-site {
    height: 4rem;
    line-height: 4rem;
    background: #fff;
    @include sidePad();
    @include setBd("border-bottom",#ddd);
    .site {
      color: $norColor;
    }
    .arrow-right {
      @include arrowRight(1.6rem,#999);
    }
  }
  .hot-city {
    margin-top: 1.5rem;
    font-size: 1.4rem;
    color: $norColor;
    background: #fff;
    .hot-city-tit {
      font-size: 1.3rem;
      color: #999;
      height: 4rem;
      line-height: 4rem;
      @include sidePad();
      @include setBd("border-bottom",#ddd);
      @include setBd("border-top",#ddd);
    }
    .hot-city-cont {
      ul {
        width: 100%;
        position: relative;
        overflow: hidden;
        li {
          float: left;
          width: 25%;
          height: 4rem;
          line-height: 4rem;
          text-align: center;
          @include setBd();
        }
      }
    }
  }
  .other-city {
    margin-top: 1.5rem;
    font-size: 1.4rem;
    color: #666;
    .city-group {
      background: #fff;
      margin-bottom: 1rem;
      .other-city-tit {
        font-size: 1.3rem;
        color: #999;
        height: 4rem;
        line-height: 4rem;
        @include sidePad();
        @include setBd("border-bottom",#ddd);
        @include setBd("border-top",#ddd);
      }
      .other-city-cont {
        ul {
          width: 100%;
          position: relative;
          overflow: hidden;
          li {
            float: left;
            width: 25%;
            height: 4rem;
            line-height: 4rem;
            text-align: center;
            @include setBd();
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
