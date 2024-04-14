<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  email: z.string().email("无效的邮箱地址"),
  password: z.string().min(8, "密码至少需要8个字符"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
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

          <UFormGroup label="密码" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>
          <div class="flex justify-between">
            <UButton type="submit" to="/main"> 登录 </UButton>
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