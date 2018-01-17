<template>
  <div>
    <y-shelf title="我的足迹">
      <div slot="content">
        <div style="padding: 100px 0;text-align: center">
          此页面暂未开发
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import { footPrint } from '/api/goods'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {}
    },
    methods: {
      _footPrint () {
        footPrint().then(res => {
          console.log(res)
        })
      }
    },
    created () {
      this._footPrint()
    },
    components: {
      YShelf
    }
  }
</script>