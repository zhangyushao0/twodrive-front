<!-- 文件详情栏 -->
<script setup lang="ts">
const { isInformationOpen,selectedFile } = useDashboard()

</script>

<template>
  <UDashboardSlideover v-model="isInformationOpen">
    <template #title>
      文件详细信息
    </template>
     <!-- 判断 selectedFile.id 是否为 -1 -->
    <div v-if="selectedFile.id === -1">
        <UEmptyState :icon="'i-heroicons-circle-stack-20-solid'" :label="'暂无详细信息。'" />
    </div>
    <!-- 如果 selectedFile.id 不为 -1，显示详细信息 -->
    
    <div v-else>
        <div class="content-info">
            <p class="content-text">文件名称</p>
        </div>
        <div class="text-info">
            <p>{{ selectedFile.name }}</p>
        </div>
        <div class="content-info">
            <p class="content-text">路径</p>
        </div>
        <div class="text-info">
            <p>{{ selectedFile.path }}</p>
        </div>
        <div class="content-info">
            <p class="content-text">分享者</p>
        </div>
        <div class="text-info">
            <p>{{ selectedFile.sharer }}</p>
        </div>
        <div class="content-info">
            <p class="content-text">权限状态</p>
        </div>
        <div class="text-info">
            <p>{{ selectedFile.status }}</p>
        </div>
    </div>
    
  </UDashboardSlideover>
</template>

<style scoped>
.content-info {
  font-size: 1.5em; /* 设置ID字体大小 */
  font-weight: bold; /* 设置ID字体粗细 */
  color: black; /* 设置ID字体颜色 */
}
.text-info {
  margin-top: 5px; /* 设置内容上边距，使其距离ID有一定间隔 */
}
</style>