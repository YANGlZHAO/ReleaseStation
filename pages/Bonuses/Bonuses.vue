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
		name: 'UserPage', // ✅ 必须加 name 才能让 ref 访问组件方法
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
		height: 100%;
		background-color: #000;
	}

	.content {
		flex: 1;
	}
</style>