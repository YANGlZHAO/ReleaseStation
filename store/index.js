import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		hasLogin: uni.getStorageSync('hasLogin') || false,
		userInfo: uni.getStorageSync('userInfo') || {},
		tagType: 0,
		isGamePageShow:false,
		menuHomeNum: 0,
		tokenSessionID:'',
		refreshTokenTimerID:null,
	},
	mutations: {
		login(state, provider) {
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		logout(state) {
			state.userInfo = {};
			uni.removeStorage({
			    key: 'token'
			})
		},
		gamePageShowStatusChange(state,isGamePage) {
			state.isGamePageShow = isGamePage
			// uni.setStorageSync({
			// 	key:'isGamePageShow',
			// 	data:toString(isGamePage)
			// })
		},
		
	},
	getters: {
		
	}
})

export default store
