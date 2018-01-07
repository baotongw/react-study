## Flux结构规范

1. View: 视图层
2. Action: 动作，视图层发出的消息
3. Dispatcher: 用来接收Actions、执行回调函数
4. Store: 用来存放应用状态，一旦发生变动，就梯形Views要更新页面

[Flux流程图](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016011503.png)

Flux的特点是数据的单向流动

1. 用户访问View
2. View 发出用户的Action
3. Dispatcher收到Action，要求Store进行相应的更新
4. Store更新后，发出一个change事件
5. View收到change事件后，更新页面