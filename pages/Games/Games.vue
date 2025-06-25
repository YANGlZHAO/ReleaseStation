<template>
	<view class="page">
		<view class="content">
			<view v-for="(item, i) in downloadUrlList" :key="i">
				<text class="link-text" @click="openLink(item.url)">
					{{item.title}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ProfilePage",
		components: {

		},
		data() {
			return {
				downloadUrlList: [{
						title: "下载链接 https://fcpg.app",
						url: "https://fcpg.app"
					},
					{
						title: "备用链接1 fcpg.win",
						url: "fcpg.win"
					},
					{
						title: "备用链接2 fcpg.net",
						url: "fcpg.net"
					},
				],
			}
		},
		mounted() {

		},
		methods: {
			open() {

			},
			
			openLink(url) {
				// #ifdef APP-PLUS
				if (typeof plus !== 'undefined' && plus.runtime) {
					plus.runtime.openURL(url);
				}
				// #endif
			
				// #ifdef H5
				window.open(url, '_blank');
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		width: 100vw;
		height: calc(100vh - 2.5rem);
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-color: #fff;
	}

	.content {
		background-color: #fff;
		flex: 1;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.link-text {
		color: #007AFF;
		font-size: 1rem;
		text-decoration: underline;
	}
</style>