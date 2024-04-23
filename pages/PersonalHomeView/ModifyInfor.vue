<script>
// javascript

export default{
    data(){
        return {
            id:"",
            name:"",
            email:"",
            photo:""
        }
    },
    methods:{
        modifyInfor:function() {
            this.$confirm(
                '确认修改个人信息？',
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
                    message: '修改成功',
                });
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消修改',
                });
            });
        },

        exit:function(){
            var query = {id: this.id}
            //跳转页面
            this.$router.push({path:'/PersonalHomeView/PersonalHome',query})
        }
    },
    mounted(){
        //console.log("mounted")
        //页面跳转传递的数据 取route
        const {id,name,email,photo} = this.$route.query;
        this.id = id;
        this.name = name;
        this.email = email;
        this.photo = photo
    }
}   
</script>

<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <UCard
        class="flex flex-col w-full max-w-96 p-4 bg-white shadow-lg rounded-lg"
      >
        <template #header>
            <h1>修改个人信息</h1>
        </template>
  
        <div class="text-center">
            <UAvatar alt="Avatar" class="mx-auto" :src="photo" style="width: 100%; height: auto;" />
        </div>

        <div class="my-4 pt-4 flex items-center">
          <p class="text">用户名: </p>
          <UInput v-model="name" :value="name" placeholder="Please input"/>
        </div>

        <div class="my-4 pt-4 flex items-center">
          <p class="text">邮箱: </p>
          <UInput v-model="email" :value="email" placeholder="Please input"/>
        </div>
  
  
        <div class="flex flex-col space-y-4 mt-8 items-center">
          <button class="button" style="background-color: green" @click="modifyInfor"> 修改个人信息 </button>
  
          <button class="button" style="background-color: gray" @click="exit"> 返回 </button>
  
        </div>
      </UCard>
    </div>
  </template>
  
  <style scoped>
  
  .button{
    width: 200px;
    padding: 2px 4px;
    color: white;
    border-radius: 4px;
    transition-duration: 300ms;
  }

  .text{
    width: 80px;
    margin-left: 20px;
  }
  
  </style>
  