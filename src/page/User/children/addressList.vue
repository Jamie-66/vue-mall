<template>
  <div>
    <y-shelf title="收货地址">
      <span slot="right"><y-button text="添加地址" style="margin: 0" @btnClick="update()"></y-button></span>
      <div slot="content">
        <div v-if="addList.length">
          <!-- <div class="address-item" v-for="(item,i) in addList" :key="i">
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
          </div> -->
          <div class="address-item" v-for="(item,i) in addList" :key="i">
            <div class="item-name">
              <span class="fl">{{item.consignee}}</span>
              <span class="fr">{{item.consigneeMobile}}</span>
            </div>
            <div class="item-address">
              <span>{{item.address}}</span>
            </div>
            <div class="operation">
              <div class="fl">
                <a @click="changeDef(item)"
                  href="javascript:;"
                  v-if="!item.isDefault"
                  v-text="'设为默认'"
                  :class="{'defalut-address':item.isDefault}">
                </a>
                <span v-else>( 默认地址 )</span>
              </div>
              <div class="fr">
                <a href="javascript:;" @click="update(item)">
                  <i class="el-icon-edit-outline"></i> 编辑
                </a>
                <a href="javascript:;" :data-id="item.id" @click="del(item.id,i)">
                  <i class="el-icon-delete"></i> 删除
                </a>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="empty">
            <div class="empty-msg">你还未添加收货地址</div>
            <div class="empty-btn">
              <y-button text="添加地址" @btnClick="update()"></y-button>
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
          if (res.code === 0) {
            this._addressList()
            this.$message.success('修改成功')
          } else {
            this.$message.error('修改失败')
          }
        })
      },
      // 新增地址
      _addressAdd (params) {
        addressAdd({params:params}).then(res => {
          if (res.code === 0) {
            this._addressList()
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败')
          }
        })
      },
      // 默认状态
      changeDef (item) {
        if (!item.isDefault) {
          // item.isDefault = 1
          addressDef({params:{id: item.id}}).then(res => {
            if (res.code === 0) {
              this.$message.success('设置默认地址成功')
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
        // this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'transparent'
        // })
        addressDel({params:{ids: addressId}}).then(res => {
          if (res.code === 0) {
            this.addList.splice(i, 1)
            this.$message.success('删除成功')
          } else {
            this.$message.error('删除失败')
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
  // .address-item {
  //   display: flex;
  //   align-items: center;
  //   height: 115px;
  //   text-align: center;
  //   .name {
  //     width: 106px;
  //   }
  //   .address-msg {
  //     flex: 1;
  //   }
  //   .telephone {
  //     width: 160px;
  //   }
  //   .defalut {
  //     width: 80px;
  //     > a {
  //       text-align: center;
  //       /*display: none;*/
  //     }
  //   }
  //   .operation {
  //     width: 135px;
  //     a {
  //       padding: 10px 5px;
  //     }
  //   }
  //   &:hover {
  //     .defalut > a {
  //       display: block;
  //     }
  //   }
  // }

  // .address-item + .address-item {
  //   border-top: 1px solid #CFCFCF;
  // }

  // .defalut-address {
  //   color: #626262;
  //   display: block;
  //   pointer-events: none;
  //   cursor: default;
  // }

  // .md {
  //   > div {
  //     text-align: left;
  //     margin-bottom: 15px;
  //     > input {
  //       width: 100%;
  //       height: 50px;
  //       font-size: 18px;
  //       padding: 10px 20px;
  //       border: 1px solid #ccc;
  //       border-radius: 6px;
  //       box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
  //       line-height: 46px;
  //     }
  //   }
  // }

  // .btn {
  //   margin: 0;
  //   width: 100%;
  //   height: 50px;
  //   font-size: 14px;
  //   line-height: 48px
  // }
  .address-item {
    padding: 10px 0;
    background: #fff;
    &:not(:last-child) {
      margin-bottom: 10px;
    }

    > div {
      overflow: hidden;
      padding: 0 10px;
    }

    .item-name {
      line-height: 28px;
    }

    .item-address {
      padding-bottom: 10px;
      padding-top: 5px;
    }

    .operation {
      padding-top: 10px;
      border-top: 1px solid #CFCFCF;
      .fr > a {
        margin-left: 5px;
      }
    }
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

  .empty {
    padding: 60px 0;
    text-align: center;
    background: #fff;
    .empty-msg {
      font-size: 14px;
    }
    .empty-btn {
      margin: 20px
    }
  }

</style>
