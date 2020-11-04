import request from '../../utils/request';
const gateway = 'pic';

/**
 * @memberof apis
 * @description: 查询单个菜单
 * @function getpic
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const getpic = (params = {}) => {
  return request.get({
    url: 'getpic',
    params,
    gateway
  });
};
