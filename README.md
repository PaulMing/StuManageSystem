


原生 -> 框架;//开发思想的转变，但并非所有项目都适合框架开发，应用复杂度与框架复杂度的权衡，对于该项目原生jQuery实现便很nice;  

技术栈：jQuery、Vue、Axios[axios.get().then().catch();]  


基础配置：  
1.jQuery版：下载jQuery即可；  
2.Vue版：vue-cli搭建、vue-router、vuex、axios;  


开发：增/删/查/改、分页 -> 性能优化 -> 版本对比学习  
1.jQuery版本：结构样式、逻辑操作;//立即执行函数+模式增强 -> 参考jQuery源码；  
2.Vue版本：组件化开发(视图组件、公共组件、页面小组件)、vuex状态共享实现跨组件通信、Axios库获取后台接口数据；  
3.版本对比：  
MVVM框架开发的优势很明显：  
(1).节省性能，操作虚拟DOM，减少真实dom的操作；  
(2).视图层和逻辑操作是分离的，同步更新;  
(3).项目扩展性、维护性更好；  



项目细节介绍：  
1.页面切换：  
(1).可使用动画例如fadeout();fadeIn();   
(2).数据动态渲染；  
(3).a标签跳转(由于其跳转会刷新页面原生也很少使用)；  
(4).vue中使用路由切换(不会刷新页面)；  
除此还涉及到页面切换时的样式改变，原生可采取“都清除，再添加”，也可采取“先给自己添加，然后找到兄弟节点有该类名，清除即可”，vue中巧妙应用view-router的类名，灵活添加样式即可；  
2.新增学生：  
表单数据收集$().serialize(); -> 发送后台 -> 自动触发"获取表格数据"，渲染页面即可；  
获取表格数据/渲染：获取到数据后，原生渲染方法：遍历数据 -> 字符串拼接 -> innerHTML/html();实际也可以采取每次遍历append();插入，以及使用文档碎片节点，但是"字符串拼接"的性能是最优的，所以也一直使用其；  
Vue渲染方法：获取数据后采取v-for指令+插值语法进行遍历渲染，指令使用的很灵活，例如原生display:none/block; vue中使用v-if；  
3.搜索功能：获取到value值传入后台接口即可，不需要获取到数据后再进行处理；  
4.翻页功能：  
(1).扩展翻页插件：立即执行函数形成闭包，模式增强，return this保证链式调用，使用面向对象的方式扩展【构造函数+原型，原型的使用原因:[1].可以方便获取this上的数据;[2].节省空间，如果直接写this.func=xxx;每次创建对象都有新方法，耗费性能】实际项目简单时可直接使用函数，或者函数传参来解决；  
(2).翻页功能在获取表格数据的时候使用 [两个地方用到：获取表格数据、搜索数据 -> 因为后台给的接口不同，正常开发中就是一个接口]，后台接口返回的是cont数量，我们根据pagesize，来确定xx页；后台接口需要curpage, pagesize，翻页插件需要curpage, fullpage(cont/pagesize)，后续进行翻页操作，重新调用获取表格数据接口即可；  



推荐项目[star]：  
1.简书笔记codeing、LevelOne阶段demo汇总[ES3/5/6/DOM/BOM/JQuery/网络/H5/CSS3/模块化(CommonJS/AMD/CMD/ES6Mod)/构建工具(Webpack/Gulp)/你不知道的JS(原理篇/函数式编程篇/数学计算篇)/Git/GitHub]  
URL:https://github.com/PaulMing/LevelOnecodeing    
2.LevelTwo阶段demo汇总[微信小程序/设计原则|模式/Vue/React/NodeJS(Express/Koa)/数据库(Mysql/MongoDB/Redis)/前端安全/性能优化/数据结构与算法]  
URL:https://github.com/PaulMing/LevelTwocodeing
