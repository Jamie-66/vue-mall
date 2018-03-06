<template>
  <div class="w">
    <y-shelf title="订单支付">
      <div slot="content">
        <div class="box-inner order-info" v-if="orderFrom !== 'order'">
          <h3>提交订单成功</h3>
          <p class="payment-detail">请在 <span>24 小时内</span>完成支付，超时订单将自动取消。</p>
          <p class="payment-detail">我们将在您完成支付后的 72 小时内发货</p>
        </div>
        <!--支付方式-->
        <div class="pay-type">
          <div class="p-title">支付方式</div>
          <div class="pay-item">
            <div :class="{active:payType==1}" @click="payType=1"><img src="/static/images/alipay@2x.png" alt=""></div>
            <div :class="{active:payType==2}" @click="payType=2"><img src="/static/images/weixinpay@2x.png" alt=""></div>
          </div>
        </div>
        <!--支付金额-->
        <div>
          <div class="box-inner">
            <div>
              <span>
                应付金额:
              </span>
              <em v-if="orderFrom !== 'order'"><span>¥</span>{{checkPrice}}</em>
              <em v-else><span>¥</span>{{orderPrice}}</em>
              <y-button text="立刻支付" classStyle="main-btn" @btnClick="paySuc()"></y-button>
            </div>
          </div>
        </div>
        <!--支付提示-->
        <div class="mask" v-if="showMask">
          <div class="mask-tip">
            <p><i class="el-icon-loading"></i></p>
            <p><span>{{payType==1?'支付宝支付...':'微信支付...'}}</span></p>
          </div>
        </div>
      </div>
    </y-shelf>
    <!--地址信息-->
    <div class="p-msg" v-if="orderFrom !== 'order'">
      <div class="confirm-detail">
        <div class="info-title">收货信息</div>
        <p class="info-detail">姓名：{{addList.consignee}}</p>
        <p class="info-detail">联系电话：{{addList.consigneeMobile}}</p>
        <p class="info-detail">详细地址：{{addList.address}}</p></div>
    </div>
    <!-- <div class="confirm-table-title">
      <span class="name">商品信息</span>
      <div>
        <span class="subtotal">小计</span>
        <span class="num">数量</span>
        <span class="price">单价</span>
      </div>
    </div> -->
    <!--商品-->
    <div class="confirm-goods-table" v-if="orderFrom !== 'order'">
      <div class="cart-items" v-for="(item,i) in o_cartList" :key="i">
        <div class="name">
          <div class="name-cell">
            <a href="javascript:;" title="" target="_blank">{{item.productName}}</a>
          </div>
        </div>
        <div class="n-b">
          <!-- <div class="subtotal ">
            <div class="subtotal-cell"> ¥ {{item.productPrice * item.productNum}}<br></div>
          </div> -->
          <div class="price">¥{{item.productPrice}}</div>
          <div class="goods-num ">x{{item.productNum}}</div>
        </div>
      </div>
    </div>
    <!--合计-->
    <div class="order-discount-line" v-if="orderFrom !== 'order'">
      <p> 商品总计：¥<span> {{checkPrice}}</span></p>
      <p> 运费：<span>+ 8.00</span></p>
    </div>
  </div>
