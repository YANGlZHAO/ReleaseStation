// api/jsonbin-base.js

/**
 * 获取 JSONBin 中的数据（通用函数）
 * @param {string} binId - JSONBin 的 Bin ID
 * @param {string} [apiKey] - 可选私有密钥
 * @returns {Promise<any>}
 */
export function getJsonBinData(binId, apiKey) {
  const url = `https://api.jsonbin.io/v3/b/${binId}/latest?t=${Date.now()}`;
  const headers = apiKey ? { 'X-Master-Key': apiKey } : {};

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method: 'GET',
      header: headers,
      success: (res) => {
        if (res.statusCode === 200 && res.data && res.data.record) {
          resolve(res.data.record);
        } else {
          console.error('JSONBin 返回异常：', res);
          resolve(null);
        }
      },
      fail: (err) => {
        console.error(`获取 Bin ${binId} 数据失败：`, err);
        resolve(null);
      }
    });
  });
}
