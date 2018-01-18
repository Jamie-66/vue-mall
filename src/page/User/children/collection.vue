<template>
  <div>
    <y-shelf title="我的收藏">
      <div slot="content">
        <div v-if="collectList.length">
          <div class="collect-box">
            <mall-goods :msg="item" :type="'delete'" v-for="(item,i) in collectList" :key="i"></mall-goods>
          </div>
        </div>
        <div v-else style="padding: 80px 0;text-align: center">
          <div style="font-size: 20px">你还未收藏过任何东西</div>
          <div style="margin: 20px ">
            <router-link to="/goods">
              <y-button text="现在浏览"></y-button>
            </router-link>
          </div>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import { footPrint } from '/api/goods'
  import YShelf from '/components/shelf'
  import mallGoods from '/components/mallGoods'
  import YButton from '/components/YButton'
  export default {
    data () {
      return {
        collectList: []
      }
    },
    methods: {
      // _footPrint () {
      //   footPrint().then(res => {
      //     if (res.code === 0) {
      //       res.data.forEach(item => {
      //         this.collectList.push({
      //           ID: item.id,
      //           price: item.price,
      //           goods_name: item.goodsName,
      //           image: item.image,
      //           description: item.description
      //         })
      //       });
      //     }
      //   })
      // }
    },
    created () {
      // this._footPrint()
    },
    components: {
      YShelf,
      mallGoods,
      YButton
    }
  }
</script>
<style lang="scss" scoped>
  .collect-box>div {
    float: left;
    border: 1px solid #efefef;
  }
</style>

