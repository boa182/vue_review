# project

> 一个用来练习的vue项目

## 如何跑通？
- npm install 
- npm run dev

## 从零开始搭建
1.**安装vue-cli**
- npm install vue-cli -g
- vue -V查看版本号，看是否安装成功

2.**初始化项目**
- vue init template-name project-name
```
  init:表示我要用vue-cli来初始化项目
  <template-name>:表示模板名称，这里用了webpack，一个全面的webpack+vue-loader的模板。
  <project-name>:表示项目名称
```

3.**配置scss/less**
- 因为本项目引入的ui框架是用less的，所以这里就引less
- 第一步
```
npm install less less-loader --save-dev

(如果是sass，如下：)
npm install node-sass --save-dev
npm install sass-loader --save-dev
```
- 第二步 打开webpack.base.config.js在loaders里面加上
```
{
  test: /\.less$/,
  loader: ["style", "css", "less"],
}
(如果是sass，如下：)
{
  test: /\.scss$/,
  loader: ["style", "css", "sass"]
}
```
- 第三步，在需要用到scss/less的地方写上
```html
<style lang="scss/less" scoped>
#app{
  height: 100px;
  width: 100px;
  background: #ccc;
}
</style>

```
- PS：用@import引进来的样式，后面要加';'
```
<style lang="less">
@import 'styles/base.less';
</style>
否则就会报：'missing semi-colon or unrecognised media features on import
```
4.**webpack配置相对路径**
- 在webpack.base.conf.js文件下
```
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': resolve('src'),
      'styles': resolve('src/styles'),
      'assets': resolve('src/assets'),
      'config': resolve('src/config'),
      'store': resolve('src/store'),
      'components': resolve('src/components'),
      'router': resolve('src/router'),
      'page': resolve('src/page'),
      'utility': resolve('src/utility')
    }
  }
```
- 配置后记得重新npm run dev,然后就可以在需要使用的文件里面
```
直接
import 'utility/rem.js'
import router from 'router'
component: () => import('page/home.vue')
而不用写相对路径./
```

## 目录结构
```shell
├─assets                    // 图片资源
|
├─components                // 组件
│  └─common                 // 公共组件
|
├─page                      // 页面
|
├─router                    // vue-router
│  ├─module
|  └─index.js               // 路由入口文件
|
├─store                     // vuex
|
├─styles                    // 样式文件
|
└─utility                   // 公共工具，方法
```