<template>
	<view class="u-select">
		<view :class="`u-select-show ${state ? 'u-select-state' : ''}`" @click="selectClick" @blur="selectBlur"
			tabindex="-1">
			<u-icon :name="icon" color="var(--theme-text-color)" size=".18rem" v-if="icon"></u-icon>
			<img :src="img" class="img" alt="" v-if="img" />
			<span>{{ showText }}</span>
			<u-icon class="u-select-icon" name="arrow-down" color="var(--theme-text-color)" size=".18rem"></u-icon>
		</view>
		<view v-if="state" :class="bottomHeight ? 'u-select-list bottom_mod' : 'u-select-list'"
			:style="`left: ${bottomLeft}px;top: ${bottomTop}px;`">
			<view :class="showText == item.name ? 'u-select-item u-select-item-activity':'u-select-item'"
				:value="item.val" v-for="(item, i) in list" :key="i" @mousedown="itemClick(item, i)">
				<image v-if="item.img" class="u-select-item-img" :src="item.img" mode=""></image>
				<span>{{ item.name }}</span>
			</view>
			<view class="u-select-item" v-if="list.length <= 0">
				{{ $t('no_record') }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['value', 'list', 'icon', 'img'],
		data() {
			return {
				showText: '',
				state: false,
				bottomHeight: false,
				bottomLeft: 0,
				bottomTop: 0,
			}
		},
		watch: {
			list(newVal, oldVal) {
				this.getValue(newVal)
			}
		},
		mounted() {
			this.getValue(this.list)
		},
		methods: {
			getValue(list) {
				if (this.value) {
					this.showText = this.value
				} else if (list.length) {
					this.showText = list[0].name
					this.$emit("returnSelect", {
						value: list[0],
						index: 0,
						isInit:true,
					})
				} else {
					this.showText = 'Sem'
					this.$emit("returnSelect", {
						value: null,
						index: null,
						isInit:true,
					})
				}
			},
			getBottomHeight() {
				const query = uni.createSelectorQuery();
				query.select('.u-select-show').boundingClientRect(data => {
					const elementHeight = data.height;
					const windowHeight = uni.getSystemInfoSync().windowHeight;
					const bottomHeight = windowHeight - data.bottom;
					if (bottomHeight <= 200) {
						this.bottomHeight = true
					}
				}).exec();
			},
			getBottomLeft() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.u-select').boundingClientRect(data => {
					this.bottomLeft = data.left
					this.bottomTop = data.bottom + 3
				}).exec();
			},
			selectClick() {
				this.state = !this.state
				if (this.state) {
					this.getBottomHeight()
					this.getBottomLeft()
				}
			},
			selectBlur() {
				let _this = this
				setTimeout(function() {
					_this.state = false
				}, 100)
			},
			itemClick(e, i) {
				this.showText = e.name
				// this.state = !this.state
				this.$emit("returnSelect", {
					value: e,
					index: i,
					isInit:false
				})
			}
		}
	}
</script>

<style lang="scss">
	.u-select {
		display: inline-block;

		.u-select-show {
			border-radius: .25rem;
			color: var(--theme-text-color);
			font-size: .18rem;
			height: .5rem;
			line-height: .5rem;
			min-width: 1rem;
			background-color: var(--theme-main-bg-color);
			border: 1px solid var(--theme-color-line);
			padding: 0 .15rem;
			display: flex;
			justify-content: space-between;
			cursor: pointer;
			align-items: center;

			span {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.img {
				width: .18rem;
				height: .18rem;
				margin-right: .2rem;
			}

			.u-select-icon {
				margin-left: .1rem;
			}
		}

		.u-select-show:hover {
			border: 1px solid var(--theme-filter-active-color);
		}

		.u-select-state {
			border: 1px solid var(--theme-filter-active-color);

			/deep/.u-icon__icon {
				-webkit-transform: rotate(180deg);
				transform: rotate(180deg);
				-webkit-transition: -webkit-transform 0.3s linear;
				transition: transform 0.3s linear;
			}
		}

		.u-select-list {
			border-radius: .1rem;
			min-width: 2.4rem;
			border: 1px solid var(--theme-color-line);
			color: var(--theme-text-color);
			position: fixed;
			background-color: var(--theme-main-bg-color);
			// bottom: -.5rem;
			// max-height: 5.1rem;
			padding: .14rem 0;
			overflow: scroll;
			z-index: 1;

			.u-select-item {
				color: var(--theme-text-color-lighten);
				font-size: .24rem;
				line-height: .8rem;
				min-height: .8rem;
				padding: 0 .2rem;
				display: flex;
				align-items: center;

				.u-select-item-img {
					width: .18rem;
					height: .18rem;
					margin-right: .2rem;
				}
			}

			.u-select-item:hover {
				background-color: var(--theme-bg-color);
				// color: var(--theme-primary-color);
			}

			.u-select-item-activity {
				// background-color: var(--theme-bg-color);
				color: var(--theme-primary-color);
			}
		}

		.bottom_mod {
			bottom: 3.3rem;
		}
	}
</style>