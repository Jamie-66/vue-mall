<template>
  <div class="shopping-cart">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <div class="store-content page-cart">
      <div class="gray-box">
        <div class="title"><h2>购物清单</h2></div>
        <!--内容-->
        <div v-if="cartList.length">
          <div class="ui-cart">
            <div>
              <!--标题-->
              <!-- <div class="cart-table-title">
                <span class="name">商品信息</span>
                <span class="operation">操作</span>
                <span class="subtotal">小计</span>
                <span class="num">数量</span>
                <span class="price1">单价</span>
              </div> -->
              <!--列表-->
              <div class="cart-table" v-for="(item,i) in cartList" :key="i">
                <div class="cart-group divide pr" :data-goodsid="item.productId">
                  <div class="cart-top-items">
                    <div class="cart-items-operate">
                      <a href="javascript:;" v-text="item.operateState==='0'?'编辑':'完成'" @click="editCart('operate',item)"></a>
                    </div>
                    <div class="cart-items clearfix">
                      <!--勾选-->
                      <div class="items-choose">
                        <span class="blue-checkbox-new " :class="{'checkbox-on':item.checked === '1'}"
                              @click="editCart('check',item)"></span>
                      </div>
                      <!--图片-->
                      <div class="items-thumb fl">
                        <img :alt="item.productName" :src="item.productImg">
                        <a href="javascript:;" :title="item.productName" target="_blank"></a>
                      </div>
                      <!--信息-->
                      <div class="name hide-row fl" v-show="item.operateState === '0'">
                        <div class="name-table">
                          <a href="javascript:;" :title="item.productName" v-text="item.productName" target="_blank"></a>
                          <p class="attribute" v-text="item.productDescript"></p>
                          <div>
                            <!--价格-->
                            <span class="fl">¥ {{item.productPrice}}</span>
                            <!--数量-->
                            <span class="fr">x {{item.productNum}}</span>
                          </div>
                        </div>
                      </div>
                      <!--操作-->
                      <div class="operate" v-if="item.operateState === '1'">
                        <!--总价格-->
                        <!-- <div class="subtotal" style="font-size: 14px">¥ {{item.productPrice * item.productNum}}</div> -->
                        <!--数量编辑-->
                        <buy-num :num="item.productNum"
                                 :id="item.productId"
                                 :checked="item.checked"
                                 style="display: flex;align-items: center;justify-content: center;"
                                 :limit="item.productStock"
                                 @edit-num="EditNum">
                        </buy-num>
                        <!--价格-->
                        <!-- <div class="price1">¥ {{item.productPrice}}</div> -->
                        <!--删除按钮-->
                        <div class="operation">
                          <a class="items-delete-btn" @click="_cartDel(item.productId)"></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-bottom-bg fix-bottom">
            <div class="fix-bottom-inner">
              <div class="cart-bar-operation">
                <div>
                  <div class="choose-all">
                    <span :class="{'checkbox-on':checkAllFlag}" class="blue-checkbox-new" @click="editCheckAll"></span>全选
                  </div>
                  <div class="delete-choose-goods">
                    <y-button :classStyle="checkNum > 0?'main-btn':'disabled-btn'"
                          class="big-main-btn"
                          text="删除选中" @btnClick="_chosenCartDel"></y-button>
                  </div>
                </div>
              </div>
              <div class="shipping">
                <div class="shipping-box">
                  <!-- <div class="shipping-total shipping-num"><h4
                    class="highlight">已选择 <i v-text="checkNum"></i> 件商品</h4>
                    <h5>共计 <i v-text="totalNum"></i> 件商品</h5></div>
                  <div class="shipping-total shipping-price"><h4
                    class="highlight">应付总额：<span>￥</span><i v-text="checkPrice"></i>
                  </h4>
                    <h5 class="shipping-tips ng-scope">应付总额不含运费</h5>
                  </div> -->
                  <div>合计：<span>￥</span><i v-text="checkPrice"></i></div>
                </div>
                <y-button :classStyle="checkNum > 0?'main-btn':'disabled-btn'"
                          class="big-main-btn"
                          :text="'结算('+checkNum+')'" @btnClick="checkout"></y-button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty">
          <div class="cart-e"></div>
          <p>你的购物车空空如也</p>
          <div>
            <router-link to="/goods">
              <y-button text="现在选购"></y-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <y-footer></y-footer>
  </div>
