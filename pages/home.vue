<template>
	<view class="bottom-tab-swiper">
		<!-- 内容区域 -->
		<swiper class="swiper-container" :current="currentIndex" @change="onSwiperChange" :circular="false"
			:disable-touch="true" :previous-margin="previousMargin" :next-margin="nextMargin">
			<swiper-item v-for="(page, index) in pages" :key="index">
				<scroll-view class="page-scroll-wrapper" scroll-y>
					<HomePage v-if="page.name === 'HomePage'" ref="homePageRef" />
					<UserPage v-if="page.name === 'UserPage'" ref="userPageRef" />
					<ProfilePage v-if="page.name === 'ProfilePage'" ref="profilePageRef" />
				</scroll-view>
			</swiper-item>
		</swiper>

		<!-- 底部导航栏 -->
		<view class="tab-bar" ref="tabBar">
			<view class="tab-item" v-for="(page, index) in pages" :key="index"
				:class="{ active: currentIndex === index }" @click="goToPage(index)" ref="tabItems">
				{{ page.title }}
			</view>
			<view class="tab-underline" :style="underlineStyle"></view>
		</view>
	</view>
</template>

<script>
	import HomePage from '@/pages/index/index.vue'
	import UserPage from '@/pages/Bonuses/Bonuses.vue'
	import ProfilePage from '@/pages/Games/Games.vue'

	export default {
		name: 'BottomTabSwiper',
		components: {
			HomePage,
			UserPage,
			ProfilePage
		},
		data() {
			return {
				currentIndex: 0,
				pages: [{
						title: '首页',
						name: 'HomePage'
					},
					{
						title: '收藏',
						name: 'UserPage'
					},
					{
						title: '分享链接',
						name: 'ProfilePage'
					}
				],
				underlineStyle: {
					width: '0px',
					transform: 'translateX(0)'
				},
				previousMargin: '0px',
				nextMargin: '0px'
			}
		},
		watch: {
			currentIndex(newVal, oldVal) {
				// 当从最后一页切换到第一页时，添加特殊处理
				if (oldVal === this.pages.length - 1 && newVal === 0) {
					this.previousMargin = '100%';
					this.nextMargin = '0px';
					setTimeout(() => {
						this.previousMargin = '0px';
					}, 50);
				} else {
					this.previousMargin = '0px';
					this.nextMargin = '0px';
				}

				this.updateUnderline()
				// 延迟调用 open，确保 swiper 切换完成
				setTimeout(() => {
					this.notifyCurrentPage()
				}, 100)
			}
		},
		mounted() {
			this.updateUnderline()
			this.notifyCurrentPage()
		},
		methods: {
			goToPage(index) {
				// 当从最后一页切换到第一页时，添加特殊处理
				if (this.currentIndex === this.pages.length - 1 && index === 0) {
					this.previousMargin = '100%';
					this.nextMargin = '0px';
					setTimeout(() => {
						this.currentIndex = index;
						this.previousMargin = '0px';
					}, 50);
				} else {
					this.currentIndex = index;
				}
			},
			onSwiperChange(e) {
				this.currentIndex = e.detail.current
			},
			updateUnderline() {
				this.$nextTick(() => {
					const tabItems = this.$refs.tabItems
					const activeTab = Array.isArray(tabItems) ? tabItems[this.currentIndex] : tabItems
					if (!activeTab) return

					// #ifdef H5
					const {
						offsetLeft,
						offsetWidth
					} = activeTab
					this.underlineStyle = {
						width: offsetWidth + 'px',
						transform: `translateX(${offsetLeft}px)`
					}
					// #endif

					// #ifndef H5
					const widthPercent = (100 / this.pages.length).toFixed(2)
					this.underlineStyle = {
						width: `${widthPercent}%`,
						transform: `translateX(${this.currentIndex * 100}%)`
					}
					// #endif
				})
			},
			notifyCurrentPage() {
				const comp = this.getCurrentPageComponent()
				const target = Array.isArray(comp) ? comp[0] : comp
				if (target && typeof target.open === 'function') {
					target.open()
				}
			},
			getCurrentPageComponent() {
				const currentPageName = this.pages[this.currentIndex].name
				const refMap = {
					HomePage: 'homePageRef',
					UserPage: 'userPageRef',
					ProfilePage: 'profilePageRef'
				}
				return this.$refs[refMap[currentPageName]]
			}
		}
	}
</script>

<style scoped>
	.bottom-tab-swiper {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #000;
	}

	.swiper-container {
		flex: 1;
		height: 100%;
	}

	.page-scroll-wrapper {
		height: 100%;
		width: 100%;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		box-sizing: border-box;
	}

	.tab-bar {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 3rem;
		background: rgba(255, 255, 255, 0.6);
		/* 半透明白色背景 */
		backdrop-filter: blur(12px);
		/* 更自然的磨砂强度 */
		-webkit-backdrop-filter: blur(12px);
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		/* 柔和边框 */
		box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.08);
		/* 顶部轻微阴影 */
		color: #000;
		/* 白色背景下用深色文字更清晰 */
		z-index: 9999;
	}



	.tab-item {
		flex: 1;
		text-align: center;
		line-height: 3rem;
		font-size: 0.8rem;
		color: #666;
		position: relative;
	}

	.tab-item.active {
		color: #409eff;
		font-weight: bold;
	}

	.tab-underline {
		position: absolute;
		bottom: 0;
		height: 0.1rem;
		background-color: #409eff;
		transition: all 0.3s ease;
		will-change: transform, width;
	}
</style>