<template>
	<div class="casino-card">

		<!-- 未收藏按钮 -->
		<view class="btn_collect">
			<svg v-if="casino.collected != 1" xmlns="http://www.w3.org/2000/svg" width="0.6rem" height="0.6rem"
				viewBox="0 0 24 24">
				<path fill="currentColor"
					d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125M11.05 6.75q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837t2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575t2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25t-.525-.125t-.425-.375m.95 4.725" />
			</svg>
			<!-- 已收藏按钮 -->
			<svg v-if="casino.collected == 1" xmlns="http://www.w3.org/2000/svg" width="0.6rem" height="0.6rem"
				viewBox="0 0 24 24">
				<path fill="currentColor"
					d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125" />
			</svg>
		</view>

		<!-- 左侧：赌场信息 -->
		<div class="casino-info">
			<img :src="casino.avatar" :alt="casino.name" class="casino-logo" />
			<span class="casino-name">{{ casino.name }}</span>
		</div>

		<view class="line"></view>

		<!-- 中间：促销、评分、评论 -->
		<div class="promo" @mouseenter="showFloating" @mouseleave="hideFloating">
			<view style="position: relative;">
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" width="0.5rem" height="0.5rem" viewBox="0 0 256 256">
						<path fill="#fdc211"
							d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16M128 64c62.64 0 96 23.23 96 40s-33.36 40-96 40s-96-23.23-96-40s33.36-40 96-40m-8 95.86v32c-19-.62-35-3.42-48-7.49v-31.32a203.4 203.4 0 0 0 48 6.81m16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26" />
					</svg>
				</div>
				<div class="highlight">{{ casino.signUpBonus }}</div>
			</view>
			<transition name="fade">
				<div v-if="isHovered" class="floating-box">
					<div class="content">
						<h2 style="font-size: 0.4rem;color: #ff7f00">Casino Spins - Exclusive</h2>
						<p style="font-size: 0.25rem;color: #878284;">40xb - lowest WR</p>
						<button class="claim-btn">CLAIM</button>
						<text style="font-size: 0.3rem;color: #878284;">Exclusive Bonus - Read Details</text>
						<view style="display: flex;overflow: auto;height: 4rem;font-size: 0.25rem;color: #989696;">
							New players only. T&Cs apply. 18+. This offer is not available for players residing
							in Ontario. New Customer Offer. T&C’s Apply. 19+. Play Responsibly. NO US! 60 Free
							Spins on Big Bass Splash. How to claim the bonus: Players need to sign up through
							our LINK and claim the bonus code in the bonus field during registration. Max bet
							for the bonus: $5. Max cashout: $50. Cashable bonus: Yes. Allowed games: Slots only.
							Game contribution to the wagering requirements: Slots 100%. Min deposit needed in
							order to cashout winnings: $20 (verification deposit). Need to register a credit
							card to claim no deposit?: No. Restricted Countries for the bonus: Brazil.</view>
					</div>
				</div>
			</transition>
		</div>

		<view class="line"></view>

		<!-- 金币图标 -->
		<div class="coinImg">
			<svg v-if="casino.showCoin == 1" xmlns="http://www.w3.org/2000/svg" width="0.8rem" height="0.8rem"
				viewBox="0 0 256 256">
				<path fill="#fdc211"
					d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16M128 64c62.64 0 96 23.23 96 40s-33.36 40-96 40s-96-23.23-96-40s33.36-40 96-40m-8 95.86v32c-19-.62-35-3.42-48-7.49v-31.32a203.4 203.4 0 0 0 48 6.81m16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26" />
			</svg>
		</div>

		<view class="line lineShow"></view>

		<!-- 评分 -->
		<div class="rating">
			<view>
				<span class="score">{{ casino.rate }}</span>
				<span class="total-votes">/ {{ casino.vote }} votes </span>
			</view>
			<SimpleProgressBar :progress="casino.rate" />
		</div>

		<view class="line"></view>

		<!-- 评论数 -->
		<view class="topBox_right">
			<svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
				<path fill="currentColor" fill-rule="evenodd"
					d="M4.592 15.304C2.344 9.787 6.403 3.75 12.36 3.75h.321a8.07 8.07 0 0 1 8.068 8.068a8.98 8.98 0 0 1-8.982 8.982h-7.82a.75.75 0 0 1-.47-1.335l1.971-1.583a.25.25 0 0 0 .075-.29zM12.36 5.25c-4.893 0-8.226 4.957-6.38 9.488l.932 2.289a1.75 1.75 0 0 1-.525 2.024l-.309.249h5.689a7.48 7.48 0 0 0 7.482-7.482a6.57 6.57 0 0 0-6.568-6.568z"
					clip-rule="evenodd" />
			</svg>
			<div class="comments" @click="$emit('comment')"> {{ casino.comments }}
			</div>
		</view>

		<view class="line lineShow"></view>

		<!-- 游戏公司列表 -->
		<div class="gamingImgs">
			<image v-for="(item, index) in casino.softwares" :key="index" :src="item"
				style="width: 1.2rem;height: auto;"></image>
		</div>

		<view class="line"></view>


		<view class="play_more_btn">
			<!-- Play按钮 -->
			<button class="play-button" @click="openExternalLink(casino.url)">
				PLAY
			</button>

			<!-- More按钮 -->
			<button class="more-button" @click="clickMoreButton()">
				More
			</button>

		</view>
	</div>
