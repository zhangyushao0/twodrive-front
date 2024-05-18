<script setup lang="ts">

//获得登陆者信息
//const loginInformation = useState("loginInformation");
const loginInformation = {
  id:"eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjEsInN1YiI6IjEiLCJpYXQiOjE3MTU5NjI2OTcsImV4cCI6MTgwMjM2MjY5N30.1NVjjMonzFfIQUP4KflC2KdjQndJZrjfcplg1VH0dwvSj8zjr03HRK97ui3l0cwB1_Mrmyun6Y24h-9h2KbEug",
  // 其他属性...
};

interface PersonData {
  avatarId:number;
  uid: number;
  filelist:FileData[];
  email:string;
  username:string;
}
interface FileData {
  filename: string;
  avatarId:number;
  size:number;
  state:number;
  type:string;
  fileContent:string;
  email:string;
  fileid: number;
  username:string;
}

const columns = [{
  key: 'name',
  label: '文件名称',
  sortable: true
}, {
  key: 'state',
  label: '权限状态',
},{
  key: 'sharer',
  label: '所有者',
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

  }]
]
//拥有者小标签
const owners=(row:FileData) =>[
[{
    slot: 'account',
    label: '',
    disabled: true
  }]
]

const isInformationOpen=ref(false)
const selectedFile=ref<FileData>()
const qFile = ref('')//查询文件
const qSharer = ref('')//查询共享者
const pending=ref(false)
const isSharerOpen=ref(false)
const isFileChange=ref(false)
const selectedPerson =ref<PersonData|null>()
const stateArray: string[] = ["无","可查看", "可编辑"];

//获得所有他人共享的文件
async function fetchFileData(token:string):Promise<FileData[]>  {
  try {
    pending.value=true
    // 构建请求URL，将参数作为查询字符串附加在URL上
    const url = `http://192.168.137.1:8080/api/user/shared/otherget?token=${encodeURIComponent(token)}`;
    // 发送GET请求
    const response = await fetch(url);
    // 解析响应
    const data = await response.json();
    pending.value=false
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//查看所有共享者
async function fetchPeopleData(token:string):Promise<PersonData[]>  {
  try {
    // 构建请求URL，将参数作为查询字符串附加在URL上
    const url = `http://192.168.137.1:8080/api/user/shared/allcheck?token=${encodeURIComponent(token)}`;
    // 发送GET请求
    const response = await fetch(url);
    // 解析响应
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const fileData= await fetchFileData(loginInformation.id);
const fileQuery=computed(() => {
      return fileData.filter((fileItem:FileData) => {
        return fileItem.filename.includes(qFile.value);
      });
    });
const file=ref(fileQuery)

const peopleData=await fetchPeopleData(loginInformation.id);
const people=computed(() => {
      return peopleData.filter((personItem:PersonData) => {
        return personItem.username.includes(qSharer.value) || personItem.email.includes(qSharer.value);
      });
    });

//监视file文件变化
watch(file, (value) => {
  if(!value){
    isFileChange.value=true
  }
})
//恢复显示全部文件
const fileRedo = () => {
 isFileChange.value=false
 file.value=fileQuery.value
 selectedPerson.value=null
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
      <template #left>
          <UInput v-model="qFile" icon="i-heroicons-magnifying-glass" placeholder="搜索文件..." autofocus />
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
          :rows="file" 
          :columns="columns"
          :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
          :loading="pending"
          :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }">
            <template #name-data="{ row }">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-md" :style="{ backgroundImage: `url(${getAvatar(row.type)})` }"></div> <!-- 方形头像样式示例 -->
                <div class="flex flex-col ml-2">
                  <span :class="['text-primary-900 dark:text-primary-400']">{{ row.filename }}</span>
                  <span class="text-gray-350 dark:text-gray-400">{{ row.path }}</span>
                </div>
              </div>
            </template>
            <template #sharer-data="{ row }">
               <UDropdown mode="hover" :items="owners(row)"  
               :ui="{item: { disabled: 'cursor-text select-text' } }" 
               :popper="{ strategy: 'absolute', placement: 'bottom' }">
                <div>
                  <span :class="['text-primary-900 dark:text-primary-400']">{{ row.username}}</span>
                </div>
                <template #account>
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-full overflow-hidden">
                      <!-- <img :src="owner.avatarId" alt="Avatar" class="w-full h-full object-cover"> -->
                    </div>

                  <div class="text-sm min-w-0">
                    <p class="text-gray-900 dark:text-white font-medium truncate">
                      {{ row.username}}
                    </p>
                    <p class="text-gray-500 dark:text-gray-400 truncate">
                      {{ row.email }}
                    </p>
                  </div>
                </div>
                </template>

              </UDropdown>
            </template>
            <template #state-data="{ row }">
              <div class="flex items-center">
                {{ stateArray[row.state] }}
              </div>
            </template>
            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>
          </UTable>

        <UDashboardSlideover v-model="isSharerOpen">
        <UCard :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }" class="min-w-0">
        <template #header>
          <UInput v-model="qSharer" icon="i-heroicons-magnifying-glass" placeholder="搜索共享者" autofocus />
        </template>

          <div v-for="(person) in people">
            <div
            class="p-4 text-sm cursor-pointer border-l-2"
            :class="[
              selectedPerson && selectedPerson === person? 'border-primary-500 dark:border-primary-400 bg-primary-100 dark:bg-primary-900/25' : 'border-white dark:border-gray-900 hover:border-primary-500/25 dark:hover:border-primary-400/25 hover:bg-primary-100/50 dark:hover:bg-primary-900/10'
          ]"
          @click="file = person.filelist, selectedPerson=person,isSharerOpen=false">
            <div class="flex items-center gap-3 min-w-0">
              <!-- <UAvatar :src="person.avatar" size="md" /> -->

              <div class="text-sm min-w-0">
                <p class="text-gray-900 dark:text-white font-medium truncate">
                  {{ person.username }}
                </p>
                <p class="text-gray-500 dark:text-gray-400 truncate">
                  {{ person.email}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UDashboardSlideover>
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
                  <p class="content-text">类型</p>
              </div>
              <div class="text-info">
                  <p>{{ selectedFile?.size}} 字节</p>
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
            <p>{{ stateArray[selectedFile?.state||1] }}</p>
        </div>
      </UDashboardSlideover>
</template>

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