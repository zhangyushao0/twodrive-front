<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
  password_o: z.string().min(8, "Must be at least 8 characters"),
  password_1: z.string().min(8, "Must be at least 8 characters"),
  password_2: z.string().min(8, "Must be at least 8 characters"),
}).refine((data) => data.password_o === data.password, {
  message: "原密码不正确",
  path: ["password_o"], // 指定错误信息显示的位置
}).refine((data) => data.password_1 === data.password_2, {
  message: "新密码和确认密码不一致",
  path: ["password_2"], // 指定错误信息显示的位置
});

type Schema = z.output<typeof schema>;

const state = reactive({
  id:"",
  email: undefined,
  password: undefined,
  password_o: undefined,
  password_1: undefined,
  password_2: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
}

function modify(){

}

function exit(){
  var query = {id: state.id}
  //跳转页面
  state.$router.push({path:'/PersonalHomeView/PersonalHome',query})
  
}

</script>

<template>
  <div>
    <div class="flex items-center justify-center h-screen">
      <UCard class="flex flex-col w-full max-w-96">
        <template #header>
          <h1>修改密码</h1>
        </template>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="邮箱" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="原密码" name="password_o">
            <UInput v-model="state.password_o" type="password_o" />
          </UFormGroup>

          <UFormGroup label="新密码" name="password_1">
            <UInput v-model="state.password_1" type="password_1" />
          </UFormGroup>

          <UFormGroup label="确认密码" name="password_2">
            <UInput v-model="state.password_2" type="password_2" />
          </UFormGroup>

          <div class="button-container">
            <UButton class="button" style="background-color: green;" type="submit" @click="modify"> 修改密码 </UButton>
            <UButton class="button" style="background-color: grey;"> 
              <ULink :to="{path:'/PersonalHomeView/PersonalHome',query:{id:state.id}}">返回</ULink> 
            </UButton>
          </div>
        
        </UForm>
      </UCard>
    </div>
  </div>
</template>

<style scoped>

.button-container{
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
}
.button{
  width: 80px;
  justify-content: center;
}

</style>
