<template>
  <div class="home-page">
    <h2>首页内容</h2>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      message: '欢迎访问首页',
    }
  },
  methods: {
    open() {
      // 这里写你切换到该页面时想做的操作，比如刷新数据，启动动画等
      console.log('HomePage open 被调用了')
      this.message = '首页已刷新时间: ' + new Date().toLocaleTimeString()
    },
  },
}
</script>

<style scoped>
.home-page {
  padding: 20px;
}
</style>
