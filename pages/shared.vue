<!-- 共享页面总设置 -->
<script setup lang="ts">
const links = [[{
    label: '与你共享',
    icon: 'i-heroicons-user-group',
    to: '/shared',
    exact: true
  }, {
    label: '你的共享',
    icon: 'i-heroicons-user-circle',
    to: '/shared/sharedOwn'
  }]]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto ">
        <UHorizontalNavigation :links="links" class="text-xl" />
      </UDashboardToolbar>
      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
