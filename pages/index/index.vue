<template>
	<view class="page">
		<NavBarVue></NavBarVue>
		<view class="content">
			<popularGameVue :list="data" />
		</view>

		<view class="footer">
			<view class="disclaimer">
				<view class="link-list">
					<view v-for="(link, index) in links" :key="index" class="link-item" @click="openLink(link.url)">
						{{ link.text }}
					</view>
				</view>
			</view>
		</view>

		<FloatButtonVue email="support@365bets.top" />
	</view>
</template>

<script>
	import popularGameVue from '@/component/popularGame.vue'
	import FloatButtonVue from '@/component/FloatButton.vue'
	import NavBarVue from '@/component/NavBar.vue'

	export default {
		components: {
			popularGameVue,
			FloatButtonVue,
			NavBarVue
		},
		data() {
			return {
				data: [{
					conpany: 'TY',
					gameList: [{
							name: 'sailormoonty',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://sailormoonty.com'
						},
						{
							name: 'tynaruto',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://tynaruto.com'
						},
						{
							name: 'tydigimon',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://tydigimon.com'
						},
						{
							name: 'formigaty',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://formigaty.com'
						},
						{
							name: 'corujaty',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://corujaty.com'
						},
						{
							name: 'unicornioty',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://unicornioty.com'
						},
						{
							name: 'tyanta',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://tyanta.com'
						},
						{
							name: 'cucoty',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://cucoty.com'
						},
						{
							name: 'cisnebranco',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://cisnebranco.com'
						},
						{
							name: ' tycolibri',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https:// tycolibri.com'
						},
						{
							name: 'lamingoty',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://lamingoty.com'
						},
						{
							name: 'pascoaty',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://pascoaty.com'
						},
						{
							name: 'elefantety',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://elefantety.com'
						},
						{
							name: 'tyxuanwu',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://tyxuanwu.com'
						},
						{
							name: 'canguruty',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://canguruty.com'
						}
					],
				}, {
					conpany: 'PU',
					gameList: [{
							name: '5558slot',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://5558slot.com'
						},
						{
							name: 'bbbsjogo',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://bbbsjogo.com'
						},
						{
							name: 'hhhpu',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://hhhpu.com'
						},
						{
							name: 'galaxyjogo',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://galaxyjogo.com'
						},
						{
							name: 'jogocome',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://jogocome.com'
						},
						{
							name: 'bbbpu',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://bbbpu.com'
						},
						{
							name: 'baixissbet',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://baixissbet.com'
						},
						{
							name: 'xc023',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://xc023.com'
						},
						{
							name: 'nascionalwin',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://nascionalwin.com'
						},
						{
							name: 'llaawin',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://llaawin.com'
						}
					],
				}, {
					conpany: 'FP',
					gameList: [{
							name: 'vasopg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://vasopg.com'
						},
						{
							name: 'CanoaPG',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://CanoaPG.com'
						},
						{
							name: 'peluciapg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://peluciapg.com'
						},
						{
							name: 'balancopg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://balancopg.com'
						},
						{
							name: 'presilhapg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://presilhapg.com'
						},
						{
							name: 'retratopg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://retratopg.com'
						},
						{
							name: 'jaquetapg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://jaquetapg.com'
						},
						{
							name: 'secadorpg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://secadorpg.com'
						},
						{
							name: 'chapinhapg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://chapinhapg.com'
						},
						{
							name: 'travesseiropg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://travesseiropg.com'
						},
						{
							name: 'ribeiraopg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://ribeiraopg.com'
						},
						{
							name: 'cartaopg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://cartaopg.com'
						},
						{
							name: 'bussolapg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://bussolapg.com'
						},
						{
							name: 'maravilhosapg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://maravilhosapg.com'
						},
						{
							name: 'memespg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://memespg.com'
						},
						{
							name: 'torcedorpg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://torcedorpg.com'
						},
						{
							name: 'cintopg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://cintopg.com'
						}
					],
				}, {
					conpany: 'KF',
					gameList: [{
							name: '4qwin',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://4qwin.com'
						},
						{
							name: 'aallpg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://aallpg.com'
						},
						{
							name: 'taurusjogo',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://taurusjogo.com'
						},
						{
							name: 'ppplwin',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://ppplwin.com'
						},
						{
							name: 'xxvvjogo',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://xxvvjogo.com'
						},
						{
							name: 'vqqbet',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://vqqbet.com'
						},
						{
							name: 'mmupg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://mmupg.com'
						},
						{
							name: 'KKKWLIN',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://vipkkkl.com'
						},
						{
							name: 'qttbet',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://qttbet.com'
						},
						{
							name: '4ywin',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://4ywin.com'
						},
						{
							name: 'bbkkwin',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://bbkkwin.com'
						},
						{
							name: 'aaafwin',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://aaafwin.com'
						},
						{
							name: 'kkkvpg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://kkkvpg.com'
						},
						{
							name: 'ookkpg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://ookkpg.com'
						},
						{
							name: 'senhapg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://senhapg.com'
						},
						{
							name: 'correrpg',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://correrpg.com'
						},
						{
							name: 'leitegame',
							image: '/static/all-casinos.png',
							isStarred: false,
							url: 'https://leitegame.com'
						}
					],
				}],
				links: [{
						text: 'Disclaimer',
						url: 'https://leitegame.com'
					},
					{
						text: 'Privacy',
						url: 'https://leitegame.com'
					},
					{
						text: 'Gambling Help',
						url: 'https://leitegame.com'
					},
					{
						text: 'Site Map',
						url: 'https://leitegame.com'
					},
					{
						text: 'Research',
						url: 'https://leitegame.com'
					}
				]
			}
		},
		mounted() {
			if (typeof plus !== 'undefined') {
				plus.navigator.setFullscreen(true)
			} else {
				document.addEventListener('plusready', () => {
					plus.navigator.setFullscreen(true)
				})
			}
		},
		methods: {
			openLink(url) {
				if (typeof plus !== 'undefined') {
					plus.runtime.openURL(url)
				} else {
					window.open(url, '_blank')
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		height:300px;
		background-color: #000;
	}

	.content {
		flex: 1;
	}

	.footer {
		width: 100%;
		background-color: #fdbe00;
		padding: 20rpx 0;
	}

	.disclaimer {
		.link-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
		}

		.link-item {
			color: #fff;
			border-right: 1rpx solid #fff;
			font-family: 'AvenirMedium', Arial, sans-serif;
			font-size: 14rpx;
			padding: 0 18rpx;
			line-height: 28rpx;
			cursor: pointer;
			user-select: none;

			&:last-child {
				border-right: none;
			}
		}
	}
</style>