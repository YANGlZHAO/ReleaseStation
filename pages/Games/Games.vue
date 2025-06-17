<template>
	<div id="app" @scroll.passive="handleScroll" ref="scrollContainer"
		style="height: 300px; overflow-y: auto; border: 1px solid #ccc;">
		<div style="height: 1000px; padding: 20px;">
			<p>滚动查看“回到顶部”按钮</p>
			<p>内容很长，向下滚动...</p>
			<!-- 模拟长内容 -->
		</div>

		<button v-show="showBackTop" @click="scrollToTop" class="back-top-btn" title="回到顶部">⬆️</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showBackTop: false,
			};
		},
		methods: {
			handleScroll() {
				const scrollTop = this.$refs.scrollContainer.scrollTop;
				this.showBackTop = scrollTop > 100;
			},
			scrollToTop() {
				this.$refs.scrollContainer.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			},
		},
	};
</script>

<style scoped>
	.back-top-btn {
		position: fixed;
		right: 20px;
		bottom: 20px;
		width: 44px;
		height: 44px;
		background-color: #fdbe00;
		color: #000;
		font-size: 24px;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		user-select: none;
		opacity: 0.8;
		transition: opacity 0.3s;
	}

	.back-top-btn:hover {
		opacity: 1;
	}
</style>