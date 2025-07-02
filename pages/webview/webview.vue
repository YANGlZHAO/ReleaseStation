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
				initialUrl: '',
				currentUrl: '',
				backButtonListener: null,
				isApp: false
			};
		},
		onLoad(options) {
			this.safeUrl = this.processUrl(options.url);
			this.initialUrl = this.safeUrl;
			this.isApp = this.checkIsApp();
			if (this.isApp) {
				this.initBackHandler();
			}
		},
		onUnload() {
			if (this.backButtonListener) {
				plus.key.removeEventListener('backbutton', this.backButtonListener);
			}
			uni.$off('webviewBack', this.handleBackPress);
		},
		methods: {
			checkIsApp() {
				const systemInfo = uni.getSystemInfoSync();
				return systemInfo.platform === 'android' || systemInfo.platform === 'ios';
			},

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

			initBackHandler() {
				this.backButtonListener = () => this.handleBackPress();
				plus.key.addEventListener('backbutton', this.backButtonListener);
				uni.$on('webviewBack', this.handleBackPress);
			},

			handleBackPress() {
				if (this.canGoBack) {
					this.$refs.webView.evalJS('history.back()');
					setTimeout(() => {
						this.$refs.webView.evalJS('window.location.href', (url) => {
							this.currentUrl = url;
							this.canGoBack = url !== this.initialUrl;
							
						});
					}, 300);
					return;
				}
				uni.navigateBack();
			},

			handlePageLoad() {
				console.log("WebView loaded");
				this.$refs.webView.evalJS('window.location.href', (url) => {
					this.currentUrl = url;
					this.canGoBack = url !== this.initialUrl;
				});

				this.urlCheckInterval = setInterval(() => {
					this.$refs.webView.evalJS('window.location.href', (url) => {
						if (url !== this.currentUrl) {
							this.currentUrl = url;
							this.canGoBack = true;
						}
					});
				}, 1000);
			},
		},
		beforeDestroy() {
			if (this.urlCheckInterval) {
				clearInterval(this.urlCheckInterval);
			}
		}
	};
</script>

<style>
	.container {
		height: 100vh;
	}
</style>