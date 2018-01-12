<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow">
        <h4 v-if="loginPage">登录</h4>
        <div v-if="loginPage" class="content">
          <ul class="common-form">
            <li class="mobile border-1p">
              <div class="input">
                <el-input v-model="ruleForm.mobile" placeholder="手机号"></el-input>
              </div>
            </li>
            <li>
              <div class="input">
                <el-input type="password" v-model="ruleForm.userPwd" placeholder="密码"></el-input>
              </div>
            </li>
            <li>
              <div class="input">
                <el-input v-model="ruleForm.sysCode" placeholder="验证码">
                  <template slot="append"><img @click="refreshImgCode" v-bind:src="sysCodeUrl"></template>
                </el-input>
              </div>
            </li>
            <!-- <li style="text-align: right" class="pr">
              <span class="pa" style="top: 0;left: 0;color: #d44d44">{{ruleForm.errMsg}}</span>
              <a href="javascript:;" style="padding: 0 5px" @click="loginPage=false">还没有账号? 点击注册</a>
            </li> -->
          </ul>
          <!--登录-->
          <div>
            <y-button text="登录"
                      :classStyle="ruleForm.userPwd&&ruleForm.mobile&&ruleForm.sysCode?'main-btn':'disabled-btn'"
                      @btnClick="login"
                      style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px"></y-button>
          </div>
          <ul class="common-form pr">
            <li class="pa" style="left: 0;top: 0;margin: 0;color: #d44d44">{{ruleForm.errMsg}}</li>
            <li style="text-align: right;line-height: 48px;margin-bottom: 0;">
              <a href="javascript:;" style="padding: 0 5px" @click="resetForm('ruleForm')">还没有账号? 点击注册</a>
            </li>
          </ul>
        </div>
        <div class="registered" v-else>
          <h4>注册</h4>
          <div class="content">
            <ul class="common-form">
              <li class="username border-1p">
                <div class="input">
                  <el-input v-model="registered.userName" placeholder="用户名"></el-input>
                </div>
              </li>
              <li>
                <div class="input">
                  <el-input v-model="registered.mobile" placeholder="手机号"></el-input>
                </div>
              </li>
              <li>
                <div class="input">
                  <el-input type="password" v-model="registered.userPwd" placeholder="输入密码"></el-input>
                </div>
              </li>
              <li>
                <div class="input">
                  <el-input type="password" v-model="registered.userPwd2" placeholder="再次输入密码"></el-input>
                </div>
              </li>
              <li>
                <div class="input">
                  <el-input v-model="registered.sysCode" placeholder="图片验证码">
                    <template slot="append"><img @click="r_refreshImgCode" v-bind:src="r_sysCodeUrl"></template>
                  </el-input>
                </div>
              </li>
              <li>
                <div class="input">
                  <el-input v-model="registered.smsCode" placeholder="短信验证码">
                    <template slot="append"><sms-code @run="sendCode" ref="smscode"></sms-code></template>
                  </el-input>
                </div>
              </li>
            </ul>
            <!--注册-->
            <div>
              <y-button
                :classStyle="registered.userPwd&&registered.userPwd2&&registered.userName&&registered.mobile&&registered.sysCode&&registered.smsCode?'main-btn':'disabled-btn'"
                text="注册"
                style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px"
                @btnClick="regist">
              </y-button>
            </div>
            <ul class="common-form pr">
              <li class="pa" style="left: 0;top: 0;margin: 0;color: #d44d44">{{registered.errMsg}}</li>
              <li style="text-align: right;line-height: 48px;margin-bottom: 0;">
                <a href="javascript:;" style="margin: 0 5px" @click="resetForm('registered')">已有账号? 点击登录</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import YFooter from '/common/footer'
  import YButton from '/components/YButton'
  import smsCode from '/components/smsCode'
  import { userLogin, register, identifyCode } from '/api/index.js'
  import { addCart1, addCart } from '/api/goods.js'
  import { getStore, removeStore } from '/utils/storage.js'
  export default {
    data () {
      return {
        cart: [],
        sysCodeUrl: '',  // 图片验证码地址
        r_sysCodeUrl: '', // 注册图片验证码地址
        loginPage: true,
        ruleForm: {
          mobile: '',
          userPwd: '',
          imgCode: '',  // 图片验证码
          errMsg: ''
        },
        registered: {
          userName: '',
          mobile: '',
          userPwd: '',
          userPwd2: '',
          sysCode: '',  // 图片验证码
          smsCode: '',  // 短信验证码
          errMsg: ''
        }
      }
    },
    computed: {
      count () {
        return this.$store.state.login
      },
      text () {
        return this.time > 0 ? this.time + 's后重获取' : '获取验证码';
      }
    },
    methods: {
      // 获取本地购物车
      login_addCart () {
        let cartArr = []
        let locaCart = JSON.parse(getStore('buyCart'))
        if (locaCart && locaCart.length) {
          locaCart.forEach(item => {
            cartArr.push({
              'productId': item.productId,
              'productNum': item.productNum
            })
          })
        }
        this.cart = cartArr
      },
      // 登录 刷新验证码
      refreshImgCode () {
        this.sysCodeUrl = '/randomImgCodeServlet?t='+ Math.random()
      },
      // 注册 刷新验证码
      r_refreshImgCode () {
        this.r_sysCodeUrl = '/randomImgCodeServlet?t='+ Math.random()
      },
      // 发送手机验证码
      sendCode () {
        if(!(/^1[34578]\d{9}$/.test(this.registered.mobile))){ 
          this.registered.errMsg = '请输入正确的手机号' 
          return false
        }
        if (!this.registered.sysCode) {
          this.registered.errMsg = '图片验证码不能为空' 
          return false
        }

        let params = {
          mobile: this.registered.mobile, 
          sysCode: this.registered.sysCode,
          templateName: 'TPL_REGISTER'
        }
        identifyCode({params: params}).then(res => {
          if (res.code === 0) {
            this.$refs.smscode.start()
            this.registered.errMsg = '' 
          } else {
            this.$refs.smscode.stop()
            this.registered.errMsg = res.msg
          }
        })
      },
      // 登录
      login () {
        // if (!this.ruleForm.mobile || !this.ruleForm.userPwd) {
        //   this.ruleForm.errMsg = '手机号或者密码不能为空!'
        //   return false
        // }
        // if (!this.ruleForm.sysCode) {
        //   this.ruleForm.errMsg = '验证码不能为空!'
        //   return false
        // }
        
        let params = {
          mobile: this.ruleForm.mobile, 
          password: this.ruleForm.userPwd,
          sysCode: this.ruleForm.sysCode
        }
        userLogin({params: params}).then(res => {
          if (res.code === 0) {
            this.ruleForm.errMsg = ''
            // this.$store.state.login = true
            // 登录时将本地的添加到用户购物车
            if (this.cart.length) {
              addCart1({productMsg: this.cart}).then(res => {
                if (res.status === '1') {
                  removeStore('buyCart')
                }
              }).then(this.$router.go(-1))
            } else {
              this.$router.go(-1)
            }
          } else {
            this.ruleForm.errMsg = res.msg
          }
        })
      },
      // 注册
      regist () {
        let userName = this.registered.userName
        let mobile = this.registered.mobile
        let userPwd = this.registered.userPwd
        let userPwd2 = this.registered.userPwd2
        let sysCode = this.registered.sysCode
        let smsCode = this.registered.smsCode
        // if (!userName || !userPwd || !userPwd2) {
        //   this.registered.errMsg = '账号密码不能为空'
        //   return false
        // }
        // if (!smsCode) {
        //   this.registered.errMsg = '手机号不能为空'
        //   return false
        // }
        // if(!(/^1[34578]\d{9}$/.test(mobile))){ 
        //   this.registered.errMsg = '请输入正确的手机号' 
        //   return false; 
        // } 
        if (userPwd2 !== userPwd) {
          this.registered.errMsg = '两次输入的密码不一致'
          return false
        }
        // if (!smsCode) {
        //   this.registered.errMsg = '验证码不能为空'
        //   return false
        // }

        let params = {
          name: userName,
          mobile: mobile,
          password: userPwd,
          sysCode: sysCode,
          smsCode: smsCode
        }
        register({params: params}).then(res => {
          if (res.code === 0) {
            setTimeout(() => {
              this.ruleForm.errMsg = ''
              this.registered.errMsg = ''
              this.loginPage = true
            }, 500)
          } else {
            this.registered.errMsg = res.msg
          }
        })
      },
      resetForm (type) {
        for (const key in this[type]) {
          this[type][key] = ''
        }
        if (type === 'ruleForm') {
          this.loginPage = false
        } else {
          this.loginPage = true
        }
      }
    },
    mounted () {
      // this.login_addCart()
      this.refreshImgCode()
      this.r_refreshImgCode()
    },
    components: {
      YFooter,
      YButton,
      smsCode
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  * {
    box-sizing: content-box;
  }
  // element ui
  .el-input-group__append {
    img {
      height: 100%;
    }
  }
  .login {
    overflow-x: hidden;
    overflow-y: hidden;
    .input {
      height: 38px;
      display: flex;
      align-items: center;
      input {
        font-size: 16px;
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
    }
    .code{
      input {
        padding-right: 98px;
      }
      span {
        display: inline-block;
        height: 36px;
        line-height: 36px;
        position: absolute;
        right: 1px;
        top: 1px;
        cursor: pointer;
        img {
          height: 100%;
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }
      button {
        position: absolute;
        right: 1px;
        cursor: pointer;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        padding: 0;
        width: 96px;
        text-align: center;
        height: 100%;
      }
    }
    .wrapper {
      background: url(/static/images/bg_9b9dcb65ff.png) repeat;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  .v2 .dialog {
    // width: 450px;
    width: 75%;
    border: 1px solid #dadada;
    border-radius: 10px;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0);
    position: absolute;
    h4 {
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      font-size: 20px;
      height: 60px;
      line-height: 60px;
    }
    .content {
      margin-top: 20px;
      padding: 0 30px;
      height: auto;
      .common-form {
        li {
          clear: both;
          margin-bottom: 15px;
          position: relative;
        }
      }
    }
  }
  .dialog-shadow, .v2 .bbs .dialog-shadow, .v2 .dialog-shadow {
    -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);
    -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);
  }
  @media screen and (min-width: 737px), screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
    // .wrapper {
    //   background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;
    //   position: absolute;
    //   top: 0;
    //   bottom: 0;
    //   left: 0;
    //   right: 0;
    // }
    // .dialog {
    //   background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
    //   border-radius: 12px;
    //   display: none;
    //   margin: -163px 0 0 -218px;
    //   width: 436px;
    //   position: fixed;
    //   left: 50%;
    //   top: 50%;
    // }
    // .dialog .title h4 {
    //   border-bottom: #d1d1d1 solid 1px;
    //   box-shadow: 0 2px 6px #d1d1d1;
    //   color: #666;
    //   font-size: 20px;
    //   height: 61px;
    //   line-height: 61px;
    //   padding: 0 0 0 35px;
    // }
    // .common-form li {
    //   clear: both;
    //   margin-bottom: 15px;
    //   position: relative;
    // }
  }
  // .registered {
  //   h4 {
  //     padding: 0;
  //     text-align: center;
  //     color: #666;
  //     border-bottom: 1px solid #dcdcdc;
  //     -webkit-box-shadow: none;
  //     -moz-box-shadow: none;
  //     box-shadow: none;
  //     font-weight: 700;
  //     font-size: 20px;
  //     height: 60px;
  //     line-height: 60px;
  //   }
  // }
</style>
