<template>
  <div class="checkout">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <div class="w">
      <!-- 收货地址 -->
      <y-shelf title="收货信息" class="address-box">
        <div slot="content">
          <ul class="address-item-list clearfix">
            <li class="address pr" v-for="(item,i) in addList" :key="i" :class="{checked:addressId === item.id}" @click="defaultAddress(item.id)">
              <span v-if="addressId === item.id" class="pa">
                <svg viewBox="0 0 1473 1024" width="17.34375" height="12">
                  <path d="M1388.020 57.589c-15.543-15.787-37.146-25.569-61.033-25.569s-45.491 9.782-61.023 25.558l-716.054 723.618-370.578-374.571c-15.551-15.769-37.151-25.537-61.033-25.537s-45.482 9.768-61.024 25.527c-15.661 15.865-25.327 37.661-25.327 61.715 0 24.053 9.667 45.849 25.327 61.715l431.659 436.343c15.523 15.814 37.124 25.615 61.014 25.615s45.491-9.802 61.001-25.602l777.069-785.403c15.624-15.868 25.271-37.66 25.271-61.705s-9.647-45.837-25.282-61.717M1388.020 57.589z" fill="#6A8FE5" p-id="1025"></path>
                </svg>
              </span>
              <p class="consignee">
                <span class="fl">收货人: <em>{{item.consignee}}</em></span>
                <span class="fr">{{item.consigneeMobile}}</span>
              </p>
              <p class="street-name">收货地址: <span>{{item.address}} {{item.isDefault ? '(默认地址)' : ''}}</span></p>
              <!-- <p>手机号码: {{item.consigneeMobile}}</p> -->
              <!-- <p>邮政编码: {{item.postaCode}}</p> -->
              <div class="operation-section">
                <span class="update-btn" @click="update(item)">修改</span>
                <span class="delete-btn" :data-id="item.id" @click="del(item.id,i)">删除</span>
              </div>
            </li>

            <li class="add-address-item new-address" @click="update()">
              <img src="../../../static/svg/jia.svg" alt="">
              <span>使用新地址</span>
            </li>
          </ul>
        </div>
      </y-shelf>
      <!-- 购物清单 -->
      <y-shelf title="购物清单" class="cart-box">
        <div slot="content">
          <div class="box-inner ui-cart">
            <div>
              <!--标题-->
              <!-- <div class="cart-table-title">
                <span class="name">商品信息</span>
                <span class="subtotal">小计</span>
                <span class="num">数量</span>
                <span class="price">单价</span>
              </div> -->
              <!--列表-->
              <div class="cart-table" v-for="(item,i) in o_cartList" :key="i">
                <div class="cart-group divide pr" :data-productid="item.productId">
                  <div class="cart-top-items">
                    <div class="cart-items clearfix">
                      <!--图片-->
                      <div class="items-thumb fl">
                        <img :alt="item.productName" :src="item.productImg">
                        <a href="javascript:;" :title="item.productName" target="_blank"></a>
                      </div>
                      <!--信息-->
                      <div class="name hide-row fl">
                        <div class="name-table">
                          <a href="javascript:;" :title="item.productName" target="_blank" v-text="item.productName"></a>
                          <p class="attribute" v-text="item.productDescript"></p>
                          <div>
                            <!--价格-->
                            <span class="fl">¥ {{item.productPrice}}</span>
                            <!--数量-->
                            <span class="fr">x {{item.productNum}}</span>
                          </div>
                        </div>
                      </div>
                      <!--商品数量-->
                      <!-- <div> -->
                        <!--总价格-->
                        <!-- <div class="subtotal" style="font-size: 14px">¥ {{item.productPrice * item.productNum}}</div> -->
                        <!--数量-->
                        <!-- <div class="item-cols-num">
                          <div class="select">
                            <span v-text="item.productNum"></span>
                          </div>
                        </div> -->
                        <!--价格-->
                        <!-- <div class="price">¥ {{item.productPrice}}</div> -->
                      <!-- </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 合计 -->
            <div class="cart-bottom-bg fix-bottom">
              <div class="fix-bottom-inner">
                <div class="shipping">
                  <div class="shipping-box">
                    <div class="shipping-total shipping-price">
                      <h4 class="highlight">应付总额：<em>￥{{checkPrice}}</em></h4>
                    </div>
                  </div>
                  <y-button classStyle="main-btn" text="提交订单" @btnClick="_createOrder"></y-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </y-shelf>

      <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
        <div slot="content" class="md" :data-id="msg.addressId">
          <div>
            <el-input size="small" v-model="msg.userName" placeholder="收货人"></el-input>
          </div>
          <div>
            <el-input size="small" type="number" v-model="msg.tel" placeholder="联系方式"></el-input>
          </div>
          <div>
            <el-input size="small" v-model="msg.streetName" placeholder="收货地址"></el-input>
          </div>
          <div>
            <el-input size="small" v-model="msg.postaCode" placeholder="邮政编号"></el-input>
          </div>
          <!-- <div>
            <span><input type="checkbox" v-model="msg.isDefault" style="margin-right: 5px;">设为默认</span>
          </div> -->
          <div class="submit">
            <y-button text='保存'
                      class="btn"
                      :classStyle="btnHighlight?'main-btn':'disabled-btn'"
                      @btnClick="save({
                        id: msg.addressId,
                        consignee: msg.userName,
                        consigneeMobile: msg.tel,
                        address: msg.streetName,
                        postaCode: msg.postaCode })">
            </y-button>
            <y-button text='取消' @btnClick="cancel()"></y-button>
          </div>
        </div>
      </y-popup>
    </div>
    <y-footer></y-footer>
  </div>
