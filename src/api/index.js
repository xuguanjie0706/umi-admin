/*
 * @Author: xgj
 * @since: 2020-06-08 13:52:17
 * @lastTime: 2020-11-04 15:24:30
 * @LastAuthor: xgj
 * @FilePath: /umi-admin/src/api/index.js
 * @message:
 */

/**
 * 网络请求接口
 * @namespace apis
 */


import * as Menu from './modules/Menu';
import * as User from './modules/User';
import * as Role from './modules/Role';
import * as File from './modules/File';
import * as Picture from './modules/Picture';
import * as Config from './modules/Config';
import * as Goods from './modules/Goods';
import * as ExchangeCard from './modules/ExchangeCard';
import * as MemberSetting from './modules/MemberSetting';
import * as Weixin from './modules/Weixin';
import * as PaymentFlow from './modules/PaymentFlow';
import * as Pic from './modules/Pic';
import * as Type from './modules/Type';
import * as Ticket from './modules/Ticket';


export default {
  File,
  Role,
  User,
  Menu,
  Picture,
  Config,
  Goods,
  ExchangeCard,
  MemberSetting,
  Weixin,
  PaymentFlow,
  Pic,
  Type,
  Ticket,
};
