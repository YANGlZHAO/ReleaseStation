<template>
	<div class="checkbox" @click="toggleCheck">
		<div class="checkbox-box" :class="{ checked: isChecked }"></div>
		<span class="checkbox-label">{{ label }}</span>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: String,
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
			checked: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				isChecked: this.checked,
			};
		},
		methods: {
			toggleCheck() {
				this.isChecked = !this.isChecked;
				this.$emit('change', this.value, this.isChecked);
			},
		},
	};
</script>

<style scoped>
	.checkbox {
		display: flex;
		align-items: center;
		cursor: pointer;
		margin-bottom: 0.3rem;
	}

	.checkbox-box {
		width: 0.5rem;
		height: 0.5rem;
		border: 0.1rem solid #ccc;
		border-radius: 0.2rem;
		margin-right: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.2s, border-color 0.2s;
	}

	.checkbox-box.checked {
		background-color: #42b983;
		border-color: #42b983;
	}

	.checkbox-box.checked::after {
		content: '✔';
		color: white;
		font-size: 0.5rem;
	}

	.checkbox-label {
		font-size: 0.4rem;
	}
</style>