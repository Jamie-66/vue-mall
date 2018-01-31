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
        <el-col class="nav-item" :span="6" v-for="(item,i) in nav" :key="i">
          <div class="grid-content" :class="{current:item.name===title}" @click="tab(item)">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </div>
        </el-col>
      </el-row>
    </el-footer>
  <!-- </div> -->
</template>
<script>
  export default {
    data () {
      return {
        title: '首页',
        nav: [
          {name: '首页', path1: '/', path2: 'home', icon: 'fa fa-home'},
          {name: '收藏', path1: '/user/', path2: 'collection', icon: 'fa fa-star-o'},
          {name: '足迹', path1: '/user/', path2: 'footprint', icon: 'fa fa-paw'},
          {name: '购物车', path1: '/', path2: 'cart', icon: 'fa fa-shopping-cart'},
          {name: '用户中心', path1: '/user/', path2: 'usercenter', icon: 'fa fa-user'}
        ],
      }
    },
    methods: {
      tab (e) {
        this.$router.push({path: e.path1+e.path2})
      }
    },
    // 换页检测
    created () {
      let path = this.$route.path
      this.nav.forEach(item => {
        if (path.indexOf(item.path2) > -1) {
          this.title = item.name
        }
      })
    },
    // 页内切换检测
    watch: {
      $route (to) {
        let path = this.$route.path
        this.nav.forEach(item => {
          if (path.indexOf(item.path2) > -1) {
            this.title = item.name
          }
        })
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
    z-index: 100;
    background: linear-gradient(#fbfbfb, #ececec);
    .el-row {
      height: 100%;
      .nav-item:last-child {
        min-width: 70px;
      }
      .grid-content {
        text-align: center;
        color: #888;
        cursor: pointer;
        i {
          display: block;
          padding: 5px 0 0 0;
          font-size: 24px;
        }
        span {
          font-size: 12px;
        }
        &.current {
          color: #678ee7;
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
