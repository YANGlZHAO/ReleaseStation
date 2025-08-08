<template>
	<view v-if="show" class="popup-overlay" :class="{ 'fade-in': fadeIn }" @click.self="close">
		<view class="popup-content">
			<view class="Modal">
				<view class="exitBtn" @click="close">
					<u-icon name="close" color="#fff" size="0.6rem"></u-icon>
				</view>
				<view class="totalContent">
					<scroll-view class="leftContent" scroll-y="true">
						<view v-for="(item,index) in informationList" :key="'infomation'+index"
							@click="itemClick(index)"
							:class="currentIndex == index ? 'leftItem leftItemSelected' : 'leftItem'">
							<view class="leftEmailIcon">
								<image src="@/static/information.png" style="width: 1.5rem; height: 1.5rem;">
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
		</view>
	</view>

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
				content: '',
				isChecked: false,
				currentIndex: -1,
				currentContent: '',
				informationList: [],
				show: false,
				fadeIn: false
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
				this.$nextTick(() => {
					this.fadeIn = true
				})
			},


			close() {
				this.fadeIn = false
				this.$emit("todayAgainPopup", true)
				setTimeout(() => {
					this.show = false
					this.$emit('close')
				}, 300)
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
	.popup-overlay.fade-in {
		opacity: 1;
	}

	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		opacity: 0;
		transition: opacity 0.3s ease;

		.popup-content {
			background: white;
			border-radius: 10px;
			padding: 20px;
			position: relative;
			max-width: 90vw;
			max-height: 80vh;
			overflow-y: auto;

			.close-btn {
				position: absolute;
				top: 10px;
				right: 15px;
				font-size: 1.5rem;
				cursor: pointer;
				user-select: none;
			}


			.Modal {
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 20rem;
				height: 15rem;
				background-color: var(--theme-main-bg-color);
				border: thin solid var(--theme-color-line);
				border-radius: 1rem;
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
					right: 45%;
					top: auto;
					bottom: -5rem;
					border: .05rem solid #fff;
					width: 1.5rem;
					height: 1.5rem;
				}

				.totalContent {
					display: flex;
					flex-direction: row;
					height: 15rem;

					.leftContent {
						width: 6rem;
						display: flex;
						flex-direction: column;
						border-right: 1px solid var(--theme-color-line);

						.leftItem {
							display: flex;
							flex-direction: row;
							margin: 0;
							padding: .15rem;
							align-items: center;
							width: 5.5rem;
							cursor: pointer;

							.leftEmailIcon {
								align-items: center;
								display: flex;
								position: relative;
								width: 1.5rem;
								height: 1.5rem;
							}

							.leftTitle {
								font-size: 0.6rem;
								line-height: 1rem;
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

							.title-text {
								color: var(--theme-text-color);
								font-weight: bold;
								display: inline-block;
								width: 100%;
								height: auto;
								font-size: 0.5rem;
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
								width: 100%;
								word-wrap: break-word;
								overflow-wrap: break-word;

								::v-deep ::-webkit-scrollbar {
									width: 0.2rem !important;
									height: 0.1rem !important;
									background: var(--theme-btm-bg-color) !important;
									-webkit-appearance: auto !important;
									overflow: auto !important;
									display: block;
								}

								::v-deep ::-webkit-scrollbar-thumb {
									border-radius: 0.2rem !important;
									box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2) !important;
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
					margin-top: 0.8rem;
					align-items: center;

					.checkboxGroup {
						background-color: rgba(0, 0, 0, 0.2);
						border-radius: 0.2rem;
						width: 10rem;
						height: 1rem;
						margin: 0 auto;
						padding: 0.2rem;
						color: var(--theme-text-color-darken);
						font-size: 0.6rem;
						text-align: center;

						.checkbox {
							::v-deep .uni-checkbox-input {
								width: .6rem;
								height: .6rem;
							}
						}
					}
				}
			}

		}
	}
</style>