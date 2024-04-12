<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  email: z.string().email("无效的邮箱地址"),
});

type Schema = z.output<typeof schema>;
//验证码为6位
const schema_code = z.object({
  code: z.string().length(6, "验证码为6位"),
});

const state = reactive({
  email: undefined,
});

const state_code = reactive({
  code: undefined,
});
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // 处理忘记密码逻辑，比如发送重置密码的请求
  console.log(event.data);
}
</script>

<template>
  <div>
    <div class="flex items-center justify-center h-screen">
      <UCard class="flex flex-col w-full max-w-96">
        <template #header>
          <h1>忘记密码</h1>
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

          <div class="flex justify-center">
            <UButton type="submit"> 发送验证码 </UButton>
          </div>
        </UForm>

        <UForm
          :schema="schema_code"
          :state="state_code"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="验证码" name="code">
            <UInput v-model="state_code.code" />
          </UFormGroup>
          <div class="flex justify-center">
            <UButton type="submit"> 重置密码 </UButton>
          </div>
        </UForm>

        <div class="flex  m-4 justify-end">
          <ULink to="/login" class="text-gray-400">返回登录</ULink>
        </div>
      </UCard>
    </div>
  </div>
</template>
