<template>
  <div class="store">
        <ul>
            <li class="store-item" v-for="(item,index) in storeList" :key="index">
            <div class="item-wrap">
                <div class="store-img">
                <img :src="baseImgUrl + item.image_path" alt="">
                </div>
            <div class="store-desc">
                <div class="store-head">
                <span class="store-name">{{item.name | nameFilter}}</span>
                <span class="store-standard">保准票</span>
                </div>
                <div class="store-sale-detail">
                <div class="month">
                    <!-- 评分 -->
                    <Star :starWidth="starW(item)" ></Star>
                    <span>月售106单</span> 
                </div>
                <div class="store-ser">
                    <span class="fn" :style="{color:'#'+item.delivery_mode.color,border:item.delivery_mode.is_solid?'1px solid #ddd':''}" >{{item.delivery_mode.text}}</span>
                    <span class="zs">准时达</span>
                </div>
                </div>
                <div class="store-time">
                <span class="ps-fee">
                    ￥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}
                </span>
                <span class="time">
                    {{item.distance}}/{{item.order_lead_time}}
                </span>
                </div>
            </div>
            </div>
            
            </li>
        </ul>
    </div>
</template>

<script>
import Star from "../../components/star/Star";

export default {
  props: {
    storeList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      baseImgUrl: "http://cangdu.org:8001/img/"
    };
  },
  methods: {
    starW: function(item) {
      return item.rating / 5 * 100 + "%";
    }
  },
  filters: {
    nameFilter(name) {
      if (name.length > 9) {
        return name.substring(0, 9) + "...";
      } else {
        return name;
      }
    }
  },
  components: {
    Star
  }
};
</script>

<style lang="scss" scoped>
.store {
  .store-item {
    background: #fff;
    border-bottom: 1px solid #ddd;
    font-size: 1.5rem;
    .item-wrap {
      padding: 2rem 1.2rem;
      display: flex;
      align-items: center;
      .store-img {
        width: 6rem;
        height: 6rem;
        // float: left;
        margin-right: 1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .store-desc {
        flex: 1;
        .store-head {
          display: flex;
          justify-content: space-between;
          .store-name {
            font-weight: bold;
          }
          // .store-standard{
          //   // float: right;
          // }
        }
        .store-sale-detail {
          padding: 1.2rem 0;
          font-size: 1.3rem;
          display: flex;
          justify-content: space-between;
          .store-ser {
            float: right;
          }
        }
        .store-time {
          display: flex;
          justify-content: space-between;
          font-size: 1.2rem;
          position: relative;
          overflow: hidden;
          // .ps-fee{
          //   // float: left;
          // }
          // .time{
          //   // float: right;
          // }
        }
      }
    }
  }
}
</style>
