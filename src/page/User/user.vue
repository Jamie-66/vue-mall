<template>
  <div class="layout-container">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <div class="w">
      <div class="content">
        <!-- <div class="account-sidebar">
          <div class="avatar gray-box ">
            <div>
              <img :src="userInfo.info.avatar?userInfo.info.avatar:'/static/images/user-avatar.png'"> 
              <h5>{{userInfo.info.name}}</h5>
            </div>
            <div class="box-inner">
              <ul class="account-nav">
                <li v-for="(item,i) in nav" :key='i' :class="{current:item.name===title}" @click="tab(item)">
                  <a href="javascript:;">{{item.name}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div> -->
        <div class="account-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <y-footer></y-footer>

  </div>

</template>
<script>
  import YFooter from '/common/footer'
  import YHeader from '/common/header'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        title: '我的订单',
        // nav: [
        //   {name: '账户资料', path: 'information'},
        //   {name: '我的订单', path: 'orderList'},
        //   {name: '收货地址', path: 'addressList'},
        //   // {name: '我的优惠', path: 'coupon'},
        //   // {name: '售后服务', path: 'support'},
        //   // {name: '以旧换新', path: 'exchange'},
        //   {name: '我的收藏', path: 'collection'},
        //   {name: '我的足迹', path: 'footprint'}
        // ],
        editAvatar: true
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      // tab (e) {
      //   this.$router.push({path: '/user/' + e.path})
      // }
    },
    created () {
      // let path = this.$route.path.split('/')[2]
      // this.nav.forEach(item => {
      //   if (item.path === path) {
      //     this.title = item.name
      //   }
      // })
    },
    components: {
      YFooter,
      YHeader
    },
    watch: {
      // $route (to) {
      //   let path = to.path.split('/')[2]
      //   this.nav.forEach(item => {
      //     if (item.path === path) {
      //       this.title = item.name
      //     }
      //   })
      // }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";

  // .layout-container {
  //   position: fixed;
  //   bottom:0;
  //   left: 0;
  //   right: 0;
  //   top: 0;
  //   background: #ededed;
  // }

  .w {
    padding-top: 10px;
    padding-bottom: 10px;
    // position: absolute;
    // bottom: 53px;
    // left: 0;
    // right: 0;
    // top: 100px;
    // overflow: auto;
    // background: #ededed;
  }

  .content {
    display: flex;
    height: 100%;
  }

  // .account-sidebar {
  //   width: 210px;
  //   border-radius: 6px;
  //   .avatar {
  //     padding-top: 20px;
  //     border-radius: 10px;
  //     text-align: center;
  //     img {
  //       width: 168px;
  //       height: 168px;
  //     }
  //     h5 {
  //       font-size: 18px;
  //       line-height: 48px;
  //       font-weight: 700;
  //     }
  //   }
  //   .account-nav {
  //     padding-top: 15px;
  //     li {
  //       position: relative;
  //       height: 48px;
  //       border-top: 1px solid #EBEBEB;
  //       line-height: 48px;
  //       &:hover {
  //         a {
  //           position: relative;
  //           z-index: 1;
  //           height: 50px;
  //           background-color: #98AFEE;
  //           line-height: 50px;
  //           color: #FFF;
  //         }

  //       }
  //       a {
  //         display: block;
  //       }
  //       &.current {
  //         a {
  //           position: relative;
  //           z-index: 1;
  //           height: 50px;
  //           background-color: #98AFEE;
  //           line-height: 50px;
  //           color: #FFF;
  //         }
  //       }

  //     }
  //   }
  // }

  .account-content {
    margin-left: 10px;
    margin-right: 10px;
    flex: 1;
    padding-bottom: 53px;
  }

</style>
