import http from '@/common/uni.interface.js';

//登录
export function login(params){
	return http.post('/api/member/login', params)
}

//获取查询条件列表
export function getGamesiteConditions(params){
	return http.get('/api/gamesite/conditions', params)
}

//根据条件获取游戏网站列表
export function getGamesiteList(params){
	return http.get('/api/gamesite/list', params)
}


