<template>
	<u-popup class="fullscreen-popup" :show="show" mode="center" :closeOnClickOverlay="false" overlayOpacity="0.65">
		<view class="Modal">
			<view class="exitBtn" @click="close">
				<u-icon name="close" color="#fff" size=".2rem"></u-icon>
			</view>
			<view class="totalContent">
				<scroll-view class="leftContent" scroll-y="true">
					<view v-for="(item,index) in informationList" :key="'infomation'+index" @click="itemClick(index)"
						:class="currentIndex == index ? 'leftItem leftItemSelected' : 'leftItem'">
						<view class="leftEmailIcon">
							<image src="@/static/information.png" style="width: 0.35rem; height: 0.35rem;">
							</image>
						</view>
						<span class="leftTitle">{{item.title}}</span>
					</view>
				</scroll-view>
				<view class="rightContent">
					<view class="body">
						<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll"
							:show-scrollbar="true">
							<u-parse :content="currentContent"></u-parse>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="bottom-btn">
				<checkbox-group class="checkboxGroup" @change="clickCheckbox">
					<label>
						<checkbox class="checkbox" backgroundColor="transparent"
							activeBackgroundColor="var(--theme-secondary-color-success)"
							activeBorderColor="var(--theme-secondary-color-success)" iconColor="#fff" value="cb"
							:checked="isChecked" />{{ $t('information.DontShowAgainToday') }}
					</label>
				</checkbox-group>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {
		suporteGetdetailed,
	} from "@/api/user.js"
	export default {
		props: [],
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				show: false,
				content: '',
				isChecked: false,
				currentIndex: -1,
				currentContent: '',
				informationList: [],
			}
		},
		methods: {

			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},

			open(itemList) {
				if (itemList && itemList.length > 0) {
					this.informationList = itemList
					this.itemClick(0)
				}
				this.show = true
			},


			close() {
				this.show = false
				this.$emit("todayAgainPopup", true)
			},

			clickCheckbox() {
				this.isChecked = true
				var date = new Date()
				var year = date.getFullYear()
				var month = date.getMonth() + 1
				var day = date.getDate()
				var nowDate = {
					year: year,
					month: month,
					day: day
				}
				uni.setStorageSync('nowDate', nowDate)
				var timeout = setTimeout(() => {
					this.$emit("todayAgainPopup", false)
					this.show = false
				}, 500)

			},
			getSuporteDetailed(id) {
				let data = {
					message_id: id,
					token: uni.getStorageSync('token')
				}

				return new Promise((resolve, reject) => {
					suporteGetdetailed(data).then(data => {
						if (data.meta.code == 0) {
							resolve(data.data.content);
						} else {
							reject('')
						}
					});
				})

			},
			fetchDetailWithItem(item) {
				let data = {
					message_id: item.id,
					token: uni.getStorageSync('token')
				}
				suporteGetdetailed(data).then(data => {
					if (data.meta.code == 0) {} else {}
				});
			},
			itemClick(index) {
				this.currentIndex = index
				var tempItem = this.informationList[this.currentIndex]
				this.currentContent = this.informationList[this.currentIndex].content
			}
		}
	}
</script>

<style lang="scss">
	::v-deep(.fullscreen-popup .u-transition) {
	  position: fixed !important;
	  top: 0 !important;
	  left: 0 !important;
	  width: 100vw !important;
	  height: 100vh !important;
	  max-width: 100vw !important;
	  max-height: 100vh !important;
	  display: flex !important;
	  align-items: center;
	  justify-content: center;
	  z-index: 1001 !important;
	}
	
	::v-deep(.fullscreen-popup .u-overlay) {
	  position: fixed !important;
	  top: 0;
	  left: 0;
	  width: 100vw !important;
	  height: 100vh !important;
	  z-index: 1000 !important;
	}
::v-deep(.fullscreen-popup .u-transition > *) {
  pointer-events: auto !important; // 内容可以交互
}


	.Modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 20rem;
		height: 4.2rem;
		background-color: var(--theme-main-bg-color);
		border: thin solid var(--theme-color-line);
		border-radius: 0.2rem;
		z-index: 1002;
		padding: 0;
		font-size: 0.22rem;
		box-sizing: border-box;

		.exitBtn {
			background: hsla(0, 0%, 100%, .2);
			border-radius: 50%;
			color: #fff;
			line-height: .4rem;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 1002;
			cursor: pointer;
			position: absolute;
			right: 3.3rem;
			top: auto;
			bottom: -1.6rem;
			border: .05rem solid #fff;
			width: .5rem;
			height: .5rem;
		}

		.totalContent {
			display: flex;
			flex-direction: row;
			height: 4.2rem;

			.leftContent {
				width: 2rem;
				display: flex;
				flex-direction: column;
				border-right: 1px solid var(--theme-color-line);

				.leftItem {
					display: flex;
					flex-direction: row;
					margin: 0;
					padding: .15rem;
					align-items: center;
					width: 1.3rem;
					cursor: pointer;

					.leftEmailIcon {
						align-items: center;
						display: flex;
						position: relative;
					}

					.leftTitle {
						font-size: .18rem;
						line-height: .27rem;
						margin-left: .05rem;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}

				.leftItemSelected {
					background-color: rgba(var(--theme-primay-color-hex), .05);
					color: var(--theme-filter-active-color);
				}
			}

			.rightContent {
				display: flex;
				flex-direction: column;
				width: 100%;
				align-items: center;

				.title {
					margin: 0.2rem 0.5rem 0 0.5rem;
					overflow: hidden;

					// background-color: red;
					.title-text {
						color: var(--theme-text-color);
						font-weight: bold;
						display: inline-block;
						width: 100%;
						height: auto;
						font-size: 0.26rem;
						word-break: break-all;
						text-overflow: ellipsis;
						word-wrap: break-word;
						white-space: pre-wrap;
						text-align: center;
						line-height: 1.38;

					}
				}

				.body {
					margin: 0.2rem 2.5% 0.1rem 2.5%;
					height: 90%;
					width: 95%;
					display: flex;

					.scroll-Y {
						width: 5rem;
						word-wrap: break-word;
						/* 强制长单词或 URL 地址换行 */
						overflow-wrap: break-word;

						/* 当内容超出容器宽度时自动换行 */
						// background-color: #fff;
						::v-deep ::-webkit-scrollbar {
							width: 0.1rem !important;
							height: 0.05rem !important;
							background: var(--theme-btm-bg-color) !important;
							-webkit-appearance: auto !important;
							overflow: auto !important;
							display: block;
						}

						::v-deep ::-webkit-scrollbar-thumb {
							border-radius: 0.1rem !important;
							box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
							background: var(--theme-color-line) !important;
						}

						::v-deep ::-webkit-scrollbar-track {
							position: absolute !important;
							// box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
							// border-radius: 10px !important;
							background: var(--theme-btm-bg-color) !important;
						}

						.body-text {
							display: inline-block;
							width: 100%;
							height: auto;
							font-size: 0.2rem;
							word-break: break-all;
							text-overflow: ellipsis;
							word-wrap: break-word;
							white-space: pre-wrap;
						}
					}

				}
			}

		}

		.bottom-btn {
			margin-top: 0.2rem;
			align-items: center;

			.checkboxGroup {
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 0.2rem;
				width: 3.5rem;
				margin: 0 auto;
				padding: 0.1rem;
				color: var(--theme-text-color-darken);
				font-size: 0.2rem;
				text-align: center;

				.checkbox {
					::v-deep .uni-checkbox-input {
						width: .32rem;
						height: .32rem;
					}
				}
			}
		}
	}
</style>