</template>

<script>
	import SimpleProgressBar from '@/component/SimpleProgressBar.vue';
	export default {
		components: {
			SimpleProgressBar,
		},
		props: {
			casino: {
				type: Object,
				required: true
			}
		},
		computed: {
			ratingPercentage() {
				return (casino.rate / casino.vote) * 100;
			},
		},
		data() {
			return {
				isHovered: false,
			};
		},
		methods: {
			clickMoreButton() {
				uni.$emit("clickMoreButton", this.casino)
			},

			openExternalLink(url) {
				window.open(url, '_blank');
			},

			handleMouseEnter() {
				const rect = event.target.getBoundingClientRect();
				this.hoverTop = rect.top + window.scrollY - rect.height - 180; // 让弹窗浮在 reward 上方，并留点间距
				this.hoverLeft = rect.left + window.scrollX + 60; // 让弹窗左对齐 reward
				this.isHovered = true;
			},

			handleMouseLeave() {
				this.isHovered = false;
			},

			showFloating() {
				console.log("------------------")
				this.isHovered = true;
			},

			hideFloating() {
				this.isHovered = false;
			},
		},
	};
</script>

<style scoped>
	.line {
		height: 100%;
		width: 0.05rem;
		background-color: #e1e1e1;
		margin: 0 0.4rem;
	}

	/* 主容器 */
	.casino-card {
		width: 100%;
		height: 1.8rem;
		display: flex;
		align-items: center;
		justify-content: start;
		background: #fff;
		border-radius: 0.4rem;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
		font-size: 0.3rem;
		max-width: 100%;
		box-sizing: border-box;
		margin: 0.2rem 0;
		padding: 0 0.5rem;
	}

	/* 左侧赌场信息 */
	.casino-info {
		display: flex;
		/* flex-direction: column; */
		text-align: center;
		align-items: center;
		margin: 0 0.1rem;
	}

	.casino-logo {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
	}

	.casino-name {
		width: 2rem;
		font-size: 0.35rem;
		font-weight: bold;
		margin-left: 0.2rem;
		color: gray;
	}

	/* 中间详情 */
	.casino-details {
		display: flex;
		align-items: center;
	}

	.promo,
	.rating,
	.reviews {
		display: flex;
		align-items: center;
	}

	.promo {
		position: relative;
		font-size: 0.3rem;
		width: 2rem;
		height: 1.6rem;
		text-align: center;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	
	.claim-btn {
		width: 1.8rem;
		height: 0.6rem;
		background: #0080ff;
		color: white;
		font-size: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border: solid 0.08rem #0080ff;
		border-radius: 0.05rem;
		cursor: pointer;
	}
	
	.claim-btn:hover {
		background: #fff;
		color: #0080ff;
	}

	.coinImg {
		min-width: 0.8rem;
	}

	.rating {
		width: 3rem;
		flex-direction: column;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	/* 悬浮框样式 */
	.floating-box {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -100%);
		background: white;
		border-radius: 0.2rem;
		padding: 0.2rem;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
		width: 6rem;
		height: auto;
		max-height: 8rem;
		z-index: 10;
		border: 1px solid #ddd;
	}

	.floating-box::after {
		content: '';
		position: absolute;
		bottom: -10px;
		/* 箭头位于悬浮视图底部 */
		left: 50%;
		/* 水平居中 */
		transform: translateX(-50%);
		/* 水平居中 */
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		/* 左边透明 */
		border-right: 10px solid transparent;
		/* 右边透明 */
		border-top: 10px solid white;
		/* 上边为背景色，形成箭头 */
		z-index: 1001;
	}

	/* 动画 */
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}


	.score {
		color: #5bac5c;
		font-size: 0.4rem;
		font-weight: bold;
	}

	.total-votes {
		color: #bec0c3;
		margin-left: 0.1rem;
		font-size: 0.35rem;
	}

	.topBox_right {
		display: flex;
		flex-direction: row;
		position: relative;
		align-items: center;
		justify-content: center;
	}

	.comments {
		cursor: pointer;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 52%;
		transform: translate(-50%, -50%);
		/* 精确居中 */
		margin: 0;
		font-size: 0.3rem;
		font-weight: bold;
		color: black;
	}

	.gamingImgs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		/* gap: 0.05rem;
		max-width: 100px; */
		height: 1.8rem;
		width: 2.4rem;
		overflow: hidden;
	}

	.gamingImgs>div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.highlight {
		width: 2rem;
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow-x: auto;
		/* 允许水平滚动 */
		white-space: normal;
		/* 允许文本换行 */
		overflow-wrap: break-word;
		/* 允许长单词换行 */
		word-break: break-all;
		/* 强制换行 */
		scrollbar-width: none;
		/* 隐藏滚动条（Firefox） */
		-ms-overflow-style: none;
		/* 隐藏滚动条（IE 和 Edge） */
		color: orange;
		font-weight: bold;
	}

	/* 隐藏 WebKit 浏览器（Chrome、Safari）的滚动条 */
	.highlight::-webkit-scrollbar {
		display: none;
	}


	.play_more_btn {
		width: 100%;
		flex: 1;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.play-button {
		background: #0080ff;
		color: white;
		padding: 0.1rem;
		margin: 0.1rem 0;
		border-radius: 0.2rem;
		cursor: pointer;
		font-weight: bold;
		border: solid 0.08rem #0080ff;
		width: 48%;
		height: 1.2rem;
		font-size: 0.4rem;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	.play-button:hover {
		background: #fff;
		color: #0080ff;
	}

	.more-button {
		border: solid 0.08rem #e65431;
		background: #fff;
		color: indianred;
		padding: 0.1rem;
		margin: 0.1rem 0;
		border-radius: 0.2rem;
		cursor: pointer;
		font-weight: bold;
		width: 48%;
		height: 1.2rem;
		font-size: 0.4rem;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	.more-button:hover {
		background: #e65431;
		color: #fff;
	}

	/deep/ uni-button:after {
		display: none;
	}



	/* 响应式布局 */
	@media (max-width: 960px) {

		/* .btn_collect {
			display: none;
		}

		.coinImg {
			display: none;
		}

		.topBox_right {
			display: none;
		}

		.lineShow {
			display: none;
		} */

		/* .casino-logo {
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
		} */

		/* .play_more_btn {
			display: flex;
			flex-direction: column;
			width: 1.5rem;
		} */

		/* .play-button {
			width: 1.2rem;
			height: 0.7rem;
			font-size: 0.25rem;
			display: flex;
			text-align: center;
			align-items: center;
			justify-content: center;
		}

		.more-button {
			width: 1.2rem;
			height: 0.7rem;
			font-size: 0.25rem;
			display: flex;
			text-align: center;
			align-items: center;
			justify-content: center;
		} */
	}
</style>