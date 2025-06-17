<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if (process.env.UNI_PLATFORM === 'app-plus') {
				if (typeof plus !== 'undefined') {
					plus.navigator.closeSplashscreen(); // 关闭启动页
					uni.hideLoading(); // 关闭loading（防止遗留）
				}
			}
		},
	}
</script>


<style>
	/* 全局覆盖 uni-scroll-view 高度 */
	uni-scroll-view {
	  height: auto !important;
	}
	
	.uni-scroll-view-content {
	  height: auto !important;
	  min-height: 100% !important; /* 确保内容能撑开 */
	}
	
</style>