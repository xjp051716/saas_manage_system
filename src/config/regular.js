export default {
  // 中文 大小写字母 数字
  isNumber_AZ_Chinese(val) {
    return /^[a-zA-Z\d\u4e00-\u9fa5]+$/.test(val);
  },
  // 数字 大小写字母 下划线
  isNumber_AZdwon(val){
    return /^[0-9a-zA-Z_]+$/.test(val);
  },
  // 数字 大小写字母
  isNumber_AZ(val) {
    return /^[a-zA-Z\d]+$/.test(val);
  },
  // 座机
  isLandline(val) {
    return /^0\d{3}-\d{7,8}$/.test(val);
  },
  // 手机号
  isPhone(val) {
    return /^1[3-9]\d{9}$/.test(val);
  },
  // 数字
  isNumber(val) {
    return /^[0-9]*$/.test(val);
  },
  // 邮箱
  isEmail(val) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(val);
  },
  // 两位小数
  isDecimal(value) {
    return /^\d+\.?\d{0,2}$/.test(value);
  },
  // 数字或横线 11-15个字符
  customerPhone(value) {
    return /^[\d\-]{11,15}$/.test(value);
  }
}