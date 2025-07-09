import App from './App'

import {
	initRem
} from './utils/rem'
initRem()

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import 'uview-ui/theme.scss'
Vue.use(uView)

import './uni.promisify.adaptor'
Vue.config.productionTip = false


// 获取刘海和底部横条高度
const systemInfo = uni.getSystemInfoSync()
const topSafeHeight = systemInfo.safeAreaInsets ?
	systemInfo.safeAreaInsets.top :
	systemInfo.safeArea.top
const bottomSafeHeight = systemInfo.safeAreaInsets ?
	systemInfo.safeAreaInsets.bottom :
	(systemInfo.screenHeight - systemInfo.safeArea.height - systemInfo.safeArea.top)
// 挂载为全局变量
Vue.prototype.$topSafeHeight = topSafeHeight
Vue.prototype.$bottomSafeHeight = bottomSafeHeight


App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif