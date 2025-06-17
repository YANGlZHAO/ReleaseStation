export default {
  /**
   * 通用跳转方法
   * @param {String} url - 跳转路径，格式：'/pages/index/index'
   * @param {String} type - 跳转方式，可选值："navigateTo"、"redirectTo"、"reLaunch"、"switchTab"、"navigateBack"
   * @param {Number} delta - 当 type 为 navigateBack 时，指定返回的层级
   */
  
  // 方法	        页面栈变化	       适用场景	         是否支持 tabBar
  // navigateTo	       +1	       普通跳转，支持返回	           ❌
  // redirectTo	      替换	        不能返回的跳转	           ❌
  // reLaunch	      清空	         彻底刷新页面	               ✅
  // switchTab	      切换	        tabBar 页面切换	           ✅
  // navigateBack      -n	         返回上个页面	               ✅
  
  navigate({ url, type = "navigateTo", delta = 1 }) {
    if (!url && type !== "navigateBack") {
      console.error("Redirect failed: url cannot be empty");
      return;
    }

    switch (type) {
      case "navigateTo":
        uni.navigateTo({ url });
        break;
      case "redirectTo":
        uni.redirectTo({ url });
        break;
      case "reLaunch":
        uni.reLaunch({ url });
        break;
      case "switchTab":
        uni.switchTab({ url });
        break;
      case "navigateBack":
        uni.navigateBack({ delta });
        break;
      default:
        console.error("error", type);
    }
  }
};
