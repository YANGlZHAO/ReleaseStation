<template>
	<scroll-view class="game-wrapper" scroll-y :scroll-top="scrollTop" ref="scrollView" @scroll="onScroll">
		<div class="game-container" v-for="(companyGroup, cIndex) in localList" :key="cIndex">
			<div class="companyBox">
				<div class="company-title">{{ companyGroup.conpany.name }}</div>
				<div v-if="companyGroup.conpany.imageList != []" class="svgIconList" v-for="(item, i) in companyGroup.conpany.imageList" :key="i">
				  <image class="svgIcon" :src = "item.img" @click="openExternalLink(item.url)">
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
	
	.companyBox {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 0.3rem;
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
		align-items: center;
	}
	
	.svgIcon {
		width: 1rem;
		height: 1rem;
		margin: 0 0.3rem;
	}

	.game-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 5px;
		padding: 10px;
		background-color: #121212;
		box-sizing: border-box;
	}

	.game-card {
		position: relative;
		background-color: #1f1f1f;
		border-radius: 0.4rem;
		overflow: hidden;
		text-align: center;
		transition: transform 0.2s;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 200px;
		box-sizing: border-box;
	}

	.game-card:active {
		transform: scale(0.98);
	}

	.game-image {
		width: 90%;
	}

	.game-title {
		color: #fff;
		font-size: 0.5rem;
	}

	.star-icon {
		position: absolute;
		top: 3px;
		right: 3px;
		width: 30px;
		height: 30px;
		z-index: 10;
	}
</style>