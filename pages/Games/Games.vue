<template>
	<view class="container">
		<view class="menu-btn" @click="openLink">⋯</view>

		<view class="header">
			<view class="header-top">
				<text class="title">FC发布站二维码</text>
			</view>
		</view>

		<view class="tips"><text>Android</text></view>
		<view class="qrcode-box">
			<canvas canvas-id="apkDownLoadUrl" class="qrcode-canvas"></canvas>
		</view>
		<button class="save-btn" @click="saveQRCode('apkDownLoadUrl')">保存二维码</button>

		<view class="tips"><text>iOS</text></view>
		<view class="qrcode-box">
			<canvas canvas-id="iosUrl" class="qrcode-canvas"></canvas>
		</view>
		<button class="save-btn" @click="saveQRCode('iosUrl')">保存二维码</button>

		<view class="tips">
			<text>扫描上方二维码访问 FC 应用</text>
		</view>
	</view>
</template>



<script>
	import UQRCode from 'uqrcodejs'

	export default {
		data() {
			return {
				apkDownLoadUrl: "https://cdnupload.pg-gub.com/uploads/h5_box/20250530/091a52d9a5ea788819938e2ac821bb8f.apk",
				iosUrl: "https://bbpgapp.com/307/",
				shareUrl: '',
				platform: ''
			}
		},
		onReady() {
			this.open()
		},
		methods: {
			open() {
				const systemInfo = uni.getSystemInfoSync()
				this.platform = systemInfo.platform
				this.shareUrl = this.platform === 'android' ? this.apkDownLoadUrl : this.iosUrl

				this.generateQRCode(this.apkDownLoadUrl, 'apkDownLoadUrl')
				this.generateQRCode(this.iosUrl, 'iosUrl')
			},
			generateQRCode(url, canvasId) {
				if (!url) return
				try {
					const qr = new UQRCode()
					qr.data = url
					qr.size = 200
					qr.margin = 10
					qr.colorDark = "#000000"
					qr.colorLight = "#ffffff"
					qr.make()

					const ctx = uni.createCanvasContext(canvasId, this)
					qr.canvasContext = ctx
					qr.drawCanvas()
				} catch (e) {
					console.error(`二维码生成失败:`, e)
					uni.showToast({
						title: '生成失败',
						icon: 'none'
					})
				}
			},
			saveQRCode(canvasId) {
				uni.showLoading({
					title: '处理中...',
					mask: true
				})
				uni.canvasToTempFilePath({
					canvasId,
					success: res => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.hideLoading()
								uni.showToast({
									title: '保存成功',
									icon: 'success'
								})
							},
							fail: err => {
								uni.hideLoading()
								this.handleSaveFail(err)
							}
						})
					},
					fail: err => {
						uni.hideLoading()
						console.error('canvas转图片失败:', err)
						uni.showToast({
							title: '保存失败，请先生成二维码',
							icon: 'none'
						})
					}
				}, this)
			},
			handleSaveFail(err) {
				console.error('保存失败:', err)
				if (err.errMsg.includes('auth')) {
					uni.showModal({
						title: '提示',
						content: '需要相册权限才能保存图片',
						success: res => {
							if (res.confirm) uni.openSetting()
						}
					})
				} else {
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					})
				}
			},
			openLink() {
				// #ifdef APP-PLUS
				plus.runtime.openURL(this.shareUrl)
				// #endif

				// #ifdef H5
				window.open(this.shareUrl, '_blank')
				// #endif
			}
		}
	}
</script>



<style>
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		height: calc(100vh - 2rem);
		background-color: #f5f5f5;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 2rem;
	}

	.header-top {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 1rem;
		font-weight: bold;
		color: #333;
	}

	.menu-btn {
		position: fixed;
		right: 0.5rem;
		top: 0.5rem;
		font-size: 1rem;
		line-height: 1;
		padding: 0.5rem 1rem;
		color: #333;
		z-index: 999;
	}

	.qrcode-box {
		width: 220px;
		height: 220px;
		background-color: #fff;
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.1);
		margin-bottom: 1rem;
	}

	.qrcode-canvas {
		width: 200px;
		height: 200px;
	}

	.save-btn {
		width: 10rem;
		background-color: #1a73e8;
		color: white;
		border-radius: 2rem;
		font-size: 1rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 0.2rem 0.6rem rgba(26, 115, 232, 0.3);
	}

	.tips {
		font-size: 1rem;
		color: #999;
	}
</style>