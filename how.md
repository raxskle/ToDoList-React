# 实现方案
一个数组放所有item，需要增删查改，将该数组存入localStorage
item ={
  id：Date.now(),
  text: "",
  isFinished: false,
}

#### 三种筛选模式

localstorage存筛选模式

showItems函数展示特定的items

一进页面就showItems，修改模式也showItems

不同筛选模式下从数组中拿不同的数据

#### 显示总剩余items

监听增删改，重新获取未完成的数量
