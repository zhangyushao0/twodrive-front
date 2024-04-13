<template>
    <div>
      <div class="file-cards">
        <div v-for="file in files" :key="file.id" class="file-card">
          <div class="file-info">
            <img class="file-img" src="../public/我的文件.png" alt="File Image">
            <hr class="file-divider"> <!-- 添加横杠 -->
            <h3>{{ file.name }}</h3>
            <p>大小: {{ file.size }}</p>
            <p>日期: {{ file.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'FileList',
    data() {
      return {
        files:  [
    { id: 1, name: 'Report.pdf', size: '1.2 MB', date: '2024-01-01' },
    { id: 2, name: 'Resume.docx', size: '200 KB', date: '2024-01-02' },
    { id: 3, name: 'Presentation.pptx', size: '4.5 MB', date: '2024-01-03' }
]
      };
    }
  }
  </script>
  
  <style scoped>
  .file-cards {
    display: flex;
    flex-wrap: wrap;
  }
  
  .file-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    width: 180px; /* 调整卡片宽度根据需要 */
  }
  
  .file-info {
    text-align: center;
  }
  
  .file-img {
    width: 100px; /* 调整图片大小根据需要 */
    height: 100px; /* 调整图片大小根据需要 */
    display: block; /* 让图片居中 */
    margin: 0 auto; /* 让图片居中 */
  }
  
  .file-divider {
    width: 50%; /* 调整横杠宽度根据需要 */
    margin: 10px auto; /* 让横杠居中 */
  }
  </style>