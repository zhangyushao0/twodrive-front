<template>
  <div id="app">
    <Navbar/>
    <div class="content">

    <h1 class="title">我的文件</h1>
            <hr class="file-divider"> <!-- 添加横杠 -->
            <FileList/>
  </div>
</div>
</template>

<script>
import FileList from "../component/FileList.vue"
import Navbar from "../component/navbar.vue"; // 根据你的目录结构修改路径


export default {
  name: 'App',
  components: {
    FileList,
    Navbar
  }
}
</script>

<style>
.title{
    font-size: 36px; /* 调整标题大小根据需要 */
    margin-left: 20px; /* 将标题移到页面左侧 */  
} 
.content {
  margin-left: 220px; /* 给导航栏留出空间 */
  padding: 20px;
}
</style>