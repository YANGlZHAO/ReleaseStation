<template>
	<view style="width: 100vw;height: calc(100vh - 10rem);">
		<view style="display: flex;justify-content: center;width: 100%;height: 100%;background-color: gray;align-items: center;">
			<text style="color: white;font-weight: bold;font-size: 0.6rem;">Fique atento</text>
		</view>
	</view>
</template>

<script>
	import NavBar from "@/component/NavBar.vue";
	export default {
		components: {
			NavBar
		},
		data() {
			return {

			}
		},
		mounted() {
			
		},
		methods: {
			open() {
				console.log('我的页面-------------')
			}
		}
	}
</script>

<style>

</style>