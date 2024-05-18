<!-- 回收箱 -->
<script setup lang="ts">

//获得登陆者信息
//const loginInformation = useState("loginInformation");
const loginInformation = {
  id:"eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjEsInN1YiI6IjEiLCJpYXQiOjE3MTU5NjI2OTcsImV4cCI6MTgwMjM2MjY5N30.1NVjjMonzFfIQUP4KflC2KdjQndJZrjfcplg1VH0dwvSj8zjr03HRK97ui3l0cwB1_Mrmyun6Y24h-9h2KbEug",
  // 其他属性...
};

interface FileData {
  fileName: string;
  srcPath:string;
  contentType:string;
  fileSize:number;
  deleteTime:string;

}

const isInformationOpen=ref(false)
const selectedFile=ref<FileData>()

const columns = [{
  key: 'fileName',
  label: '文件名称',
  sortable: true
}, {
  key: 'srcPath',
  label: '原位置'
}, {
  key: 'deleteTime',
  label: '删除时间',
}, {
  key: 'actions'
}]

const items = (row:FileData) => [
  [{
    label: '查看文件详情',
    icon: 'i-heroicons-bars-3-bottom-left',
    click: () => {
      isInformationOpen.value = true
      selectedFile.value=row
    }

  }], [{
    label: '还原',
    icon: 'i-heroicons-x-circle',
  }, {
    label: '彻底删除',
    icon: 'i-heroicons-document-duplicate',
    click:() => {
      openDelete.value=true
    }
  }]
]

const pending=ref(false)
const selected = ref<FileData[]>([])
const q = ref('')//查询语句
const openDelete = ref(false)
const openRedo=ref(false)
const loading = ref(false)

