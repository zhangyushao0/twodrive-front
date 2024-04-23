<!-- 用户下拉菜单栏 -->
<script setup lang="ts">

const items = computed(() => [
  [{
    slot: 'account',
    label: '',
    disabled: true
  }], [{
    label: '设置',
    icon: 'i-heroicons-cog-8-tooth',
  }, {
    label: '帮助和支持',
    icon: 'i-heroicons-question-mark-circle',
  },{ 
    label: '登出',
    icon: 'i-heroicons-arrow-left-on-rectangle'
  }], 
])
</script>

<template>
  <UDropdown mode="hover" :items="items" :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }" :popper="{ strategy: 'absolute', placement: 'top' }" class="w-full">
    <template #default="{ open }">
      <UButton color="gray" variant="ghost" class="w-full" label="吴" :class="[open && 'bg-grey-400 dark:bg-grey-800']">
        <!-- 插入头像 -->
        <template #leading>
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="2xs" />
        </template>
        <!-- 显示右边省略图标 -->
        <template #trailing>
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>
    <!-- 下拉菜单 -->
    <template #account>
      <div class="text-left">
        <p>
          登录号：
        </p>
        <p class="truncate font-medium text-grey-900 dark:text-white">
          wu@email.com
        </p>
      </div>
    </template>
  </UDropdown>
</template>
