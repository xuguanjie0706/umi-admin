export default {
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:7010/art/' : 'http://pick.yystart.com/art/',
  webUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8001/#/Exchange/' : 'http://pick.yystart.com/mobile/#/Exchange/',
  // url: process.env.NODE_ENV === 'development' ? 'http://106.14.182.16:7001/' : 'http://localhost:8000/'
};
