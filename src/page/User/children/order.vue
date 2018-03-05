<template>
  <div>
    <y-shelf title="我的订单">
      <div slot="content">
        <div v-if="orderList.length">
          <div class="listitem" v-for="(item,i) in orderList" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="order-id"><em style="width:40px;">订单号：</em><a href="javascript:;">{{item.id}}</a></span>
                  <!-- <span class="date">{{timestampToTime(item.time)}}</span> -->
                  <span class="order-state">{{orderState(item.state)}}</span>
                </div>
                <!-- <div class="f-bc">
                  <span class="price">单价</span>
                  <span class="num">数量</span>
                  <span class="operation">商品操作</span>
                </div> -->
              </div>
              <!-- <div class="last">
                <span class="sub-total">实付金额</span>
                <span class="order-detail">订单状态</span>
              </div> -->
            </div>
            <div class="pr">
              <div class="cart" v-for="(good,j) in item.orderGoodsList" :key="j">
                <div class="cart-l" :class="{bt:j>0}">
                  <div class="car-l-l">
                    <div class="img-box">
                      <img :src="good.image" alt="">
                    </div>
                    <!-- <div class="ellipsis-c">{{good.goods_name}}</div> -->
                    <div class="ellipsis-c">
                      <p class="name">{{good.goods_name}}</p>
                      <p class="descript">{{good.description}}</p>
                    </div>
                  </div>
                  <div class="cart-l-r">
                    <div>
                      <p class="price">¥ {{good.price}}</p>
                      <p class="num">x {{good.num}}</p>
                      <p class="evaluate">
                        <y-button v-if="item.state==3" text="评价" classStyle="main-btn" @btnClick="_getOrderId(item.id, good.goods_id)"></y-button>
                      </p>
                    </div>
                    <!-- <div class="type">
                      <a @click="_delOrder(item.id,i)" href="javascript:;" v-if="j<1" class="del-order">删除此订单</a>
                    </div> -->
                  </div>
                </div>
              </div>
              <!-- <div class="prod-operation pa" style="right: 0;top: 0;">
                <div class="total">¥ {{item.orderPrice}}</div>
                <div class="status">{{orderState(item.state)}}</div>
              </div> -->
            </div>
            <div>
              <div class="total">共<span>{{totalNum(i)}}</span>件商品 合计：¥<span class="total-price">{{item.orderPrice}}</span></div>
            </div>
            <div class="operation">
              <y-button v-if="item.state==4" text="去支付" classStyle="main-btn" @btnClick="orderPay(item)"></y-button>
              <y-button v-if="item.state==4" text="取消订单" @btnClick="_setOrderState(item.id, 0)"></y-button>
              <y-button v-if="item.state==2 || item.state==1" classStyle="main-btn" text="确认收货" @btnClick="_setOrderState(item.id, 3)"></y-button>
              <y-button v-if="item.state==0||item.state==3" text="删除订单" classStyle="danger-btn" @btnClick="_delOrder(item.id, i)"></y-button>
            </div>
          </div>
          
        </div>
        <div v-else>
          <div class="empty">
            你还未创建过订单
          </div>
        </div>
      </div>
    </y-shelf>
    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
      <div slot="content" class="md">
        <div class="evalstar">
          <el-rate v-model="evalMsg.evaluateType" show-text :texts="evals" :max="3"></el-rate>
        </div>
        <div class="evalcont">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="在此对商品做出评价" v-model="evalMsg.evaluateContent"></el-input>
        </div>
        <div class="submit">
          <y-button text='提交'
                    class="btn"
                    :classStyle="evalMsg.evaluateType&&evalMsg.evaluateContent ? 'main-btn':'disabled-btn'"
                    @btnClick="_evaluate()">
          </y-button>
          <y-button text='取消' @btnClick="cancel()"></y-button>
        </div>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import { orderList, delOrder, setOrderState, setGoodsEval } from '/api/goods'
  import YShelf from '/components/shelf'
  import YPopup from '/components/popup'
  import YButton from '/components/YButton'
  export default {
    data () {
      return {
        orderList: [],
        popupOpen: false,
        popupTitle: '商品评价',
        states: [
          {state: 0, text: '已取消'},
          {state: 1, text: '待发货'},
          {state: 2, text: '已发货'},
          {state: 3, text: '已收货'},
          {state: 4, text: '待付款'}
        ],
        evals: ['差评', '中评', '好评'],
        evalMsg: {
          orderId: '',
          goodsId: '',
          evaluateType: null,
          evaluateContent: '',
        }
      }
    },
    methods: {
      // 获取订单列表
      _orderList () {
        orderList().then(res => {
          if (res.code === 0) {
            this.orderList = res.data
          }
        })
      },
      // 获取需评价商品、订单id
      _getOrderId (orderId, goods_id) {
        this.popupOpen = true
        this.evalMsg.orderId = orderId
        this.evalMsg.goodsId = goods_id
      },
      // 商品评价
      _evaluate () {
        setGoodsEval({
          orderId: this.evalMsg.orderId,
          goodsId: this.evalMsg.goodsId,
          evaluateType: this.evalMsg.evaluateType - 1,
          evaluateContent: this.evalMsg.evaluateContent
        }).then(res => {
          if (res.code === 0) {
            this.popupOpen = false
            this.$message.success('评论成功')
            this._orderList()
          } else {
            this.$message.error(`评价失败, ${res.msg}`)
          }
        })
      },
      // 取消商品评价
      cancel () {
        this.popupOpen = false
        this.evalMsg.evaluateType = null
        this.evalMsg.evaluateContent = ''
      },
      // 删除订单
      _delOrder (orderId, i) {
        delOrder({params:{orderIds: orderId}}).then(res => {
          if (res.code === 0) {
            this.$message.success('删除成功')
            this.orderList.splice(i, 1)
          } else {
            this.$message.error('删除失败')
          }
        })
      },
      // 修改订单状态 
      _setOrderState (id, state) {
        setOrderState({params:{id: id,state: state}}).then(res => {
          if (res.code === 0) {
            switch (state) {
              case 0: 
                this.$message.success('订单取消成功')
                break
              case 3 :
                this.$message.success('已确认收货')
                break
            }
            this._orderList()
          }
        })
      },
      // 支付订单
      orderPay (item) {
        let ids = []
        item.orderGoodsList && item.orderGoodsList.forEach(list => {
          ids.push(list.goods_id)
        });
        ids = ids.join(',')
        this.$router.push({
          path: '/order/payment',
          query: {
            'addressId': item.addressId,
            'orderPrice': item.orderPrice,
            'orderFrom': 'order',
            'orderId': item.id
          }
        })
      },
      // 订单状态
      orderState (state) {
        let text = ''
        state == 0 ? text = '已取消' : ''
        state == 1 ? text = '待发货' : ''
        state == 2 ? text = '已发货' : ''
        state == 3 ? text = '已收货' : ''
        state == 4 ? text = '待付款' : ''
        return text     
      },
      // 时间格式转换
      timestampToTime (timestamp) {
        let date = new Date(timestamp)  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        let D = date.getDate() + ' '
        let h = date.getHours() + ':'
        let m = date.getMinutes() + ':'
        let s = date.getSeconds()
        return Y + M + D + h + m + s
      },
      // 订单商品数量
      totalNum (i) {
        let total = 0
        let orderGoodsList = this.orderList[i].orderGoodsList
        orderGoodsList && orderGoodsList.forEach(item => {
          total += item.num
        })
        return total
      }
    },
    created () {
      this._orderList()
    },
    components: {
      YShelf,
      YPopup,
      YButton
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .listitem:not(:last-child) {
    margin-bottom: 10px;
  }

  .gray-sub-title {
    height: 38px;
    padding: 0 10px;
    background: #fff;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      > div {
        width: 100%;
        .order-state {
          float: right;
        }
      }
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 6px;
  }

  // .order-id {
  //   margin-left: 20px;
  // }

  // .pr {
  //   background: #fff;
  // }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;
    background: #fff;
    margin-bottom: 2px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      // align-items: center;
      flex: 1;
      padding: 4px 0;
      justify-content: space-between;
      position: relative;
      // &:before {
      //   position: absolute;
      //   content: ' ';
      //   right: -1px;
      //   top: 0;
      //   width: 1px;
      //   background-color: #EFEFEF;
      //   height: 100%;
      // }
      .ellipsis-c {
        margin-left: 5px;
        // min-width: 220px;
        flex: 1;
        .descript {
          font-size: 12px;
        }
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(70px);
      }
      .cart-l-r {
        display: flex;
        padding: 0 7px;
        > div {
          text-align: right;
          // min-width: 50px;
          .evaluate {
            margin-top: 6px;
          }
        }
      }
      .car-l-l {
        display: flex;
        flex: 1;
        // align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }

  .total {
    font-size: 12px;
    background: #fff;
    padding: 8px 15px;
    text-align: right;
    .total-price {
      font-size: 14px;
    }
  }

  .operation {
    border-top: 1px solid #dcdcdc;
    padding: 8px 15px;
    text-align: right;
    background: #fff;
    > input {
      border-radius: 14px;
      font-size: 12px;
    }
  }

  .empty {
    padding: 80px 0;
    text-align: center;
    font-size: 14px;
    background: #fff;
  }

  .md {
    > div {
      margin-bottom: 6px;
    }
    .submit {
      padding-top: 15px;
      > input:last-child {
        margin-left: 4px;
      }
    }
  }

</style>
