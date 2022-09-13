module.exports = {

    devServer:{ // 代理服务器 想后端发请求
        proxy:{
            '/api':{
                target:'http://localhost:3000',
                changeOrigin:true,
                // 取出/api到后端就没有/api
                pathRewrite:{
                    '^/api':'' // 命中代理后, 去掉/api
                }
            }
        }
    }
}