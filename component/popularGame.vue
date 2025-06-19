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
				showBackToTop: false
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
		/* height: calc(100vh - 8rem); */
	}

	.back-to-top {
		position: fixed;
		right: 2rem;
		bottom: 2rem;
		width: 2rem;
		height: 2rem;
		background-color: beige;
		color: #000;
		font-weight: bold;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		z-index: 100;
		
	}

	.game-container {
		background-color: #000;
	}

	.company-title {
		font-size: 1rem;
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
		border-radius: 0.6rem;
		overflow: hidden;
		text-align: center;
		padding: 0.5rem;
		transition: transform 0.2s;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 10rem;
		box-sizing: border-box;
	}

	.game-card:active {
		transform: scale(0.98);
	}

	.game-image {
		width: calc(100% - 0.2rem);
		border-radius: 0.4rem;
	}

	.game-title {
		height: 2rem;
		margin-top: 0.4rem;
		color: #fff;
		font-size: 0.8rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.star-icon {
		position: absolute;
		top: 0.3rem;
		right: 0.3rem;
		width: 1.5rem;
		height: 1.5rem;
		z-index: 10;
	}
</style>