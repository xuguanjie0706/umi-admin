import request from '../../utils/request';
const gateway = 'picture';
/**
 * @memberof apis
 * @description: 描述方法
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
 * @description: 描述方法
 * @function provinces
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const pagesimple = (data = {}) => {
  return request.post({
    url: 'pagesimple',
    data,
    gateway
  });
};


/**
 * @memberof apis
 * @description: 描述方法
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


/**
 * @memberof apis
 * @description: 描述方法
 * @function editoradd
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const getsomebysimple = (data = {}) => {
  return request.post({
    url: 'getsomebysimple',
    data,
    gateway
  });
};

/**
 * @memberof apis
 * @description: 描述方法
 * @function Delete
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const remove = (data = {}) => {
  return request.post({
    url: 'remove',
    data,
    gateway
  });
};
