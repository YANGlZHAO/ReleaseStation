// api/jsonbin.js

import { getJsonBinData } from '../common/jsonbin-base.js';

// 可选统一 API 密钥（私有 bin 时填写）
const API_KEY = ''; // 如无则留空字符串

// 站点列表
export function getFcPGList() {
  return getJsonBinData('6895a3fd203a8b52b5e18c1b', API_KEY);
}

// 首页轮播图
export function getFcSwiperList() {
  return getJsonBinData('6895a477203a8b52b5e18c7b', API_KEY);
}


// 第三方应用跳转
export function applicationJumpLink() {
  return getJsonBinData('687efb98f7e7a370d1ebbf1b', API_KEY);
}



