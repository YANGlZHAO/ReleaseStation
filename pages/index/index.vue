<template>
	<view class="page">
		<NavBarVue></NavBarVue>
		<MyCarousel :images="imageList" />
		<popularGameVue :list="data" />
	</view>
</template>



<script>
	import popularGameVue from '@/component/popularGame.vue'
	import FloatButtonVue from '@/component/FloatButton.vue'
	import NavBarVue from '@/component/NavBar.vue'
	import MyCarousel from "@/component/MyCarousel.vue";
	export default {
		name: "HomePage",
		components: {
			popularGameVue,
			FloatButtonVue,
			NavBarVue,
			MyCarousel
		},
		data() {
			return {
				imageList: [
					"/static/img_Carousel.jpg",
					"/static/img_Carousel.jpg",
					"/static/img_Carousel.jpg",
				],
				data: [{
					conpany: 'FC',
					gameList: [{
							name: 'bbrcc',
							image: '/static/APP/1.png',
							isStarred: false,
							url: 'https://bbrcc.net'
						},
						{
							name: 'betcc',
							image: '/static/APP/2.png',
							isStarred: false,
							url: 'https://www.betcc.win'
						},
						{
							name: 'brlccc',
							image: '/static/APP/3.png',
							isStarred: false,
							url: 'https://brlccc.com'
						},
						{
							name: 'diamondbet777',
							image: '/static/APP/4.png',
							isStarred: false,
							url: 'https://diamondbet777.net'
						},
						{
							name: 'brncc',
							image: '/static/APP/5.png',
							isStarred: false,
							url: 'https://brncc.com'
						},
						{
							name: 'brtccc',
							image: '/static/APP/6.png',
							isStarred: false,
							url: 'https://brtccc.com'
						},
						{
							name: 'bmwccc',
							image: '/static/APP/7.png',
							isStarred: false,
							url: 'https://bmwccc.com'
						},
						{
							name: 'closet',
							image: '/static/APP/8.png',
							isStarred: false,
							url: 'https://closet.bet'
						},
						{
							name: 'vsopccc',
							image: '/static/APP/9.png',
							isStarred: false,
							url: 'https://vsopccc.com'
						},
						{
							name: ' bmpg',
							image: '/static/APP/10.png',
							isStarred: false,
							url: 'https://bmpg.bet'
						},
						{
							name: 'mochila',
							image: '/static/APP/11.png',
							isStarred: false,
							url: 'https://mochila.bet'
						},
						{
							name: 'motocicleta',
							image: '/static/APP/12.png',
							isStarred: false,
							url: 'https://motocicleta.bet'
						},
						{
							name: 'watchccc',
							image: '/static/APP/13.png',
							isStarred: false,
							url: 'https://watchccc.bet'
						},
						{
							name: 'furiouscc',
							image: '/static/APP/14.png',
							isStarred: false,
							url: 'https://furiouscc.bet'
						},
						{
							name: 'cocacolacc',
							image: '/static/APP/15.png',
							isStarred: false,
							url: 'https://cocacolacc.bet'
						},
						{
							name: '8k8k',
							image: '/static/APP/16.png',
							isStarred: false,
							url: 'https://8k8k.bet'
						},
						{
							name: 'touro777',
							image: '/static/APP/17.png',
							isStarred: false,
							url: 'https://touro777.bet'
						},
						{
							name: 'escapeplan',
							image: '/static/APP/18.png',
							isStarred: false,
							url: 'https://escapeplan.bet'
						},
						{
							name: 'iphone17',
							image: '/static/APP/19.png',
							isStarred: false,
							url: 'https://iphone17.bet'
						},
						{
							name: 'kkuupg',
							image: '/static/APP/21.png',
							isStarred: false,
							url: 'https://kkuupg.bet'
						},
						{
							name: 'tiktok777',
							image: '/static/APP/22.png',
							isStarred: false,
							url: 'https://tiktok777.bet'
						},
						{
							name: 'pgvip777',
							image: '/static/APP/23.png',
							isStarred: false,
							url: 'https://pgvip777.bet'
						}
					],
				}, {
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
				}]
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
			},
			open() {

			}
		}
	}
</script>

<style scoped>
	.page {
		display: flex;
		flex-direction: column;
		background-color: #000;
		margin-top: 4rem;
		height: 100vh;
	}
</style>