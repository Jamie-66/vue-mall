<template>
  <div>
    <y-shelf title="收货地址">
      <span slot="right"><y-button text="添加收货地址" style="margin: 0" @btnClick="update()"></y-button></span>
      <div slot="content">
        <div v-if="addList.length">
          <div class="address-item" v-for="(item,i) in addList" :key="i">
            <div class="name">{{item.consignee}}</div>
            <div class="address-msg">{{item.address}}</div>
            <div class="telephone">{{item.consigneeMobile}}</div>
            <div class="telephone">{{item.postaCode}}</div>
            <div class="defalut">
              <a @click="changeDef(item)"
                 href="javascript:;"
                 v-if="!item.isDefault"
                 v-text="'设为默认'"
                 :class="{'defalut-address':item.isDefault}">
              </a>
              <span v-else>( 默认地址 )</span>
            </div>
            <div class="operation">
              <a href="javascript:;" @click="update(item)">修改</a>
              <a href="javascript:;" :data-id="item.id" @click="del(item.id,i)">删除</a>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 80px 0;text-align: center">
            <div style="font-size: 20px">你还未添加收货地址</div>
            <div style="margin: 20px ">
              <y-button text="添加地址" @btnClick="update()"></y-button>
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
      <div slot="content" class="md" :data-id="msg.addressId">
        <div>
          <input type="text" placeholder="收货人姓名" v-model="msg.userName">
        </div>
        <div>
          <input type="number" placeholder="手机号码" v-model="msg.tel">
        </div>
        <div>
          <input type="text" placeholder="收货地址" v-model="msg.streetName">
        </div>
        <div>
          <input type="text" placeholder="邮政编码" v-model="msg.postaCode">
        </div>
        <!-- <div>
          <span><input type="checkbox" v-model="msg.isDefault" style="margin-right: 5px;">设为默认</span>
        </div> -->
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
        <y-button text='取消'
                  @btnClick="cancel()">
        </y-button>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import { addressList, addressUpdate, addressAdd, addressDel, addressDef } from '/api/goods'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        addList: [],
        popupOpen: false,
        popupTitle: '管理收货地址',
        msg: {
          addressId: '',     // 地址ID
          userName: '',      // 收件人
          tel: '',           // 手机号
          streetName: '',    // 收件地址
          postaCode: '',     // 邮件编码
          isDefault: 0       // 是否默认
        }
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.userName && msg.tel && msg.streetName && msg.postaCode
      }
    },
    methods: {
      // 地址列表
      _addressList () {
        addressList().then(res => {
          if (res.data.length) {
            this.addList = res.data
            // this.addressId = res.data[0].id || '1'
          } else {
            this.addList = []
          }
        })
      },
      // 修改地址
      _addressUpdate (params) {
        addressUpdate({params:params}).then(res => {
          this._addressList()
        })
      },
      // 新增地址
      _addressAdd (params) {
        addressAdd({params:params}).then(res => {
          this._addressList()
        })
      },
      // 默认状态
      changeDef (item) {
        if (!item.isDefault) {
          // item.isDefault = 1
          addressDef({params:{id: item.id}}).then(res => {
            if (res.code === 0) {
              this._addressList()
            }
          })
        }
        return false
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
      // 修改 -- 弹窗
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
          this.msg.isDefault = 0
          this.msg.addressId = ''
        }
      },
      // 取消编辑
      cancel () {
        this.popupOpen = false
      }
    },
    created () {
      this._addressList()
    },
    components: {
      YButton,
      YPopup,
      YShelf
    }
  }
</script>
<style scoped lang="scss">
  .address-item {
    display: flex;
    align-items: center;
    height: 115px;
    text-align: center;
    .name {
      width: 106px;
    }
    .address-msg {
      flex: 1;
    }
    .telephone {
      width: 160px;
    }
    .defalut {
      width: 80px;
      > a {
        text-align: center;
        /*display: none;*/
      }
    }
    .operation {
      width: 135px;
      a {
        padding: 10px 5px;
      }
    }
    &:hover {
      .defalut > a {
        display: block;
      }
    }
  }

  .address-item + .address-item {
    border-top: 1px solid #CFCFCF;
  }

  .defalut-address {
    color: #626262;
    display: block;
    pointer-events: none;
    cursor: default;
  }

  .md {
    > div {
      text-align: left;
      margin-bottom: 15px;
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
  }

  .btn {
    margin: 0;
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 48px
  }
</style>
