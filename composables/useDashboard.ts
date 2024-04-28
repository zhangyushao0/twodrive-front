// 全局变量设置，用于切换路由
import { createSharedComposable } from '@vueuse/core'

const Row = {
  id: -1,
  name: "null",
  avatar:"null",
  path:"null",
  sharer: "null",
  status: "null",
};

const _useDashboard = () => {
  const route = useRoute()
  const router = useRouter()
  const isLoggedIn=ref(false)
  const isHelpSlideoverOpen = ref(false)
  const isInformationOpen=ref(false)
  const selectedFile=ref(Row)


  watch(() => route.fullPath, () => {
    isHelpSlideoverOpen.value = false
    isInformationOpen.value=false
    selectedFile.value=Row
  })

  return {
    isHelpSlideoverOpen,
    isInformationOpen,
    selectedFile,
    isLoggedIn
  }
}

export const useDashboard = createSharedComposable(_useDashboard)
