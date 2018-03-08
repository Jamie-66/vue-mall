<template>
  <div>
    <y-shelf title="账户资料">
      <div slot="content">
        <div class="avatar-box">
          <div class="img-box"><img :src="userInfo.info.avatar?userInfo.info.avatar:'/static/images/user-avatar.png'" alt=""></div>
          <div class="r-box">
            <h3>修改用户信息</h3>
            <!-- <y-button text="更换头像" classStyle="main-btn" @btnClick="editAvatar()"></y-button> -->
            <y-button text="编辑用户信息" :classStyle="editType==='message'?'main-btn':'default-btn'" @btnClick="editTypeChange('message')"></y-button>
            <y-button text="修改密码" :classStyle="editType==='password'?'main-btn':'default-btn'" @btnClick="editTypeChange('password')"></y-button>
          </div>
        </div>
        <div class="edit-userInfo">
          <div class="userMsg" v-if="editType===''">
            <ul>
              <li class="first">
                <span class="fl">头像</span>
                <span class="fr avatar">
                  <img :src="userInfo.info.avatar?userInfo.info.avatar:'/static/images/user-avatar.png'" alt="">
                </span>
              </li>
              <li>
                <span class="fl">会员名</span>
                <span class="fr">{{userInfo.info.name}}</span>
              </li>
              <li>
                <span class="fl">账号</span>
                <span class="fr">{{userInfo.info.mobile}}</span>
              </li>
            </ul>
          </div>
          <div class="edit-msg" v-else-if="editType==='message'">
            <div class="edit-input">
              <el-input type="text" size="small" v-model="editUserInfo.userName" placeholder="用户昵称"></el-input>
            </div>
            <span style="font-size: 12px;color: #d44d44">{{editUserInfo.errMsg}}</span>
            <div style="margin-top: 15px;">
              <y-button v-if="editType" text="保存" :classStyle="editUserInfo.userName?'main-btn':'disabled-btn'" @btnClick="saveEdit(editType)"></y-button>
              <y-button v-if="editType" text="取消" @btnClick="editCancel(editType)"></y-button>
            </div>
          </div>
          <div class="edit-psw" v-else-if="editType==='password'">
            <div>
              <el-input type="text" size="small" v-model="editPsw.oldPassword" placeholder="当前密码"></el-input>
            </div>
            <div>
              <el-input type="password" size="small" v-model="editPsw.password" placeholder="新密码"></el-input>
            </div>
            <div>
              <el-input type="password" size="small" v-model="editPsw.c_password" placeholder="确认新密码"></el-input>
            </div>
            <span style="font-size: 12px;color: #d44d44">{{editPsw.errMsg}}</span>
            <div style="margin-top: 15px;">
              <y-button v-if="editType" text="保存" :classStyle="editPsw.oldPassword&&editPsw.password&&editPsw.c_password?'main-btn':'disabled-btn'" @btnClick="saveEdit(editType)"></y-button>
              <y-button v-if="editType" text="取消" @btnClick="editCancel(editType)"></y-button>
            </div>
          </div>
        </div>
        <div class="edit-avatar" v-if="editAvatarShow">
          <y-shelf title="设置头像">
            <span slot="right">
              <span class="close" @click="editAvatarShow=false">
                <svg t="1501234940517" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" 
                    p-id="3014" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
                  <path d="M941.576 184.248l-101.824-101.824L512 410.176 184.248 82.424 82.424 184.248 410.168 512l-327.744 327.752 101.824 101.824L512 613.824l327.752 327.752 101.824-101.824L613.832 512z" fill="#cdcdcd" p-id="3015"></path>
                </svg>
              </span>
            </span>
            <div slot="content" class="content">
              <div class="edit-l">
                <div style="width: 100px;height: 100px;border: 1px solid #ccc;margin-bottom: 20px;overflow: hidden;">
                  <div class="show-preview" :style="{'width': previews.w + 'px','height': previews.h + 'px','overflow': 'hidden','zoom':option.zoom}">
                    <div :style="previews.div">
                      <img :src="'/'+option.img" :style="previews.img">
                    </div>
                  </div>
                </div>
                <div style="padding: 10px 0 ">头像预览</div>
                <div class="btn">
                  <a href="javascript:;">重新选择</a>
                  <input type="file" value="上传头像" @change="upimg($event)">
                </div>
              </div>
              <div class="edit-r">
                <div>
                  <div class="big" id="cropper-target" v-if="option.img">
                    <vueCropper
                      :img="option.img"
                      @realTime="realTime"
                      ref="cropper"
                      :outputSize="example2.size"
                      :info="example2.info"
                      :canScale="example2.canScale"
                      :autoCrop="example2.autoCrop"
                      :autoCropWidth="example2.width"
                      :autoCropHeight="example2.height"
                      :fixed="example2.fixed">
                    </vueCropper>
                  </div>
                </div>
              </div>
              <div class="bootom-btn pa">
                <y-button style="width: 140px;height: 40px;line-height: 40px" text="取消" @btnClick="editAvatarShow=false"></y-button>
                <y-button style="width: 140px;height: 40px;line-height: 40px" text="确定" @btnClick="cropper" classStyle="main-btn"></y-button>
              </div>
            </div>
          </y-shelf>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import { upload, updateheadimage, editUser, editPassword, userInfo, loginOut } from '/api/index'
  import YButton from '/components/YButton'
  import YShelf from '/components/shelf'
  import vueCropper from 'vue-cropper'
  import { mapState, mapMutations } from 'vuex'
  import { removeStore } from '/utils/storage'
  export default {
    data () {
      return {
        /*
        * 修改头像
        */ 
        imgSrc: '',
        editAvatarShow: false,
        cropContext: '',
        cropperImg: '',
        previews: {},
        option: {
          img: '',
          zoom: 0
        },
        fixedNumber: [1, 1],
        example2: {
          info: true,
          size: 1,
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 300,
          autoCropHeight: 250,
          // 开启宽度和高度比例
          fixed: true
        },
        /*
        * 修改账号资料
        */ 
        editType: '',       // 切换编辑的内容
        editUserInfo: {     // 修改用户信息
          userName: '',     // 用户名
          errMsg: ''        // 错误信息
        },
        editPsw: {          // 修改密码
          oldPassword: '',  // 旧密码
          password: '',     // 新密码
          c_password: '',   // 重复密码
          errMsg: ''        // 错误信息
        }
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
      // 上传头像
      upimg (e) {
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          this.option.img = e.target.result
        }
      },
      cropper () {
        if (this.option.img) {
          this.$refs.cropper.getCropData((data) => {
            this.imgSrc = data
            upload({imgData: data}).then(res => {
              if (res.status === '0') {
                let path = res.result.path
                updateheadimage({imageSrc: path}).then(res1 => {
                  if (res1.status === '0') {
                    let info = this.userInfo
                    info.avatar = path
                    this.RECORD_USERINFO({info: info})
                    alert('更换成功')
                    this.editAvatarShow = false
                  }
                })
              }
            })
          })
        } else {
          alert('别玩我啊 先选照骗')
        }
      },
      // 编辑头像
      editAvatar () {
        this.editAvatarShow = true
      },
      realTime (data) {
        this.previews = data
        let w = 100 / data.w
        this.option.zoom = w
      },
      // 编辑内容转换
      editTypeChange (type) {
        if (this.editType === type) {
          return false
        }
        this.editType = type;
        this.editClean(type)
      },
      // 保存信息的修改
      saveEdit (type) {
        if (type === 'message') {
          let params = {
            name: this.editUserInfo.userName
          }

          editUser({params:params}).then(res => {
            if (res.code === 0) {
              this.editType = ''
              this.$message.success('修改成功')
              
              userInfo().then(res => {
                if (res.code === 0) {
                  this.RECORD_USERINFO({info: res.data})
                }
              })
            } else {
              this.editUserInfo.errMsg = res.msg
            }
          })

        } else if (type === 'password') {
          if (this.editPsw.password === this.editPsw.c_password) {
            let params = {
              oldPassword: this.editPsw.oldPassword,
              password: this.editPsw.password
            }

            editPassword({params:params}).then(res => {
              if (res.code === 0) {
                this.editPsw.errMsg = ''
                this.editType = ''
                
                let self = this
                this.$message({
                  message: '密码修改成功, 3s后将退出重新登录...',
                  type: 'success',
                  onClose: function() {
                    self._loginOut()
                  }
                })
              } else {
                this.editPsw.errMsg = res.msg
              }
            })
          } else {
            this.editPsw.errMsg = '两次输入的密码不一致'
          }
        }
      },
      // 取消修改
      editCancel (type) {
        this.editType = ''
        this.editClean(type)
      },
      // 清空编辑信息
      editClean (type) {
        if (type === 'message') {
          for (const key in this.editUserInfo) {
            this.editUserInfo[key] = ''
          }
        } else {
          for (const key in this.editPsw) {
            this.editPsw[key] = ''
          }
        }
      },
      // 退出登陆
      _loginOut () {
        loginOut().then(res => {
          removeStore('buyCart')   // 清除本地购物车
          removeStore('userInfo')  // 清除本地用户信息
          this.$router.push({path: '/login'})
        })
      }
    },
    components: {
      YButton,
      YShelf,
      vueCropper
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .gray-box {
    margin-bottom: 53px;
    background: #fff;
  }

  .avatar-box {
    height: 120px;
    display: flex;
    padding: 0 20px;
    // border-bottom: #dadada solid 1px;
    line-height: 30px;
    display: flex;
    align-items: center;
    .img-box {
      @include wh(80px);
      border-radius: 5px;
      overflow: hidden;
      margin-right: 20px;
    }
    img {
      display: block;
      @include wh(100%)
    }
    .r-box {
      h3 {
        font-size: 16px;
        font-weight: 400;
        color: #333;
      }
    }
  }
  .edit-userInfo {
    padding: 0 20px 10px;
    margin-top: 15px;
  }

  // 修改头像
  .edit-avatar {
    z-index: 9999;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    @include wh(100%);
    background-color: rgba(0, 0, 0, .5);
    @extend %block-center;
    .content {
      display: flex;
      padding: 45px 100px 0;
    }
    > div {
      box-sizing: content-box;
      @include wh(700px, 500px);
      margin: 0;
    }
    .btn {
      width: 80px;
      height: 30px;
      margin-left: 10px;
      position: relative;
      text-align: center;
      line-height: 30px;
      text-shadow: rgba(255, 255, 255, .496094) 0 1px 0;
      border: 1px solid #E6E6E6;
      border-radius: 10px;
      // &:hover {
      // }
      a {
        color: #666;
        display: block;
        @include wh(100%);
      }
    }
    input[type=file] {
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      opacity: 0;
      width: 80px;
      height: 30px;
      cursor: pointer;
      box-sizing: border-box;
      border: 15px solid #000;
      overflow: hidden;
    }
    .edit-l {
      width: 100px;
      text-align: center;
    }
    .edit-r {
      margin-left: 20px;
      flex: 1;
      > div {
        border: 1px solid #ccc;
        width: 320px;
        height: 320px;
      }
    }
  }

  .image-container {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    padding: 0 10px;
    @extend %block-center;
    &:hover {
      svg {
        transition: all 1s;
        transform: rotate(360deg);
        transform-origin: 50% 50%;
      }
      path {
        fill: #8a8a8a;
      }
    }
  }

  .big {
    display: block;
    width: 320px;
    height: 320px;
  }

  .bootom-btn {
    padding: 0 15px;
    border-top: 1px solid #E6E6E6;
    bottom: 0;
    height: 60px;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input[type=text], input[type=password] {
    border: 1px solid #ccc;
    line-height: 28px;
    padding: 0 10px;
    margin-bottom: 7px;
    border-radius: 3px;
  }

  .userMsg {
    li {
      height: 48px;
      border-top: 1px solid #EBEBEB;
      line-height: 48px;
      padding: 0 10px;
      &.first {
        height: 54px;
        line-height: 54px;
        .avatar {
          padding-top: 4px;
        }
      }
      .avatar{
        // width: 45px;
        height: 100%;
        line-height: 100%;
        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
      }
    }
  }

  .edit-input, .edit-psw {
    padding-right: 60px;
    .el-input {
      margin-bottom: 10px;
    }
  }

</style>
