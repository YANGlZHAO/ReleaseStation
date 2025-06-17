import tabbar from "../uni_modules/uview-ui/libs/config/props/tabbar.js";
import po from "./lang/po.js";
import {
	logout,
	userHeartbeat
} from "@/api/user"
import store from "@/store"

export default {

	formatArray(num) {
		let numStr = (num / Math.pow(10, 2)).toFixed(2);
		let result = [];
		let reverseList = [];

		for (let i = numStr.length - 1; i < numStr.length && i >= 0; i--) {
			reverseList.push(numStr[i]);
		}

		for (let i = 0; i < reverseList.length; i++) {
			if (reverseList[i] == '.') {
				result.push(',');
			} else if (((i - (2 + 1)) % 3) === 0 && i > (2 + 1)) {
				if (reverseList[i] !== '-') {
					result.push('.');
				}
				result.push(reverseList[i]);
			} else {
				result.push(reverseList[i]);
			}
		}
		return result.reverse().join('')
	},

	showToast(msg) {
		// #ifdef APP-PLUS
		plus.nativeUI.toast(msg.title)
		// #endif
		// #ifndef APP-PLUS
		uni.showToast(msg)
		// #endif
	},

	createUUID() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";

		var uuid = s.join("");
		return uuid;
	},

	// 生成一个指定范围内的随机整数
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	/**
	 * 删除游戏缓存数据
	 */
	removeStorageGameData() {
		if (uni.getStorageSync('gameTable')) {
			var genreList = JSON.parse(uni.getStorageSync('gameTable'))
			genreList.forEach(item => {
				uni.removeStorageSync(item)
			})
		}
	},

	/**
	 * 判断用户是否设置体现密码
	 * @param {Object} pageUrl
	 * @param {Object} tabIndex
	 */
	judgmentPage(pageUrl, tabIndex, tabbar) {
		var userInfo = uni.getStorageSync('userInfo')
		if (userInfo.is_pay_password == 0 || userInfo.is_pay_password == '') {
			var layout = 0
			if (pageUrl == '/pages/saque/saque') {
				layout = 1
			} else if (pageUrl == '/pages/promotion/promotion') {
				layout = 2
			}
			uni.navigateTo({
				url: '/pages/securityCenter/setWithdrawalPassword?page=' + layout,
			})
		} else if (tabbar) {
			store.state.tagType = tabIndex ? tabIndex : 0
			uni.switchTab({
				url: pageUrl,
			})
		} else {
			uni.navigateTo({
				url: pageUrl + `${tabIndex? '?tabIndex='+tabIndex : '' }`,
			})
		}

	},

	/**
	 * 返回上一页
	 */
	returnUP() {
		let switchTab = uni.getStorageSync('switchTabBackLink') || '/pages/index/home'
		const pages = getCurrentPages();
		let curRoute = pages[pages.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
		let switchList = [
			'/',
			'/pages/index/home',
			'/pages/promotion/promotion',
			'/pages/agent/agent',
			'/pages/suporte/suporte',
			'/pages/perfil/perfil'
		]
		if (switchTab == '/' + curRoute) {
			uni.removeStorageSync('switchTabBackLink')
			uni.switchTab({
				url: '/pages/index/home'
			});
		} else if (pages.length == 2 && switchList.indexOf(switchTab) >= 0) {
			uni.switchTab({
				url: switchTab
			});
		} else if (pages.length > 2) {
			uni.navigateBack({
				delta: 1
			});
		} else if (pages.length === 1) {
			uni.switchTab({
				url: switchTab
			});
		} else {
			history.back()
		}

		if (curRoute == 'pages/agent/agent') {
			uni.$emit('agentBackClicked')
		} else if (curRoute == 'pages/promotion/promotion') {
			uni.$emit('promotionPageExited')
		}

	},

	/**
	 * 判断页面是否需要登录 并且判断是否登录
	 * @return {Boolean}
	 */
	checkPageUrl(pageUrl) {
		if (pageUrl.includes('?')) {
			pageUrl = pageUrl.split('?')[0];
		}
		// var pageLogin = [
		// 	'/pages/promotion/juros', 
		// 	'/pages/promotion/vip',
		// 	'/pages/promotion/history', 
		// 	'/pages/perfil/report?tabIndex=2', 
		// 	'/pages/perfil/dados',
		// 	'/pages/promotion/backlog', 
		// 	'/pages/perfil/report?tabIndex=0',
		// 	'/pages/securityCenter/setWithdrawalPassword',
		// 	'/pages/securityCenter/securityCenter',
		// 	'/pages/promotion/rebate'
		// ]
		var pageLogin = [
			'/pages/perfil/perfil',
			'/pages/promotion/promotion',
			'/pages/promotion/promotion?tagType=5',
			'/pages/promotion/promotion?tagType=2',
			'/pages/promotion/promotion?tagType=6',
			'/pages/perfil/report',
			'/pages/perfil/dados',
			'/pages/promotion/promotion?tagType=4',
			'/pages/perfil/report',
			'/pages/securityCenter/setWithdrawalPassword',
			'/pages/securityCenter/securityCenter',
			'/pages/promotion/promotion?tagType=3'
		]

		if (pageLogin.includes(pageUrl)) {
			if (this.isLogin()) {
				return true
			} else {
				return false
			}
		} else {
			return true
		}

	},


	/**
	 * 检查登录
	 * @return {Boolean}
	 */
	isLogin(options) {
		const token = uni.getStorageSync('token');
		if (token) {
			return true;
		}
		// if (options != undefined && options != '') {
		// 	//转到授权页面登录
		// 	uni.navigateTo({
		// 		url: '/pages/login/login'
		// 	})
		// } else {
		return false;
		// }
	},
	logout() {
		uni.showModal({
			title: po.dialogTitleTips,
			content: po.dialogLogoutContent,
			confirmText: po.dialogCancel,
			cancelText: po.logoutConfirm,
			complete: (value) => {

				if (value.cancel) {
					logout().then(data => {
						if (data.meta.code == 0) {

							uni.removeStorageSync('token');
							uni.removeStorageSync('userInfo');

							uni.removeStorageSync('favoriteGameData');
							uni.removeStorageSync('playedGameData');

							store.state.userInfo = {}

							uni.reLaunch({
								url: "/pages/index/home"
							})
							this.stopRefreshTokenHeartbeat()
							uni.setStorageSync('isTelegramLogin', false)
						} else {
							uni.showModal({
								content: data.meta.message,
								confirmText: po.dialogConfirm
							})
						}
					});
				}
			}
		})

		// #ifdef H5
		var modal = document.querySelector('.uni-modal')
		modal.style.maxWidth = '6rem'
		modal.style.boxSizing = 'border-box'
		var bd = document.querySelector('.uni-modal__bd')
		bd.style.fontSize = '.24rem'
		var btns = document.querySelectorAll('.uni-modal__btn')
		btns.forEach(function(btn) {
			btn.style.fontSize = '.24rem'
			btn.style.height = '.7rem'
			btn.style.lineHeight = '.7rem'
		})
		// #endif
	},
	fetchUserInfo() {
		if (this.isLogin()) {
			return uni.getStorageSync('userInfo');
		} else {
			return null;
		}
	},
	startRefreshTokenHeartbeat() {
		if (this.isLogin()) {
			if (store.refreshTokenTimerID == null) {
				store.refreshTokenTimerID = setInterval(() => {
					this.requestHeartbeat()
				}, 1000 * 30)
			} else {
				this.stopRefreshTokenHeartbeat()
			}
		}
	},
	stopRefreshTokenHeartbeat() {
		clearInterval(store.refreshTokenTimerID)
		store.refreshTokenTimerID = null
		uni.removeStorageSync('refreshTokensessionID')
	},
	requestHeartbeat() {
		if (this.isLogin()) {
			userHeartbeat({
				'session_id': store.tokenSessionID
			}).then(resData => {
				if (resData.meta.code == 0) {
					var newToken = resData.data.token;
					if (newToken.length > 0) {
						uni.setStorageSync('token', newToken)
					}
				} else {
					this.stopRefreshTokenHeartbeat()
				}
			})
		} else {
			this.stopRefreshTokenHeartbeat()
		}
	},
	formatTime(time) {
		if (typeof time !== 'number' || time < 0) {
			return time
		}

		var hour = parseInt(time / 3600)
		time = time % 3600
		var minute = parseInt(time / 60)
		time = time % 60
		var second = time

		return ([hour, minute, second]).map(function(n) {
			n = n.toString()
			return n[1] ? n : '0' + n
		}).join(':')
	},
	/*
	 * @description 生成年月日
	 */
	getFormatDay(time) {
		if (!time) {
			return "-";
		}
		if (typeof(time) == 'string') {
			time = time.replace(/-/g, "/")
		}
		var date = new Date(time);
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var times = strDate + '/' + month + '/' + date.getFullYear()
		return times;
	},

	/*
	 * @description 生成月日年
	 */
	getFormatDayMDY(time) {
		if (!time) {
			return "-";
		}
		if (typeof(time) == 'string') {
			time = time.replace(/-/g, "/")
		}
		var date = new Date(time);
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var times = month + '/' + strDate + '/' + date.getFullYear()
		return times;
	},

	getTimestampMDY(time) {
		if (!time) {
			return "-";
		}
		if (typeof(time) == 'string') {
			time = time.replace(/-/g, "/")
		}
		var date = new Date(time);
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		var hours = date.getHours();
		var Minutes = date.getMinutes();
		var Seconds = date.getSeconds();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		if (hours >= 0 && hours <= 9) {
			hours = "0" + hours;
		}
		if (Minutes >= 0 && Minutes <= 9) {
			Minutes = "0" + Minutes;
		}
		if (Seconds >= 0 && Seconds <= 9) {
			Seconds = "0" + Seconds;
		}
		var times = month + '/' + strDate + '/' + date.getFullYear() + ' ' + hours + ':' + Minutes + ':' + Seconds;
		return times;
	},

	getTimestamp(time) {
		if (!time) {
			return "-";
		}
		if (typeof(time) == 'string') {
			time = time.replace(/-/g, "/")
		}
		var date = new Date(time);
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		var hours = date.getHours();
		var Minutes = date.getMinutes();
		var Seconds = date.getSeconds();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		if (hours >= 0 && hours <= 9) {
			hours = "0" + hours;
		}
		if (Minutes >= 0 && Minutes <= 9) {
			Minutes = "0" + Minutes;
		}
		if (Seconds >= 0 && Seconds <= 9) {
			Seconds = "0" + Seconds;
		}
		var times = strDate + '/' + month + '/' + date.getFullYear() + ' ' + hours + ':' + Minutes + ':' + Seconds;
		return times;
	},
	/*
	 * @description 生成年月日
	 */
	getDay(time) {
		if (!time) {
			return "-";
		}
		if (typeof(time) == 'string') {
			time = time.replace(/-/g, "/")
		}
		var date = new Date(time);
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var times = date.getFullYear() + '-' + month + '-' + strDate
		return times;
	},
	/*
	 * @description 获得
	 */
	getDayList(num) {
		let date = {}
		let time = new Date()
		if (num == 1) {
			date = {
				start_date: this.getDay(time),
				end_date: this.getDay(time)
			}
		} else if (num == 2) {
			let day = time.setTime(time.getTime() - 24 * 60 * 60 * 1000)
			date = {
				start_date: this.getDay(day),
				end_date: this.getDay(day)
			}
		} else if (num == 3) {
			// let startDay = time.setDate(time.getDate() - time.getDay() + 1)
			// let endDay = time.setDate(time.getDate() + 6)
			let day = time.getDay()
			let startDay = 0
			let endDay = 0
			if (day == 0) {
				startDay = time.setDate(time.getDate() - time.getDay() - 6)
			} else {
				startDay = time.setDate(time.getDate() - time.getDay() + 1)
			}
			endDay = time.setDate(time.getDate() + 6)
			date = {
				start_date: this.getDay(startDay),
				end_date: this.getDay(endDay)
			}
		} else if (num == 4) {
			let startDay = time.setDate(time.getDate() - time.getDay() - 6)
			let endDay = time.setDate(time.getDate() - time.getDay() + 7)
			date = {
				start_date: this.getDay(startDay),
				end_date: this.getDay(endDay)
			}
		} else if (num == 5) {
			let startDay = time.setDate(1)
			let endDay = time.setMonth(time.getMonth() + 1)
			endDay = time.setDate(0)
			date = {
				start_date: this.getDay(startDay),
				end_date: this.getDay(endDay)
			}
		} else if (num == 6) {
			let startDay = time.setMonth(time.getMonth() - 1)
			startDay = time.setDate(1)
			let endDay = time.setMonth(time.getMonth() + 1)
			endDay = time.setDate(0)
			date = {
				start_date: this.getDay(startDay),
				end_date: this.getDay(endDay)
			}
		} else if (num == 7) {
			let startDay = time.setMonth(time.getMonth() - 2)
			startDay = time.setDate(1)
			let endDay = time.setMonth(time.getMonth() + 1)
			endDay = time.setDate(0)
			date = {
				start_date: this.getDay(startDay),
				end_date: this.getDay(endDay)
			}
		}
		return date
	},
	/*
	 * @description 生成时间戳
	 */
	timestamp() {
		var date = new Date();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		var hours = date.getHours();
		var Minutes = date.getMinutes();
		var Seconds = date.getSeconds();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		if (hours >= 0 && hours <= 9) {
			hours = "0" + hours;
		}
		if (Minutes >= 0 && Minutes <= 9) {
			Minutes = "0" + Minutes;
		}
		if (Seconds >= 0 && Seconds <= 9) {
			Seconds = "0" + Seconds;
		}
		var times = date.getFullYear() + '' + month + '' + strDate + '' + hours + '' + Minutes + '' + Seconds;
		return times;
	},
	/*
	 * @description 计算两个时间之间的时间差 多少天时分秒
	 * @param endTime 结束时间
	 */
	intervalTime(beginTime, endTime) {
		let start = beginTime;
		let end = endTime
		if (beginTime < endTime) {
			start = beginTime;
			end = endTime;
		} else {
			start = endTime;
			end = beginTime;
		}
		var date3 = (end - start) * 1000; //时间差的毫秒数
		//计算出相差天数
		var days = Math.floor(date3 / (24 * 3600 * 1000));
		//计算出小时数
		var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
		var hours = Math.floor(leave1 / (3600 * 1000));

		//计算分钟数
		var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
		var minutes = Math.floor(leave2 / (60 * 1000));

		//计算秒数
		var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
		var seconds = Math.round(leave3 / 1000);
		return days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
	},

	/**
	 * 计算2个时间戳
	 * @param {Object} startTime
	 * @param {Object} endTime
	 */

	calculateTimeDifference(startTime, endTime) {
		const difference = endTime - startTime;
		const hours = Math.floor(difference / (1000 * 60 * 60));
		const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((difference % (1000 * 60)) / 1000);

		return hours + ':' + minutes + ':' + seconds;
	},

	isTimestampInMilliseconds(timestamp) {
		return timestamp.toString().length === 13;
	},

	isTimestampInSeconds(timestamp) {
		return timestamp.toString().length === 10;
	},



	/*
	 * @description 判读是否为外链
	 * @param path
	 * @returns {boolean}
	 */
	isExternal(path) {
		return /^(https?:|mailto:|tel:)/.test(path);
	},
	/**
	 * @description 校验密码是否小于6位
	 * @param str
	 * @returns {boolean}
	 */
	isPassword(str) {
		return str.length >= 6;
	},

	/**
	 * @description 判断是否为数字
	 * @param value
	 * @returns {boolean}
	 */
	isNumber(value) {
		const reg = /^[0-9]*$/;
		return reg.test(value);
	},

	/**
	 * @description 判断是否是小写字母
	 * @param str
	 * @returns {boolean}
	 */
	isLowerCase(str) {
		const reg = /^[a-z]+$/;
		return reg.test(str);
	},

	/**
	 * @description 判断是否是大写字母
	 * @param str
	 * @returns {boolean}
	 */
	isUpperCase(str) {
		const reg = /^[A-Z]+$/;
		return reg.test(str);
	},

	/**
	 * @description 判断是否是大写字母开头
	 * @param str
	 * @returns {boolean}
	 */
	isAlphabets(str) {
		const reg = /^[A-Za-z]+$/;
		return reg.test(str);
	},

	/**
	 * @description 判断是否是字符串
	 * @param str
	 * @returns {boolean}
	 */
	isString(str) {
		return typeof str === "string" || str instanceof String;
	},

	/**
	 * @description 判断是否是数组
	 * @param arg
	 * @returns {arg is any[]|boolean}
	 */
	isArray(arg) {
		if (typeof Array.isArray === "undefined") {
			return Object.prototype.toString.call(arg) === "[object Array]";
		}
		return Array.isArray(arg);
	},

	/**
	 * @description 判断是否是手机号
	 * @param str
	 * @returns {boolean}
	 */
	isPhone(str) {
		const reg = /^1\d{10}$/;
		return reg.test(str);
	},

	/**
	 * @description 判断是否是身份证号(第二代)
	 * @param str
	 * @returns {boolean}
	 */
	isIdCard(str) {
		const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
		return reg.test(str);
	},

	/**
	 * @description 判断是否是邮箱
	 * @param str
	 * @returns {boolean}
	 */
	isEmail(str) {
		const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		return reg.test(str);
	},

	/**
	 * @description 判断是否中文
	 * @param str
	 * @returns {boolean}
	 */
	isChina(str) {
		const reg = /^[\u4E00-\u9FA5]{2,4}$/;
		return reg.test(str);
	},

	/**
	 * @description 判断是否为空
	 * @param str
	 * @returns {boolean}
	 */
	isNull(str) {
		return (
			str == null ||
			false ||
			str === "" ||
			str.trim() === "" ||
			str == undefined ||
			str.toLocaleLowerCase().trim() === "null"

		);
	},

	/**
	 * @description 判断是否为固话
	 * @param str
	 * @returns {boolean}
	 */
	isTel(str) {
		const reg = /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
		return reg.test(str);
	},

	/**
	 * @description 判断是否为数字且最多两位小数
	 * @param str
	 * @returns {boolean}
	 */
	isNum(str) {
		const reg = /^\d+(\.\d{1,2})?$/;
		return reg.test(str);
	}
}