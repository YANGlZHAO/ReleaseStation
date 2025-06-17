/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import setting, {
	CURRENT_ENVIRONMENT,
	ENVIRONMENT
} from "./config.js";
import po from "./lang/po.js";
import utils from "./utils.js";
import store from "@/store"

let modalState = true
let restrictedState = true

export default {
	config: {
		baseURL: setting.CURRENT_ENVIRONMENT,
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		custom: {
			// 请求接口展示Loading
			ShowLoading: false,
			// Loading中是否遮罩
			LoadingMask: true,
			// Loading文本
			LoadingText: setting.LOADING_TEXT,
		},
		dataType: "json",
		/* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		// #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
		timeout: setting.TIMEOUT,
		// #endif
		// #ifdef APP-PLUS
		// 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
		sslVerify: false,
		// #endif
		// #ifdef H5
		// 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
		withCredentials: false,
		// #endif
		// #ifdef APP-PLUS
		// DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
		firstIpv4: false,
		// #endif
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		options.header = {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		options.header = {
			'Content-Type': 'application/json;charset=UTF-8'
		}
		return this.request(options)
	},
	request(options) {
		//请求前处理，相当于请求拦截
		let config = Object.assign(this.config, options); //合并全局配置及局部配置项
		//加载提示
		if (config.custom.ShowLoading && !options.url.includes('/api/user/heartbeat')) {
			uni.showLoading({
				title: config.custom.LoadingText || 'loading',
				mask: config.custom.LoadingMask || false
			});
		}
		config.url = config.baseURL + config.url
		config.data = config.data || {}

		//如果token不为空则请求时携带token
		let _token = uni.getStorageSync('token') || ''
		if (_token != '' && _token != undefined) {
			config.data['token'] = _token
		}
		config.data['timestamp'] = Math.round(new Date() / 1000); //时间戳;

		// if (CURRENT_ENVIRONMENT == ENVIRONMENT.DEV) {
		// 	delete config.data['geetest_captcha'];
		// }
		// if (options.url.includes('login')) {
		// }


		//是否开启请求日志
		if (setting.REQUEST_LOG) {
			_reqlog(config)
		}
		return new Promise((resolve, reject) => {
			uni.request(config)
				.then(res => {
					if (config.custom?.ShowLoading) {
						uni.hideLoading();
					}

					if (setting.REQUEST_LOG) {
						_reslog(res);
					}

					if (res.statusCode === 200) {
						resolve(res.data);
					} else {
						reject(res);
					}
				})
				.catch(err => {
					if (config.custom?.ShowLoading) {
						uni.hideLoading();
					}
					console.error('请求失败:', err);
					reject(err);
				});
		});

	},
}
/**
 * 请求接口日志记录
 */
//请求日志
function _reqlog(req) {
	console.log("请求地址：" + req.url)
	console.log("请求参数：" + JSON.stringify(req.data))
}
//响应日志
function _reslog(res) {
	console.log("响应结果：" + JSON.stringify(res))
}