/*
 * @Author: xgj
 * @since: 2022-08-30 20:25:00
 * @lastTime: 2022-09-03 07:05:44
 * @LastAuthor: xgj
 * @FilePath: /umi-admin/src/utils/config.js
 * @message: 
 */
export default {
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:7001' : 'http://124.222.170.81',
  webUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8001/#/Exchange/' : 'http://pick.yystart.com/mobile/#/Exchange/',
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:7001/' : 'http://124.222.170.81/'
};
