// utils/rem.js

export function initRem() {
	if (typeof document === 'undefined') return // 确保 App 环境不出错

	const docEl = document.documentElement

	function setRem() {
		let width = docEl.clientWidth
		if (width > 780) width = 780 // 设计稿最大宽度限制
		const rem = width / 24 // 设计稿等比换算
		docEl.style.fontSize = rem + 'px'
	}

	setRem()

	window.addEventListener('resize', setRem)
	
	window.addEventListener('pageshow', e => {
		if (e.persisted) setRem()
	})

	document.addEventListener('DOMContentLoaded', function() {
		document.body.style.fontSize = 20 * (window.devicePixelRatio || 1) + 'px'
	})
}