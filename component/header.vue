<template>
	<view class="header-bar u-flex u-row-between u-items-center">
		<!-- 左侧 Logo 和标题 -->
		<view class="left-section u-flex u-items-center">
			<image src="/static/logo.png" class="logo" mode="aspectFit" />
			<text class="site-title">发布站后台</text>
		</view>

		<!-- 右侧按钮区域 -->
		<view class="right-section u-flex u-items-center">
			<!-- 搜索框 -->
			<u-input v-model="searchKeyword" placeholder="搜索内容..." class="search-input" suffixIcon="search"
				shape="circle" @confirm="onSearch" />

			<!-- 发布内容按钮 -->
			<u-button type="primary" icon="plus" @click="openAddDrawer" size="mini" class="ml-20">
				发布内容
			</u-button>

			<!-- 语言切换 -->
			<u-button size="mini" plain class="ml-20" @click="toggleLanguage">
				{{ currentLang === 'zh' ? '中文' : 'English' }}
			</u-button>

			<!-- 通知图标 -->
			<u-icon name="bell" size="36" class="ml-20" @click="goToNotifications" />

			<!-- 用户头像 + 下拉 -->
			<u-dropdown :options="dropdownOptions" @change="handleUserCommand">
			  <view slot="custom" class="u-flex u-items-center">
			    <image src="/static/all-casinos.png" class="avatar" mode="aspectFill" />
			    <text class="user-name">{{ userName }}</text>
			  </view>
			</u-dropdown>

		</view>
	</view>
</template>

<script>
	export default {
		name: 'HeaderBar',
		data() {
			return {
				userName: '管理员',
				searchKeyword: '',
				currentLang: 'zh',
				dropdownOptions: [{
						label: '个人中心',
						value: 'profile'
					},
					{
						label: '退出登录',
						value: 'logout'
					}
				]
			};
		},
		methods: {
			openAddDrawer() {
				this.$emit('openDrawer');
			},
			handleUserCommand(command) {
				if (command === 'logout') {
					uni.showToast({
						title: '已退出登录',
						icon: 'none'
					});
				} else if (command === 'profile') {
					uni.navigateTo({
						url: '/pages/user/profile'
					});
				}
			},
			onSearch() {
				uni.showToast({
					title: '搜索：' + this.searchKeyword,
					icon: 'none'
				});
			},
			toggleLanguage() {
				this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
				uni.showToast({
					title: `已切换到 ${this.currentLang === 'zh' ? '中文' : 'English'}`,
					icon: 'none'
				});
			},
			goToNotifications() {
				uni.navigateTo({
					url: '/pages/notifications/index'
				});
			}
		}
	};
</script>

<style scoped>
	.header-bar {
		height: 100rpx;
		padding: 0 30rpx;
		background-color: #fff;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	}

	.logo {
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}

	.site-title {
		font-size: 32rpx;
		font-weight: bold;
	}

	.search-input {
		width: 250rpx;
	}

	.avatar {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		margin-left: 10rpx;
	}

	.user-name {
		margin-left: 6rpx;
		font-size: 28rpx;
	}

	.ml-20 {
		margin-left: 20rpx;
	}
</style>