// api/jsonbin.js

import { getJsonBinData } from '../common/jsonbin-base.js';

// 可选统一 API 密钥（私有 bin 时填写）
const API_KEY = ''; // 如无则留空字符串

// 站点列表
export function getFcPGList() {
  return getJsonBinData('6878a7a26063391d31af4b3d', API_KEY);
}

// 首页轮播图
export function getFcSwiperList() {
  return getJsonBinData('6878b1f7b0060c7c0b31d950', API_KEY);
}


