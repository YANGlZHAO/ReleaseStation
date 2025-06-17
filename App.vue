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
	
</style>