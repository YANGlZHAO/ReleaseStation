<template>
	<div class="game-wrapper">
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
	</div>
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
				localList: []
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

				// 防止 starredList 内部结构异常
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
			}

		}
	}
</script>

<style scoped>
	.game-wrapper {
		background-color: #000;
		min-height: 100vh;
	}

	.game-container {
		margin: 1rem 0 2rem 0;
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
</style>