<template>
	<view class="container">
		<web-view :src="safeUrl" ref="webView" @load="handlePageLoad"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				safeUrl: '',
				canGoBack: false,
				backButtonListener: null,
				isApp: false
			};
		},
		onLoad(options) {
			// 1. 处理URL
			this.safeUrl = this.processUrl(options.url);

			// 2. 判断当前环境
			this.isApp = this.checkIsApp();

			// 3. 只在App环境下初始化返回监听
			if (this.isApp) {
				this.initBackHandler();
			}
		},
		onUnload() {
			// 移除监听防止内存泄漏
			if (this.backButtonListener) {
				plus.key.removeEventListener('backbutton', this.backButtonListener);
			}
			uni.$off('webviewBack', this.handleBackPress);
		},
		methods: {
			// 检查是否是App环境
			checkIsApp() {
				// 方法1：通过uni.getSystemInfoSync()
				const systemInfo = uni.getSystemInfoSync();
				if (systemInfo.platform === 'android' || systemInfo.platform === 'ios') {
					return true;
				}

				// 方法2：通过uni.getEnv()
				// #ifdef APP-PLUS
				return true;
				// #endif

				return false;
			},

			// 安全的URL处理
			processUrl(url) {
				try {
					let decoded = decodeURIComponent(url || '');
					if (!/^https?:\/\//i.test(decoded)) {
						decoded = 'https://' + decoded;
					}
					return decoded;
				} catch {
					uni.navigateBack();
					return '';
				}
			},

			// 初始化返回处理（App专用）
			initBackHandler() {
				// 安卓物理返回键
				this.backButtonListener = () => this.handleBackPress();
				plus.key.addEventListener('backbutton', this.backButtonListener);

				// iOS/Android通用返回拦截
				uni.$on('webviewBack', this.handleBackPress);
			},

			// 返回逻辑处理
			handleBackPress() {
				if (this.canGoBack) {
					this.$refs.webView.evalJS('history.back()');
					return;
				}
				uni.navigateBack();
			},

			// 页面加载完成
			handlePageLoad() {
				// 检查历史记录
				this.$refs.webView.evalJS('history.length > 1', (res) => {
					this.canGoBack = res;
				});
			}
		}
	};
</script>

<style>
	.container {
		height: 100vh;
	}
</style>