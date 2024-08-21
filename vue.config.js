module.exports = {

  lintOnSave: process.env.NODE_ENV === 'development',

  devServer: {
    
    host: 'localhost',//target,  host
    port: 8081,

    proxy: { // proxy:{'/api':{}},代理器中设置/api,项目中请求路径为/api的替换为target
    
      [process.env.VUE_APP_BASE_API]: {
            ws: false,

            target: 'http://localhost:8899',  //代理地址，这里设置的地址会代替axios中设置的baseURL
      
            changeOrigin: true,// 如果接口跨域，需要进行这个参数配置

            pathRewrite: {
              ['^' + process.env.VUE_APP_BASE_API]: ''
            }
      }
    }
 }
}