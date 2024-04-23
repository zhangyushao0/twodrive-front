<script setup lang="ts">
const { isInformationOpen ,selectedFile} = useDashboard()

interface Row {
  id: number;
  name: string;
  avatar:string;
  path:string;
  sharer: string;
  status: string;
}

const columns = [{
  key: 'name',
  label: '文件名称',
  sortable: true
}, {
  key: 'sharer',
  label: '共享状态'
}, {
  key: 'status',
  label: '权限状态',
}, {
  key: 'actions'
}]

const file = [{
  id: 1,
  name: 'Lindsay Walton',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Front-end Developer',
  status: '可编辑',
}, {
  id: 2,
  name: 'Courtney Henry',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/excel_16x1.svg",
  path:"c//path",
  sharer: 'Designer',
  status: '可编辑',
}, {
  id: 3,
  name: 'Tom Cook',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/powerpoint_16x1.svg",
  path:"c//path",
  sharer: 'Director of Product',
  status: '可编辑',
}, {
  id: 4,
  name: 'Whitney Francis',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/item-types/16/pdf.svg",
  path:"c//path",
  sharer: 'Copywriter',
  status: '可查看',
}, {
  id: 5,
  name: 'Leonard Krasner',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Senior Designer',
  status: '可查看',
}, {
  id: 6,
  name: 'Floyd Miles',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Principal Designer',
  status: '可查看',
}, {
  id: 7,
  name: 'Floyd Miles',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Principal Designer',
  status: '可查看',
}, {
  id: 8,
  name: 'Floyd Miles',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Principal Designer',
  status: '可查看',
}, {
  id: 9,
  name: 'Floyd Miles',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Principal Designer',
  status: '可查看',
}, {
  id: 10,
  name: 'Floyd Miles',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Principal Designer',
  status: '可查看',
}]

const items = (row:Row) => [
  [{
    label: '打开文件',
    icon: 'i-heroicons-folder-open',
  }, {
    label: '查看共享文件详情',
    icon: 'i-heroicons-bars-3-bottom-left',
    click: () => {
      isInformationOpen.value = true
      selectedFile.value=row
    }

  }], [{
    label: '取消共享',
    icon: 'i-heroicons-x-circle',
  }, {
    label: '获取共享链接',
    icon: 'i-heroicons-document-duplicate'
  }]
]

const selected = ref([file[0]])
const selectedStatuses = ref([])
const q = ref('')
const defaultStatuses= file.reduce((acc, user) => {
  if (!acc.includes(user.status)) {
    acc.push(user.status);
  }
  return acc;
}, [] as string[]);

function select (row:Row) {
  const index = selected.value.findIndex((item: { id: any; }) => item.id === row.id)
  if (index === -1) {
    selected.value.push(row)
  } else {
    selected.value.splice(index, 1)
  }
}

</script>

<template>
    <UDashboardPanelContent>
      <UDashboardToolbar>
        <template #right>
          <UButton
              v-if="selected.length > 0"
              icon="i-heroicons-x-circle"
              size="sm"
              color="gray"
              variant="solid"
              label="取消共享" 
              :trailing="false"
            />
          <USelectMenu
            v-model="selectedStatuses"
            icon="i-heroicons-check-circle"
            placeholder="权限状态"
            multiple
            :options="defaultStatuses"
            :ui-menu="{ option: { base: 'capitalize' } }"
          />
          
        </template>

        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="搜索文件..." autofocus />
        </template>

      </UDashboardToolbar>
      
          <UTable 
          v-if="file && file.length > 0"
          v-model="selected" 
          :rows="file" 
          :columns="columns"@select="select">
            <template #name-data="{ row }">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-md" :style="{ backgroundImage: `url(${row.avatar})` }"></div> <!-- 方形头像样式示例 -->
                <div class="flex flex-col ml-2">
                  <span :class="[selected.find(file => file.id === row.id) && 'text-primary-900 dark:text-primary-400']">{{ row.name }}</span>
                  <span class="text-gray-350 dark:text-gray-400">{{ row.path }}</span>
                </div>
              </div>
            </template>
            
            <template #status-data="{ row }">
              <USelect class="custom-select" v-model="row.status" :options="['可编辑', '可查看']" />
            </template>

            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>
          </UTable>

        <div v-else>
          <!-- 当 file 为空时显示的空状态 -->
          <UEmptyState :icon="'i-heroicons-circle-stack-20-solid'" :label="'暂无文件。'" />
        </div>      
        <!-- ~/components/Information.vue -->
        <Information /> 
    </UDashboardPanelContent>

    

</template>

<style>
.custom-select {
  width: 100px;
  height: 40px;
}
</style>


