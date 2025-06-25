<template>
	<scroll-view class="game-wrapper" scroll-y :scroll-top="scrollTop" ref="scrollView" @scroll="onScroll">
		<div class="game-container" v-for="(companyGroup, cIndex) in localList" :key="cIndex">
			<div class="companyBox">
				<div class="company-title">{{ companyGroup.conpany.name }}</div>
				<div class="svgIconList" v-if="companyGroup.conpany.imageList.length">
					<image class="svgIcon" v-for="(item, i) in companyGroup.conpany.imageList" :key="i" :src="item.img"
						@click="openExternalLink(item.url)" />
				</div>
			</div>
			<div class="game-grid">
				<div class="game-card" v-for="(game, index) in companyGroup.gameList" :key="index"
					@click="goToWebView(game.url)">
					<image class="game-image" :src="game.image" mode="aspectFit"></image>
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
			scrollToTop() {
				this.scrollTop = 0;
				this.$nextTick(() => {
					this.scrollTop = 0.01;
				});
			},
			onScroll(e) {
				this.showBackToTop = e.detail.scrollTop > 300;
			},
			openExternalLink(url) {
				// #ifdef APP-PLUS
				if (typeof plus !== 'undefined' && plus.runtime) {
					plus.runtime.openURL(url);
				}
				// #endif

				// #ifdef H5
				window.open(url, '_blank');
				// #endif
			}



		}
	}
</script>

<style scoped>
	.game-wrapper {
		background-color: #000;
		/* height: calc(100vh - 4rem); */
	}

	.back-to-top {
		position: fixed;
		right: 1rem;
		bottom: 4rem;
		width: 2.5rem;
		height: 2.5rem;
		background-color: rgba(255, 255, 255, 0.9);
		color: #000;
		font-weight: bold;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
		z-index: 999;
		cursor: pointer;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}


	.companyBox {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
	}
	.game-container {
		background-color: #000;
		margin-bottom: 0.5rem;
	}

	.company-title {
		line-height: 1;
		font-size: 1rem;
		font-weight: bold;
		color: #ffffff;
		padding: 0 1rem;
	}

	.svgIconList {
		display: flex;
		gap: 0.4rem;
	}
	
	.svgIcon {
		width: 1.5rem;
		height: 1.5rem;
		cursor: pointer;
	}

	.game-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 10px;
		padding: 0 10px 10px;
		box-sizing: border-box;
	}


	.game-card {
		background-color: #1f1f1f;
		border-radius: 0.6rem;
		overflow: hidden;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 150px;
		padding: 10px;
		position: relative;
		transition: transform 0.2s;
	}
	
	.game-card:active {
		transform: scale(0.98);
	}
	
	.game-image {
		width: 100%;
		height: 90%;
		object-fit: contain;
		margin-bottom: 5px;
	}


	.game-title {
		color: #fff;
		font-size: 0.6rem;
		margin: 5px 0;
	}


	.star-icon {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 20px;
		height: 20px;
		z-index: 10;
	}

</style>