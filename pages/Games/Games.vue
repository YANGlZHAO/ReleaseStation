<template>
	<view class="container">
		<view class="header">
			<text class="title">fcpg</text>
			<button class="download-btn" @click="openLink()">Baixar Agora</button>
		</view>
		<view class="content">
			<view class="content_left">
				<view class="qrcode-box">
					<canvas canvas-id="shareUrl" class="qrcode-canvas"></canvas>
				</view>
				<button class="save-btn" @click="saveQRCode('shareUrl')">Clique para Salvar</button>
			</view>
			<view class="content_right">
				<view class="link-box">
					<text class="link-text">{{ shareUrl }}</text>
					<image class="btn_copy" src="/static/copy.png" @click="copyToClipboard(shareUrl)"></image>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UQRCode from 'uqrcodejs'

	export default {
		data() {
			return {
				apkDownLoadUrl: "https://cdnupload.pg-gub.com/uploads/h5_box/20250530/091a52d9a5ea788819938e2ac821bb8f.apk",
				// iosUrl: "https://bbpgapp.com/307/",
				iosUrl: "https://fcpg.app",
				downloadUrl: '',
				platform: '',
				shareUrl: 'https://fcpg.app'
			}
		},
		onReady() {
			this.open()
		},
		methods: {
			open() {
				const systemInfo = uni.getSystemInfoSync()
				this.platform = systemInfo.platform
				this.downloadUrl = this.platform === 'android' ? this.apkDownLoadUrl : this.iosUrl
				this.generateQRCode(this.shareUrl, 'shareUrl')
			},
			generateQRCode(url, canvasId) {
				if (!url) return
				try {
					const qr = new UQRCode()
					qr.data = url
					qr.size = 100
					qr.margin = 0
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
				plus.runtime.openURL(this.downloadUrl)
				// #endif

				// #ifdef H5
				window.open(this.downloadUrl, '_blank')
				// #endif
			},
			copyToClipboard(text) {
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: text,
					success: () => uni.showToast({
						title: '复制成功',
						icon: 'success'
					})
				})
				// #endif

				// #ifdef H5
				const textarea = document.createElement('textarea')
				textarea.value = text
				textarea.style.position = 'fixed'
				document.body.appendChild(textarea)
				textarea.select()
				try {
					document.execCommand('copy')
					uni.showToast({
						title: '复制成功',
						icon: 'success'
					})
				} catch (err) {
					uni.showToast({
						title: '复制失败',
						icon: 'none'
					})
				}
				document.body.removeChild(textarea)
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
		height: 100vh;
		background-color: #111923;
	}

	.header {
		background-color: #151d29;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 0.5rem;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		position: relative;
		border-bottom: 0.15rem solid #293548;
	}

	.download-btn {
		background-color: #1a73e8;
		color: #fff;
		font-weight: bold;
		border-radius: 0.6rem;
		font-size: 0.8rem;
		padding: 0 1rem;
		border: none;
		margin-left: auto;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.content {
		background-color: #151d29;
		margin: 1rem 0.5rem;
		height: auto;
		padding: 0.5rem;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.title {
		font-size: 1.2rem;
		font-weight: bold;
		color: white;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
		width: 110px;
		height: 110px;
		background-color: #fff;
		border-radius: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.1);
		margin-bottom: 1rem;
	}

	.qrcode-canvas {
		width: 100px;
		height: 100px;
		border-radius: 0.5rem;
	}

	.btn-group {
		display: flex;
		justify-content: center;
		gap: 10px;
		width: 100%;
		margin-bottom: 1.5rem;
	}

	.save-btn {
		width: 110px;
		background-color: #1a73e8;
		color: white;
		border-radius: 15px;
		font-size: 15px;
		box-shadow: 0 0.2rem 0.6rem rgba(26, 115, 232, 0.3);
		border: none;
		padding: 8px 0;
		line-height: 1;
	}

	.header .save-btn {
		background-color: white;
		color: #1a73e8;
		font-weight: bold;
		margin-bottom: 0;
		width: auto;
		padding: 5px 15px;
	}
	
	.content_left {
		
	}
	.content_right {
		width: 100%;
	}

	.link-box {
	  background-color: #1e1e2f;
	  border-radius: 10px;
	  padding: 10px 14px;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  margin: 10px 16px;
	  min-height: 40px;
	  border: 1px solid #2c2c3c;
	}
	
	.link-text {
	  color: #ccc;
	  font-size: 14px;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  flex: 1;
	  line-height: 20px;
	}
	
	.btn_copy {
	  width: 18px;
	  height: 18px;
	  margin-left: 12px;
	}
</style>