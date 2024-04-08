<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
    email: z.string().email("无效的邮箱地址"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
    email: undefined,
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
                <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="邮箱" name="email">
                        <UInput v-model="state.email" />
                    </UFormGroup>

                    <div class="flex justify-center">
                        <UButton type="submit"> 发送重置链接 </UButton>
                    </div>
                    <div class="flex justify-center">
                        <ULink to="/login" class="text-gray-400">返回登录</ULink>
                    </div>
                </UForm>
            </UCard>
        </div>
    </div>
</template>
