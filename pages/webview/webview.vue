<template>
  <web-view :src="webUrl"></web-view>
</template>

<script>
export default {
  data() {
    return {
      webUrl: ''
    }
  },
  onLoad(options) {
    this.webUrl = decodeURIComponent(options.url || '')
  }
}
</script>
