import request from '../../utils/request';
const gateway = 'menu';

/**
 * @memberof apis
 * @description: 查询单个菜单
 * @function getonebysimple
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const getonebysimple = (data = {}) => {
  return request.post({
    url: 'getonebysimple',
    data,
    gateway
  });
};

/**
 * @memberof apis
 * @description: 菜单新增
 * @function editoradd
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const editoradd = (data = {}) => {
  return request.post({
    url: 'editoradd',
    data,
    gateway
  });
};