</template>
<script>
  import { getCartList, addressList, addressUpdate, addressAdd, addressDel, getGoodsDet, createOrder } from '/api/goods'
  import { mapMutations, mapState } from 'vuex'
  import { getStore } from '../../utils/storage'
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YHeader from '/common/header'
  import YFooter from '/common/footer'
  export default {
    data () {
      return {
        o_cartList: [],
        addList: [],
        addressId: '1',
        popupOpen: false,
        popupTitle: '管理收货地址',
        num: '', // 立刻购买
        productId: '',
        totalPrice: 0,
        msg: {
          addressId: '',
          userName: '',
          tel: '',
          streetName: '',
          postaCode: '',
          isDefault: false
        }
      }
    },
    computed: {
      ...mapState(
        ['cartList']
      ),
      btnHighlight () {
        let msg = this.msg
        return msg.userName && msg.tel && msg.streetName && msg.postaCode
      },
      // 选中的总价格
      checkPrice () {
        let totalPrice = 0
        this.o_cartList && this.o_cartList.forEach(item => {
          // if (item.checked === '1') {
            totalPrice += (item.productNum * item.productPrice)
          // }
        })
        this.totalPrice = totalPrice
        return totalPrice
      }
    },
    methods: {
      ...mapMutations(
        ['INIT_BUYCART']
      ),
      _getCartList (ids) {
        // getCartList().then(res => {
        //   this.o_cartList = res.data
        // })
        let idsArr = ids.split(',')
        let cartArr = JSON.parse(getStore('buyCart'))

        idsArr && idsArr.forEach(id => {
          cartArr && cartArr.forEach(item => {
            if (item.productId === parseInt(id)) {
              this.o_cartList.push(item)
            }
          })
        })
      },
      _addressList () {
        addressList().then(res => {
          let data = res.data
          if (data.length) {
            this.addList = data
            data.forEach(item => {
              if (item.isDefault === 1) {
                this.addressId = item.id
              }
            })
            // this.addressId = data[0].id || '1'
          } else {
            this.addList = []
          }
        })
      },
      _addressUpdate (params) {
        addressUpdate({params:params}).then(res => {
          this._addressList()
        })
      },
      _addressAdd (params) {
        addressAdd({params:params}).then(res => {
          this._addressList()
        })
      },
      // 提交订单
      _createOrder () {
        let cart = []
        let goodsId = []
        let params = {
          addressId: JSON.stringify(this.addressId),
          orderPrice: this.totalPrice,
          cCartIds: ''
        }
        
        this.o_cartList.forEach(item => {
          cart.push(item.id)
          goodsId.push(item.productId)
        })
        params.cCartIds = cart.join(',')
        goodsId = goodsId.join(',')
        
        createOrder({params:params}).then(res => {
          if (res.code === 0) {
            // 需要拿到地址id
            this.$router.push({
              path: '/order/payment',
              // query: {
              //   'addressId': this.addressId,
              //   'productId': this.productId,
              //   'num': this.num
              // }
              query: {
                'addressId': this.addressId,
                'productIds': goodsId,
                'orderId': res.id
              }
            })
          } else {
            this.$message.error('订单添加失败')
          }
        })
      },
      // 选择地址
      defaultAddress (id) {
        this.addressId = id
      },
      // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = '管理收货地址'
          this.msg.userName = item.consignee
          this.msg.tel = item.consigneeMobile
          this.msg.streetName = item.address
          this.msg.postaCode = item.postaCode
          this.msg.isDefault = item.isDefault
          this.msg.addressId = item.id
        } else {
          this.popupTitle = '新增收货地址'
          this.msg.userName = ''
          this.msg.tel = ''
          this.msg.streetName = ''
          this.msg.postaCode = ''
          this.msg.isDefault = false
          this.msg.addressId = ''
        }
      },
      // 保存
      save (p) {
        if (p.id) {
          this._addressUpdate(p)
        } else {
          delete p.id
          this._addressAdd(p)
        }
        this.popupOpen = false
      },
      // 删除
      del (addressId, i) {
        addressDel({params:{ids: addressId}}).then(res => {
          if (res.code === 0) {
            this.addList.splice(i, 1)
          } else {
            alert('删除失败')
          }
        })
      },
      _getGoodsDet (productId) {
        getGoodsDet({params: {productId}}).then(res => {
          let item = res.result
          item.checked = '1'
          item.productImg = item.productImageBig
          item.productNum = this.num
          item.productPrice = item.salePrice
          this.o_cartList.push(item)
        })
      },
      // 取消编辑
      cancel () {
        this.popupOpen = false
      }
    },
    created () {
      let query = this.$route.query
      if (query.productId && query.num) {  // 商品详情-->马上购买
        this.productId = query.productId
        this.num = query.num
        this._getGoodsDet(this.productId)
      } else {  // 购物车生成订单
        this._getCartList(query.productIds)
      }
      this._addressList()
    },
    mounted () {
      this.INIT_BUYCART()
    },
    components: {
      YShelf,
      YButton,
      YPopup,
      YHeader,
      YFooter
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .w {
    padding-top: 10px;
    background: #ededed;
    padding-bottom: 53px;
    .gray-box {
      margin-left: 10px;
      margin-right: 10px;
    }
    .address-box {
      margin-bottom: 15px;
    }
    .cart-box {
      margin-bottom: 10px;
    }
  }
  // 收货地址
  .address-item-list {
    // padding: 30px 13px 0;
    .address {
      // padding: 19px 14px 0 19px;
      padding: 10px;
      p {
        line-height: 20px;
        font-size: 14px;
      }
      .consignee {
        overflow: hidden;
      }
      .street-name {
        padding-right: 18px;
      }
    }
    li.checked {
      border-color: #6A8FE5;
      position: relative;
      background: #fff;
      .pa {
        right: 10px;
        // top: 18px;
        bottom: 10px;
      }
      &:hover {
        background-color: #fff;
      }
    }
    li {
      position: relative;
      overflow: hidden;
      // float: left;
      // width: 276px;
      // height: 158px;
      // margin: 0 0 30px 16px;
      margin-bottom: 3px;
      border: 1px solid #E5E5E5;
      border-radius: 3px;
      background: #FAFAFA;
      line-height: 14px;
      text-align: left;
      word-wrap: break-word;
      word-break: normal;
      color: #626262;
      cursor: pointer;
      -moz-user-select: -moz-none;
      -webkit-user-select: none;
      -o-user-select: none;
      user-select: none;
      // &:hover {
      //   background: #F2F2F2;
      //   .operation-section {
      //     visibility: visible;
      //     transform: translate(0, 0);
      //   }
      // }
      &.add-address-item {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        // flex-direction: column;
        p {
          margin-top: 5px;
        }
      }
      &.new-address {
        margin-bottom: 0px;
        padding: 10px 0;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        img {
          margin-right: 5px;
        }
      }
      .operation-section {
        visibility: hidden;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 28px;
        background: #E1E1E1;
        border-top: 1px solid #E1E1E1;
        transition: all .2s ease;
        transform: translate(0, 29px);
        border-top: 1px solid #E1E1E1;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 11;
        span {
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 100%;
          &:hover {
            background: #F2F2F2;
          }
        }

        span + span {
          border-left: 1px solid #E1E1E1;
        }

      }
    }
  }

  .s-content {
    .md {
      > div:not(.submit) {
        text-align: left;
        margin-bottom: 6px;
        > input {
          width: 100%;
          height: 50px;
          font-size: 18px;
          padding: 10px 20px;
          border: 1px solid #ccc;
          border-radius: 6px;
          box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
          line-height: 46px;
        }
      }
      > .submit {
        padding-top: 15px;
        > input:last-child {
          margin-left: 4px;
        }
      }
    }

    // .btn {
    //   margin: 0;
    //   width: 100%;
    //   height: 50px;
    //   font-size: 14px;
    //   line-height: 48px
    // }
  }

  .ui-cart {
    img {
      width: 80px;
      height: 80px;
    }

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
      background: #fff;
      margin-bottom: 2px;
      .cart-items {
        border-top: 1px dashed #eee;
      }
    }
    .cart-items {
      position: relative;
      display: flex;
      // height: 140px;
      margin-left: 10px;
      .subtotal {
        font-weight: 700;
      }
      .item-cols-num,
      .price,
      .subtotal {
        overflow: hidden;
        float: right;
        width: 137px;
        text-align: center;
        color: #666;
        line-height: 140px;
      }
      /*数量*/
      .item-cols-num {
        padding-top: 50px;
        line-height: 40px;
      }
      .select {
        width: 112px;
        height: 40px;
        padding-top: 4px;
        margin: 0 auto;
        line-height: 40px;
        .down {
          background-position: 0 -60px;
        }
        .down.down-disabled:hover {
          background-position: 0 -300px;
          cursor: not-allowed;
        }
        .num {
          position: relative;
          overflow: hidden;
          display: inline-block;
          width: 36px;
          height: 18px;
          margin: 7px 0 0;
          border: none;
          border-radius: 3px;
          line-height: 18px;
          text-align: center;
          font-size: 14px;
          transition: all .2s ease-out;
        }
      }

    }
    .down.down-disabled {
      background-position: 0 -300px;
      cursor: not-allowed;
    }
  }

  .cart-group.divide .cart-top-items:first-child .cart-items {
    border-top: none;
  }

  .items-choose {
    position: absolute;
    left: -74px;
    top: 0;
    width: 74px;
    height: 20px;
    padding: 60px 0 0 31px;
    font-size: 12px;
    color: #999;
  }

  .items-thumb {
    position: relative;
    margin: 10px 0;
    overflow: hidden;
    width: 70px;
    height: 70px;
    img {
      width: 70px;
      height: 70px;
    }
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

  .name-table {
    // display: table-cell;
    vertical-align: middle;
    width: 100%;
    // height: 140px;
  }

  .fix-bottom {
    padding: 20px;
    // height: 90px;
    width: 100%;
    z-index: 1;
    background-position: center;
    background: #fdfdfd;
    background: -webkit-linear-gradient(#fdfdfd, #f9f9f9);
    background: linear-gradient(#fdfdfd, #f9f9f9);
    // border-top: 1px solid #e9e9e9;
    box-shadow: 0 -3px 8px rgba(0, 0, 0, .04);
    .cart-bottom-bg {
      height: 80px;
      border-top: 1px solid #D9D9D9;
      border-radius: 0 0 8px 8px;
    }
    .fix-bottom-inner {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .shipping {
      display: flex;
      align-items: center;
    }
    .shipping-box {
      padding: 0 20px;
    }
    em {
      // display: inline-block;
      // position: relative;
      // top: 3px;
      // margin-top: -4px;
      font-size: 18px;
      color: #d44d44;
      font-weight: 700;
    }
  }

  .attribute, .name p {
    color: #999;
    font-size: 12px;
    padding-top: 4px;
    line-height: 14px;
  }


</style>
