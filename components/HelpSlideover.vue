 <!--帮助侧边栏 -->
<script setup lang="ts">
const { isHelpSlideoverOpen } = useDashboard()

</script>

<template>
  <UDashboardSlideover v-model="isHelpSlideoverOpen">
    <div>
      hello
    </div>
  </UDashboardSlideover>
</template>
