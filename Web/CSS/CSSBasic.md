## 属性排序

1. 概述

> 显示属性 -> 自身属性 -> 文本属性

- display
- list-style
- position
- float
- clear
 
- width
- height
- margin
- padding
- border
- background

- color
- font
- text-decoration
- vertical-align
- white-space
- other text
- content

2. 详细

- display
- visibility
- float
- clear

- position
- top
- right
- bottom
- left
- z-index

- width
- min-width
- max-width
- height
- min-height
- max-height
- overflow
- margin
- margin-top
- margin-right
- margin-bottom
- margin-left

- padding
- padding-top
- padding-right
- padding-bottom
- padding-left

- border-width
- border-top-width
- border-right-width
- border-bottom-width
- border-left-width

- border-style
- border-top-style
- border-right-style
- border-bottom-style
- border-left-style

- border-color
- border-top-color
- border-right-color
- border-bottom-color
- border-left-color

- outline

- list-style

- table-layout
- caption-side
- border-collapse
- border-spacing
- empty-cells

- font
- font-family
- font-size
- line-height
- font-weight
- text-align
- text-indent
- text-transform
- text-decoration
- letter-spacing
- word-spacing
- white-space
- vertical-align
- color

- background
- background-color
- background-image
- background-repeat
- background-position

- opacity

- cursor

- content
- quotes

## 命名规范

### 页面结构
- 容器: container
- 页头：header
- 内容：content/container
- 页面主体：main
- 页尾：footer
- 导航：nav
- 侧栏：sidebar
- 栏目：column
- 页面外围控制整体佈局宽度：wrapper
- 左右中：left right center

### 导航
- 导航：nav
- 主导航：mainnav
- 子导航：subnav
- 顶导航：topnav
- 边导航：sidebar
- 左导航：leftsidebar
- 右导航：rightsidebar
- 菜单：menu
- 子菜单：submenu
- 标题: title
- 摘要: summary

### 功能
- 标志：logo
- 广告：banner
- 登陆：login
- 登录条：loginbar
- 注册：register
- 搜索：search
- 功能区：shop
- 标题：title
- 加入：joinus
- 状态：status
- 按钮：btn
- 滚动：scroll
- 标籤页：tab
- 文章列表：list
- 提示信息：msg
- 当前的: current
- 小技巧：tips
- 图标: icon
- 注释：note
- 指南：guild
- 服务：service
- 热点：hot
- 新闻：news
- 下载：download
- 投票：vote
- 合作伙伴：partner
- 友情链接：link
- 版权：copyright

### CSS Files
- 主要的 master.css
- 模块 module.css
- 基本共用 base.css
- 布局、版面 layout.css
- 主题 themes.css
- 专栏 columns.css
- 文字 font.css
- 表单 forms.css
- 补丁 mend.css
- 打印 print.css

## CSS Selector
### pseudo-class-selector
- link

link、visited
- user-action

active、focus、hover
- forms(interfaces)

checked、enabled、disabled
- structural

first-child(此元素为父元素的第一个子元素)、last-child、nth-child(n变量)、only-child

first-of-type、last-of-type、only-of-type
- textual

first-letter、first-line
- positional

Before、after
- fragments

::selection选择器(双冒号)：无前置普通类选择器，匹配用户选取部分

- attribute selector

selector·[attr = ‘“  value ”]   

attr ^=(前端匹配)/$=(尾部匹配)/*=(wild匹配)  “ values ”

## Custom

### 自定义字体

```css
@font-face {
    :call <SNR>105_SparkupNext()
    font-family:mySpecialFont;
    src:url(‘./Colleen.ttf’);

}
selector {
    :call <SNR>105_SparkupNext()
    font-family:mySpecialFont;

}
```

### 自定义动画
transition添加于普通类选择器，transform添加于伪类选择器

## 常用属性
- height:XXvh(viewport height)
- list-style-type/image 改变ul/ol前标记类型
- overflow:visible,hidden,scroll,auto
- box-sizing:content-box(default),border-box
- background:linear-gradient
- font-style:normal,italic,oblique
- font-variant:normal,small-caps(小型大写字母)
- text-align:justify(自适应，左右都无空格)
- position
     - static(使top/bottom/left/right属性无效化)、relative、absolute、fixed(不受滑动条影响)
     - z-index：数值越大，处于可视的优先级越大
