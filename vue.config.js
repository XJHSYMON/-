const {defineConfig} = require("@vue/cli-service");
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = defineConfig({
    transpileDependencies: true,
    outputDir: process.env.outputDir,
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: "http://localhost:5000/",
                // target: "https://letoy.tech/",
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                },
            }, '/localFileAPI': {
                target: "http://localhost:8001/files/",
                // target: "https://letoy.tech/",
                changeOrigin: true,
                pathRewrite: {
                    '/localFileAPI': ''
                },
            },
        },
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')

        // 清除已有的所有 loader。
        svgRule.uses.clear()

        // 添加 'vue-svg-loader' 仅用于 'src/assets/svg/component' 文件夹。
        config.module.rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/svg/component'))
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader')

        // 对于其他 SVG 使用 file-loader 或 url-loader。
        svgRule.exclude.add(resolve('src/assets/svg/component'))
        svgRule.use('file-loader')
            .loader('file-loader')
    }
});

