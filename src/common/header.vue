<template>
  <div class="header-box">
    <div>
      <header class="w">
        <div class="w-box">
          <div class="nav-logo">
            <h1>
              <router-link to="/" title="Vue-mall">Vue-mall</router-link>
            </h1>
          </div>
          <div class="right-box">
            <!-- <div class="nav-list"> -->
              <!-- <input type="text" placeholder="搜索"> -->
              <!-- <span><i class="fa fa-search"></i></span> -->
              <!-- <router-link to="goods">全部商品</router-link> -->
              <!-- <router-link to="/">坚果 Pro</router-link>
              <router-link to="/">Smartisan M1 / M1L</router-link>
              <router-link to="/">Smartisan OS</router-link>
              <router-link to="/">欢喜云</router-link>
              <router-link to="/">应用下载</router-link>
              <router-link to="/">官方论坛</router-link> -->
            <!-- </div> -->
            <div class="nav-aside" ref="aside" :class="{fixed:st}">
              <!-- 搜索 -->
              <div class="search pr">
                <el-input v-if="searchType===0" placeholder="商品名称" size="mini" v-model="keyword">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="goodSearch"></i>
                </el-input>
                <el-input v-if="searchType===1" placeholder="商品类型" size="mini" v-model="typeName">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="goodSearch"></i>
                </el-input>
                
                <!-- <input type="text" placeholder="搜索" v-model="keyword" @keyup.13="goodSearch"> -->
                <!-- <span @click="goodSearch"><i class="el-icon-search"></i></span> -->
              </div>
              <!-- <span class="changeType" @click="searchType = searchType?0:1">
                <i :class="searchType?'fa fa-arrow-circle-right':'fa fa-arrow-circle-left'"></i>
              </span> -->
              <div class="user pr" :class="{active:showUser}">
                <a v-if="!login" href="#/login"></a>
                <a v-else href="javascript:;" @click="userShowState"></a>
                <!-- 用户信息显示 -->
                <div class="nav-user-wrapper pa active" v-if="login" v-show="showUser">
                  <div class="nav-user-list">
                    <ul>
                      <!--头像-->
                      <li class="nav-user-avatar">
                        <div>
                          <span class="avatar" :style="{backgroundImage:'url('+(userInfo.info.avatar?userInfo.info.avatar:'/static/images/user-avatar.png')+')'}">
                          </span>
                        </div>
                        <p class="name">{{userInfo.info.name}}</p>
                      </li>
                      <li v-for="(item,i) in nav" :key="i">
                        <router-link :to="item.path" @click.native="maskShowState">{{item.title}}</router-link>
                      </li>
                      <li>
                        <a href="javascript:;" @click="_loginOut">退出</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="shop pr" @click="cartShowState" ref="positionMsg" :class="{active:showCart}">
                <!-- <router-link to="cart"></router-link> -->
                <a href="javascript:;"></a>
                <span class="cart-num">
                  <i class="num" :class="{no:totalNum <= 0,move_in_cart:receiveInCart}">{{cartList.length}}</i>
                </span>
                <!--购物车显示块-->
                <div class="nav-user-wrapper pa active" v-show="showCart">
                  <div class="nav-user-list">
                    <div class="full" v-show="totalNum">
                      <!--购物列表-->
                      <div class="nav-cart-items">
                        <ul>
                          <li class="clearfix" v-for="(item,i) in cartList" :key="i">
                            <div class="cart-item">
                              <div class="cart-item-inner">
                                <router-link class="cart-item-r" :to="'goodsDetails?id='+item.productId">
                                  <!-- <div> -->
                                    <div class="item-thumb">
                                      <img :src="'/'+item.productImg">
                                    </div>
                                    <div class="item-desc">
                                      <div class="cart-cell">
                                        <h4><a href="" v-text="item.productName"></a></h4>
                                        <p class="attrs"><span v-text="item.productDescript"></span></p> 
                                        <h6>
                                          <span class="price-icon">¥</span>
                                          <span class="price-num">{{item.productPrice}}</span>
                                          <span class="item-num">x {{item.productNum}}</span>
                                        </h6>
                                      </div>
                                    </div>
                                  <!-- </div> -->
                                </router-link>
                                <div class="del-btn del" @click="delGoods(item.productId)">删除</div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <!--总件数-->
                      <div class="nav-cart-total"><p>共 <strong>{{totalNum}}</strong> 件商品</p> <h5>合计：<span
                        class="price-icon">¥</span><span
                        class="price-num">{{totalPrice}}</span></h5>
                        <h6>
                          <y-button classStyle="main-btn" text="去购物车" @btnClick="toCart"></y-button>
                        </h6>
                      </div>
                    </div>
                    <div v-show="!totalNum" style="height: 160px;text-align: center" class="cart-con">
                      <p>你的购物车竟然是空的!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <slot name="nav">
        <div class="nav-sub" :class="{fixed: st}">
          <!-- <div class="nav-sub-bg"></div> -->
          <div class="nav-sub-wrapper" :class="{fixed:st}">
            <div class="w">
              <ul class="nav-list">
                <li>
                  <router-link to="/">首页</router-link>
                </li>
                <li v-show="!st">
                  <router-link to="/goods">全部商品</router-link>
                </li>
                <li v-for="(item,i) in goodsType" :key="i">
                  <router-link :to="'/goods?goodsTypeId='+item.id">{{item.goodsTypeName}}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </slot>
    </div>
    <div class="mask" v-show="showMask" @click="maskShowState"></div>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  import { mapMutations, mapState } from 'vuex'
  import { getCartList, cartDel, getGoodsType } from '/api/goods'
  import { loginOut } from '/api/index'
  import { setStore, removeStore } from '/utils/storage'
  export default{
    data () {
      return {
        user: {},
        st: false,           // 控制顶部
        userShow: false,     // 头部用户信息显示
        cartShow: false,     // 头部购物车显示
        positionL: 0,
        positionT: 0,
        timerCartShow: null, // 定时隐藏购物车
        searchType: 0,
        keyword: '',         // 商品搜索
        typeName: '',        // 商品类型搜索
        goodsType: [],       // 商品类型
        maskShow: false,     // 控制遮罩层
        nav: [ 
          {path: '/user/information', title: '账号资料'},
          {path: '/user/orderList', title: '我的订单'},
          {path: '/user/addressList', title: '收货地址'}
        ],
        options: [{
          value: '0',
          label: '名称'
        }, {
          value: '1',
          label: '类型'
        }],
        value2: '0'
      }
    },
    computed: {
      ...mapState([
        'cartList', 'login', 'receiveInCart', 'showCart', 'userInfo', 'showMask', 'showUser'
      ]),
      // 计算价格
      totalPrice () {
        var totalPrice = 0
        this.cartList && this.cartList.forEach(item => {
          totalPrice += (item.productNum * item.productPrice)
        })
        return totalPrice
      },
      // 计算数量
      totalNum () {
        var totalNum = 0
        this.cartList && this.cartList.forEach(item => {
          totalNum += (item.productNum)
        })
        return totalNum
      }
    },
    methods: {
      ...mapMutations(['ADD_CART', 'INIT_BUYCART', 'ADD_ANIMATION', 'SHOW_HEADER', 'REDUCE_CART', 'RECORD_USERINFO', 'EDIT_CART']),
      // 购物车显示
      cartShowState () {
        this.userShow = false
        this.cartShow ? this.maskShow = false : this.maskShow = true
        this.cartShow = !this.cartShow
        this.SHOW_HEADER({
          showCart: this.cartShow,
          showUser: this.userShow,
          showMask: this.maskShow
        })
      },
      // 用户信息显示
      userShowState () {
        this.cartShow = false
        this.userShow ? this.maskShow = false : this.maskShow = true
        this.userShow = !this.userShow
        this.SHOW_HEADER({
          showCart: this.cartShow,
          showUser: this.userShow,
          showMask: this.maskShow
        })
      },
      // 遮罩层显示
      maskShowState () {
        this.userShow = false
        this.cartShow = false
        this.SHOW_HEADER({
          showCart: this.cartShow,
          showUser: this.userShow,
          showMask: false
        })
      },
      // 登陆时获取一次购物车商品
      _getCartList () {
        getCartList().then(res => {
          if (res.code === 0) {
            let cartData = []
            res.data.forEach((item,i) => {
              cartData.push({
                id: item.id,
                productId: item.goods_id,
                productPrice: item.price,
                productNum: item.num,
                productName: item.goods_name,
                productImg: item.image,
                productDescript: item.description,
                productStock: item.actual_stock,
                checked: '0',
                operateState: '0'
              })
            })
            setStore('buyCart', cartData)
          }
          // 重新初始化一次本地数据
        }).then(this.INIT_BUYCART)
      },
      // 删除商品
      delGoods (productId) {
        if (this.login) { // 登陆了
          cartDel({params: {goodsIds: JSON.stringify(productId)}}).then(res => {
            this.EDIT_CART({productId})
          })
        } else {
          this.EDIT_CART({productId})
        }
      },
      toCart () {
        this.$router.push({path: 'cart'})
      },
      // 控制顶部
      navFixed () {
        if (this.$route.path === '/goods' ||
          this.$route.path === '/home' ||
          this.$route.path === '/goodsDetails') {
          var st = document.documentElement.scrollTop || document.body.scrollTop
          st >= 100 ? this.st = true : this.st = false
          // 计算小圆当前位置
          let num = document.querySelector('.num')
          this.positionL = num.getBoundingClientRect().left
          this.positionT = num.getBoundingClientRect().top
          this.ADD_ANIMATION({cartPositionL: this.positionL, cartPositionT: this.positionT})
        } else {
          return
        }
      },
      // 退出登陆
      _loginOut () {
        loginOut().then(res => {
          removeStore('buyCart')   // 清除本地购物车
          removeStore('userInfo')  // 清除本地用户信息
          // window.location.href = '/home'
          this.$router.go(0)
          // this.$router.push({path: '/home'})
          // this.userShowState()
        })
      },
      // 商品搜索
      goodSearch () {
        if (this.keyword) {
          this.$router.push({
            path: '/goods',
            query: {
              goodsName: this.keyword
            }
          })
        }
        if (this.typeName) {
          this.$router.push({
            path: '/goods',
            query: {
              goodsTypeName: this.typeName
            }
          })
        }
      },
      // 商品类型
      _getGoodsType() {
        getGoodsType().then(res => {
          this.goodsType = res.data
        })
      }
    },
    mounted () {
      if (this.login) {
        this._getCartList()
      } else {
        this.INIT_BUYCART()
      }
      this.navFixed()
      this._getGoodsType()
      window.addEventListener('scroll', this.navFixed)
      window.addEventListener('resize', this.navFixed)
    },
    watch: {
      $route (to) {
        // let path = this.$route.path
        // console.log(path)
      }
    },
    components: {
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/theme";
  @import "../assets/style/mixin";

  .move_in_cart {
    animation: mymove .5s ease-in-out;
  }

  @keyframes mymove {
    0% {
      transform: scale(1)
    }
    25% {
      transform: scale(.8)
    }
    50% {
      transform: scale(1.2)
    }
    75% {
      transform: scale(.9)
    }
    100% {
      transform: scale(1)
    }
  }

  @-moz-keyframes mymove {
    0% {
      transform: scale(1)
    }
    25% {
      transform: scale(.8)
    }
    50% {
      transform: scale(1.2)
    }
    75% {
      transform: scale(.9)
    }
    100% {
      transform: scale(1)
    }
  }

  @-webkit-keyframes mymove {
    0% {
      transform: scale(1)
    }
    25% {
      transform: scale(.8)
    }
    50% {
      transform: scale(1.2)
    }
    75% {
      transform: scale(.9)
    }
    100% {
      transform: scale(1)
    }
  }

  @-o-keyframes mymove {
    0% {
      transform: scale(1)
    }
    25% {
      transform: scale(.8)
    }
    50% {
      transform: scale(1.2)
    }
    75% {
      transform: scale(.9)
    }
    100% {
      transform: scale(1)
    }
  }

  .header-box {
    background: $head-bgc;
    background-image: -webkit-linear-gradient(#000, #121212);
    background-image: linear-gradient(#000, #121212);
    width: 100%;

  }

  .mask {
    position: fixed;
    top: 0;
    bottom: 53px;
    left: 0;
    right: 0;
    z-index: 29;
    background: rgba(0, 0, 0, .1);
  }

  header {
    height: 80px;
    z-index: 30;
    position: relative;
  }

  .w-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    position: relative;
    h1 {
      height: 100%;
      display: flex;
      align-items: center;
      > a {
        background: url(/static/images/global-logo-red@2x.png) no-repeat 50%;
        background-size: cover;
        display: block;
        @include wh(50px, 40px);
        text-indent: -9999px;
        background-position: 0 0;
        margin-left: 10px;
      }
    }
    .nav-list {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 22px;
      a {
        color: #c8c8c8;
        display: block;
        font-size: 14px;
        padding: 0 25px;
        &:hover {
          color: #fff;
        }
      }
    }
    .nav-aside {
      position: relative;
      &:before {
        background-color: #333;
        background-color: hsla(0, 0%, 100%, .2);
        content: " ";
        @include wh(1px, 13px);
        overflow: hidden;
        position: absolute;
        top: 4px;
        left: 0;
      }
      &.fixed {
        // width: 262px;
        position: fixed;
        // left: 50%;
        right: 5px;
        top: 19px;
        // margin-left: 451px;
        margin-top: 0;
        z-index: 32;
        top: -43px;
        -webkit-transform: translate3d(0, 59px, 0);
        transform: translate3d(0, 59px, 0);
        -webkit-transition: -webkit-transform .3s cubic-bezier(.165, .84, .44, 1);
        transition: transform .3s cubic-bezier(.165, .84, .44, 1);
        .user {
          &:hover {
            a:before {
              background-position: -215px 0;
            }
          }
        }
        .shop {
          &:hover {
            a:before {
              background-position: -210px -19px;
            }
          }
        }
      }
    }

    .right-box {
      display: flex;
    }
    .nav-aside {
      display: flex;
    }
    // 搜索
    .search {
      width: 150px;
      // input {
      //   height: 26px;
      //   width: 150px;
      //   padding: 0 25px 0 10px;
      //   border: 1px solid #eee;
      //   border-radius: 2px;
      // }
      // span {
      //   position: absolute;
      //   right: 5px;
      //   top: 3px;
      //   font-size: 18px;
      //   cursor: pointer;
      // }
    }
    // 搜索类型转换
    .changeType {
      color: #888;
      font-size: 20px;
      display: inline-block;
      line-height: 28px;
      margin-left: 5px;
    }
    // 用户
    .user {
      margin-left: 5px;
      width: 36px;
      &.active {
        a:before {
          background-position: -5px 0;
        }
        
      }
      .nav-user-wrapper.active {
        top: 18px;
        visibility: visible;
        opacity: 1;
        -webkit-transition: opacity .15s ease-out;
        transition: opacity .15s ease-out;
      }
      > a {
        position: relative;
        @include wh(36px, 28px);
        display: block;
        text-indent: -9999px;
        &:before {
          content: " ";
          position: absolute;
          left: 8px;
          top: 3px;
          @include wh(20px);
          background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png) -155px 0;
          background-size: 240px 107px;
          transition: none;
        }

      }
      li + li {
        text-align: center;
        position: relative;
        border-top: 1px solid #f5f5f5;
        line-height: 36px;
        height: 36px;
        color: #616161;
        font-size: 12px;
        &:hover {
          background-color: #fafafa;
        }
        a {
          display: block;
          color: #616161;
        }
      }
      li:last-child {
        border-radius: 0 0 8px 8px;
      }
      .nav-user-avatar {
        > div {
          position: relative;
          margin: 0 auto 8px;
          @include wh(46px);
          text-align: center;
          &:before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            border-radius: 50%;
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06);
          }
          .avatar {
            border-radius: 50%;
            display: block;
            @include wh(100%);
            background-repeat: no-repeat;
            background-size: contain;
          }

        }
        .name {
          margin-bottom: 10px;
          font-size: 12px;
          line-height: 1.5;
          text-align: center;
          color: #757575;
        }
      }
      .nav-user-wrapper {
        width: 140px;
        transform: translate(-50%);
        left: 50%;
      }
      .nav-user-list {
        width: 140px;
        &:before {
          left: 50%;
        }

      }
    }
    .shop {
      position: relative;
      float: left;
      // margin-left: 21px;
      width: 61px;
      z-index: 99;
      &.active {
        a:before {
          content: " ";
          background-position: 0 -19px;
        }
      }
      .nav-user-wrapper.active {
        top: 18px;
        visibility: visible;
        opacity: 1;
        -webkit-transition: opacity .15s ease-out;
        transition: opacity .15s ease-out;
      }
      > a {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 3px;
        display: block;
        right: 0;
        z-index: 1;
        &:before {
          display: block;
          @include wh(30px, 100%);
          content: " ";
          background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png) 0 -19px;
          background-size: 240px 107px;
          background-position: -150px -19px;
        }
      }
      .cart-num {
        position: relative;
        display: block;
        margin-left: 31px;
        margin-top: -1px;
        min-width: 30px;
        text-indent: 0;
        line-height: 20px;
        padding-top: 3px;
        > i {
          background: #eb746b;
          background-image: -webkit-linear-gradient(#eb746b, #e25147);
          background-image: linear-gradient(#eb746b, #e25147);
          box-shadow: inset 0 0 1px hsla(0, 0%, 100%, .15), 0 1px 2px hsla(0, 0%, 100%, .15);
          text-align: center;
          font-style: normal;
          display: inline-block;
          @include wh(20px);
          line-height: 20px;
          border-radius: 10px;
          color: #fff;
          font-size: 12px;
          &.no {
            background: #969696;
            background-image: -webkit-linear-gradient(#A4A4A4, #909090);
            background-image: linear-gradient(#A4A4A4, #909090);
            box-shadow: inset 0 0 1px #838383, 0 1px 2px #838383;
          }
        }

      }
      .nav-user-wrapper {
        right: 8px;
        width: 280px;
        .nav-user-list {
          &:before {
            right: 25px;
          }
        }
      }
      .nav-user-list {
        padding: 0;
        width: 100%;
        .full {
          border-radius: 8px;
          overflow: hidden;
        }
        .nav-cart-items {
          max-height: 300px;
          overflow-x: hidden;
          overflow-y: auto;
        }
        .cart-item {
          // height: 120px;
          width: 100%;
          overflow: hidden;
          border-top: 1px solid #f0f0f0;
          // &:hover {
          //   background-color: #fcfcfc;
          //   .del {
          //     display: block;
          //   }
          // }

        }
        li:first-child .cart-item:first-child {
          border-top: none;
          border-radius: 8px 8px 0 0;
          overflow: hidden;
        }
        .cart-item-inner {
          padding: 10px;
          position: relative;
          .cart-item-r {
            display: flex;
          }
        }
        .item-thumb {
          position: relative;
          float: left;
          width: 60px;
          height: 60px;
          border-radius: 3px;
          &:before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 2;
            border: 1px solid #f0f0f0;
            border: 0 solid transparent;
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06);
            border-radius: 3px;
          }
          img {
            display: block;
            @include wh(100%, 100%);
            border-radius: 3px;
            overflow: hidden;
          }
        }
        .item-desc {
          margin-left: 8px;
          // display: table;
          display: flex;
          flex: 1;
          // @include wh(205px, 80px);
          padding-right: 20px;
          h4, .attrs {
            color: #000;
            // width: 160px;
            // overflow: hidden;
            // word-break: break-all;
            // white-space: nowrap;
            // text-overflow: ellipsis;
            font-size: 14px;
            line-height: 16px;
            margin-bottom: 4px;
          }
          .attrs span {
            position: relative;
            // display: inline-block;
            margin-right: 20px;
            font-size: 14px;
            line-height: 14px;
            color: #999;
          }
          .attrs span:last-child {
            margin-right: 0;
          }
          h6 {
            color: #cacaca;
            font-size: 12px;
            line-height: 14px;
            margin-top: 10px;
            span {
              display: inline-block;
              font-weight: 700;
              color: #cacaca;
            }
            .price-icon, .price-num {
              color: #d44d44;
            }
            .price-num {
              margin-left: 5px;
              font-size: 14px;
            }
            .item-num {
              margin-left: 10px;
            }
          }

        }
        .cart-cell {
          // display: table-cell;
          // vertical-align: middle;
          display: flex;
          flex: 1;
          flex-direction: column;
        }
        .del {
          // display: none;
          // overflow: hidden;
          display: block;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .nav-cart-total {
        box-sizing: content-box;
        position: relative;
        padding: 12px;
        height: 40px;
        background: #fafafa;
        border-top: 1px solid #f0f0f0;
        border-radius: 0 0 8px 8px;
        box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, .5), 0 -3px 8px rgba(0, 0, 0, .04);
        background: -webkit-linear-gradient(#fafafa, #f5f5f5);
        background: linear-gradient(#fafafa, #f5f5f5);
        p {
          margin-bottom: 4px;
          line-height: 16px;
          font-size: 12px;
          color: #c1c1c1;
        }
        h5 {
          line-height: 20px;
          font-size: 14px;
          color: #6f6f6f;
          span {
            font-size: 18px;
            color: #de4037;
            display: inline-block;
            font-weight: 700;
          }
          span:first-child {
            font-size: 12px;
            margin-right: 5px;
          }
        }
        h6 {
          position: absolute;
          right: 20px;
          top: 17px;
          // width: 108px;
        }
      }
    }
  }

  // @media (max-height: 780px) {
  //   .nav-cart-items {
  //     max-height: 423px !important;
  //   }
  // }

  // @media (max-height: 900px) {
  //   .nav-cart-items {
  //     max-height: 544px !important;
  //   }
  // }

  // @media (max-height: 1080px) {
  //   .nav-cart-items {
  //     max-height: 620px !important;
  //   }
  // }

  // 用户信息弹出
  .nav-user-wrapper {
    position: absolute;
    z-index: 30;
    padding-top: 18px;
    opacity: 0;
    visibility: hidden;
    top: -3000px;
    .nav-user-list {
      position: relative;
      padding-top: 12px;
      background: #fff;
      border: 1px solid #d6d6d6;
      border-color: rgba(0, 0, 0, .08);
      border-radius: 8px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, .15);
      z-index: 10;
      &:before {
        position: absolute;
        content: " ";
        background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png) no-repeat -49px -43px;
        background-size: 240px 107px;
        @include wh(20px, 8px);
        top: -8px;
        margin-left: -10px;
      }
    }
  }

  .nav-sub {
    position: relative;
    z-index: 20;
    height: 60px;
    background: #f7f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .04);
    &.fixed {
      position: fixed;
      z-index: 21;
      height: 60px;
      top: 0;
      left: 0;
      right: 0;
      border-bottom: 1px solid #dadada;
      background-image: -webkit-linear-gradient(#fff, #f1f1f1);
      background-image: linear-gradient(#fff, #f1f1f1);
    }
    .nav-sub-wrapper {
      padding: 16px 0;
      height: 60px;
      position: relative;
      &.fixed {
        padding: 0;
        height: 100%;
        display: flex;
        align-items: center;
      }
      &:after {
        content: " ";
        position: absolute;
        top: 89px;
        left: 50%;
        margin-left: -610px;
        width: 1220px;
        background: #000;
        height: 1px;
        display: none;
        opacity: 0;
        -webkit-transition: opacity .3s ease-in;
        transition: opacity .3s ease-in;
      }
    }
    .w {
      display: flex;
      justify-content: space-between;
    }
    .nav-list {
      height: 28px;
      line-height: 28px;
      display: flex;
      align-items: center;
      height: 100%;
      li:first-child {
        padding-left: 0;
        a {
          padding-left: 10px;
        }
      }
      li {
        position: relative;
        float: left;
        padding-left: 2px;
        a {
          display: block;
          padding: 0 15px;
          color: #666;
        }
      }
      li:before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 13px;
        width: 2px;
        height: 2px;
        background: #bdbdbd;
      }
    }
  }

  @media (min-width: 1px) {
    .nav-sub .nav-sub-wrapper:after {
      display: block;
    }
  }

  .cart-con {
    /*display: flex;*/
    text-align: center;
    position: relative;
    p {
      padding-top: 110px;
      color: #333333;
      font-size: 14px;
    }
  }

  .cart-con:before {
    position: absolute;
    content: ' ';
    left: 50%;
    transform: translate(-50%, -70%);
    top: 50%;
    width: 76px;
    height: 62px;
    background: url("/static/images/cart-empty-new.png") no-repeat;
    background-size: cover;

  }
  .el-input__suffix {
    i {
      color: #333;
    }
  }
</style>

