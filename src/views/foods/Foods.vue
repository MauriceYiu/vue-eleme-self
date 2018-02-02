<template>
  <div id="foods">
      <nav-header :doShowMe="false" :doShowGoBack="true">
        <p class="title" slot="title">{{title}}</p>
      </nav-header>
      <div>
          <div class="filter-wrap">
            <ul>
              <li  @click="doFilterShow">
                <b class="tit">{{storeFilterTitle}}</b>
                <span :class="{'toOri':filterShow}">▼</span>
                <div class="show-wrap" @click.stop="null">
                  <div class="cate-wrap" :class="{'filterShow':filterShow}">
                    <div class="cate-left" ref="filterLeft">
                      <div class="left-list">
                        <div v-for="(item,index) in categoryList" 
                        :key="index"
                        @click.stop="toRightList(item)"
                        >
                          <img :src="imgPath(item.image_url)" alt="">
                          <span class="name">{{item.name}}</span>
                          <span class="count">{{item.count}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="cate-right" ref="filterRight">
                      <div class="right-list">
                          <div class="item" v-for="(item,index) in categoryRightList" :key="index">
                            {{item.name}}
                          </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </li>
              <li @click="doPxShow">
                <b class="tit">排序</b>
                <span :class="{'toOri':pxShow}">▼</span>
                <div class="px-show-wrap" :class="{'pxShow':pxShow}">
                  <div class="px-list">
                    <div class="px-item">
                       智能排序
                    </div>
                    <div class="px-item">
                       距离最近
                    </div>
                    <div class="px-item">
                       销量最高
                    </div>
                    <div class="px-item">
                       起送价最低
                    </div>
                    <div class="px-item">
                       评分最高
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <b class="tit">筛选</b>
                <span>▼</span>
              </li>
            </ul>
          </div>
          <div class="filter-fix">&nbsp;</div>
      </div>
      <StoreList :storeList="storeList" class="store-list" ></StoreList>
      <transition name="maskShow">
      <div class="mask" v-show="doShowMask"></div>
      </transition>
  </div>
</template>

<script>
import NavHeader from "../../components/navHeader/NavHeader";
import StoreList from "../../components/storeList/StoreList";
import { getNearByStore } from "../../api/main";
import { getCategory } from "../../api/foods";
import { getImgPath } from "./../../utils/decImgPath";
import BScroll from "better-scroll";
export default {
  name: "Foods",
  data() {
    return {
      title: "",
      storeFilterTitle: "",
      storeList: [],
      filterShow: false,
      pxShow: false,
      categoryList: [],
      categoryRightList: [],
      doShowMask: false
    };
  },
  beforeMount() {
    this.title = this.$route.query.title;
    this.storeFilterTitle = this.title;
    this.geohash = this.$route.query.geohash;
  },
  mounted() {
    this.getStoreList();
    this.getCategoryList();
    let scrollLeft = new BScroll(this.$refs.filterLeft, {
      scrollY: true,
      click: true
    });
    let scrollRight = new BScroll(this.$refs.filterRight, {
      scrollY: true,
      click: true
    });
  },
  methods: {
    getStoreList() {
      let nowSiteInfo = this.geohash.split(",");
      getNearByStore(nowSiteInfo[0], nowSiteInfo[1]).then(res => {
        this.storeList = res;
      });
    },
    doFilterShow() {
      this.filterShow = !this.filterShow;
      if(this.filterShow){
        this.pxShow = false;
        this.doShowMask = true;
      }else{
        this.doShowMask = false;
      }
      if (this.filterShow) {
        this.storeFilterTitle = "分类";
      } else {
        this.storeFilterTitle = this.$route.query.title;
      }
    },
    doPxShow() {
      this.pxShow = !this.pxShow;
      if (this.pxShow) {
        this.filterShow = false;
        this.doShowMask = true;
      } else {
        this.doShowMask = false;
      }
    },
    getCategoryList() {
      let geohashData = this.geohash.split(",");
      getCategory(geohashData[0], geohashData[1]).then(res => {
        this.categoryList = res;
      });
    },
    imgPath(url) {
      return getImgPath(url);
    },
    toRightList(item) {
      this.categoryRightList = item.sub_categories;
    }
  },
  components: {
    NavHeader,
    StoreList
  }
};
</script>

<style lang='scss' scoped>
#foods {
  font-size: 1.2rem;
  .filter-fix {
    padding: 1.2rem 0;
    visibility: hidden;
  }
  .filter-wrap {
    background: #fff;
    position: fixed;
    top: 5rem;
    left: 0;
    right: 0;
    z-index: 9998;
    ul {
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid #ddd;
      text-align: center;
      li {
        float: left;
        width: 33.333333333%;
        padding: 1.2rem 0;
        position: relative;
        b.tit {
          display: inline-block;
          vertical-align: middle;
          font-weight: 500;
          font-size: 1.3rem;
        }
        span {
          transition: all 0.3s;
          display: inline-block;
          text-align: center;
          vertical-align: middle;
        }
        &:after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -1rem;
          width: 1px;
          height: 2rem;
          background: #ddd;
        }
        &:last-child {
          &:after {
            display: none;
          }
        }
        .show-wrap {
          position: fixed;
          margin-top: 1.2rem;
          left: 0;
          z-index: 9998;
          width: 100%;
          .cate-wrap {
            height: 0rem;
            background: #fff;
            padding-right: 50%;
            position: relative;
            transition: all 0.3s;
            opacity: 0;
            .cate-left {
              float: left;
              width: 100%;
              height: 100%;
              overflow: hidden;
              .left-list {
                text-align: left;
                div {
                  padding: 1.2rem 1rem;
                  img {
                    vertical-align: middle;
                    width: 2rem;
                  }
                  span {
                    vertical-align: middle;
                  }
                  span.count {
                    float: right;
                    display: inline-block;
                    padding: 0.3rem;
                    background: #ddd;
                    border-radius: 0.3rem;
                  }
                }
              }
            }
            .cate-right {
              position: absolute;
              right: 0;
              width: 50%;
              height: 100%;
              overflow: hidden;
              .item {
                width: 100%;
                border-bottom: 1px solid #ddd;
                padding: 1.2rem 0;
                padding-left: 0.5rem;
                text-align: left;
              }
            }
          }
        }
        .px-show-wrap{
          position: fixed;
          margin-top: 1.2rem;
          left: 0;
          z-index: 9998;
          width: 100%;
          background: #fff;
          transition: all .3s;
          height: 0;
          overflow: hidden;
          .px-list{
            .px-item{
              padding: 2rem 0;
              padding-left: 1.2rem;
              text-align: center;
              font-size: 1.5rem;
              color: #999;
              border-bottom: 1px solid #ddd;
            }
          }
        }
      }
    }
  }
  .filterShow {
    height: 37.5rem !important;
    opacity: 1 !important;
  }
  .pxShow{
    height: auto !important;
  }
  .toOri {
    transform-origin: center center;
    transform: rotate(180deg);
  }
  .mask {
    position: fixed;
    top: 5rem;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9995;
  }
  .maskShow-enter-active,
  .maskShow-leave-active {
    transition: all 0.3s;
  }
  .maskShow-enter,
  .maskShow-leave-to {
    opacity: 0;
  }
}
</style>
