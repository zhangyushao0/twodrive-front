// 全局变量设置，用于切换路由
import { createSharedComposable } from '@vueuse/core'


const _useDashboard = () => {
  const route = useRoute()
  const isLoggedIn=ref(false)
  const isHelpSlideoverOpen = ref(false)


  watch(() => route.fullPath, () => {
    isHelpSlideoverOpen.value = false
  })

  return {
    isHelpSlideoverOpen,
    isLoggedIn
  }
}

export const useDashboard = createSharedComposable(_useDashboard)
