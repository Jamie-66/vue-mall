<template>
  <!-- <div class="footer">
    <div class="tag">
      <a href="javascript:;">简体</a>
      <a href="javascript:;">繁体</a>
      <a href="javascript:;">English</a>
      <a href="javascript:;">常见问题</a></div>
    <div class="cop"><p>Copyright © 2004-2017  xx.com 版权所有</p></div> -->
    <el-footer height="53px">
      <el-row type="flex" :gutter="20">
        <el-col :span="6">
          <router-link to="/">
            <div class="grid-content" :class="{active:current==0}" @click="current=0">
              <i class="fa fa-home"></i>
              <span>首页</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="user/collection">
            <div class="grid-content" :class="{active:current==1}" @click="current=1">
              <i class="fa fa-star-o"></i>
              <span>收藏</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="user/footprint">
            <div class="grid-content" :class="{active:current==2}" @click="current=2">
              <i class="fa fa-paw"></i>
              <span>足迹</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="cart">
            <div class="grid-content" :class="{active:current==3}" @click="current=3">
              <i class="fa fa-shopping-cart"></i>
              <span>购物车</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/user/information">
            <div class="grid-content" :class="{active:current==4}" @click="current=4">
              <i class="fa fa-user"></i>
              <span>用户中心</span>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </el-footer>
  <!-- </div> -->
</template>
<script>
  export default {
    data () {
      return {
        current: 0
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(#fbfbfb, #ececec);
    .el-row {
      height: 100%;
      .grid-content {
        text-align: center;
        color: #666;
        i {
          display: block;
          padding: 5px 0 0 0;
          font-size: 24px;
          // color: red;
        }
        span {
          font-size: 12px;
        }
        &.active {
          color: red;
        }
      }
    } 
  }

  // .footer {
  //   padding: 50px 0 20px;
  //   background: #fff;
  //   margin-top: 20px;
    
  // }

  // .tag {
  //   display: flex;
  //   justify-content: center;
  //   a {
  //     height: 14px;
  //     padding: 0 10px;
  //     line-height: 14px;
  //   }
  //   a + a {
  //     border-left: 1px solid #666;
  //   }
  // }

  // .cop {
  //   text-align: center;
  //   margin: 10px 0;
  // }
</style>
