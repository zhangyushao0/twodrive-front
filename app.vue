<script setup lang="ts">
const {isLoggedIn} = useDashboard()

  // 使用颜色模式
  const colorMode = useColorMode()

  // 计算颜色值
  const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')

  // 设置页面头部信息
  useHead({
    // 设置 meta 标签
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { key: 'theme-color', name: 'theme-color', content: color } // 使用动态的 color 变量
    ],
    // 设置 link 标签
    link: [
      { rel: 'icon', href: '/favicon.ico' }
    ],
    // 设置 html 标签属性
    htmlAttrs: {
      lang: 'zh-CN'
    }
  })

const title = 'Onedrive'
const description = '存储并同步'

useSeoMeta({
  //设置标题
  title,
  //设置页面描述
  description,
})


</script>

<template>
  <div>
    <!-- 显示加载指示器 -->
    <NuxtLoadingIndicator />

    <!-- 布局管理 -->
    <NuxtLayout>
      <!-- 显示当前页面内容 -->
      <NuxtPage />
    </NuxtLayout>

    <!-- 显示通知消息 -->
    <UNotifications />

    <!-- 显示模态框或弹出窗口 -->
    <UModals />
  </div>
</template>
