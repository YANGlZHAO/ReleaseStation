import http from '@/common/uni.interface.js';


//获取第三方App列表
export function getClientGetThirdApp(params){
	return http.get('/api/banner/clientGetThirdApp', params)
}


//获取悬浮列表
export function getClientGetHover(params){
	return http.get('/api/banner/clientGetHover', params)
}


//获取广告列表
export function getClientGetBanners(params){
	return http.get('/api/banner/clientGetBanners', params)
}


//获取平台列表
export function getClientGetPlatformList(params){
	return http.post('/api/platform/clientGetPlatformList', params)
}


//获取安装包和书签
export function getClientGetPackageInfo(params){
	return http.get('/api/packageManager/clientGetPackageInfo', params)
}