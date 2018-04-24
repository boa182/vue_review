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
- vue init <template-name> <project-name>
```
  init:表示我要用vue-cli来初始化项目
  <template-name>:表示模板名称，这里用了webpack，一个全面的webpack+vue-loader的模板。
  <project-name>:表示项目名称
```

3.**配置scss**
- 第一步
```
npm install node-sass --save-dev
npm install sass-loader --save-dev
```
- 第二步 打开webpack.base.config.js在loaders里面加上
```
{
  test: /\.scss$/,
  loader: ["style", "css", "sass"]
}
```
- 第三步，在需要用到scss的地方写上
```html
<style lang="scss" scoped>
#app{
  height: 100px;
  width: 100px;
  background: #ccc;
}
</style>
```