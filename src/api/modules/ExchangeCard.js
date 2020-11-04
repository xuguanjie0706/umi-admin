import request from '../../utils/request';
const gateway = 'exchangeCard';
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

/**
 * @memberof apis
 * @description: 批量新增
 * @function addSome
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const addSome = (data = {}) => {
  return request.post({
    url: 'addSome',
    data,
    gateway
  });
};


/**
 * @memberof apis
 * @description: 定制化分页带详情
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
 * @description: 导入
 * @function importData
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const importData = (data = {}) => {
  return request.post({
    url: 'importData',
    data,
    gateway
  });
};

/**
 * @memberof apis
 * @description: 导出
 * @function deriveData
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const deriveData = (data = {}) => {
  return request.post({
    url: 'deriveData',
    data,
    gateway
  });
};
/**
 * @memberof apis
 * @description: 导出地址信息
 * @function deriveAddressData
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const deriveAddressData = (data = {}) => {
  return request.post({
    url: 'deriveAddressData',
    data,
    gateway
  });
};

/**
 * @memberof apis
 * @description: 卡片统计
 * @function statistics
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const statistics = (data = {}) => {
  return request.post({
    url: 'statistics',
    data,
    gateway
  });
};
/**
 * @memberof apis
 * @description: 卡片统计批量修改
 * @function statisticsUpdate
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const statisticsUpdate = (data = {}) => {
  return request.post({
    url: 'statisticsUpdate',
    data,
    gateway
  });
};
/**
 * @memberof apis
 * @description: 批量修改发货
 * @function orderSend
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const orderSend = (data = {}) => {
  return request.post({
    url: 'orderSend',
    data,
    gateway
  });
};
/**
 * @memberof apis
 * @description: 首页统计商户
 * @function homeStatistics
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const homeStatistics = (data = {}) => {
  return request.post({
    url: 'homeStatistics',
    data,
    gateway
  });
};
/**
 * @memberof apis
 * @description: 首页统计管理员
 * @function homeStatisticsAdmin
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const homeStatisticsAdmin = (data = {}) => {
  return request.post({
    url: 'homeStatisticsAdmin',
    data,
    gateway
  });
};