</template>
<script>
  import { cartEdit, cartEditNum, editCheckAll, cartDel } from '/api/goods'
  import { mapMutations, mapState } from 'vuex'
  import YButton from '/components/YButton'
  import YHeader from '/common/header'
  import YFooter from '/common/footer'
  import BuyNum from '/components/buynum'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState(
        ['cartList']
      ),
      // 是否全选
      checkAllFlag () {
        return this.checkedCount === this.cartList.length
      },
      // 勾选的数量
      checkedCount () {
        var i = 0
        this.cartList && this.cartList.forEach((item) => {
          if (item.checked === '1') i++
        })
        return Number(i)
      },
      // 计算总数量
      totalNum () {
        var totalNum = 0
        this.cartList && this.cartList.forEach(item => {
          totalNum += (item.productNum)
        })
        return Number(totalNum)
      },
      // 选中的总价格
      checkPrice () {
        var totalPrice = 0
        this.cartList && this.cartList.forEach(item => {
          if (item.checked === '1') {
            totalPrice += (item.productNum * item.productPrice)
          }
        })
        return totalPrice
      },
      // 选中的商品数量
      checkNum () {
        var checkNum = 0
        this.cartList && this.cartList.forEach(item => {
          if (item.checked === '1') {
            checkNum += (item.productNum)
          }
        })
        return checkNum
      }
    },
    methods: {
      ...mapMutations([
        'INIT_BUYCART', 'EDIT_CART'
      ]),
      // 全选
      editCheckAll () {
        let checkAll = !this.checkAllFlag
        // editCheckAll({checkAll: checkAll}).then(res => {
        //   this.EDIT_CART({checked: checkAll})
        // })
        this.EDIT_CART({checked: checkAll})
      },
      // 修改购物车--获取参数
      editCart (type, item) {
        if (type && item) {
          let checked = item.checked
          let productId = item.productId
          let productNum = item.productNum
          let operateState = item.operateState
          // 勾选
          if (type === 'check') {
            let newChecked = checked === '1' ? '0' : '1'
            this._cartEdit(productId, productNum, newChecked)
          } else if (type === 'operate') {
            let newOperate = operateState === '1' ? '0' : '1'
            this.EDIT_CART({productId: productId,operateState: newOperate})
            if (operateState === '1') {
              cartEditNum({params:{goodsId: productId,num: productNum}}).then(res => {
                console.log(res)
              })
            }
          }
        } else {
          console.log('缺少所需参数')
        }
      },
      // 修改购物车--修改本地、(远端:不在此处修改)
      _cartEdit (productId, productNum, checked) {
        // cartEdit({productId, productNum, checked}).then(res => {
        //   if (res.status === '0') {
        //     this.EDIT_CART({productId, productNum, checked})
        //   }
        // })
        this.EDIT_CART({productId, productNum, checked})
      },
      // 修改购物车商品数量
      EditNum (productNum, productId, checked) {
        this._cartEdit(productId, productNum, checked)
      },
      // 删除整条购物车
      _cartDel (productId) {
        cartDel({params: {goodsIds: productId}}).then(res => {
          this.EDIT_CART({productId})
          this.cartList.forEach(item => {
            this.EDIT_CART({productId: item.productId,operateState: '0'})
          })
        })
      },
      // 删除选中购物车
      _chosenCartDel () {
        let selectIds = []
        this.cartList && this.cartList.forEach((item) => {
          if (item.checked === '1') selectIds.push(item.productId)
        })
        cartDel({params: {goodsIds: selectIds.join(',')}}).then(res => {
          selectIds.forEach(productId => {
            this.EDIT_CART({productId})
          })
        })
      },
      checkout () {
        let selectIds = []
        this.cartList && this.cartList.forEach((item) => {
          if (item.checked === '1') selectIds.push(item.productId)
        })
        selectIds = selectIds.join(',')
        this.$router.push({path: '/checkout',query: {productIds: selectIds}})
      }
    },
    mounted () {
      this.INIT_BUYCART()
    },
    components: {
      YButton,
      YHeader,
      YFooter,
      BuyNum
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .shopping-cart {
    background: #ededed;
  }
  .store-content {
    clear: both;
    // width: 1220px;
    // min-height: 600px;
    // padding: 0 0 25px;
    padding: 0 10px 53px;
    margin: 0 auto;
    .gray-box {
      position: relative;
      margin-bottom: 63px;
      overflow: hidden;
      background: #fff;
      border-radius: 8px;
      border: 1px solid #dcdcdc;
      border-color: rgba(0, 0, 0, .14);
      box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
      .title {
        padding-left: 30px;
        position: relative;
        z-index: 10;
        height: 45px;
        padding: 0 10px 0 24px;
        border-bottom: 1px solid #d4d4d4;
        border-radius: 8px 8px 0 0;
        box-shadow: rgba(0, 0, 0, .06) 0 1px 7px;
        background: #f3f3f3;
        background: -webkit-linear-gradient(#fbfbfb, #ececec);
        background: linear-gradient(#fbfbfb, #ececec);
        line-height: 45px;
        font-size: 16px;
        color: #333;
        h2 {
          color: #626262;
        }
      }
    }
    .ui-cart {
      // padding-bottom: 91px;
      .cart-table-title {
        position: relative;
        z-index: 1;
        line-height: 38px;
        height: 38px;
        padding: 0 0 0 30px;
        font-size: 12px;
        background: #eee;
        border-bottom: 1px solid #dbdbdb;
        border-bottom-color: rgba(0, 0, 0, .08);
        .name {
          float: left;
          text-align: left;
        }
        span {
          width: 137px;
          float: right;
          text-align: center;
          color: #838383;
        }
      }
      .cart-group.divide {
        .cart-items {
          border-top: 1px dashed #eee;
        }
      }
      .cart-items-operate {
        height: 38px;
        line-height: 38px;
        // border-bottom: 1px solid #DBDBDB;
        box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.06);
        padding: 0 10px;
        background: #fff;
        text-align: right;
      }
      .cart-items {
        position: relative;
        display: flex;
        // height: 140px;
        margin-left: 39px;
        /*删除*/
        .operation {
          padding: 34px 10px 0 0;
          font-size: 12px;
          line-height: 24px;
          .items-delete-btn {
            background-image: url(../../../static/images/delete-btn-icon_a35bf2437e@2x.jpg);
            &:hover {
              background-position: 0 -36px;
            }
          }
          .items-delete-btn {
            display: block;
            width: 24px;
            height: 24px;
            margin: 0 auto;
            color: #C2C2C2;
            background: url(../../../static/images/delete-btn-icon_a35bf2437e@2x.jpg);
            -webkit-background-size: 100% auto;
            background-size: 100% auto;
            -moz-transition: none;
            -webkit-transition: none;
            -o-transition: none;
            transition: none;
          }
        }
        .subtotal {
          font-weight: 700;
        }
        .item-cols-num,
        .operation,
        .price1,
        .subtotal {
          overflow: hidden;
          float: left;
          // width: 137px;
          text-align: center;
          color: #666;
          // line-height: 140px;
        }
      }
      .cart-group.divide .cart-top-items:first-child .cart-items {
        border-top: none;
      }
      .items-choose {
        position: absolute;
        left: -30px;
        top: 0;
        width: 20px;
        height: 20px;
        padding: 35px 0 0 0;
        font-size: 12px;
        color: #999;
      }
      .items-thumb {
        position: relative;
        margin: 10px 0;
        overflow: hidden;
        width: 70px;
        height: 70px;
      }
      img {
        width: 70px;
        height: 70px;
      }
      .cart-items .items-thumb > a, .ui-cart .cart-items .items-thumb > i {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border: 1px solid #fff;
        border-radius: 3px;
        border: 0 solid rgba(255, 255, 255, .1);
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06);
      }
      .name {
        display: flex;
        flex: 1;
        // width: 380px;
        margin-left: 10px;
        padding: 10px 10px 10px 0;
        overflow: hidden;
        color: #323232;
        // display: table;
        a {
          color: #333;
          font-size: 16px;
          word-break: break-all;
        }
        p {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .operate {
        display: flex;
        justify-content: space-between;
        margin-left: 10px;
        flex: 1;
      }
      .name-table {
        // display: table-cell;
        vertical-align: middle;
        width: 100%;
        // height: 140px;
      }
      .attribute, .name p {
        color: #555;
        font-size: 12px;
        padding-top: 4px;
        line-height: 14px;
      }

    }

  }

  .page-cart {
    padding-top: 10px;
    .fix-bottom {
      // height: 90px;
      height: 53px;
      width: 100%;
      // position: absolute;
      position: fixed;
      // bottom: 0;
      bottom: 53px;
      left: 0;
      right: 0;
      z-index: 100;
      background-position: center;
      background: #fdfdfd;
      background: -webkit-linear-gradient(#fdfdfd, #f9f9f9);
      background: linear-gradient(#fdfdfd, #f9f9f9);
      border-top: 1px solid #e9e9e9;
      border-bottom: 1px solid #e9e9e9;
      // box-shadow: 0 -3px 8px rgba(0, 0, 0, .04);
      box-shadow: 0 -3px 8px rgba(0, 0, 0, .04), 0 2px 8px rgba(0, 0, 0, .1);
      .cart-bottom-bg {
        height: 80px;
        /*background: url(../img/store/library/cart-wrapper-bg_4c8003c76e.jpg) repeat-x;*/
        border-top: 1px solid #D9D9D9;
        border-radius: 0 0 8px 8px;
      }
    }
    .cart-bar-operation {
      float: left;
      // padding: 35px 26px;
      padding: 16px 8px;
      font-size: 14px;
    }
    .blue-checkbox-new {
      float: left;
      margin-right: 9px;
    }
    .choose-all, .delete-choose-goods, .selected-count {
      float: left;
      height: 20px;
      line-height: 20px;
      cursor: pointer;
      position: relative;
    }
    .blue-checkbox-new, .blue-checkbox-new.checkbox-disable, .blue-checkbox-new.checkbox-on {
      display: inline-block;
      position: relative;
      width: 20px;
      height: 20px;
      background: url(../../../static/images/checkbox-new_631a56a4f6.png) no-repeat 0 -20px;
      cursor: pointer;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      vertical-align: middle;
    }

    .blue-checkbox-new.checkbox-on, .choose-checkbox-on .blue-checkbox-new {
      background: url(../../../static/images/checkbox-new_631a56a4f6.png) no-repeat 0 0;
    }
    .delete-choose-goods {
      position: relative;
      // margin-left: 21px;
      margin-left: 12px;
      color: #bbb;
    }
    .shipping {
      float: right;
      // padding: 20px 30px;
      padding: 16px 8px;
    }
    .shipping-box {
      display: inline-block;
      padding-top: 1px;
      margin-right: 10px;
    }
    .shipping-total {
      display: inline-block;
      border-left: 1px solid #e1e1e1;
      padding: 0 20px;
      .shipping-price {
        width: 155px;
        padding-right: 0;
      }
      &.shipping-num i {
        width: 28px;
        display: inline-block;
        text-align: center;
      }
      h4 {
        color: #323232;
        > i {
          font-size: 18px;
          font-weight: 700;
        }
        i, span {
          color: #d44d44;
        }

      }
      h5 {
        color: #959595;
        > i {
          font-size: 16px;
          font-weight: 700;
        }
      }

    }

    .shipping-total.shipping-num {
      text-align: right;
    }
    .shipping-total:first-child {
      border: none;
    }
    .big-main-btn {
      float: right;
      // height: 48px;
      height: 26px;
      margin-top: -3px;
    }
  }

  .empty {
    padding: 20px;
    text-align: center;
    .cart-e {
      margin: 0 auto;
      background: url("/static/images/cart-empty_@2x.png") no-repeat;
      background-size: 100%;
      width: 80px;
      height: 90px;
      color: #8d8d8d;
    }
    p {
      padding: 10px 0;
      color: #8d8d8d;
    }
  }

</style>
