<template>
	<view class="nav-bar" @mousemove="handleMove" @mouseleave="resetPosition"
		:style="{ backgroundPosition: `${bgPosX}% ${bgPosY}%` }">
		<div class="top-nav">
			<div class="top-nav-inner">
				<div class="container-large">
					<div class="d-flex">
						<a class="logo" href="/" @click.prevent="handleClick"></a>
					</div>

					<div class="top-right">
						<!-- <button class="btn login-btn" @click="handleLogin">Login</button>
						<button class="btn register-btn" @click="handleRegister">Register</button> -->
						<text class="title">发布站</text>
					</div>
				</div>
			</div>

		</div>
	</view>
</template>

<script>
	import router from "@/utils/router.js";
	import SvgIcon from "../component/SvgIcon.vue";
	export default {
		components: {
			SvgIcon
		},
		data() {
			return {
				activeIndex: null,
				navList: [{
						title: "首页",
						icon: "Poker",
						url: "/pages/index/index",
						bgcolor: "#3a579a"
					},
					{
						title: "收藏",
						icon: "Gift",
						url: "/pages/Bonuses/Bonuses",
						bgcolor: "#ff7f00"
					},
					{
						title: "我的",
						icon: "orange",
						url: "/pages/Games/Games",
						bgcolor: "#5bac5c"
					},
					// {
					// 	title: "Forum",
					// 	icon: "WeChat",
					// 	url: "/pages/Forum/Forum",
					// 	bgcolor: "#fdbe00"
					// },
					// {
					// 	title: "Banking",
					// 	icon: "purse",
					// 	url: "/pages/Banking/Banking",
					// 	bgcolor: "#45b9ea"
					// },
					// {
					// 	title: "Tournaments",
					// 	icon: "Cup",
					// 	url: "/pages/Tournaments/Tournaments",
					// 	bgcolor: "#bdd548"
					// },
					// {
					// 	title: "News",
					// 	icon: "News",
					// 	url: "/pages/News/News",
					// 	bgcolor: "#1562b6"
					// },
				],
				bgPosX: 50, // 初始X轴位置
				bgPosY: 50 // 初始Y轴位置
			};
		},
		methods: {
			handleLogin() {

			},
			handleRegister() {

			},
			showDropdown(index) {
				this.activeIndex = index;
			},
			hideDropdown() {
				this.activeIndex = null;
			},
			navigateTo(url) {
				if (url) {
					router.navigate({
						url: url,
						type: "reLaunch",
					});
				}
			},
			handleMove(event) {
				let clientX, clientY;

				// 兼容 PC 和移动端
				if (event.touches && event.touches.length) {
					// 移动端触摸事件
					clientX = event.touches[0].clientX;
					clientY = event.touches[0].clientY;
				} else {
					// PC 端鼠标事件
					clientX = event.clientX;
					clientY = event.clientY;
				}

				// 使用 `uni.createSelectorQuery()` 获取 `nav-bar` 的位置
				uni.createSelectorQuery()
					.select('.nav-bar')
					.boundingClientRect((rect) => {
						if (!rect) return;
						const {
							left,
							top,
							width,
							height
						} = rect;

						// 计算背景偏移量（范围 40% - 60%）
						this.bgPosX = 30 + ((clientX - left) / width) * 40;
						this.bgPosY = 30 + ((clientY - top) / height) * 40;
					})
					.exec();
			},
			resetPosition() {
				this.bgPosX = 50;
				this.bgPosY = 50;
			}
		},
	};
</script>

<style scoped>
	.nav-bar {
		padding:0 1rem;
		display: flex;
		flex-direction: column;
		height: 4rem;
		background: url('@/static/nav_bg.png') no-repeat center center;
		background-size: 100% 100%;
		/* width: 100%; */
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}

	.container-large {
		padding: 0 1rem;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.top-right {
		display: flex;
		gap: 0.5rem;
	}

	.btn {
		padding: 0.3rem 0.8rem;
		border-radius: 0.3rem;
		font-size: 0.6rem;
		font-weight: 600;
		cursor: pointer;
		border: none;
		transition: background-color 0.3s ease;
	}

	.login-btn {
		background-color: #3a579a;
		color: white;
	}

	.login-btn:hover {
		background-color: #2a3f6f;
	}

	.register-btn {
		background-color: #ff7f00;
		color: white;
	}

	.register-btn:hover {
		background-color: #cc6600;
	}

	.top-nav .d-flex {
		display: flex !important;
	}

	.top-nav .d-flex a {
		color: #e65431;
		transition: 0.5s all;
	}

	.top-nav .logo {
		width: 3rem;
		height: 3rem;
		display: block;
		background: url('@/static/APP/img_logo.png') no-repeat center;
		background-size: 100%;
	}

	.title {
		color: #fff;
		font-size: 1rem;
	}

	.side-nav {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		align-items: center;
		list-style: none;
		margin-bottom: 0;
		padding: 0;
	}

	.side-nav .icon::after {
		color: #fdbe00;
	}

	.sideNav_box {
		font-size: 0.4rem;
		font-weight: bold;
		display: flex;
		align-items: center;
	}

	.sideNav_text {
		color: #fff;
		margin: 0 0.1rem;
	}

	.nav-item {
		width: 100%;
		position: relative;
		color: white;
		padding: 0.5rem;
		cursor: pointer;
		font-size: 0.6rem;
		transition: background-color 0.3s ease-in-out;
	}

	/* 鼠标悬停时变色 */
	.nav-item:hover {
		background-color: #555;
	}

	/* 下拉菜单 */
	.dropdown-menu {
		background-color: red;
		position: absolute;
		top: 100%;
		left: 0;
		color: black;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		z-index: 999;
	}

	/* 进入和离开动画 */
	.fade-slide-enter-active,
	.fade-slide-leave-active {
		transition: transform 0.3s ease-out, opacity 0.3s ease-out;
	}

	.fade-slide-enter {
		transform: translateY(-10px);
		opacity: 0;
	}

	.fade-slide-enter-to {
		transform: translateY(0);
		opacity: 1;
	}

	.fade-slide-leave {
		transform: translateY(0);
		opacity: 1;
	}

	.fade-slide-leave-to {
		transform: translateY(-10px);
		opacity: 0;
	}

	/* 下拉菜单项 */
	.dropdown-item {
		padding: 0.1rem;
		cursor: pointer;
		white-space: nowrap;
	}

	.dropdown-item:hover {
		background-color: #f1f1f1;
	}

	.bottom-expand {
		width: 100vw;
		height: auto;
		padding: 1rem;
		min-height: 5rem;
		background-color: #3a579a;
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 19999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.Casinos {
		background-color: #3a579a;
	}

	.Bonuses {
		background-color: #ff7f00;
	}

	.Games {
		background-color: #5bac5c;
	}

	.Forum {
		background-color: #fdbe00;
	}

	.Banking {
		background-color: #45b9ea;
	}

	.Tournaments {
		background-color: #bdd548;
	}

	.News {
		background-color: #1562b6;
	}
</style>