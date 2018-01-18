<template>
  <div>
    <y-shelf title="我的足迹">
      <div slot="content">
        <div v-if="footList.length">
          <div class="foot-box">
            <mall-goods :msg="item" :type="'delete'" v-for="(item,i) in footList" :key="i"></mall-goods>
          </div>
        </div>
        <div v-else style="padding: 80px 0;text-align: center">
          <div style="font-size: 20px">你还未浏览过任何东西</div>
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
        footList: []  // 足迹列表
      }
    },
    methods: {
      _footPrint () {
        footPrint().then(res => {
          if (res.code === 0) {
            res.data.forEach(item => {
              this.footList.push({
                ID: item.id,
                price: item.price,
                goods_name: item.goodsName,
                image: item.image,
                description: item.description
              })
            });
          }
        })
      }
    },
    created () {
      this._footPrint()
    },
    components: {
      YShelf,
      YButton,
      mallGoods
    }
  }
</script>
<style lang="scss" scoped>
  .foot-box>div {
    float: left;
    border: 1px solid #efefef;
  }
</style>


