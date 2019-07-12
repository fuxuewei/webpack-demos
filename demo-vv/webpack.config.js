var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    // 打包入口  string | object | array
    // entry : './main.js',
    entry : {
        bundle1 : './main1.js',
        bundle2 : './main2.js'
    },
    
    // 定义webpack如何输出的选项
    output : {
        // filename : 'bundle.js'
        filename : '[name].js',  // 文件命名模板 string
        path : path.resolve(__dirname,"dist"),  // 目标路径 string
        publicPath : "/assets/"  //构建文件的输出路径 string
    },

    // 模块相关配置
    module : {
        // 配置模块加载器(loaders)，解析规则
        rules : [
            {
                test : /\.jsx?$/,  // RegExp | string
                include : [ // 必匹配选项
                    path.resolve(__dirname,"app")
                ],
                exclude : [ // 必不匹配选项（优先级高于 test 和 include）
                    path.resolve(__dirname,"app/demo-files")
                ],
                use : {
                    loader : "babel-loader", // 模块上下文解析
                    options : {  //loader的可选项
                        presets: ['es2015', 'react']
                    }
                }
            },
            {
                test : /\.css$/,
                use : [
                    {
                        loader : 'style-loader'
                    },
                    {
                        loader : 'css-loader',
                        options : {
                            module : true
                        }
                    }
                ]
            }
        ]
    },
    // 插件列表
    plugins : [
        new UglifyJsPlugin(),
        new HtmlwebpackPlugin({
            title: 'Webpack-demos',
            filename: 'index.html'
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        })
    ],

    // 引用且不被 webpack 打包的库  array | object | reg
    externals : {
        'data' : 'data',
        "lodash": {
            commonjs: "lodash",//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
            commonjs2: "lodash",//同上
            amd: "lodash",//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);
            root: "_"//如果我们的库在浏览器中使用，需要提供一个全局的变量‘_’，等价于 var _ = (window._) or (_);
      }
    },
    // 解析模块的可选项
    resolve : {
        // 模块查找目录
        modules : [
            'node_modules',
            path.resolve(__dirname,"app")
        ],
        // 用到文件的扩展 
        extensions : ['.js' , '.json' , '.jsx' , '.css'],
        // 模块别名
        alias : {
            module : 'new-module'
        }
    },
    devtools : "source-map", // enum（枚举） 为浏览器开发者工具添加元数据增强调试

}