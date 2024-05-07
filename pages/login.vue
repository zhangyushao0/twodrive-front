<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  email: z.string().email("无效的邮箱地址"),
  username: z.string().min(3, "用户名至少需要3个字符"),
  password: z.string().min(8, "密码至少需要8个字符"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: '',
  username: '',
  password: '',
});

type loginResponse = {
  code: string;
  token: string;
  msg: string;
  data: {
    uid: string;
    username: string;
    email: string;
    rank: string;
    space_usage: string;
    groupid: number;
  };
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // event.preventDefault(); // 阻止表单默认提交行为
  try {
    const { email, username, password } = state;
    const data = await loginUser(email, username, password);

    const loginInformation = useState("loginInformation");
    loginInformation.value = data;
    if (data.code === "0") {
      // 登录成功 路由跳转

      const router = useRouter();
      router.push("/main");
      
    } else {
      // 登录失败
      console.log("登录失败");
      console.log(data);
    }

    
  } catch (error) {
    
    console.error(error);
  }


  
}

async function loginUser(email: string, username: string, password: string) {
  try {
    // 创建一个 FormData 对象
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);

    // 发送请求
    const response = await fetch("http://192.168.137.1:8080/user/login", {
      method: "POST",
      body: formData,
    });

    // 解析响应
    const data: loginResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-center h-screen">
      <UCard class="flex flex-col w-full max-w-96">
        <template #header>
          <h1>登录</h1>
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
          <UFormGroup label="用户名" name="username">
            <UInput v-model="state.username" />
          </UFormGroup>
          <UFormGroup label="密码" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>
          <div class="flex justify-between">
            <UButton type="submit"> 登录 </UButton>
            <ULink to="/forgot-password" class="text-gray-400"
              >忘记密码？</ULink
            >
          </div>
          <div class="flex justify-end">
            <ULink to="/register" class="text-gray-400">没有账号？注册</ULink>
          </div>
        </UForm>
      </UCard>
    </div>
  </div>
</template>