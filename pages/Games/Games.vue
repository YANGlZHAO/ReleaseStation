<template>
	<div class="home-page">
		<!-- <h2>首页内容</h2>
		<p>{{ message }}</p> -->
	</div>
</template>

<script>
	export default {
		name: 'HomePage',
		data() {
			return {
				message: '欢迎访问首页',
			}
		},
		methods: {
			open() {
				this.message = '首页已刷新时间: ' + new Date().toLocaleTimeString()
			},
		},
	}
</script>

<style scoped>
	.home-page {
		height: calc(100vh - 5.5rem);
		padding: 20px;
		background-color: aliceblue;
	}
</style>