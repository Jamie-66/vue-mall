<template>
  <div>
    <y-shelf title="我的收藏">
      <div slot="content">
        <div v-if="collectList.length">
          <div class="collect-box">
            <mall-goods :msg="item" :index="i" :type="'cancel'" @collect-del="collectDel" v-for="(item,i) in collectList" :key="i"></mall-goods>
          </div>
        </div>
        <div v-else class="empty">
          <div class="empty-tip">你还未收藏过任何东西</div>
          <div class="empty-operate">
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
  import { getCollections, collectinDel } from '/api/goods'
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
      _getCollections () {
        getCollections().then(res => {
          if (res.code === 0) {
            res.data.forEach(item => {
              this.collectList.push({
                ID: item.ID,
                price: item.price,
                goods_name: item.goods_name,
                image: item.image,
                description: item.description
              })
            });
          }
        })
      },
      // 删除成功的子组件回调
      collectDel (i) {
        this.collectList.splice(i, 1)
      }
    },
    created () {
      this._getCollections()
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

  .empty {
    padding: 60px 0;
    text-align: center;
    font-size: 14px;
    background: #fff;
    .empty-operate {
      margin: 20px;
    }
  }
</style>

