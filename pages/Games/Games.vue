<template>
	<view class="page">
		<view class="top-bar">
			<text class="title">XXVVJOGO</text>
			<view class="menu-btn" @click="openLink()">⋯</view>
		</view>

		<!-- Web 端内嵌 iframe 显示 -->
		<view class="web-main">
			<iframe :src="downloadUrl" class="web-iframe"></iframe>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				downloadUrl: 'https://bbpgapp.com/307/',
			}
		},
		methods: {
			open() {

			},
			openLink(url) {
				// #ifdef APP-PLUS
				if (typeof plus !== 'undefined' && plus.runtime) {
					plus.runtime.openURL(this.downloadUrl);
				}
				// #endif

				// #ifdef H5
				window.open(this.downloadUrl, '_blank');
				// #endif
			}
		}
	}
</script>

<style scoped>
	.page {
		height: calc(100vh - 2.5rem);
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.web-main {
		flex: 1;
		display: flex;
		margin-top: 3rem;
	}

	.top-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		height: 3rem;
		background: rgba(255, 255, 255, 0.8);
		color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.title {
		font-size: 16px;
	}

	.menu-btn {
		font-size: 24px;
		color: #fff;
	}

	.main {
		background-color: #fff;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tip-text {
		color: #999;
		font-size: 14px;
	}

	.web-iframe {
		background-color: #fff;
		width: 100%;
		height: 100%;
		border: none;
	}
</style>