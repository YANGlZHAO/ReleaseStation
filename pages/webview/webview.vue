<template>
  <view class="container">
    <web-view
      :src="safeUrl"
      ref="webView"
      @load="handlePageLoad"
    ></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      safeUrl: '',
      initialUrl: '',
      isApp: false,
      urlCheckInterval: null,
      currentUrl: '',
      canGoBack: false,
    };
  },
  onLoad(options) {
    this.safeUrl = this.processUrl(options.url);
    this.initialUrl = this.safeUrl;
    this.isApp = this.checkIsApp();
  },
  onUnload() {
    if (this.urlCheckInterval) {
      clearInterval(this.urlCheckInterval);
      this.urlCheckInterval = null;
    }
  },
  methods: {
    checkIsApp() {
      const info = uni.getSystemInfoSync();
      return info.platform === 'android' || info.platform === 'ios';
    },
    processUrl(url) {
      try {
        let decoded = decodeURIComponent(url || '');
        if (!/^https?:\/\//i.test(decoded)) {
          decoded = 'https://' + decoded;
        }
        return decoded;
      } catch (e) {
        uni.navigateBack();
        return '';
      }
    },
    handlePageLoad() {
      // App 端可以用 evalJS 监控webview地址变更，更新 canGoBack
      if (this.isApp && this.$refs.webView && typeof this.$refs.webView.evalJS === 'function') {
        // 初始化 currentUrl 和 canGoBack
        setTimeout(() => {
          this.$refs.webView.evalJS('window.location.href', (url) => {
            this.currentUrl = url;
            this.canGoBack = url !== this.initialUrl;
          });
        }, 300);

        // 轮询检测 URL 变化（可选）
        this.urlCheckInterval = setInterval(() => {
          this.$refs.webView.evalJS('window.location.href', (url) => {
            if (url !== this.currentUrl) {
              this.currentUrl = url;
              this.canGoBack = true;
            }
          });
        }, 1000);
      }
    },
    handleBackPress() {
      // 返回处理：
      // 直接调用 uni.navigateBack，交给系统（浏览器或App）处理返回逻辑
      uni.navigateBack();
    }
  }
};
</script>

<style>
.container {
  height: 100vh;
}
</style>
