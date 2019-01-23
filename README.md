# Asteroids

一个使用手机作为手柄，操作Asteroids游戏中的飞机的多屏互动游戏。

多屏互动利用第三方库socket.io, 实现手机实时控制电脑网页游戏。用户先在网页上打开游戏，用手机扫描电脑屏幕的二维码进行手机与电脑的连接。

using a phone as a game controller to play a 90s nostalgic arcade game -Asteroids which the game interface shows on personal computer

# 成果展示

[成果展示（视频需VPN）](http://coriqu.com/portfolio/project/gamedesign.html)



# 使用方法
```
## 安装依赖
npm i

## 运行程序
npm t
```
本地打开 `localhost:8080` ,扫码进入即可看到效果，同时在命令行会看到链接信息。

# 第三方库
1. socket.io 客户端和服务端
2. express 框架
3. p5.js, p5.play.js, qrcode.js

