<!-- SimpleProgressBar.vue -->
<template>
	<div class="progress-bar-container">
		<div class="progress-bar" :style="{ width: calculatedWidth + '%' }"></div>
	</div>
</template>

<script>
	export default {
		props: {
			progress: {
				type: Number,
				required: true,
				validator: (value) => value >= 0 && value <= 5, // 确保进度值在 0 到 5 之间
			},
		},
		computed: {
			calculatedWidth() {
				// 将 0~5 映射到 0~100%
				return (this.progress / 5) * 100;
			},
		},
	};
</script>

<style scoped>
	.progress-bar-container {
		width: calc(100% - 0.4rem);
		margin: 0 0.2rem;
		height: 0.3rem;
		background-color: #e0e0e0;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.progress-bar {
		height: 100%;
		background-color: #42b983;
		transition: width 0.3s ease;
	}
</style>