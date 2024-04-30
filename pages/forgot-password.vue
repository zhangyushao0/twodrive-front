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
  email: '',
});

const state_code = reactive({
  code: '',
});

const state_password = reactive({
  password: '',
});

const schema_password = z.object({
  password: z.string().min(6, "密码至少6位"),
});
const token = ref("");
async function onSubmitSendCode(event: FormSubmitEvent<Schema>) {
  try {
    const { email } = state;
    const data = await sendCode(email);

    if (data.error_code === 0) {
      // 发送验证码成功
      console.log("发送验证码成功");
      token.value = data.token;
     
    } else {
      // 发送验证码失败
      console.log("发送验证码失败");
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
}

async function onSubmitVerifyCodeAndResetPassword(event: FormSubmitEvent<Schema>) {
  try {
    const { code } = state_code;
    const data = await verifyCode(code, token.value);

    if (data.error_code === 0) {
      // 验证码验证成功
      console.log("验证码验证成功");
    } else {
      // 验证码验证失败
      console.log("验证码验证失败");
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }

  try {
    const { password } = state_password;
    const data = await modifyPassword(token.value, password);

    if (data.error_code === 0) {
      // 重置密码成功
      console.log("重置密码成功");
    } else {
      // 重置密码失败
      console.log("重置密码失败");
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
}

type sendCodeResponse = {
  error_code: number;
  msg: string;
  token: string;
};

type resetPasswordResponse = {
  error_code: number;
  msg: string;
};

async function sendCode(email: string) {
  const response = await fetch("http://localhost:3000/sendCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data: sendCodeResponse = await response.json();
  return data;
}

async function modifyPassword(token: string, password: string) {
  const response = await fetch("http://localhost:3000/modifyPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, password }),
  });

  const data: resetPasswordResponse = await response.json();
  return data;
}

async function verifyCode(code: string, token: string) {
  const response = await fetch("http://localhost:3000/verifyCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, token }),
  });

  const data: resetPasswordResponse = await response.json();
  return data;
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
          @submit="onSubmitSendCode"
        >
          <UFormGroup label="邮箱" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <div class="flex justify-center">
            <UButton type="submit"> 发送验证码 </UButton>
          </div>
        </UForm>



        <UForm
          :schema="schema_password"
          :state="state_password"
          class="space-y-4"
          @submit="onSubmitVerifyCodeAndResetPassword"
        >
        <UFormGroup label="验证码" name="code">
            <UInput v-model="state_code.code" />
          </UFormGroup>
          <UFormGroup label="新密码" name="password">
            <UInput v-model="state_password.password" />
          </UFormGroup>

          <div class="flex justify-center">
            <UButton type="submit"> 重置密码 </UButton>
          </div>
        </UForm>

        <div class="flex m-4 justify-end">
          <ULink to="/login" class="text-gray-400">返回登录</ULink>
        </div>
      </UCard>
    </div>
  </div>
</template>
