import http from '@/common/uni.interface.js';

//运营中心取列表
export function suporteGetList(params){
	return http.get('/api/message/getlist', params)
}

//运营中心取详细内容
export function suporteGetdetailed(params){
	return http.get('/api/message/getdetailed', params)
}
