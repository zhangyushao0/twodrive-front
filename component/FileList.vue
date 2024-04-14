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
    { id: 3, name: 'Presentation.pptx', size: '4.5 MB', date: '2024-01-03' },
    { id: 4, name: 'Budget.xlsx', size: '500 KB', date: '2024-01-04' },
    { id: 5, name: 'Proposal.doc', size: '300 KB', date: '2024-01-05' },
    { id: 6, name: 'MeetingNotes.txt', size: '50 KB', date: '2024-01-06' },
    { id: 7, name: 'Contracts.pdf', size: '2 MB', date: '2024-01-07' },
    { id: 8, name: 'ProjectPlan.docx', size: '1 MB', date: '2024-01-08' },
    { id: 9, name: 'Graphs.ppt', size: '3 MB', date: '2024-01-09' },
    { id: 10, name: 'Feedback.docx', size: '150 KB', date: '2024-01-10' },
    { id: 11, name: 'Analysis.xlsx', size: '700 KB', date: '2024-01-11' },
    { id: 12, name: 'TrainingMaterials.pdf', size: '2.5 MB', date: '2024-01-12' },
    { id: 13, name: 'Charts.pptx', size: '5 MB', date: '2024-01-13' },
    { id: 14, name: 'Research.pdf', size: '800 KB', date: '2024-01-14' },
    { id: 15, name: 'SurveyResults.xlsx', size: '400 KB', date: '2024-01-15' },
    { id: 16, name: 'Minutes.doc', size: '250 KB', date: '2024-01-16' },
    { id: 17, name: 'Blueprints.pdf', size: '3.8 MB', date: '2024-01-17' },
    { id: 18, name: 'Forms.docx', size: '120 KB', date: '2024-01-18' },
    { id: 19, name: 'StrategicPlan.pptx', size: '6.2 MB', date: '2024-01-19' },
    { id: 20, name: 'AnalysisReport.pdf', size: '1.5 MB', date: '2024-01-20' },
    { id: 21, name: 'Inventory.xlsx', size: '600 KB', date: '2024-01-21' },
    { id: 22, name: 'FeedbackSurvey.docx', size: '180 KB', date: '2024-01-22' },
    { id: 23, name: 'TrainingManual.pdf', size: '2.7 MB', date: '2024-01-23' },
    { id: 24, name: 'PresentationSlides.pptx', size: '4.8 MB', date: '2024-01-24' }
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