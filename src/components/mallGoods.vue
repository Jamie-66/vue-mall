<template>
  <div class="good-item">
    <div style="">
      <div class="good-img">
        <router-link :to="'/goodsDetails?id='+msg.ID">
          <img v-lazy="msg.image" :alt="msg.goods_name">
        </router-link>
      </div>
      <h6 class="good-title">{{msg.goods_name}}</h6>
      <h3 class="sub-title ellipsis">{{msg.description}}</h3>
      <div class="good-price pr">
        <div class="ds pa">
          <router-link :to="'/goodsDetails?id='+msg.ID">
            <y-button text="查看详情" style="margin: 0 5px;"></y-button>
          </router-link>
          <y-button text="加入购物车"
                    style="margin: 0 5px"
                    @btnClick="_addCart(msg.ID,msg.price,msg.goods_name,msg.image,msg.description,msg.actual_stock)"
                    classStyle="main-btn"
                    v-if="type === 'buy'">
          </y-button>
          <!-- <y-button text="删除"
                    style="margin: 0 5px"
                    @btnClick="_delFoot()"
                    classStyle="main-btn"
                    v-if="type === 'delete'">
          </y-button> -->
          <y-button text="取消收藏"
                    style="margin: 0 5px"
                    @btnClick="_cancelCollect(msg.ID, index)"
                    classStyle="main-btn"
                    v-if="type === 'cancel'">
          </y-button>
        </div>
        <p><span style="font-size: 16px">￥</span>{{msg.price}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  import { addCart, collectinDel } from '/api/goods.js'
  import { mapMutations, mapState } from 'vuex'
  export default {
    props: {
      msg: {type: [Object, Array]},
      type: {
        type: [String],
        default: 'buy'
      },
      index: {type: [Number]}
    },
    data () {
      return {}
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      _addCart (id, price, name, img, description, actual_stock) {
        if (!this.showMoveImg) {  // 动画是否在运动
          if (this.login) {  // 登录了 直接存在用户名下
            addCart({params: {goodsId: id,count: 1}}).then(res => {
              // 并不重新请求数据
              this.ADD_CART({
                productId: id,
                productPrice: price,
                productName: name,
                productImg: img,
                productDescript: description,
                productStock: actual_stock
              })
            })
          } else { // 未登录 vuex
            this.ADD_CART({
              productId: id,
              productPrice: price,
              productName: name,
              productImg: img,
              productDescript: description,
              productStock: actual_stock
            })
          }
          // 加入购物车动画
          var dom = event.target
          // 获取点击的坐标
          let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
          let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
          // 需要触发
          this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: img})
          // if (!this.showCart) {
          //   this.SHOW_CART({showCart: true})
          //   setTimeout(_=>{
          //     this.SHOW_CART({showCart: false})
          //   },2000)
          // }
        }
      },
      // 删除足迹
      _delFoot () {
        alert('功能待开发')
      },
      // 取消收藏
      _cancelCollect (productId, i) {
        collectinDel({params:{goodsId: productId}}).then(res => {
          if (res.code === 0) {
            this.$emit('collect-del', i)
          } else {
            console.log(res.msg)
          }
        })
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    mounted () {
    },
    components: {
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/mixin";
  @import "../assets/style/theme";
  
  .good-item {
    background: #fff;
    // width: 25%;
    width: 49%;
    transition: all .5s;
    // height: 430px;
    border-radius: 5px;
    padding-bottom: 5px;
    margin-bottom: 5px;
    &:nth-child(odd) {
      margin-right: 5px;
    }
    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 20px #999;
      .good-price p {
        display: none;
      }
      .ds {
        display: flex;
      }
    }
    .ds {
      @extend %block-center;
      width: 100%;
      display: none;
    }

    .good-img {
      img {
        margin: 6px auto 10px;
        // @include wh(calc(100%-15px));
        width: calc(100% - 15px);
        // height: calc(100% - 15px);
        height: 100px;
        display: block;
      }
    }
    .good-price {
      margin: 10px 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #e4393c;
      font-size: 18px;
    }
    .good-title {
      line-height: 1.2;
      font-size: 14px;
      color: #424242;
      margin: 0 auto;
      padding: 0 14px;
      text-align: center;
      overflow: hidden;
    }
    h3 {
      text-align: center;
      line-height: 1.2;
      font-size: 12px;
      color: #555;
      padding: 5px 10px;
    }

  }
</style>
