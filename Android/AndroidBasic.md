
# Android Framework

## Dalvik virtual machine
1. register-based machine
基于寄存器(不写入内存)
2. minimizeing instruction diapath and memory accesses
最小化指令分配黑内存访问
3. giving more efficient instruction stream(a lot more semantic content)
提供更加高效的指令流

## Basic Building Blocks
1. Activity(Managed by activity stack)
2. Service(Running in the background;with no UI)
3. Broadcast Receiver(Can invoke(调用) activity;with no UI)
4. Content Provider(accessing and managing application data)

---
    
# UI Design

> N activities can respond to a particular intent:
Android will pop(弹出) up a little dialogue list(对话框) to user showing application icon defining the intent

当有多个活动可相应某个特定意图时，系统将会弹出对话框提示用户选择一个应用的活动或者设定默认值(default)

e.g web browsers

```html
<intent-filter>
<action android:name="android.intent.action.MAIN" />
<category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
```

## Layout
### Basic
- android:layout\_weight
自适配布局

## Component
View(ViewGroup): e.g button、textbox(文本框)、checkbox(复选框)

## Drawable
1. 修改特定组件的背景颜色
```java
Resources myColor=getBaseContext().getResources();
//getBaseContext()获得基础Context
//getResources()获得资源
Drawable color_M=myColor.getDrawable(R.color. lightgreen );
//由资源 myColor来获得Drawable
R.color.lightgreen是颜色值的ID引用
text.setBackgroundDrawable(color_M);
//设置背景
```

---

# NetWork                     
Networked Apps
1. Network latency(网络延迟)——UI thread seperated from data loading thread
2. Battery drain(电池耗尽)
3. Intermittent service(中断服务)

---

# DataBase

## Basic Operator

1. 创建一个新的数据库并返回一个 SQLiteDatabase 对象
```java
Context.createDatabase(String name,int version ,int mode,CursorFactory factory);
```
2. 删除数据库
```java
this.deleteDatabase("myDatabase.db");
```
3. 打开数据库
```java
SQLiteDatabase my_DataBase = 
this.openOrCreateDatabase("myDateBase.db",MODE_PRIVATE , null);
my_DataBase.close();
```
4. 非查询SQL指令
```java
//创建一个名为"test"并带两个参数的表
my_DataBase.execSQL("CREATE TABLE test (_id INTEGER PRIMARY KEY,
someNumber INTERGER);");
//在数据库中插入一个元组
my_DataBase.execSQL("INSERT INTO test (_id,someNumber) values(1,8);");
//删除表
my_DataBase.execSQL("DROP TABLE test");
```
5. 查询SQL指令-游标Cursors
```java
//为了创建一个Cursor(游标),必须执行一个查询,要么通过SQL使用rawQuery()方法
//或是更精心设计的方法,像query()方法
Cursor cur=my_DataBase.rawQuery("SELECT * FORM test", null);
if(cur!=null){//游标不为空
//返回给定名称的列的基于0开始的index,如果该属性列不存在则返回-1
//通过它们的index来检索属性值
int numColumn=cur.getColumnIndex("someNumber");
if(cur.moveToFirst()){
//cur.moveToFirst()让游标指向第一行,如果游标指向第一行,则返回true
do {
int num=cur.getInt(numColumn);//获得当前行该属性的值
/*Cursor提供了不同的方法来回索不同的数据类型
例如getInt(int index)/getString(int index)等等*/
/*做一些事情*/
} while (cur.moveToNext());
/*游标移动到下一行,如果游标已经通过了结果集中的最后,
即没有行可以移动时,则返回false*/
//其他可能移动的是 previous() 和first()方法
}
}
```

---

