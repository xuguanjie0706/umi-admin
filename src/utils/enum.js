/*
 * @Author: xgj
 * @since: 2022-08-30 20:25:00
 * @lastTime: 2022-09-03 02:14:53
 * @LastAuthor: xgj
 * @FilePath: /umi-admin/src/utils/enum.js
 * @message: 
 */

/**
 * @namespace enum
 */




/**
 * @memberof enum
 * @description 实物状态
 * @function STATUS_MATTER_ENUM
 * @param {number}  1 无
 * @param {number}  2 元
 * @param {number}  3 天
 */

export const STATUS_MATTER_ENUM = {
  1: '正常',
  2: '卖出',
  3: '销毁',
};

/**
 * @memberof enum
 * @description 订单类型
 * @function STATUS_ORDER_ENUM
 * @param {number}  1 买入
 * @param {number}  2 卖出
 */

export const STATUS_ORDER_ENUM = {
  1: '买入',
  2: '卖出',
};

/**
 * @memberof enum
 * @description 订单类型
 * @function STATUS_ORDER_ENUM
 * @param {number}  1 买入
 * @param {number}  2 卖出
 */

export const USER_STATUS_ENUM = {
  1: "管理员",
  2: "fdad"
}
/**
 * @memberof enum
 * @description 快递公司
 * @function SEND_NAME_ENUM
 * @param {number}  1 无
 * @param {number}  2 元
 * @param {number}  3 天
 */
export const SEND_NAME_ENUM = {
  1: 'EMS快递',
  2: '申通快递',
  3: '顺丰快递',
  4: '圆通快递',
  5: '韵达快递',
  6: '百世汇通快递',
  7: '天天快递',
  8: '中通快递',
  9: '宅急送快递',
  10: '其他快递',
};
