import http from '@/common/uni.interface.js';

//获取安装包
export function getPcdownload(){
	return http.get('/api/attachment_package/getlist')
}