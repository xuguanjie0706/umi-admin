import request from '../../utils/request';
const gateway = 'weixin';
/**
 * @memberof apis
 * @description: PC支付接口
 * @function getPayWeb
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const getPayWeb = (data = {}) => {
  return request.post({
    url: 'getPayWeb',
    data,
    gateway
  });
};
