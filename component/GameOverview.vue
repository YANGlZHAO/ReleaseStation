<template>
	<div class="casino-overview">
		<!-- 左侧 赌场信息区域 -->
		<div class="overview-section">
			<h2>{{ title }}</h2>
			<table>
				<tr v-if="item.key != 'screenshots'" v-for="(item, index) in overviewData.extraFields" :key="index">
					<td class="field">{{ item.key }}</td>
					<td class="value" v-html="item.value"></td>
				</tr>
			</table>
		</div>

		<!-- 右侧 轮播区域 -->
		<div class="screenshots-section">
			<h2>{{ screenshotsTitle }}</h2>
			<div class="carousel">
				<button class="nav-btn prev-btn" @click="prevSlide">‹</button>
				<img :src="screenshots[currentIndex]" alt="Casino Screenshot" class="screenshot" />
				<button class="nav-btn next-btn" @click="nextSlide">›</button>
			</div>
			<div class="action-buttons">
				<button class="review-btn" @click="clickButton(overviewData.review)">REVIEW ▶</button>
				<button class="play-btn" @click="clickButton(overviewData.url)">PLAY ▶</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: "Casino Overview"
			},
			overviewData: {
				type: Object,
				required: true
			},
			screenshotsTitle: {
				type: String,
				default: "Screenshots and video"
			},
			screenshots: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				currentIndex: 0
			};
		},
		methods: {
			prevSlide() {
				this.currentIndex = (this.currentIndex - 1 + this.screenshots.length) % this.screenshots.length;
			},
			nextSlide() {
				this.currentIndex = (this.currentIndex + 1) % this.screenshots.length;
			},
			clickButton(url) {
				window.open(url, '_blank');
			},
		}
	};
</script>

<style scoped>
	/* 主容器 */
	.casino-overview {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		/* padding: 0.4rem; */
		font-family: Arial, sans-serif;
		background: #fff;
		border-radius: 0.4rem;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		margin: auto;
		font-size: 0.4rem;
		margin: 0.2rem 0;
	}

	/* 左侧：赌场信息 */
	.overview-section {
		width: 60%;
	}

	h2 {
		font-size: 0.4rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
		white-space: nowrap;
	}

	/* 信息表格 */
	table {
		width: 100%;
		border-collapse: collapse;
	}

	td {
		border-bottom: 0.05rem solid #ddd;
	}

	td.field {
		font-weight: bold;
		color: #333;
		width: 40%;
	}

	td.value {
		color: #555;
		line-height: 2;
	}

	/* 右侧：轮播区域 */
	.screenshots-section {
		width: 35%;
		text-align: center;
	}

	.carousel {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: 0.05rem 0;
	}

	.screenshot {
		width: 100%;
		/* max-width: 400px; */
		border-radius: 0.4rem;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
		transition: transform 0.3s ease-in-out;
	}

	.screenshot:hover {
		transform: scale(1.05);
	}

	/* 轮播按钮 */
	.nav-btn {
		position: absolute;
		background: transparent;
		color: #eda42e;
		border: transparent;
		font-size: 2rem !important;
		font-weight: bold;
		cursor: pointer;
		/* border-radius: 50%; */
		transition: background 0.3s ease-in-out;
		z-index: 10;
	}
	
	/deep/ uni-button:after {
		border: none;
	}

	.nav-btn:hover {
		/* background: orange; */
	}

	.prev-btn {
		left: -1rem;
	}

	.next-btn {
		right: -1rem;
	}

	/* 底部按钮 */
	.action-buttons {
		display: flex;
		margin-top: 0.2rem;
		justify-content: center;
		white-space: nowrap;
	}
	
	/deep/ uni-button {
		padding: 0;
		font-size: 0.35rem;
	}

	.review-btn,
	.play-btn {
		width: 48%;
		font-size: 0.3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		cursor: pointer;
		border-radius: 0.2rem;
		transition: all 0.3s ease-in-out;
	}

	.review-btn {
		border: 0.08rem solid red;
		background: none;
		color: red;
	}

	.review-btn:hover {
		background: red;
		color: white;
	}

	.play-btn {
		background: blue;
		color: white;
		border: none;
	}

	.play-btn:hover {
		background: darkblue;
	}

	/* 响应式布局 */
	@media (max-width: 960px) {
		.casino-overview {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.overview-section,
		.screenshots-section {
			width: 100%;
		}

		.carousel {
			width: 100%;
		}

		.prev-btn,
		.next-btn {
			font-size: 2rem;
			padding: 1rem;
		}
		
		.prev-btn {
			left: -1.8rem;
		}
		
		.next-btn {
			right: -1.8rem;
		}
	}
</style>