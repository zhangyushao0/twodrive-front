<script setup lang="ts">

//获得登陆者信息
//const loginInformation = useState("loginInformation");
const loginInformation = {
  id:"eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjEsInN1YiI6IjEiLCJpYXQiOjE3MTU5NjI2OTcsImV4cCI6MTgwMjM2MjY5N30.1NVjjMonzFfIQUP4KflC2KdjQndJZrjfcplg1VH0dwvSj8zjr03HRK97ui3l0cwB1_Mrmyun6Y24h-9h2KbEug",
  // 其他属性...
};

interface FileData {
  filename: string;
  path:string;
  size:number;
  state:number;
  type:string;
  fileContent:string;
  status:string;
  fileShareInfolist:record[];
}
interface record {
fileid:number;
username:string;
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

const items = (row:FileData) => [
  [{
    label: '打开文件',
    icon: 'i-heroicons-folder-open',
    click: () => {
       // 创建 Blob 对象
        const blob = new Blob([row.fileContent], { type: row.type });
        // 生成 Blob URL
        const url = URL.createObjectURL(blob);
        // 创建下载链接
        const link = document.createElement('a');
        link.href = url;
        link.download = row.filename;
        // 将下载链接插入到 DOM 结构中并触发下载
        link.click();
        // 释放 Blob URL
        URL.revokeObjectURL(url);
    }
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
    click:()=> {
      openDelete.value=true;
    }
  }]
]

const isInformationOpen=ref(false)
const selectedFile=ref<FileData>({
  filename: '',
  path: '',
  size: 0,
  state: 0,
  type: '',
  fileContent: '',
  status: '可查看',
  fileShareInfolist: []
})
const selected = ref<FileData[]>([])
const selectedStatuses = ref<string[]>(["可查看","可编辑"])//选择状态
const q = ref('')//查询语句
const pending=ref(false)
const stateMap : { [key: string]: number } = {
  "可查看": 1,
  "可编辑": 2
};
const openDelete = ref(false)
const loading = ref(false)

//取消共享
async function deleteFileData(fileid:number) {
  try {
    const url = `http://192.168.137.1:8080/api/user/shared/cancel?fileid=${fileid}`;
    await fetch(url, { method: 'DELETE' });
    console.log("取消共享")
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//修改共享状态
async function modifyStatus(fileid:number,state:number) {
  try {
    // 创建一个 FormData 对象
    const formData = new FormData();
    formData.append('fileid', fileid.toString());
    formData.append('state', state.toString());

    // 发送请求
    const response = await fetch("http://192.168.137.1:8080/api/user/shared/modify", {
      method: "PUT",
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

//获得共享给他人的所有文件
async function fetchFileData(token:string):Promise<FileData[]>  {
  try {
    pending.value=true
    // 构建请求URL，将参数作为查询字符串附加在URL上
    const url = `http://192.168.137.1:8080/api/user/shared/ownget?token=${encodeURIComponent(token)}`;
    // 发送GET请求
    const response = await fetch(url);
    // 解析响应
    const data = await response.json();
    pending.value=false
    return data ;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const fileData=ref(await fetchFileData(loginInformation.id))
const file=ref(computed(() => {
    return fileData.value.filter((fileItem:FileData) => {
      if (fileItem.state === 1) {
        fileItem.status = "可查看";
      } else {
        fileItem.status = "可编辑";
      }
      return fileItem.filename.includes(q.value) && selectedStatuses.value.includes(fileItem.status) ;
    });
  }))


watch(fileData, (newVal) => {
pending.value=true
const filequery=computed(() => {
    return newVal.filter((fileItem:FileData) => {
      if (fileItem.state === 1) {
        fileItem.status = "可查看";
      } else {
        fileItem.status = "可编辑";
      }
      return fileItem.filename.includes(q.value) && selectedStatuses.value.includes(fileItem.status) ;
    });
  })
 file.value=filequery.value
pending.value=false
});


//默认权限状态
const defaultStatuses= file.value.reduce((acc, file) => {
  if (!acc.includes(file.status)) {
    acc.push(file.status);
  }
  return acc;}, [] as string[]);

//多选中文件的逻辑处理
function select (row:FileData) {
  const index = selected.value.findIndex((item) => item.filename === row.filename && item.path===row.path)
  if (index === -1) {
    selected.value.push(row)
  } else {
    selected.value.splice(index, 1)
  }
}

//调用修改共享状态接口
function batchModify(row:FileData,str:string) {
  try {
    row.fileShareInfolist.map((filelist) => {
      const fileid=filelist.fileid
      if (stateMap[str]===1){
        modifyStatus(fileid,stateMap[str]+1 );
      }
      else{
        modifyStatus(fileid,stateMap[str]-1);
      }
    })
  } catch (error) {
    console.error(error);
  }
}

//调用删除接口
async function batchDeletion(){
  try {
    loading.value = true;
    await Promise.all(
      selected.value.map((item) => {
      item.fileShareInfolist.map((filelist) => {
      const fileid = filelist.fileid;
      return deleteFileData(fileid);
      })
    }))
    fileData.value=await fetchFileData(loginInformation.id);
    loading.value = false;
    openDelete.value = false;
  } catch (error) {
    console.error(error);
    loading.value = false;
    openDelete.value = false;
  }
}



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
              @click="openDelete=true"
            />
          <USelectMenu
            v-model="selectedStatuses"
            icon="i-heroicons-check-circle"
            placeholder="权限状态"
            multiple
            :options="defaultStatuses"
          />
          
        </template>

        <template #left>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="搜索文件..." autofocus />
        </template>

      </UDashboardToolbar>
      
          <UTable 
          v-model="selected" 
          :rows="file" 
          :columns="columns"
          :loading="pending"
          :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
          :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
          @select="select">
            <template #name-data="{ row }">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-md" :style="{ backgroundImage: `url(${getAvatar(row.type)})` }"></div> <!-- 方形头像样式示例 -->
                <div class="flex flex-col ml-2">
                  <span :class="[selected.find(file => file.filename === row.filename && file.path === row.path) && 'text-primary-900 dark:text-primary-400']">{{ row.filename }}</span>
                  <span class="text-gray-350 dark:text-gray-400">{{ row.path }}</span>
                </div>
              </div>
            </template>

            <template #sharer-data="{ row }">
              <span v-for="(item, index) in row.fileShareInfolist" :key="index">
                {{ item.username }}
                <span v-if="index !== row.fileShareInfolist.length - 1">, </span>
              </span>
            </template>

            <template #status-data="{ row }">
              <USelect class="custom-select" v-model="row.status" :options="['可编辑', '可查看']" 
              @change="batchModify(row,row.status)"/>
            </template>
            <!-- batchModify(row.fileContent,stateMap[row.status]) -->

            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>
          </UTable>
        <!-- 文件详情 -->
        <UDashboardSlideover v-model="isInformationOpen">
          <template #title>
            文件详细信息
          </template>
            <div class="content-info">
                <p class="content-text">文件名称</p>
            </div>
            <div class="text-info">
                <p>{{ selectedFile?.filename }}</p>
            </div>
            <div class="content-info">
                <p class="content-text">文件大小</p>
            </div>
            <div class="text-info">
                <p>{{ selectedFile?.size }} 字节</p>
            </div>
            <div class="content-info">
                <p class="content-text">路径</p>
            </div>
            <div class="text-info">
                <p>{{ selectedFile?.path }}</p>
            </div>
            <div class="content-info">
                <p class="content-text">类型</p>
            </div>
            <div class="text-info">
                <p>{{ typeMap[selectedFile?.type||'未知文件'] }}</p>
            </div>
            <div class="content-info">
                <p class="content-text">权限状态</p>
            </div>
            <div class="text-info">
                <p>{{ selectedFile?.status}}</p>
            </div>
        </UDashboardSlideover>

         <!-- 取消弹窗 -->
        <UDashboardModal
          v-model="openDelete"
          title="取消分享"
          description="确定要取消分享文件?"
          icon="i-heroicons-exclamation-circle"
          :ui="{
            icon: { base: 'text-red-500 dark:text-red-400' } as any,
            footer: { base: 'ml-16' } as any
          }"
        >
          <template #footer>
            <UButton color="red" label="取消共享" :loading="loading" @click="batchDeletion" />
            <UButton color="white" label="取消" @click="openDelete = false" />
          </template>
        </UDashboardModal>
        
</template>

<style>
.custom-select {
  width: 100px;
  height: 40px;
}
</style>


<style scoped>
.content-info {
  font-size: 1.5em; /* 设置ID字体大小 */
  font-weight: bold; /* 设置ID字体粗细 */
  color: black; /* 设置ID字体颜色 */
}
.text-info {
  margin-top: 5px; /* 设置内容上边距，使其距离ID有一定间隔 */
}
</style>