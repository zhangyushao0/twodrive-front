<script setup lang="ts">
const { isInformationOpen ,selectedFile} = useDashboard()

const q1 = ref('')

interface person {
  pid: number;
  pname: string;
  photo:string;
  file:file[]
}
interface file {
  id: number;
  name: string;
  avatar:string;
  path:string;
  sharer: string;
  status: string;
}


const file1 =ref( [{
  id: 1,
  name: 'Lindsay Walton',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可编辑',
}, {
  id: 2,
  name: 'Courtney Henry',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/excel_16x1.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可编辑',
}, {
  id: 3,
  name: 'Tom Cook',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/powerpoint_16x1.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可编辑',
}]as file[] ) 
const file2= ref([{
      id: 1,
      name: 'Lindsay Walton',
      avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
      path:"c//path",
      sharer: 'Lindsay Walton',
      status: '可编辑',
    }, {
      id: 2,
      name: 'Courtney Henry',
      avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/excel_16x1.svg",
      path:"c//path",
      sharer: 'Lindsay Walton',
      status: '可编辑',
    }, {
      id: 3,
      name: 'Tom Cook',
      avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/powerpoint_16x1.svg",
      path:"c//path",
      sharer: 'Lindsay Walton',
      status: '可编辑',
    }, {
      id: 4,
      name: 'Whitney Francis',
      avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/item-types/16/pdf.svg",
      path:"c//path",
      sharer: 'Lindsay Walton',
      status: '可查看',
    }, {
      id: 5,
      name: 'Leonard Krasner',
      avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
      path:"c//path",
      sharer: 'Lindsay Walton',
      status: '可查看',
    }, {
      id: 6,
      name: 'Floyd Miles',
      avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
      path:"c//path",
      sharer: 'Lindsay Walton',
      status: '可查看',
}]as file[])
const file3 = ref([{
  id: 1,
  name: 'Lindsay Walton',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可编辑',
}, {
  id: 2,
  name: 'Courtney Henry',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/excel_16x1.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可编辑',
}, {
  id: 3,
  name: 'Tom Cook',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/powerpoint_16x1.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可编辑',
}, {
  id: 4,
  name: 'Whitney Francis',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/item-types/16/pdf.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可查看',
}, {
  id: 5,
  name: 'Leonard Krasner',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可查看',
}, {
  id: 6,
  name: 'Floyd Miles',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可查看',
}, {
  id: 7,
  name: 'Floyd Miles',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可查看',
}, {
  id: 8,
  name: 'Floyd Miles',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可查看',
}, {
  id: 9,
  name: 'Floyd Miles',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可查看',
}, {
  id: 10,
  name: 'Floyd Miles',
  avatar:"https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg",
  path:"c//path",
  sharer: 'Lindsay Walton',
  status: '可查看',
}] as file[])

const people= ref([{
  pid: 1,
  pname: "John Smith",
  photo: "https://avatars.githubusercontent.com/u/739984?v=4",
  file:file1.value 
},{
  pid: 2,
  pname: "li",
  photo: "https://avatars.githubusercontent.com/u/739984?v=4",
  file:file2.value
  },{
  pid: 3,
  pname: "li",
  photo: "https://avatars.githubusercontent.com/u/739984?v=4",
  file:file2.value
  }
  
 ]as person[]
)

const columns = [{
  key: 'name',
  label: '文件名称',
  sortable: true
}, {
  key: 'status',
  label: '权限状态',
},{
  key: 'sharer',
  label: '所有者',
}, {
  key: 'actions'
}]


const q = ref('')

const items = (row:file) => [
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

  }]
]


const owners=(row:file) =>[
[{
    slot: 'account',
    label: '',
    disabled: true
  }]
]
const isSharerOpen=ref(false)
const isFileChange=ref(false)

const file =ref(file3.value)

watch(file, (value) => {
  if (!value) {
    console.log(`重新打印表格`);
  }
  if(file.value!=file3.value){
    isFileChange.value=true
  }
})


const selectedPerson =ref<person|null>()

const fileRedo = () => {
 isFileChange.value=false
 file.value=file3.value
 selectedPerson.value=null
}


</script>

<template>
  <UDashboardPanelContent >
    <UDashboardToolbar>
      <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="搜索文件..." autofocus />
        </template>
          <template #right>
            <UButton
             v-if="isFileChange===true" 
              icon="i-heroicons-bars-3"
              size="sm"
              color="gray"
              variant="solid"
              label="显示全部文件" 
              :trailing="false"
              @click="fileRedo"
            />
          <UButton
              icon="i-heroicons-eye"
              size="sm"
              color="gray"
              variant="solid"
              label="查看共享者" 
              :trailing="false"
              @click="isSharerOpen=true"
            />
            
          </template>
      </UDashboardToolbar>
        <UTable 
          sort="sort"
          :rows="file" 
          :columns="columns">
            <template #name-data="{ row }">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-md" :style="{ backgroundImage: `url(${row.avatar})` }"></div> <!-- 方形头像样式示例 -->
                <div class="flex flex-col ml-2">
                  <span :class="['text-primary-900 dark:text-primary-400']">{{ row.name }}</span>
                  <span class="text-gray-350 dark:text-gray-400">{{ row.path }}</span>
                </div>
              </div>
            </template>
            <template #sharer-data="{ row }">
               <UDropdown mode="hover" :items="owners(row)"  :ui="{item: { disabled: 'cursor-text select-text' } }" :popper="{ strategy: 'absolute', placement: 'bottom' }">
                <div>
                  <span :class="['text-primary-900 dark:text-primary-400']">{{ row.sharer}}</span>
                </div>
                <template #account>
                  <div class="flex items-center gap-3 min-w-0">
                    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="md" />

                  <div class="text-sm min-w-0">
                    <p class="text-gray-900 dark:text-white font-medium truncate">
                      {{ row.sharer }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-400 truncate">
                      email@.com
                    </p>
                  </div>
                </div>
                </template>

              </UDropdown>
            </template>
            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>
          </UTable>
          
        <!-- ~/components/Information.vue -->
        <Information /> 

        <UDashboardSlideover v-model="isSharerOpen">
        <UCard :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }" class="min-w-0">
        <template #header>
          <UInput v-model="q1" icon="i-heroicons-magnifying-glass" placeholder="搜索共享者" autofocus />
        </template>

          <div v-for="(person) in people">
            <div
            class="p-4 text-sm cursor-pointer border-l-2"
            :class="[
              selectedPerson && selectedPerson.pid === person.pid ? 'border-primary-500 dark:border-primary-400 bg-primary-100 dark:bg-primary-900/25' : 'border-white dark:border-gray-900 hover:border-primary-500/25 dark:hover:border-primary-400/25 hover:bg-primary-100/50 dark:hover:bg-primary-900/10'
          ]"
          @click="file = person.file, selectedPerson=person,isSharerOpen=false">
            <div class="flex items-center gap-3 min-w-0">
              <UAvatar :src="person.photo" :alt="111" size="md" />

              <div class="text-sm min-w-0">
                <p class="text-gray-900 dark:text-white font-medium truncate">
                  {{ person.pname }}
                </p>
                <p class="text-gray-500 dark:text-gray-400 truncate">
                  email@.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UDashboardSlideover>
  </UDashboardPanelContent>
</template>