</template>
<script>
  import { addressList, getCartList, payMent, getGoodsDet, addressDet, setOrderState } from '/api/goods'
  import { mapMutations, mapState } from 'vuex'
  import { getStore } from '../../utils/storage'
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  export default {
    data () {
      return {
        payType: 1,
        addList: {},
        o_cartList: [],
        addressId: 0,
        productId: '',
        num: '',
        orderFrom: '',  // 订单支付来源
        orderPrice: 0,  // 订单生成总价
        totalPrice: 0,  // 购物车生成总价
        orderId: '',    // 订单Id
        showMask: false // 支付提示
      }
    },
    computed: {
      ...mapState(
        ['cartList']
      ),
      // 选中的总价格
      checkPrice () {
        let totalPrice = 0
        this.o_cartList && this.o_cartList.forEach(item => {
          totalPrice += (item.productNum * item.productPrice)
        })
        this.totalPrice = totalPrice + 8
        return totalPrice + 8
      }
    },
    methods: {
      ...mapMutations(
        ['INIT_BUYCART']
      ),
      _getCartList (ids) {
        // getCartList().then(res => {
        //   this.cartList = res.result
        // })
        let idsArr = ids.split(',')
        let cartArr = JSON.parse(getStore('buyCart'))
        console.log(idsArr)
        idsArr && idsArr.forEach(id => {
          cartArr && cartArr.forEach(item => {
            if (item.productId === parseInt(id)) {
              this.o_cartList.push(item)
            }
          })
        })
      },
      _addressDet (params) {
        addressDet({params: params}).then(res => {
          if (res.code === 0) this.addList = res.data
        })
      },
      paySuc () {
        // payMent({
        //   addressId: this.addressId,
        //   orderTotal: this.checkPrice,
        //   productId: this.productId,
        //   productNum: this.num
        // }).then(res => {
        //   if (res.status === '0') {
        //     this.$router.push({path: '/order/paysuccess', query: {price: this.checkPrice}})
        //   } else {
        //     alert('支付失败')
        //   }
        // })
        this.showMask = true
        setTimeout(_ => {
          setOrderState({params:{id: this.orderId,state: 1}}).then(res => {
            this.showMask = false
            if (res.code === 0) {
              let price = 0
              this.orderFrom === 'order' ? price = this.orderPrice : price = this.totalPrice
              this.$router.push({
                path: '/order/paysuccess',
                query: {
                  price: price
                }
              })
            } else {
              this.$message.error('支付失败')
            }
          })
        },3000)
      },
      _getGoodsDet (productId) {
        getGoodsDet({params: {productId}}).then(res => {
          let item = res.data
          item.checked = '1'
          item.productNum = this.num
          item.productPrice = item.salePrice
          this.cartList.push(item)
        })
      }
    },
    created () {
      let query = this.$route.query
      this.addressId = query.addressId
      this.orderFrom = query.orderFrom
      this.orderId = query.orderId
      
      if (this.addressId) {
        this._addressDet({id: this.addressId})
        if (query.productId && query.num) {
          this.productId = query.productId
          this.num = query.num
          this._getGoodsDet(this.productId)
        } else if (!this.orderFrom) {
          this._getCartList(query.productIds)
        } else {
          this.orderPrice = query.orderPrice
        }
      } else {
        this.$router.push({path: '/'})
      }
    },
    mounted () {
      this.INIT_BUYCART()
    },
    components: {
      YShelf,
      YButton
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .w {
    padding-top: 10px;
    padding-bottom: 53px;
    background: #ededed;
  }

  .gray-box {
    margin: 0 10px 15px;
  }

  .order-info {
    padding: 30px 0;
    color: #333;
    background: #fff !important;
    h3 {
      padding-bottom: 14px;
      line-height: 24px;
      text-align: center;
      font-size: 20px;
      color: #212121;
    }
    .payment-detail {
      text-align: center;
      line-height: 20px;
      font-size: 13px;
      color: #999;
    }
  }

  /*支付类型*/
  .pay-type {
    margin: 0 auto;
    width: 95%;
    padding-bottom: 15px;
    .p-title {
      font-size: 16px;
      line-height: 40px;
      padding: 0 10px;
      position: relative;
      &:before {
        content: ' ';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom: 1px solid #ccc;
      }
    }

  }

  .pay-type {
    .pay-item {
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        margin-top: 15px;
        // width: 175px;
        width: 36%;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #E5E5E5;
        cursor: pointer;
        border-radius: 6px;
        // margin-right: 10px;
        background: #FAFAFA;
        &.active {
          border-color: #6A8FE5;
          background: #fff;
        }
        img {
          display: block;
          // height: 34px;
          width: 100%;
          // margin: 8px auto;
        }
      }
      div:not(:last-child) {
        margin-right: 10px;
      }
    }
  }

  .box-inner {
    line-height: 60px;
    background: #f9f9f9;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
    > div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
    }
    em {
      margin-left: 5px;
      font-size: 20px;
      color: #d44d44;
      // font-weight: 700;
      margin-right: 20px;
      span {
        margin-right: 4px;
        font-size: 16px;

      }
    }
  }

  .confirm-detail {
    padding: 0 15px 10px;
    // border-top: 1px solid #d5d5d5;
    margin-bottom: 3px;
    .info-title {
      // height: 14px;
      // margin: 30px 0 17px;
      font-size: 14px;
      padding-top: 10px;
      line-height: 24px;
      font-weight: bolder;
      color: #333;
    }
    .info-detail {
      padding-left: 7px;
      line-height: 24px;
      color: #666;
    }
  }

  .confirm-table-title {
    padding: 3px 0 0 30px;
    border-top: 1px solid #D5D5D5;
    line-height: 54px;
    font-weight: bolder;
    color: #000;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      width: 175px;
      text-align: center;
    }
  }

  .p-msg {
    background: #fff;
  }

  .confirm-goods-table {
    // border-top: 1px solid #D5D5D5;
    margin-bottom: 3px;
    background: #fff;
    .cart-items {
      // height: 80px;
      padding: 5px 10px;
      line-height: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      a {
        color: #333;
      }
    }
    .cart-items:not(:last-child) {
      border-bottom: 1px solid #D5D5D5;
    }
    .n-b {
      // display: flex;
      // align-items: center;
      // justify-content: center;
      padding-left: 15px;
      > div {
        color: #626262;
        // font-weight: 700;
        // width: 175px;
        text-align: center;
      }
    }
  }

  .order-discount-line {
    padding: 10px 20px;
    // border-top: 1px solid #D5D5D5;
    line-height: 24px;
    text-align: right;
    font-size: 14px;
    background: #fff;
    &:first-child {
      line-height: 32px;
      text-align: right;
      font-size: 14px;
      font-weight: bolder;
    }
  }

  .name {
    // width: 40%;
    display: flex;
    flex: 1;
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;
  }
  .mask-tip {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,.7);
    font-size: 12px;
    text-align: center;
    color: #ccc;
    padding: 10px;
    border-radius: 4px;
    i {
      font-size: 14px;
    }
  }

</style>
