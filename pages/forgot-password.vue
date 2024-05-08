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

    if (data.code === "0") {
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

    if (data.code === "0") {
      // 验证码验证成功
      console.log("验证码验证成功");
      console.log(data);
      try {
    const { password } = state_password;
    const data = await modifyPassword(token.value, password);

    if (data.code === "0") {
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
    } else {
      // 验证码验证失败
      console.log("验证码验证失败");
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }

}

type sendCodeResponse = {
  code: string;
  msg: string;
  token: string;
};

type resetPasswordResponse = {
  code: string;
  msg: string;
};

async function sendCode(email: string) {
  try {
    // 创建一个 FormData 对象
    const formData = new FormData();
    formData.append('email', email);

    // 发送请求
    const response = await fetch("http://192.168.137.1:8080/user/send-code", {
      method: "POST",
      body: formData,  // 直接传递 FormData 对象
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: sendCodeResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to send code:', error);
    throw error;
  }

}

async function modifyPassword(token: string, password: string) {
  console.log(token, password);
  try {
    // 创建一个 FormData 对象
    const formData = new FormData();
    formData.append('token', token);
    formData.append('newPassword', password);

    // 发送请求
    const response = await fetch("http://192.168.137.1:8080/user/modify", {
      method: "POST",
      body: formData,  // 直接传递 FormData 对象
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: resetPasswordResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to modify password:', error);
    throw error;
  }
}

async function verifyCode(code: string, token: string) {
  console.log(code, token);
  try {
    // 创建一个 FormData 对象
    const formData = new FormData();
    formData.append('code', code);
    formData.append('token', token);

    // 发送请求
    const response = await fetch("http://192.168.137.1:8080/user/verify-code", {
      method: "POST",
      body: formData,  // 直接传递 FormData 对象
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: resetPasswordResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to verify code:', error);
    throw error;
  }
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
