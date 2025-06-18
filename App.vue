<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 设置根字体大小，1rem = 20px
			// const docEl = document.documentElement
			// const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
			// const recalc = function() {
			// 	const clientWidth = docEl.clientWidth || 375 // 默认375
			// 	docEl.style.fontSize = 20 * (clientWidth / 375) + 'px' // 基于375设计稿
			// }
			// window.addEventListener(resizeEvt, recalc, false)
			// document.addEventListener('DOMContentLoaded', recalc, false)
			// recalc()

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