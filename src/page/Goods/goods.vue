<template>
  <div class="goods">
    <div class="nav">

      <div class="w">
        <a @click="reset()" :class="{active:sortType===1}"><span>综合排序</span></a>
        <a @click="sort(true)" :class="{active:sortType===2}"><span>价格</span><i class="fa fa-caret-up fa-fw"></i></a>
        <a @click="sort(false)" :class="{active:sortType===3}"><span>价格</span><i class="fa fa-caret-down fa-fw"></i></a>
        <!-- <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="min">
          <span style="margin: 0 5px"> - </span>
          <input type="number" placeholder="价格" v-model="max">
          <y-button text="确定" classStyle="main-btn" @btnClick="reset" style="margin-left: 10px;"></y-button>
        </div> -->
      </div>
    </div>

    <!--商品-->
    <!-- 不能用v-if,否则无限滚动失效 -->
    <div v-show="goods.length">
      <div class="goods-box w">
        <mall-goods v-for="(item,i) in goods" :key="i" :msg="item"></mall-goods>
      </div>
      <div v-show="!busy" class="w" style="text-align: center;background: #fff" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        正在加载中...
      </div>
    </div>
    <div v-if="!goods.length" class="empty">
      <span>没有找到符合条件的商品</span>
    </div>
  </div>
</template>
<script>
  import { getGoods } from '/api/goods.js'
  import mallGoods from '/components/mallGoods'
  import YButton from '/components/YButton'
  export default {
    data () {
      return {
        goods: [],
        // min: '',
        // max: '',
        busy: false,
        timer: null,
        sortType: 1,
        windowHeight: null,
        windowWidth: null,
        params: {
          current: 1,     // 页码
          size: 10,       // 每页显示数量
          sort: '',       // 排序
          orderBy: '',    // 价格排序
          isAsc: true,    // 默认升序
          goodsName: '',  // 商品名搜索
          goodsTypeId: '',// 商品类型id搜索 
          goodsTypeName: ''// 商品类型名称搜索 
        }
      }
    },
    methods: {
      _getGoods (flag) {
        let params = {
          current: this.params.current,
          size: this.params.size,
          orderByField: this.params.orderBy,
          isAsc: this.params.isAsc,
          goodsName: this.params.goodsName,
          goodsTypeId: this.params.goodsTypeId,
          goodsTypeName: this.params.goodsTypeName

          // priceGt: this.min,
          // priceLte: this.max
        }
        getGoods({params: params}).then(res => {
          if (res.data.length) {
            let data = res.data
            if (flag) {   // 加载更多
              this.goods = this.goods.concat(data)
            } else {
              this.goods = data
            }
            // this.goods.forEach(item => {
            //   item.image = 'https://resource.smartisan.com/resource/ae0d4c4882a95c2d7599c2a7c92162f3.jpg'
            // });
          } else {
            clearTimeout(this.timer)
            this.busy = true
          }
        })
      },
      // 默认排序
      reset () {
        this.sortType = 1
        this.params.orderBy = ''
        this.params.isAsc = true
        this.params.current = 1
        this.params.size = 10
        this.busy = false
        this._getGoods()
      },
      // 价格排序
      sort (v) {
        console.log(v)
        v ? this.sortType = 2 : this.sortType = 3
        this.params.orderBy = 'price'
        this.params.isAsc = v
        this.params.current = 1
        this.busy = false
        this._getGoods()
      },
      // 加载更多
      loadMore () {
        this.busy = true
        this.timer = setTimeout(() => {
          this.params.current++
          this._getGoods(true)
          this.busy = false
        }, 500)
      }
    },
    created () {
      let query =  this.$route.query
      console.log(query)
      if (query.goodsName) {
        this.params.goodsName = query.goodsName
      } else if (query.goodsTypeName){
        this.params.goodsName = ''
        this.params.goodsTypeName = query.goodsTypeName
      } else if(query.goodsTypeId) {
        this.params.goodsName = ''
        this.params.goodsTypeName = ''
        this.params.goodsTypeId = query.goodsTypeId
      }
      this._getGoods()
    },
    mounted () {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
    },
    watch: {
      $route (to, from) {
        this.$router.go(0)
      }
    },
    components: {
      mallGoods,
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";
  @import "../../assets/style/theme";

  .goods {
    padding: 0 0 53px;
  }
  .nav {
    height: 60px;
    line-height: 60px;
    background: #fff;
    margin-bottom: 5px;
    > div {
      display: flex;
      align-items: center;
      a {
        padding: 0 8px;
        height: 100%;
        @extend %block-center;
        font-size: 14px;
        color: #999;
        &.active {
          color: #5683EA;
        }
        &:hover {
          color: #5683EA;
        }
      }
      input {
        @include wh(43px, 24px);
        border: 1px solid #ccc;
        line-height: 22px;
      }
      input + input {
        margin-left: 10px;
      }
    }
    .price-interval {
      padding: 0 8px;
      @extend %block-center;
      input[type=number] {
        border: 1px solid #ccc;
        text-align: center;
        background: #fff;
        border-radius: 5px;
      }
    }
  }

  .goods-box {
    overflow: hidden;
    padding: 0 5px;
    > div {
      float: left;
      border: 1px solid #efefef;
    }
  }

  .empty {
    padding: 60px 0;
    text-align: center;
    font-size: 14px;
    background: #fff;
  }

</style>
