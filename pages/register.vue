<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

// 扩展 schema 以包含用户名和确认密码
const schema = z.object({
  username: z.string().min(3, "用户名至少需要3个字符"),
  email: z.string().email("无效的邮箱地址"),
  password: z.string().min(8, "密码至少需要8个字符"),
  confirmPassword: z.string().min(8, "确认密码至少需要8个字符"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "密码和确认密码不匹配",
  path: ["confirmPassword"], // 指定错误信息显示的位置
});

type Schema = z.output<typeof schema>;

const state = reactive({
  username: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // 处理注册逻辑
  console.log(event.data);
}
</script>

<template>
  <div>
    <div class="flex items-center justify-center h-screen">
      <UCard class="flex flex-col w-full max-w-96">
        <template #header>
          <h1>注册</h1>
        </template>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="用户名" name="username">
            <UInput v-model="state.username" />
          </UFormGroup>

          <UFormGroup label="邮箱" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="密码" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <UFormGroup label="确认密码" name="confirmPassword">
            <UInput v-model="state.confirmPassword" type="password" />
          </UFormGroup>

          <div class="flex justify-between">
            <UButton type="submit"> 注册 </UButton>
            <ULink to="/login" class="text-gray-400">已有账号？登录</ULink>
          </div>
        </UForm>
      </UCard>
    </div>
  </div>
</template>
