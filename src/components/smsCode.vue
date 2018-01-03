<template>
  <button @click="run" v-bind:disabled="disabled || time > 0">{{text}}</button>
</template>
<script>
export default {
  props: {
    second: {
      type: Number,
      default: 60
    }
  },
  data () {
    return {
      time: 0,
      disabled: false
    }
  },
  methods: {
    run () {
      this.$emit('run');
    },
    start () {
      this.time = this.second;
      this.timer();
    },
    stop () {
      this.time = 0;
      this.disabled = false;
    },
    setDisabled (val) {
      this.disabled = val;
    },
    timer () {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      }else{
        this.disabled = false;
      }
    },
  },
  computed: {
    text () {
      return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
    }
  }
}
</script>
<style lang="scss" scoped>
  button {
    position: absolute;
    right: 0;
    cursor: pointer;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    padding: 0 10px;
    height: 100%;
  }
</style>


