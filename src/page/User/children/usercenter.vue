<template>
  <div class="account-sidebar">
    <div class="avatar gray-box ">
      <div>
        <img :src="userInfo.info.avatar?userInfo.info.avatar:'/static/images/user-avatar.png'"> 
        <h5>{{userInfo.info.name}}</h5>
      </div>
      <div class="box-inner">
        <ul class="account-nav">
          <li v-for="(item,i) in nav" :key='i' @click="tab(item)">
            <a href="javascript:;">{{item.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        title: '我的订单',
        nav: [
          {name: '账户资料', path: 'information'},
          {name: '我的订单', path: 'orderList'},
          {name: '收货地址', path: 'addressList'},
          // {name: '我的优惠', path: 'coupon'},
          // {name: '售后服务', path: 'support'},
          // {name: '以旧换新', path: 'exchange'},
          {name: '我的收藏', path: 'collection'},
          {name: '我的足迹', path: 'footprint'}
        ],
        editAvatar: true
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      tab (e) {
        this.$router.push({path: '/user/' + e.path})
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

  .account-sidebar {
    // width: 210px;
    border-radius: 6px;
    .avatar {
      padding-top: 20px;
      border-radius: 10px;
      text-align: center;
      img {
        width: 168px;
        height: 168px;
      }
      h5 {
        font-size: 18px;
        line-height: 48px;
        font-weight: 700;
      }
    }
    .account-nav {
      padding-top: 15px;
      li {
        position: relative;
        height: 48px;
        border-top: 1px solid #EBEBEB;
        line-height: 48px;
        &:hover {
          a {
            position: relative;
            z-index: 1;
            height: 50px;
            background-color: #98AFEE;
            line-height: 50px;
            color: #FFF;
          }

        }
        a {
          display: block;
        }
      }
    }
  }
</style>
