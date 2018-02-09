<!--商品详情-->
<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <!-- <div class="thumbnail">
            <ul>
              <li v-for="(item, i) in small" :key="i" :class="{on:big===item}" @click="big=item">
                <img v-lazy="item" :alt="product.goodsName">
              </li>
            </ul>
          </div> -->
          <div class="thumb">
            <div class="big">
              <img v-lazy="big" :alt="product.goodsName">
            </div>
            <!-- <div class="big">
              <img :src="big" :alt="product.goodsName">
            </div> -->
            <!-- <el-carousel :interval="3000" arrow="never" height="200px" indicator-position="outside">
              <el-carousel-item v-for="(item,i) in small" :key="i">
                <div style="height: 100%;width: 100%;">
                  <img :src="item" style="height: 100%;">
                </div>
              </el-carousel-item>
            </el-carousel> -->
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{product.goodsName}}</h4>
          <h6>
            <span>{{product.description}}</span>
          </h6>
          <h6>
            <span class="price"><em>¥</em><i>{{product.price}}</i></span>
          </h6>
        </div>
        <div class="shelves" v-if="offShelf">
          <div class="num">
            <span class="params-name">数量</span>
            <buy-num @edit-num="editNum" :limit="Number(product.actualStock)"></buy-num>
          </div>
          <div class="buy">
            <y-button text="加入购物车" classStyle="main-btn" @btnClick="_addCart(product.id,product.price,product.goodsName,product.image)"></y-button>
            <!-- <y-button text="现在购买" @btnClick="checkout(product.id)"></y-button> -->
            <y-button text="点击收藏" @btnClick="_collectionAdd(product.id)"></y-button>
          </div>
        </div>
        <div class="similar" v-else>
          <span>该商品已下架</span>
          <router-link to="/goods">
            <y-button text="看看其他"></y-button>
          </router-link>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info" v-if="offShelf">
      <y-shelf title="产品信息">
        <div slot="content">
          <div class="img-item" v-if="productMsg">
            <!-- <img v-for="(item,i) in productMsg.pieces_num" :key="i"
                 v-lazy="`${productMsg.url}?x-oss-process=image/resize,w_2440/indexcrop,y_1440,i_${item-1}/quality,Q_100/format,webp`"
                 alt=""> -->
                 <img v-lazy="productMsg.url[0]" alt="">
          </div>
          <div class="no-info" v-else>
            该产品暂无内容
          </div>
        </div>
      </y-shelf>
    </div>
  </div>
</template>
<script>
  import { getGoodsDet, addCart, collectionAdd } from '/api/goods'
  import { mapMutations, mapState } from 'vuex'
  import YShelf from '/components/shelf'
  import BuyNum from '/components/buynum'
  import YButton from '/components/YButton'
  export default {
    data () {
      return {
        productMsg: {},
        small: [],
        big: '',
        product: {},
        productNum: 1,
        offShelf: 1  //判断是否上架：0下架；1上架
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      _getGoodsDet (_id) {
        getGoodsDet({params: {id: _id}}).then(res => {
          let result = res.data
          this.product = result
          // this.productMsg = result.image || ''
          this.productMsg = ''
          this.offShelf = result.state
          // this.small = result.productImageSmall
          // this.big = this.small[0]
          // this.productMsg = {
          //   height: 15201,
          //   piece_height: 1440,
          //   pieces_num: 5,
          //   url: ["http://image.smartisanos.cn/resource/956f3860a3b89581926ddfc27336bd6f.jpg"],
          //   width: 2440
          // }
          // this.small = [
          //   "http://image.smartisanos.cn/resource/41818412237f59924a19c62b9b888ec2.jpg",
          //   "http://image.smartisanos.cn/resource/62e72601141518c9cb0e9e70402a466c.jpg",
          //   "http://image.smartisanos.cn/resource/4dc09d157d95e530607bf9180a844402.jpg",
          //   "http://image.smartisanos.cn/resource/ad560139756301700f465214027aef5b.jpg"
          // ]
          // this.big = 'http://image.smartisanos.cn/resource/41818412237f59924a19c62b9b888ec2.jpg'
          this.big = result.image
        })
      },
      _addCart (id, price, name, img) {
        if (!this.showMoveImg) {     // 动画是否在运动
          if (this.login) { // 登录了 直接存在用户名下
            addCart({params: {goodsId: id, count: this.productNum}}).then(res => {
              // 并不重新请求数据
              this.ADD_CART({
                productId: id,
                productPrice: price,
                productName: name,
                productImg: img,
                productNum: this.productNum
              })
            })
          } else { // 未登录 vuex
            this.ADD_CART({
              productId: id,
              productPrice: price,
              productName: name,
              productImg: img,
              productNum: this.productNum
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
      checkout (productId) {
        this.$router.push({path: '/checkout', query: {productId, num: this.productNum}})
      },
      _collectionAdd (productId) {
        collectionAdd({params:{goodsId: productId}}).then(res => {
          if (res.code === 0) {
            this.$message.success('收藏成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      editNum (num) {
        this.productNum = num
      }
    },
    components: {
      YShelf, BuyNum, YButton
    },
    created () {
      let _id = this.$route.query.id
      this._getGoodsDet(_id)
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/style/mixin";

  .store-content {
    clear: both;
    // width: 1220px;
    // min-height: 600px;
    // padding: 0 0 25px;
    margin: 0 auto;
  }

  .gray-box {
    // display: flex;
    padding: 10px;
    margin: 10px 8px;
    background: #fff;
    .gallery-wrapper {
      .gallery {
        // display: flex;
        // width: 540px;
        .thumbnail {
          li:first-child {
            margin-top: 0px;
          }
          li {
            @include wh(80px);
            margin-top: 10px;
            padding: 12px;
            border: 1px solid #f0f0f0;
            border: 1px solid rgba(0, 0, 0, .06);
            border-radius: 5px;
            cursor: pointer;
            &.on {
              padding: 10px;
              border: 3px solid #ccc;
              border: 3px solid rgba(0, 0, 0, .2);
            }
            img {
              display: block;
              @include wh(100%);
            }
          }
        }
        .thumb {
          .big {
            margin-left: 20px;
            padding-right: 20px;
          }
          img {
            display: block;
            margin: 0 auto;
            @include wh(100%,100%)
          }
        }
      }
    }
    // 右边
    .banner {
      // width: 450px;
      // margin-left: 10px;
      h4 {
        font-size: 16px;
        line-height: 1.25;
        color: #000;
        margin-bottom: 5px;
      }
      h6 {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .sku-custom-title {
        overflow: hidden;
        padding: 8px 8px 12px 10px;
        position: relative;
      }
      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }
      .num {
        padding: 10px 8px;
        border-top: 1px solid #ebebeb;
        display: flex;
        align-items: center;
      }
      .buy {
        position: relative;
        border-top: 1px solid #ebebeb;
        padding: 10px;
        text-align: right;
        > input {
          margin-left: 5px;
        }
      }
      .similar {
        padding: 0 10px;
        span {
          font-size: 18px;
          font-weight: 700;
        }
        a {
          margin-left: 10px;
        }
      }
    }
  }

  .item-info {
    padding-bottom: 53px;
    .gray-box {
      padding: 0;
      display: block;
    }
    .img-item {
      // width: 1220px;
      padding: 0 10px;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  .no-info {
    padding: 80px 0;
    text-align: center;
    font-size: 16px;
  }

  .price {
    display: block;
    color: #d44d44;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    margin-top: 8px;
    i {
      padding-left: 2px;
      font-size: 24px;
    }
  }
</style>
