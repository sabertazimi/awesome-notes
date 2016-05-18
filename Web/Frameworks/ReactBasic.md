<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [React Basic Notes](#react-basic-notes)
	- [MVC模式](#mvc模式)
		- [Controller](#controller)
		- [Best Practice](#best-practice)

<!-- /TOC -->!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [React Basic Notes](#react-basic-notes)
	- [MVC模式](#mvc模式)
		- [Controller](#controller)
		- [Best Practice](#best-practice)

<!-- /TOC -->

# React Basic Notes

## MVC模式

### Controller

- 处理请求的参数
- 渲染和重定向
- 选择Model和Service
- 处理Session和Cookies

### Best Practice

- 组件细分化
- 组件
  - 只传入必要的props
  - 使用immutablejs或者react.addons.update实现不可变数据结构
  - 结合React.addons.PureRenderMixin来减少reRender
- 在shouldComponentUpdate中优化组件减少reRender
- 使用context
- 少做dom操作，始终让UI能够基于State还原
- 在store和action中不dom操作或者访问window.属性，只与数据打交道
- 推荐使用ES6
- npm的debug包，log组件渲染的每个步骤和动作

## Components/Plugins

### Documents

-   [Blog Generator](https://github.com/gatsbyjs/gatsby)
-   [React Built In Editor](https://github.com/facebook/draft-js)

### UI

-   [React Animation npm install react-set-animate --save](https://github.com/FunctionFoundry/react-set-animate)
-   [React Material UI](https://github.com/callemall/material-ui)

#### Charts

-   [React Chartjs](https://github.com/jhudson8/react-chartjs)

#### Search Bar

-   https://github.com/searchkit/searchkit

#### Mouse

-   [React Draftjs](https://github.com/draft-js-plugins/draft-js-plugins)

### Testing

-   [React Testing Utilities](https://github.com/airbnb/enzyme)
