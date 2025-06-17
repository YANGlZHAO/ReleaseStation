<template>
	<view class="page">
		<!-- <NavBar /> -->
		<!-- <headerVue /> -->
		<view class="content">
			<popularGameVue :list="starredList"/>
		</view>
		<footer>
			<div class="disclaimer">
				<p>
					<a href="https://lcb.org/disclaimer">Disclaimer</a>
					<a href="https://lcb.org/privacy_policy">Privacy</a>
					<a href="https://lcb.org/gamblinghelp">Gambling Help</a>
					<a href="https://lcb.org/sitemap">Site Map</a>
					<a href="https://lcb.org/research">Research</a>
				</p>
			</div>
		</footer>
	</view>
</template>


<script>
	import FloatButtonVue from "../../component/FloatButton.vue";
	import NavBar from "@/component/NavBar.vue";
	import popularGameVue from "../../component/popularGame.vue";
	import headerVue from "@/component/header.vue"
	export default {
		components: {
			FloatButtonVue,
			NavBar,
			popularGameVue,
			headerVue
		},
		data() {
			return {
				starredList: []
			}
		},
		onLoad() {
			if (typeof plus !== 'undefined') {
				plus.navigator.setFullscreen(true);
			} else {
				document.addEventListener('plusready', () => {
					plus.navigator.setFullscreen(true);
				});
			}
			this.starredList = uni.getStorageSync('starredGameList') || []
		}
	}
</script>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #000;
	}

	.content {
		flex: 1;
	}

	footer {
		width: 100%;
		background-color: #fdbe00;
		padding: 1rem 0;

		.disclaimer {
			p {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;

				a {
					color: #fff;
					border-right: 1px solid #fff;
					font-family: "AvenirMedium", "Arial", sans-serif;
					font-size: 0.4rem;
					padding: 0 18px;
					text-decoration: none;

					&:last-child {
						border-right: none;
					}
				}
			}
		}
	}
</style>