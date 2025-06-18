<template>
	<view class="my-carousel">
		<u-swiper :list="images" keyName="url" :autoplay="true" :circular="true" :indicator="true" indicatorMode="dot"></u-swiper>
	</view>
</template>

<script>
	export default {
		name: "MyCarousel",
		props: {
			images: {
				type: Array,
				required: true,
			},
		},
	}
</script>

<style scoped>
	.my-carousel {
		margin: 1rem;
	}
</style>