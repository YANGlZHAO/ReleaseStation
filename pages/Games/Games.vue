<template>
	<view class="container">
		<view class="menu-btn" @click="openLink()">⋯</view>

		<view class="header">
			<view class="header-top">
				<text class="title">BBPG 应用二维码</text>
			</view>
			<text class="url">{{ shareUrl }}</text>
		</view>

		<view class="qrcode-box">
			<canvas canvas-id="qrcode" class="qrcode-canvas" style="width: 200px; height: 200px;"></canvas>
		</view>

		<button class="save-btn" @click="saveQRCode">保存二维码</button>

		<view class="tips">
			<text>扫描上方二维码访问 BBPG 应用</text>
		</view>
	</view>
</template>

<script>
	import UQRCode from 'uqrcodejs'
	export default {
		data() {
			return {
				shareUrl: 'https://bbpgapp.com/307/'
			}
		},
		methods: {
			open() {
				this.generateQR()
			},
			generateQR() {
				if (!this.shareUrl) {
					uni.showToast({
						title: '请输入URL',
						icon: 'none'
					})
					return
				}

				try {
					const qr = new UQRCode()

					// 设置参数
					qr.data = this.shareUrl
					qr.size = 200
					qr.margin = 10
					qr.colorDark = "#000000"
					qr.colorLight = "#ffffff"
					qr.make()
					// 获取canvas上下文
					const ctx = uni.createCanvasContext('qrcode', this)
					qr.canvasContext = ctx
					qr.drawCanvas()
				} catch (err) {
					console.error('生成二维码失败:', err)
					uni.showToast({
						title: '生成失败',
						icon: 'none'
					})
				}
			},
			saveQRCode() {
				uni.showLoading({
					title: '处理中...',
					mask: true
				})
				uni.canvasToTempFilePath({
					canvasId: 'qrcode',
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.hideLoading()
								uni.showToast({
									title: '保存成功',
									icon: 'success'
								})
							},
							fail: (err) => {
								uni.hideLoading()
								console.error('保存失败:', err)
								// 处理权限问题
								if (err.errMsg.includes('auth')) {
									uni.showModal({
										title: '提示',
										content: '需要相册权限才能保存图片',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								} else {
									uni.showToast({
										title: '保存失败',
										icon: 'none'
									})
								}
							}
						})
					},
					fail: (err) => {
						uni.hideLoading()
						console.error('canvas转图片失败:', err)
						uni.showToast({
							title: '保存失败，请先生成二维码',
							icon: 'none'
						})
					}
				}, this)
			},
			openLink() {
				// #ifdef APP-PLUS
				if (typeof plus !== 'undefined' && plus.runtime) {
					plus.runtime.openURL(this.shareUrl);
				}
				// #endif

				// #ifdef H5
				window.open(this.shareUrl, '_blank');
				// #endif
			}
		},
	}
</script>

<style>
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		height: 100vh;
		background-color: #f5f5f5;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.header-top {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 15rpx;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}

	.menu-btn {
		position: fixed;
		right: 0.5rem;
		top: 0.5rem;
		font-size: 50rpx;
		line-height: 1;
		padding: 10rpx 20rpx;
		color: #333;
		z-index: 999;
	}

	.url {
		font-size: 26rpx;
		color: #666;
		word-break: break-all;
		text-align: center;
		max-width: 80%;
	}

	.qrcode-box {
		width: 270px;
		height: 270px;
		background-color: #fff;
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
		margin-bottom: 40rpx;
	}

	.qrcode-canvas {
		width: 250px;
		height: 250px;
	}

	.save-btn {
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #1a73e8;
		color: white;
		border-radius: 40rpx;
		font-size: 32rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 12rpx rgba(26, 115, 232, 0.3);
	}

	.tips {
		font-size: 26rpx;
		color: #999;
		margin-top: 20rpx;
	}
</style>