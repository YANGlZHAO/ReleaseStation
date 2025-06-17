<template>
	<div class="scroll-container" ref="scrollContainer">
		<div class="scroll-text" ref="scrollText">
			<u-parse class="scroll-text" ref="scrollText" :content="content"></u-parse>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['content'],
		name: "ScrollingText",
		mounted() {
			this.scrollText();
		},
		methods: {
			scrollText() {
				const container = this.$refs.scrollContainer;
				const text = this.$refs.scrollText;
				const scroll = () => {
					if (container.scrollLeft + container.offsetWidth == text.offsetWidth) {
						setTimeout(() => {
							container.scrollLeft = 0;
						}, 500);
					} else {
						container.scrollLeft += 1;
					}
					requestAnimationFrame(scroll);
				};

				scroll();
			},
		},
	};
</script>

<style scoped>
	.scroll-container {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		position: relative;
	}

	.scroll-text {
		display: inline-block;
		white-space: nowrap;
	}
</style>