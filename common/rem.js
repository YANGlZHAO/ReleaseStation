// src/utils/rem.js
function setRemBase() {
  const baseSize = 16; // 1rem = 16px
  const designWidth = 375; // 设计稿宽度
  const minFontSize = 16; // 设置 rem 最小值
  const maxFontSize = 35; // 设置 rem 最大值
  const scale = document.documentElement.clientWidth / designWidth;
  const fontSize = Math.min(Math.max(baseSize * scale, minFontSize), maxFontSize);

  document.documentElement.style.fontSize = fontSize + "px";
}

// 初始化
setRemBase();

// 监听窗口变化，防抖优化
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(setRemBase, 0);
});
