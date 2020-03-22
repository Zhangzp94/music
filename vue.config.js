module.exports = {
    devServer: {
        proxy: {
            '/goods': {
                target: 'http://localhost:3000',
                //ws: true, //是否自动打开页面
                changeOrigin: true
            },
            '/users': {
                target: 'http://localhost:3000',
                //ws: true, //是否自动打开页面
                changeOrigin: true
            }
        }
    },

}
