<template>
	<div class="bottom-tab-swiper">
		<!-- 使用自定义滑动控制的swiper -->
		<swiper class="swiper-container" :current="currentIndex" @change="onSwiperChange" circular="false"
			duration="300" :disable-touch="true" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
			@touchend="handleTouchEnd">
			<swiper-item v-for="(page, index) in pages" :key="index">
				<scroll-view class="page-scroll-wrapper" scroll-y :scroll-with-animation="true"
					@touchstart="handleScrollStart" @touchmove="handleScrollMove">
					<HomePage v-if="page.name === 'HomePage'" ref="homePageRef" @touchmove.native.stop />
					<UserPage v-if="page.name === 'UserPage'" ref="userPageRef" @touchmove.native.stop />
					<ProfilePage v-if="page.name === 'ProfilePage'" ref="profilePageRef" @touchmove.native.stop />
				</scroll-view>
			</swiper-item>
		</swiper>

		<!-- 底部 TabBar -->
		<div class="tab-bar" ref="tabBar">
			<div class="tab-item" v-for="(page, index) in pages" :key="index"
				:class="{ active: currentIndex === index }" @click="goToPage(index)" ref="tabItems">
				{{ page.title }}
			</div>
			<div class="tab-underline" :style="underlineStyle"></div>
		</div>
	</div>
</template>

<script>
	import HomePage from '@/pages/index/index.vue'
	import UserPage from '@/pages/Bonuses/Bonuses.vue'
	import ProfilePage from '@/pages/Games/Games.vue'

	export default {
		name: 'home',
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
						title: '我的',
						name: 'ProfilePage'
					}
				],
				underlineStyle: {
					width: '0px',
					transform: 'translateX(0)'
				},
				touchStartX: 0,
				touchStartY: 0,
				isVerticalScroll: false
			}
		},
		watch: {
			currentIndex() {
				this.updateUnderline()
				this.notifyCurrentPage()
			}
		},
		mounted() {
			this.scrollTabBarToActive()
			this.updateUnderline()
			this.notifyCurrentPage()
		},
		methods: {
			// 禁止父级swiper的所有触摸事件
			handleTouchStart(e) {
				e.preventDefault()
				return false
			},
			handleTouchMove(e) {
				e.preventDefault()
				return false
			},
			handleTouchEnd(e) {
				e.preventDefault()
				return false
			},

			// 处理子页面滚动
			handleScrollStart(e) {
				this.touchStartX = e.touches[0].pageX
				this.touchStartY = e.touches[0].pageY
				this.isVerticalScroll = false
			},

			handleScrollMove(e) {
				if (this.isVerticalScroll) return

				const touchX = e.touches[0].pageX
				const touchY = e.touches[0].pageY
				const dx = Math.abs(touchX - this.touchStartX)
				const dy = Math.abs(touchY - this.touchStartY)

				// 判断滑动方向
				if (dy > dx && dy > 5) {
					this.isVerticalScroll = true // 垂直滚动
				} else if (dx > dy && dx > 5) {
					e.preventDefault() // 阻止水平滑动
					return false
				}
			},

			// 原有方法保持不变
			goToPage(index) {
				this.currentIndex = index
				this.scrollTabBarToActive()
				this.updateUnderline()
			},

			onSwiperChange(e) {
				this.currentIndex = e.detail.current
				setTimeout(() => {
					this.scrollTabBarToActive()
					this.updateUnderline()
					this.notifyCurrentPage()
				}, 350)
			},

			scrollTabBarToActive() {
				this.$nextTick(() => {
					const tabBar = this.$refs.tabBar
					const activeTab = tabBar?.querySelector('.tab-item.active')
					if (!tabBar || !activeTab) return

					const tabBarRect = tabBar.getBoundingClientRect()
					const activeRect = activeTab.getBoundingClientRect()

					if (activeRect.left < tabBarRect.left) {
						tabBar.scrollBy({
							left: activeRect.left - tabBarRect.left,
							behavior: 'smooth'
						})
					} else if (activeRect.right > tabBarRect.right) {
						tabBar.scrollBy({
							left: activeRect.right - tabBarRect.right,
							behavior: 'smooth'
						})
					}
				})
			},

			updateUnderline() {
				this.$nextTick(() => {
					const tabItems = this.$refs.tabItems
					const activeTab = Array.isArray(tabItems) ? tabItems[this.currentIndex] : tabItems
					if (!activeTab) return

					const {
						offsetLeft,
						offsetWidth
					} = activeTab
					this.underlineStyle = {
						width: offsetWidth + 'px',
						transform: `translateX(${offsetLeft}px)`
					}
				})
			},

			notifyCurrentPage() {
				this.$nextTick(() => {
					const comp = this.getCurrentPageComponent()
					if (comp && typeof comp.open === 'function') {
						comp.open()
					}
				})
			},

			getCurrentPageComponent() {
				const currentPageName = this.pages[this.currentIndex].name
				const refMap = {
					HomePage: 'homePageRef',
					UserPage: 'userPageRef',
					ProfilePage: 'profilePageRef'
				}
				const refName = refMap[currentPageName]
				return this.$refs[refName]?.[0] || this.$refs[refName]
			}
		}
	}
</script>

<style scoped>
	.bottom-tab-swiper {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
		background-color: black;
	}

	.swiper-container {
		flex: 1;
		height: 100%;
		touch-action: none;
		/* 完全禁用默认触摸行为 */
	}

	.page-scroll-wrapper {
		height: 100%;
		width: 100%;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		/* iOS弹性滚动 */
		overflow-x: hidden;
		box-sizing: border-box;
	}

	.tab-bar {
		bottom: 0;
		left: 0;
		right: 0;
		height: 50px;
		display: flex;
		background-color: #fff;
		border-top: 1px solid #eaeaea;
		box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.05);
		z-index: 999;
		position: relative;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.tab-bar::-webkit-scrollbar {
		display: none;
	}

	.tab-item {
		flex: 1;
		min-width: 80px;
		text-align: center;
		line-height: 50px;
		font-size: 14px;
		color: #666;
		font-weight: 500;
		position: relative;
		transition: color 0.3s;
		white-space: nowrap;
	}

	.tab-item.active {
		color: #409eff;
		font-weight: 600;
	}

	.tab-underline {
		position: absolute;
		bottom: 0;
		height: 2px;
		background-color: #409eff;
		transition: all 0.3s ease;
		will-change: transform, width;
	}
</style>