<template>
	<div class="bottom-tab-swiper">
		<!-- 页面部分 -->
		<swiper class="swiper-container" :current="currentIndex" @change="onSwiperChange" circular="false"
			duration="300">
			<swiper-item v-for="(page, index) in pages" :key="index">
				<view class="page-scroll-wrapper">
					<UserPage v-show="page.name === 'UserPage'" ref="userPageRef" />
					<HomePage v-show="page.name === 'HomePage'" ref="homePageRef" />
					<ProfilePage v-show="page.name === 'ProfilePage'" ref="profilePageRef" />
				</view>
			</swiper-item>
		</swiper>

		<!-- 底部 TabBar -->
		<div class="tab-bar" ref="tabBar">
			<div class="tab-item" v-for="(page, index) in pages" :key="index"
				:class="{ active: currentIndex === index }" @click="goToPage(index)" ref="tabItems">
				{{ page.title }}
			</div>

			<!-- 滑动横线条 -->
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
				}
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
			goToPage(index) {
				this.currentIndex = index
				this.scrollTabBarToActive()
				this.updateUnderline()
				// notifyCurrentPage 通过 watcher 触发
			},
			onSwiperChange(e) {
				this.currentIndex = e.detail.current
				this.scrollTabBarToActive()
				this.updateUnderline()
				// notifyCurrentPage 通过 watcher 触发
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
				const name = this.pages[this.currentIndex].name
				const refName = name.charAt(0).toLowerCase() + name.slice(1) + 'Ref'
				const ref = this.$refs[refName]
				if (Array.isArray(ref)) {
					return ref[this.currentIndex]
				}
				return ref
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
	}

	.swiper-container {
		flex: 1;
		height: 100%;
	}

	.page-scroll-wrapper {
		height: 100%;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	swiper,
	swiper-item {
		height: 100%;
	}

	.tab-bar {
		position: fixed;
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
	}

	.tab-item {
		flex: 1;
		text-align: center;
		line-height: 50px;
		font-size: 14px;
		color: #666;
		font-weight: 500;
		position: relative;
		transition: color 0.3s;
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
		transition: transform 0.3s ease, width 0.3s ease;
	}
</style>