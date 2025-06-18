<template>
	<view class="my-carousel">
		<u-swiper :list="images" keyName="url" :autoplay="true" :circular="true" :indicator="true" indicatorMode="dot"
			radius=".5rem" height="5.5rem"></u-swiper>
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
		width: calc(100vw - 2rem);
		margin: 1rem;
	}
</style>