<template>
	<view class="my-carousel">
		<u-swiper :list="images" keyName="url" :autoplay="true" :circular="true" :indicator="true" indicatorMode="dot"
			:height="swiperHeight" radius="1rem" mode="widthFix" bgColor="transparent"></u-swiper>
	</view>
</template>

<script>
	export default {
		props: {
			images: Array
		},
		data() {
			return {
				swiperHeight: 0 // 动态高度
			};
		},
		mounted() {
			this.calcHeight();
			uni.onWindowResize(() => this.calcHeight()); // 响应式调整
		},
		methods: {
			calcHeight() {
				// 获取屏幕宽度（减去边距）
				const screenWidth = uni.getSystemInfoSync().windowWidth - 20; // 假设左右各 1rem（16px*2）
				// 假设图片原始宽高比是 3:1（根据你的图片比例调整）
				const aspectRatio = 1020 / 300; // 宽/高
				this.swiperHeight = screenWidth / aspectRatio + 'px';
			}
		}
	};
</script>

<style scoped>
	.my-carousel {
		width: calc(100% - 1rem);
		/* 留出边距 */
		margin: 0.5rem auto;
		overflow: hidden;
		/* 防止溢出 */
	}

	/* 强制图片按原始比例显示 */
	/deep/ .u-swiper__item__image {
		width: 100% !important;
		height: auto !important;
		object-fit: contain !important;
		/* 关键：完整显示图片 */
	}
</style>