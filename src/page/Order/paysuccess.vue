<template>
  <div class="w">
    <y-shelf title="支付成功">
      <div slot="content" class="content">
        <p>恭喜你支付成功，总共花费 <span class="price"><em>¥</em>{{price}}</span> 元</p>
        <div class="operate">
          <router-link to="/user/orderList">
            <y-button text="查看订单" classStyle="main-btn"></y-button>
          </router-link>
          <router-link to="/goods">
            <y-button text="继续选购"></y-button>
          </router-link>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  export default {
    data () {
      return {
        price: 0
      }
    },
    components: {
      YShelf,
      YButton
    },
    created () {
      this.price = this.$route.query.price
    }
  }
</script>
<style lang="scss" scoped>
  .w {
    padding: 10px;
    background: #ededed;
  }
  .content {
    padding: 60px 0;
    font-size: 16px;
    background: #fff;
    text-align: center;
  }
  .operate {
    margin-top: 20px;
  }
  span.price {
    color: #d44d44;
    font-weight: 700;
    line-height: 20px;
    text-align: right;
  }
</style>
