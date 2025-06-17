<template>
	<div class="progress-wrapper">
		<div class="progress-container" @click="onClick">
			<div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
			<div class="progress-thumb" :style="{ left: progressPercent + '%' }" @mousedown.prevent="onMouseDown"></div>
		</div>
		<view style="width: 1rem;"></view>
		<span class="progress-value">{{ progressDisplay }}+</span>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				isDragging: false,
				internalValue: isNaN(parseFloat(this.value)) ? 0 : parseFloat(this.value)
			};
		},
		computed: {
			progressPercent() {
				return Math.min(100, Math.max(0, (this.internalValue / 5) * 100));
			},
			progressDisplay() {
				return isNaN(this.internalValue) ? "0.0" : this.internalValue.toFixed(1);
			}
		},
		watch: {
			value(newVal) {
				this.internalValue = isNaN(parseFloat(newVal)) ? 0 : parseFloat(newVal);
			}
		},
		methods: {
			onMouseDown(event) {
				this.isDragging = true;
				document.addEventListener("mousemove", this.onMouseMove);
				document.addEventListener("mouseup", this.onMouseUp);
			},
			onMouseMove(event) {
				if (!this.isDragging) return;
				this.updateProgress(event);
			},
			onMouseUp() {
				this.isDragging = false;
				document.removeEventListener("mousemove", this.onMouseMove);
				document.removeEventListener("mouseup", this.onMouseUp);
				// 调用鼠标松开时触发的方法
				this.handleProgressRelease();
			},
			handleProgressRelease() {
				this.$emit("handleProgressRelease", this.internalValue);
			},
			onClick(event) {
				this.updateProgress(event);
			},
			updateProgress(event) {
				const rect = this.$el.querySelector(".progress-container").getBoundingClientRect();
				if (rect.width === 0) return; // 防止除以 0

				let newProgress = ((event.clientX - rect.left) / rect.width) * 5;
				newProgress = Math.min(5, Math.max(0, newProgress));

				if (!isNaN(newProgress)) {  // 只在 newProgress 是有效数值时更新
					this.internalValue = newProgress;
					this.$emit("input", this.internalValue);
				}
			}
		}
	};
</script>

<style scoped>
	.progress-wrapper {
		display: flex;
		align-items: center;
		width: 6rem;
		margin: .5rem .8rem;
	}

	.progress-container {
		position: relative;
		width: 6rem;
		height: 0.4rem;
		background-color: #fff;
		border-radius: 0.15rem;
		cursor: pointer;
		margin-right: 0.1rem;
		border: 0.1rem solid #c3c4c6;
	}

	.progress-bar {
		height: 100%;
		background-color: #ff4d4d;
		border-radius: 0.08rem;
	}

	.progress-thumb {
		position: absolute;
		top: 50%;
		width: 1rem;
		height: 1rem;
		background-color: #ff4d4d;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		cursor: grab;
	}

	.progress-value {
		font-size: 0.6rem;
		color: #ff4d4d;
		line-height: 1;
		font-weight: bold;
	}
</style>
