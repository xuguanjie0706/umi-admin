import request from '../../utils/request';

const gateway = 'user';
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
 * @function page
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const page = (data = {}) => {
  return request.post({
    url: 'page',
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
 * @function login
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const login = (data = {}) => {
  return request.post({
    url: 'loginAdmin',
    data,
    gateway
  });
};


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

/**
 * @memberof apis
 * @description: 描述方法
 * @function check
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const check = (data = {}) => {
  return request.post({
    url: 'check',
    data,
    gateway
  });
};

/**
 * @memberof apis
 * @description: 商户新增
 * @function addbyself
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const addbyself = (data = {}) => {
  return request.post({
    url: 'addbyself',
    data,
    gateway
  });
};

/**
 * @memberof apis
 * @description: 获取验证码
 * @function getVerfication
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const getVerfication = (data = {}) => {
  return request.post({
    url: 'getVerfication',
    data,
    gateway
  });
};


/**
 * @memberof apis
 * @description: 修改密码
 * @function forget
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const forget = (data = {}) => {
  return request.post({
    url: 'forget',
    data,
    gateway
  });
};

/**
 * @memberof apis
 * @description: 设置过期时间
 * @function renewMember
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const renewMember = (data = {}) => {
  return request.post({
    url: 'renewMember',
    data,
    gateway
  });
};


