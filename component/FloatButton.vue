<template>
	<view class="float-button" :class="{ expanded: isHovered }" @mouseenter="isHovered = true"
		@mouseleave="isHovered = false" @click="openEmail">
		<text v-if="isHovered == false" class="icon">📧</text>
		<text v-if="isHovered == true" class="button-text">📧 Contate-nos</text>
	</view>
</template>

<script>
	export default {
		props: {
			email: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				isHovered: false,
			};
		},
		methods: {
			openEmail() {
				if (this.email) {
					// 通过 mailto: 方式打开邮件客户端
					window.location.href = `mailto:${this.email}`;
				} else {
					console.error("Email address not provided");
				}
			},
		},
	};
</script>

<style scoped>
	.float-button {
		position: fixed;
		right: 1rem;
		bottom: 3rem;
		width: 1.5rem;
		height: 1.5rem;
		background-color: #df4f4f;
		color: #fff;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		overflow: hidden;
		white-space: nowrap;
		font-size: 0.4rem;
		font-weight: bold;
	}

	.expanded {
		width: 4rem;
		border-radius: 0.75rem;
	}
	
	.button-text {
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.expanded .button-text {
		opacity: 1;
	}
</style>