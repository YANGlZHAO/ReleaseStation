<template>
	<scroll-view class="game-wrapper" scroll-y :scroll-top="scrollTop" ref="scrollView" @scroll="onScroll">
		<div class="game-container" v-for="(companyGroup, cIndex) in localList" :key="cIndex">
			<div class="company-title">{{ companyGroup.conpany }}</div>
			<div class="game-grid">
				<div class="game-card" v-for="(game, index) in companyGroup.gameList" :key="index"
					@click="goToWebView(game.url)">
					<image class="game-image" :src="game.image" mode="aspectFill"></image>
					<div class="game-title">{{ game.name }}</div>
					<image class="star-icon" :src="game.isStarred ? '/static/star-on.png' : '/static/star-off.png'"
						mode="widthFix" @click.stop="toggleStar(cIndex, index)"></image>
				</div>
			</div>
		</div>
		<!-- <view class="footer" v-if="showBackToTop">
			<view class="disclaimer">
				<view class="link-list">
					<view v-for="(link, index) in links" :key="index" class="link-item" @click="openLink(link.url)">
						{{ link.text }}
					</view>
				</view>
			</view>
		</view> -->
		<!-- 添加返回顶部按钮（可选） -->
		<div class="back-to-top" v-if="showBackToTop" @click="scrollToTop">
			↑
		</div>
	</scroll-view>
</template>

<script>
	const STARRED_LIST_KEY = 'starredGameList'

	export default {
		name: 'GameCardGrid',
		props: {
			list: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				localList: [],
				scrollTop: 0,
				showBackToTop: false,
				links: [{
						text: 'Disclaimer',
						url: 'https://leitegame.com'
					},
					{
						text: 'Privacy',
						url: 'https://leitegame.com'
					},
					{
						text: 'Gambling Help',
						url: 'https://leitegame.com'
					},
					{
						text: 'Site Map',
						url: 'https://leitegame.com'
					},
					{
						text: 'Research',
						url: 'https://leitegame.com'
					}
				]
			}
		},
		watch: {
			list: {
				immediate: true,
				deep: true,
				handler(newVal) {
					if (!Array.isArray(newVal)) return
					this.localList = JSON.parse(JSON.stringify(newVal))
					this.loadStarStatus()
				}
			}
		},
		methods: {
			goToWebView(url) {
				uni.navigateTo({
					url: `/pages/webview/webview?url=${encodeURIComponent(url)}`
				})
			},
			toggleStar(companyIndex, gameIndex) {
				const group = this.localList[companyIndex]
				const game = group.gameList[gameIndex]
				game.isStarred = !game.isStarred

				let starredList = uni.getStorageSync(STARRED_LIST_KEY) || []

				let companyEntry = starredList.find(item => item.conpany === group.conpany)

				if (game.isStarred) {
					if (!companyEntry) {
						companyEntry = {
							conpany: group.conpany,
							gameList: []
						}
						starredList.push(companyEntry)
					}
					const exists = companyEntry.gameList.some(item => item.url === game.url)
					if (!exists) {
						companyEntry.gameList.push({
							name: game.name,
							image: game.image,
							url: game.url,
							isStarred: true
						})
					}
				} else {
					if (companyEntry) {
						companyEntry.gameList = companyEntry.gameList.filter(item => item.url !== game.url)
						if (companyEntry.gameList.length === 0) {
							starredList = starredList.filter(item => item.conpany !== group.conpany)
						}
					}
				}
				uni.setStorageSync(STARRED_LIST_KEY, starredList)
				console.log("starredList----", starredList)
			},
			loadStarStatus() {
				const starredList = uni.getStorageSync(STARRED_LIST_KEY) || []
				const starredMap = new Map()

				starredList.forEach(group => {
					if (group && Array.isArray(group.gameList)) {
						group.gameList.forEach(game => {
							if (game && game.url) {
								starredMap.set(game.url, true)
							}
						})
					}
				})

				if (!Array.isArray(this.localList)) return

				this.localList.forEach(group => {
					if (group && Array.isArray(group.gameList)) {
						group.gameList.forEach(game => {
							if (game && game.url) {
								game.isStarred = starredMap.has(game.url)
							}
						})
					}
				})
			},
			// 滚动到顶部
			scrollToTop() {
				this.scrollTop = 0;
				this.$nextTick(() => {
					this.scrollTop = 0.01; // 强制触发滚动（某些平台需微小变化）
				});
			},
			// 监听滚动显示按钮
			onScroll(e) {
				this.showBackToTop = e.detail.scrollTop > 300;
			}
		}
	}
</script>

<style scoped>
	.game-wrapper {
		background-color: #000;
		height: calc(100vh - 8rem);
	}

	.back-to-top {
		position: fixed;
		right: 20px;
		bottom: 20px;
		width: 40px;
		height: 40px;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		z-index: 100;
	}

	.game-container {
		background-color: #000;
	}

	.company-title {
		font-size: 16px;
		font-weight: bold;
		color: #ffffff;
		padding: 0 1rem;
		margin-bottom: 0.5rem;
	}

	.game-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
		gap: 1rem;
		padding: 1rem;
		background-color: #121212;
		box-sizing: border-box;
	}

	.game-card {
		position: relative;
		background-color: #1f1f1f;
		border-radius: 12px;
		overflow: hidden;
		text-align: center;
		padding: 10px 8px;
		transition: transform 0.2s;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 160px;
		box-sizing: border-box;
	}

	.game-card:active {
		transform: scale(0.98);
	}

	.game-image {
		width: 100%;
		height: 100px;
		border-radius: 8px;
	}

	.game-title {
		margin-top: 8px;
		color: #fff;
		font-size: 13px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
	}

	.star-icon {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 20px;
		height: 20px;
		z-index: 10;
	}
	.footer {
		width: 100%;
		background-color: transparent;
		padding: 0.5rem 0;
	}
	.link-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	.link-item {
		color: #fff;
		border-right: 1rpx solid #fff;
		font-family: 'AvenirMedium', Arial, sans-serif;
		font-size: 14rpx;
		padding: 0 18rpx;
		line-height: 28rpx;
		cursor: pointer;
		user-select: none;
		
		&:last-child {
			border-right: none;
		}
	}
</style>