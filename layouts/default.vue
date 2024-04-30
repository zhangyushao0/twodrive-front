<!-- 侧边栏布局设置 -->
<script setup lang="ts">
const { isHelpSlideoverOpen } = useDashboard()

//定义链接数组
const links = [ {
  id: 'home',
  label: '主页',
  icon: 'i-heroicons-home',
  to: '/main',
}, {
  id: 'file',
  label: '我的文件',
  icon: 'i-heroicons-folder',
  to: '/main',
}, {
  id: 'shared',
  label: '已共享',
  to: '/',
  icon: 'i-heroicons-users',
  children: [{
    label: '与你共享',
    to: '/shared',
    exact: true
  }, {
    label: '由你共享',
    to: '/shared/sharedOwn'
  }],
}, {
  id: 'box',
  label: '回收站',
  icon: 'i-heroicons-archive-box-x-mark',
  to: '/bin',
}, {
  id: 'collection',
  label: '图库',
  icon: 'i-heroicons-photo',
}]

const footerLinks = [{
  label: '添加好友',
  icon: 'i-heroicons-user-plus',
}, {
  label: '帮助与支持',
  icon: 'i-heroicons-question-mark-circle',
  click: () => isHelpSlideoverOpen.value = true
}]
</script>

<template v-if="isLoggedIn">
  <!-- 仪表盘布局组件 -->
  <UDashboardLayout>
    <!-- 面板组件 -->
    <UDashboardPanel :width="350" :resizable="{ min: 300, max: 400 }" collapsible>

      <!-- 侧边栏组件 -->
      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>
        <!-- 链接列表组件 -->
        <UDashboardSidebarLinks :links="links" />

        <!-- 设置侧边栏下面的按钮 -->
        <UDivider />
        <div class="flex-1" />
        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />
    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />

  </UDashboardLayout>
</template>
