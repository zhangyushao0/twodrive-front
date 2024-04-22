<template>
  <div id="app">
    <Navbar />
    <div class="content">
      <h1 class="title">我的文件</h1>
      <hr class="file-divider" />
      <!-- 添加横杠 -->

      <UTable :rows="files" :columns="columns">
        <template #name-data="{ row }">
          <span
            :class="[
              selected.find((person) => person.id === row.id) &&
                'text-primary-500 dark:text-primary-400',
            ]"
            >{{ row.name }}</span
          >
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>

      <UModal v-model="isOpen" prevent-close>
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                文件信息
              </h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="isOpen = false"
              />
            </div>
          </template>

          <!-- 表格部分 -->
          <table class="min-w-full">
            <tbody>
              <tr>
                <td class="px-4 py-2 text-left font-semibold">类型：</td>
                <td class="px-4 py-2 text-left">{{ fileType }}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 text-left font-semibold">路径：</td>
                <td class="px-4 py-2 text-left">{{ filePath }}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 text-left font-semibold">大小：</td>
                <td class="px-4 py-2 text-left">{{ fileSize }}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 text-left font-semibold">修改日期：</td>
                <td class="px-4 py-2 text-left">{{ modificationDate }}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 text-left font-semibold">共享状态：</td>
                <td class="px-4 py-2 text-left">{{ sharingStatus }}</td>
              </tr>
            </tbody>
          </table>
        </UCard>
      </UModal>

      <!-- <FileList/> -->
    </div>
  </div>
</template>
<script setup lang="ts">
const isOpen = ref(false);
const openModal = () => {
  isOpen.value = true;
};

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => {
      isOpen.value = false;
    },
  },
});

const columns = [
  {
    key: "name",
    label: "File Name",
  },
  {
    key: "modifiedTime",
    label: "Modified Time",
  },
  {
    key: "modifier",
    label: "Modifier",
  },
  {
    key: "size",
    label: "Size",
  },
  {
    key: "shared",
    label: "Shared",
  },
  {
    key: "actions",
  },
];

const files = [
  {
    name: "Document1.docx",
    modifiedTime: "2024-04-10",
    modifier: "Alice",
    size: "2.3MB",
    shared: "Yes",
    content: "This is the content of Document1.docx",
  },
  {
    name: "Report.pdf",
    modifiedTime: "2024-04-15",
    modifier: "Bob",
    size: "1.5MB",
    shared: "No",
    content: "This is the content of Report.pdf",
  },
  {
    name: "Presentation.pptx",
    modifiedTime: "2024-04-12",
    modifier: "Charlie",
    size: "3.0MB",
    shared: "Yes",
    content: "This is the content of Presentation.pptx",
  },
  {
    name: "CodeSnippet.js",
    modifiedTime: "2024-04-14",
    modifier: "David",
    size: "500KB",
    shared: "No",
    content: "This is the content of CodeSnippet.js",
  },
  {
    name: "Image.jpg",
    modifiedTime: "2024-04-11",
    modifier: "Emily",
    size: "4.5MB",
    shared: "Yes",
    content: "This is the content of Image.jpg",
  },
  {
    name: "Spreadsheet.xlsx",
    modifiedTime: "2024-04-13",
    modifier: "Frank",
    size: "2.7MB",
    shared: "No",
    content: "This is the content of Spreadsheet.xlsx",
  },
];

const items = (row) => [
  [
    {
      label: "收藏",
      icon: "i-heroicons-star-16-solid",
      click: () => console.log("Edit", row.id),
    },
  ],
  [
    {
      label: "信息",
      icon: "i-heroicons-archive-box-20-solid",
      click: () => openModal(),
    },
    {
      label: "共享",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
    {
      label: "移动",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "删除",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];

const selected = ref([files[1]]);
</script>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FileList from "../component/FileList.vue";
import Navbar from "../component/navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    FileList,
    Navbar,
  },
  data() {
    return {
      isOpen: true, // 控制模态框显示与隐藏的变量
      fileType: "文本文件",
      filePath: "/documents/example.txt",
      fileSize: "256 KB",
      modificationDate: "2024-04-22",
      sharingStatus: "私有",
    };
  },
});
</script>

<style>
.title {
  font-size: 36px; /* 调整标题大小根据需要 */
  margin-left: 20px; /* 将标题移到页面左侧 */
}
.content {
  margin-left: 220px; /* 给导航栏留出空间 */
  padding: 20px;
}
</style>
