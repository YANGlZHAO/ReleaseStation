<script>
export default {
  mounted() {
    if (process.env.UNI_PLATFORM === 'app-plus') {
      const closeSplash = () => {
        this.$nextTick(() => {
          setTimeout(() => {
            if (typeof plus !== 'undefined') {
              plus.navigator.closeSplashscreen();
              uni.hideLoading();
            }
          }, 1000);
        });
      };

      if (typeof plus !== 'undefined') {
        closeSplash();
      } else {
        document.addEventListener('plusready', closeSplash);
      }
    }
  }
}
</script>
