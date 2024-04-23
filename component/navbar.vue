<template>
    <aside class="sidebar">
      <ul class="nav">
        <li style="background-color: green;"><router-link style="color: white;" to="/main" >+新增</router-link></li>

        <hr class="file-divider"> <!-- 添加横杠 -->
        <li><router-link to="/main">主页</router-link></li>
        <hr class="file-divider"> <!-- 添加横杠 -->
        <li><router-link to="/page2">我的文件</router-link></li>
        <hr class="file-divider"> <!-- 添加横杠 -->
        <li><router-link to="/page3">已共享</router-link></li>
        <hr class="file-divider"> <!-- 添加横杠 -->
        <li><router-link to="/page3">照片</router-link></li>
        <hr class="file-divider"> <!-- 添加横杠 -->
        <li><router-link to="/page3">回收站</router-link></li>
        <hr class="file-divider"> <!-- 添加横杠 -->
        <li><router-link to="/page3">最近</router-link></li>
        <!-- 添加更多页面链接 -->
      </ul>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'Navbar'
  }
  </script>
  
  <style scoped>
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 200px; /* 设置导航栏宽度 */
    padding: 20px;
    margin:2ch;
    border-radius: 2cap;
    background-color: aliceblue;
    box-sizing: border-box; /* 包括 padding 在内的盒子模型 */
  }
  
  .nav {
    list-style: none;
    padding: 0;
  }
  
  .nav li {
    margin-bottom: 10px;
    margin: 15%;
    background-color: rgb(168, 230, 154);
    text-align: center;
    border-radius:2cqh;
    padding:10%;
  }
  
  .nav a {
    text-decoration: none;
    color: #333;
  }

  .add{
    margin: 15%;
  }
  </style>