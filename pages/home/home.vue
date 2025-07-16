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
					"/static/img_Carousel1.jpg",
					"/static/img_Carousel2.jpg",
					"/static/img_Carousel3.jpg",
				],
				data: [{
					conpany: 'FC',
					gameList: [{
							name: 'pgvip777',
							image: '/static/APP/23.png',
							isStarred: false,
							url: 'https://pgvip777.bet'
						},
						{
							name: 'tiktok777',
							image: '/static/APP/22.png',
							isStarred: false,
							url: 'https://tiktok777.bet'
						},
						{
							name: 'kkuupg',
							image: '/static/APP/21.png',
							isStarred: false,
							url: 'https://kkuupg.bet'
						},
						{
							name: 'iphone17',
							image: '/static/APP/19.png',
							isStarred: false,
							url: 'https://iphone17.bet'
						},
						{
							name: 'escapeplan',
							image: '/static/APP/18.png',
							isStarred: false,
							url: 'https://escapeplan.bet'
						},
						{
							name: 'touro777',
							image: '/static/APP/17.png',
							isStarred: false,
							url: 'https://touro777.bet'
						},
						{
							name: '8k8k',
							image: '/static/APP/16.png',
							isStarred: false,
							url: 'https://8k8k.bet'
						},
						{
							name: 'cocacolacc',
							image: '/static/APP/15.png',
							isStarred: false,
							url: 'https://cocacolacc.bet'
						},
						{
							name: 'furiouscc',
							image: '/static/APP/14.png',
							isStarred: false,
							url: 'https://furiouscc.bet'
						},
						{
							name: 'watchccc',
							image: '/static/APP/13.png',
							isStarred: false,
							url: 'https://watchccc.bet'
						},
						{
							name: 'motocicleta',
							image: '/static/APP/12.png',
							isStarred: false,
							url: 'https://motocicleta.bet'
						},
						{
							name: 'mochila',
							image: '/static/APP/11.png',
							isStarred: false,
							url: 'https://mochila.bet'
						},
						{
							name: ' bmpg',
							image: '/static/APP/10.png',
							isStarred: false,
							url: 'https://bmpg.bet'
						},
						{
							name: 'vsopccc',
							image: '/static/APP/9.png',
							isStarred: false,
							url: 'https://vsopccc.com'
						},
						{
							name: 'closet',
							image: '/static/APP/8.png',
							isStarred: false,
							url: 'https://closet.bet'
						},
						{
							name: 'bmwccc',
							image: '/static/APP/7.png',
							isStarred: false,
							url: 'https://bmwccc.com'
						},
						{
							name: 'brtccc',
							image: '/static/APP/6.png',
							isStarred: false,
							url: 'https://brtccc.com'
						},
						{
							name: 'brncc',
							image: '/static/APP/5.png',
							isStarred: false,
							url: 'https://brncc.com'
						},
						{
							name: 'diamondbet777',
							image: '/static/APP/4.png',
							isStarred: false,
							url: 'https://diamondbet777.net'
						},
						{
							name: 'brlccc',
							image: '/static/APP/3.png',
							isStarred: false,
							url: 'https://brlccc.com'
						},
						{
							name: 'betcc',
							image: '/static/APP/2.png',
							isStarred: false,
							url: 'https://www.betcc.win'
						},
						{
							name: 'bbrcc',
							image: '/static/APP/1.png',
							isStarred: false,
							url: 'https://bbrcc.net'
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
		padding-bottom: 4rem;
	}
</style>