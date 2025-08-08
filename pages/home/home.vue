<template>
	<view class="page">
		<NavBarVue></NavBarVue>
		<MyCarousel :images="imageList" />
		<popularGameVue :list="data" :imageList="applicationJumpLinkList" />
	</view>
</template>



<script>
	import popularGameVue from '@/component/popularGame.vue'
	import FloatButtonVue from '@/component/FloatButton.vue'
	import NavBarVue from '@/component/NavBar.vue'
	import MyCarousel from "@/component/MyCarousel.vue";

	import {
		getFcSwiperList,
		getFcPGList,
		applicationJumpLink
	} from '@/api/jsonbin.js';
	export default {
		name: "HomePage",
		components: {
			popularGameVue,
			FloatButtonVue,
			NavBarVue,
			MyCarousel,

		},
		data() {
			return {
				imageList: [],
				data: [],
				applicationJumpLinkList: []
			}
		},

		mounted() {
			if (typeof plus !== 'undefined') {
				plus.navigator.setFullscreen(true)
			} else {
				document.addEventListener('plusready', () => {
					plus.navigator.setFullscreen(true)
				})
			}

		},
		methods: {
			async open() {
				try {
					const swiperRes = await getFcSwiperList();
					this.imageList = swiperRes.data;

					const jumpLinkRes = await applicationJumpLink();
					this.applicationJumpLinkList = jumpLinkRes.data;
					
					const fcPGRes = await getFcPGList();
					this.data = fcPGRes.data;
				} catch (err) {
					console.error("err：", err);
				}
			}

		}
	}
</script>

<style scoped>
	.page {
		display: flex;
		flex-direction: column;
		background-color: #000;
		margin-top: 4rem;
		padding-bottom: 4rem;
	}
</style>