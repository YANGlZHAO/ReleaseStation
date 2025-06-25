<template>
	<view class="page">
		<view class="content">
			<popularGameVue :list="starredList" />
		</view>
	</view>
</template>

<script>
	import popularGameVue from '@/component/popularGame.vue'

	export default {
		name:"ProfilePage",
		components: {
			popularGameVue
		},
		data() {
			return {
				starredList: []
			}
		},
		mounted() {
			
		},
		methods: {
			open() {
				this.starredList = uni.getStorageSync('starredGameList') || []
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		background-color: #000;
	}

	.content {
		background-color: #000;
		flex: 1;
	}
</style>