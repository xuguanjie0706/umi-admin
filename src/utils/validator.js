

/**
 * 正则验证
 * @namespace Validator
 */

/**
 * @memberof Validator
 * @description 手机号验证
 * @return {Promise}
 */
export const phoneValidator = (rule, value) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
    return Promise.reject('请输入正确的手机号');
  }
  return Promise.resolve();
};

/**
 * @memberof Validator
 * @description 身份证验证
 * @return {Promise}
 */
export const peopleCardValidator = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (value === '') {
      resolve();
    }
    if (
      !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
        value,
      )
    ) {
      reject('请输入正确的身份证');
    }
    resolve();
  });
};

/**
 * @memberof Validator
 * @description 银行卡验证
 * @return {Promise}
 */
export const bankCardValidator = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (!/^([1-9]{1})(\d{15}|\d{18})$/.test(value)) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('请输入正确的银行卡号');
    }
    resolve();
  });
};

/**
 * @memberof Validator
 * @description 姓名验证
 * @return {Promise}
 */
export const nameValidator = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (!/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z_]){1,20}$/.test(value)) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('请输入正确的姓名或名称');
    }
    resolve();
  });
};

/**
 * @memberof Validator
 * @description 昵称验证
 * @return {Promise}
 */
export const nicknameValidator = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (!/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z_]){1,8}$/.test(value)) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('只能输入汉字或英文，且不能超过8个');
    }
    resolve();
  });
};

/**
 * @memberof Validator
 * @description 密码验证
 * @return {Promise}
 */
export const numberPasswordValidator = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (!/^([0-9]){6}$/.test(value)) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('密码只能6位，且只能是数字');
    }
    resolve();
  });
};

/**
 * @memberof Validator
 * @description Url验证
 * @return {Promise}
 */
export const UrlValidator = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (!/^(http:\/\/|https:\/\/)\S{6}/.test(value)) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('请上传真确的url');
    }
    resolve();
  });
};
