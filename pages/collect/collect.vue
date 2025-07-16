<template>
	<view class="page" :style="{ paddingTop: $topSafeHeight + 'px' }">
		<view class="content">
			<popularGameVue :list="starredList" />
			<view v-if="starredList.length == 0" class="empty-tip">{{$t('collectionIsEmpty')}}</view>
		</view>
	</view>
</template>

<script>
	import popularGameVue from '@/component/popularGame.vue'

	export default {
		name: "ProfilePage",
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
		width: 100vw;
		height: calc(100vh - 2rem);
	}

	.content {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.empty-tip {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: aliceblue;
		text-align: center;
		width: 100%;
		font-size: 1rem;
	}
</style>