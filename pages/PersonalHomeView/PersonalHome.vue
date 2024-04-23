<script>
// javascript

export default{
    data(){
        return{
            id:"id",
            name:"name",
            email:"email",
            photo:"https://tse1-mm.cn.bing.net/th/id/OIP-C.Ai4IAPNqFCR5LOxvO9U0MwHaHZ?w=203&h=202&c=7&r=0&o=5&dpr=1.9&pid=1.7",
            memory:""
        }
    },
    methods:{
        modifyInfor:function(){
            //修改个人信息
            //传数据 router
            var query = {id: this.id, name: this.name, email: this.email, photo: this.photo}
            //跳转页面
            this.$router.push({path:'/PersonalHomeView/ModifyInfor',query})
        },
        modifyPassword:function(){
            //修改密码
            var query = {id: this.id}
            //跳转页面
            this.$router.push({path:'/PersonalHomeView/ModifyPassword',query})
        },
        exit:function(){
            this.$confirm(
                '确认退出登录？',
                '提示',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            )
            .then(() => {
                this.$message({
                    type: 'success',
                    message: '已退出',
                });
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消',
                });
            });
        }
    },
    mounted() {
        const {id} = this.$route.query;
        this.id = id;
    }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <UCard
      class="flex flex-col w-full max-w-96 p-4 bg-white shadow-lg rounded-lg"
    >
      <template #header>
        <div class="text-center">
          <UAvatar alt="Avatar" class="mx-auto" :src="photo" style="width: 100%; height: auto;" />
          <p class="mt-2 font-bold text-lg"> {{ name }} </p>
        </div>
      </template>

      <div class="my-4 pt-4">
        <p>邮箱: <span class="text-gray-600"> {{ email }} </span></p>
      </div>

      <div class="my-4">
        <p class="mb-2">存储空间使用情况</p>
        <UMeterGroup
          :min="0"
          :max="128"
          size="md"
          indicator
          icon="i-heroicons-minus"
        >
          <UMeter :value="24" color="gray" label="System" />
          <UMeter :value="8" color="red" label="Apps" />
          <UMeter :value="12" color="yellow" label="Documents" />
          <UMeter :value="42" color="green" label="Multimedia" />
          <!-- Total: 86 -->
        </UMeterGroup>
      </div>

      <div class="flex flex-col space-y-2 mt-4">
        <button class="button" style="background-color: blue" @click="modifyInfor"> 修改个人信息 </button>

        <button class="button" style="background-color: #FFDE59" @click="modifyPassword"> 修改密码 </button>

        <button class="button" style="background-color: red" @click="logout"> 退出登录 </button>

      </div>
    </UCard>
  </div>
</template>

<style scoped>

.button{
    padding: 2px 4px;
    color: white;
    border-radius: 4px;
    transition-duration: 300ms;
}

</style>