//彻底删除文件
async function deleteFileData(token:string,path:string,filename:string) {
  try {
    const url = `http://192.168.137.1:8080/api/user/cancel/delete?token=${encodeURIComponent(token)}&path=${encodeURIComponent(path)}&filename=${encodeURIComponent(filename)}`;
    await fetch(url, { method: 'DELETE' });
    console.log("彻底删除文件")
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//恢复文件
async function redoFileData(token:string,path:string,filename:string) {
  try {
    // 创建一个 FormData 对象
    const formData = new FormData();
    formData.append('token', token);
    formData.append('path', path);
    formData.append('filename', filename);

    // 发送请求
    const response = await fetch("http://192.168.137.1:8080/api/user/cancel/redo", {
      method: "POST",
      body: formData,  // 直接传递 FormData 对象
    });
    console.log("修改")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
}


//获得所有回收站文件
async function fetchFileData(token:string):Promise<FileData[]>  {
  try {
    pending.value=true
    // 构建请求URL，将参数作为查询字符串附加在URL上
    const url = `http://192.168.137.1:8080/api/user/cancel/get?token=${encodeURIComponent(token)}`;
    // 发送GET请求
    const response = await fetch(url);
    // 解析响应
    const data = await response.json();
    console.log(data)
    pending.value=false
    return data ;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const fileData=ref(await fetchFileData(loginInformation.id))
const file = ref(computed(() => {
      return fileData.value.filter((fileItem:FileData) => {
        return fileItem.fileName.includes(q.value);
      });
    }))

watch(fileData, (newVal) => {
pending.value=true
const filequery=computed(() => {
return newVal.filter((fileItem:FileData) => {
  return fileItem.fileName.includes(q.value);
});
})
file.value=filequery.value
pending.value=false
});
//多选中文件的逻辑处理
function select (row:FileData) {
  const index = selected.value.findIndex((item) => item.fileName=== row.fileName && item.srcPath===row.srcPath)
  if (index === -1) {
    selected.value.push(row)
  } else {
    selected.value.splice(index, 1)
  }
}

//删除弹出窗口逻辑处理
async function onDelete () {
  loading.value = true
  try {
  await Promise.all(
  selected.value.map((fileData) => {
    return deleteFileData(loginInformation.id,fileData.srcPath,fileData.fileName)
 }))
  fileData.value=await fetchFileData(loginInformation.id)
  loading.value = false
  openDelete.value = false
} catch (error) {
    console.error(error);
    loading.value = false;
    openDelete.value = false;
  }
}
//还原窗口逻辑处理
async function onRedo () {
  loading.value = true
  try {
  await Promise.all(
  selected.value.map((fileData) => {
    return redoFileData(loginInformation.id,fileData.srcPath,fileData.fileName)
 }))
  fileData.value=await fetchFileData(loginInformation.id)
  loading.value = false
  openRedo.value = false
} catch (error) {
    console.error(error);
    loading.value = false;
    openRedo.value = false
  }
}
//类型转换
const typeMap : { [key: string]: string } =  {
  'text/plain': '纯文本文件',
  'application/pdf': 'PDF 文档',
  'application/vnd.ms-excel': 'Excel 文档',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel 文档',
  'application/msword': 'Word 文档',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word 文档',
  'application/vnd.ms-powerpoint': 'PowerPoint 演示文稿',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PowerPoint 演示文稿',
  'image/jpeg': 'JPG 图片',
  'image/png': 'PNG 图片',
  'image/gif': 'GIF 图片',
  'video/mp4':'MP4视频'
};
//得到文件缩略图
function getAvatar(type:string) {
  const mapData = new Map([
    ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/word_16x1.svg'],
    ['text/plain', 'https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20240312.001/assets/brand-icons/product/svg/onenote_16x1_5.svg'],
    ['application/pdf', 'https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20240312.001/assets/item-types/32/pdf.svg'],
    ['application/vnd.ms-powerpoint', 'https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/powerpoint_16x1.svg'],
    ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/powerpoint_16x1.svg'],
    ['application/vnd.ms-excel','https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/excel_16x1.svg'],
    ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20231211.002/assets/brand-icons/product/svg/excel_16x1.svg'],
    ['image/png','https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20240312.001/assets/item-types/32/photo.svg'],
    ['image/jpeg','https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20240312.001/assets/item-types/32/photo.svg'],
    ['image/gif','https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20240312.001/assets/item-types/32/photo.svg'],
    ['video/mp4','https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20240312.001/assets/item-types/32/video.svg'],
  ]);
  const defaultValue = 'https://res-4.cdn.partner.office365.cn/files/fabric-cdn-prod_20240312.001/assets/item-types/32/genericfile.svg';
const result = mapData.get(type) || defaultValue;
  return result;
}

</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
    <UDashboardNavbar title="回收站" />
      <UDashboardToolbar>
        <template #right>
          <UButton
              v-if="selected.length > 0"
              icon="i-heroicons-arrow-left"
              size="sm"
              color="gray"
              variant="solid"
              label="还原" 
              :trailing="false"
              @click="openRedo=true"
            />
            <UButton
              v-if="selected.length > 0"
              icon="i-heroicons-x-circle"
              size="sm"
              color="gray"
              variant="solid"
              label="彻底删除" 
              :trailing="false"
              @click="openDelete=true"
            />
        </template>

        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="搜索文件..." autofocus />
        </template>

      </UDashboardToolbar>
      
          <UTable 
          :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
          v-model="selected" 
          :rows="file" 
          :columns="columns"@select="select"
          :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }">
            <template #name-data="{ row }">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-md" :style="{ backgroundImage: `url(${getAvatar(row.contentType)})` }"></div> <!-- 方形头像样式示例 -->
                <div class="flex flex-col ml-2">
                  <span :class="[selected.find(file => file.fileName === row.fileName && file.srcPath === row.srcPath) && 'text-primary-900 dark:text-primary-400']">{{ row.fileName }}</span>
                </div>
              </div>
            </template>
       
            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>
          </UTable>

        <UDashboardModal
          v-model="openDelete"
          title="删除文件"
          description="确定要删除文件?"
          icon="i-heroicons-exclamation-circle"
          :ui="{
            icon: { base: 'text-red-500 dark:text-red-400' } as any,
            footer: { base: 'ml-16' } as any
          }"
        >
          <template #footer>
            <UButton color="red" label="删除" :loading="loading" @click="onDelete" />
            <UButton color="white" label="取消" @click="openDelete = false" />
          </template>
        </UDashboardModal>

        <UDashboardModal
          v-model="openRedo"
          title="还原文件"
          description="确定要还原文件?"
          icon="i-heroicons-arrow-left"
          :ui="{
            icon: { base: 'text-blue-500 dark:text-blue-400' } as any,
            footer: { base: 'ml-16' } as any
          }"
        >
          <template #footer>
            <UButton color="blue" label="还原"  @click="onRedo" />
            <UButton color="white" label="取消" @click="openRedo=false" />
          </template>
        </UDashboardModal>

        <!-- ~/components/Information.vue -->
        <UDashboardSlideover v-model="isInformationOpen">
          <template #title>
            文件详细信息
          </template>
              <div class="content-info">
                  <p class="content-text">文件名称</p>
              </div>
              <div class="text-info">
                  <p>{{ selectedFile?.fileName}}</p>
              </div>
              <div class="content-info">
                  <p class="content-text">类型</p>
              </div>
              <div class="text-info">
                  <p>{{  typeMap[selectedFile?.contentType||'未知文件'] }}</p>
              </div>
              <div class="content-info">
                  <p class="content-text">原路径</p>
              </div>
              <div class="text-info">
                  <p>{{ selectedFile?.srcPath}}</p>
              </div>
              <div class="content-info">
                  <p class="content-text">删除时间</p>
              </div>
              <div class="text-info">
                  <p>{{ selectedFile?.deleteTime }}</p>
              </div>
              <div class="content-info">
                  <p class="content-text">文件大小</p>
              </div>
              <div class="text-info">
                  <p>{{ selectedFile?.fileSize }}</p>
              </div>
        </UDashboardSlideover>
  </UDashboardPanel>
</UDashboardPage>   

</template>

<style>
.custom-select {
  width: 100px;
  height: 40px;
}
</style>


