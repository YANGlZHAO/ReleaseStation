<template>

	<view class="search">

		<view class="searchBar">
			<u-search :clearabled="true" :showAction="false" :borderColor="borderColor"
				searchIconColor="var(--theme-filter-active-color)" bgColor="var(--theme-bg-color)" @focus="edit"
				@blur="blur" @search="searchAction" @clear="searchBarClear" v-model="searchKeyWord"
				:placeholder="searchValue" :placeholderColor="placeholderColor" @change="onchange" color="#fff"
				height=".5rem"></u-search>


		</view>

		<button class="searchBtn" @click="searchAction">{{$t('event_details.Search')}}</button>
	</view>
</template>

<script>
	export default {
		props: ['placeholder'],
		data() {
			return {
				borderColor: 'var(--theme-color-line)',
				searchKeyWord: '',
				searchValue: this.placeholder ? this.placeholder : 'Pesquisar',
				placeholderColor: 'var(--theme-text-color-lighten)'
			}
		},
		methods: {
			edit(event) {
				this.borderColor = 'var(--theme-filter-active-color)'
			},
			blur(event) {
				this.borderColor = 'var(--theme-color-line)'
			},
			searchBarClear() {
				this.searchKeyWord = '';
			},
			searchAction() {
				this.$emit('search', this.searchKeyWord);
				try {
					// 收起键盘
					uni.hideKeyboard();
				} catch (e) {}
			},
			onchange() {
				this.$emit('change', this.searchKeyWord);
			},
			subSendKeyword(keyword) {
				this.searchKeyWord = keyword;
			}
		}
	}
</script>

<style lang="scss">
	.search {
		display: flex;
		height: .55rem;
		padding: .2rem .2rem 0;

		.searchBar {
			display: flex;
			flex: 1;
			font-size: .22rem;

			/deep/.u-search {
				
				.u-search__content {
					position: relative;

					.u-search__content__icon {
						position: absolute;
						right: 0.1rem;
						
						.u-icon__icon {
							// color: var(--theme-text-color-darken) !important;
						}
					}

					.u-search__content__close {
						right: 0.5rem;
						background-color: var(--theme-text-color-lighten);
					}
				}

				.uni-input-placeholder {
					font-size: .23rem;
				}

				.uni-input-input {
					font-size: .23rem;
				}
			}


		}

		.searchBtn {
			display: none;

		}

	}
</style>