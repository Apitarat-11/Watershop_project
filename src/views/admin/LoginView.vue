<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'กรุณากรอกข้อมูลให้ครบถ้วน';
    return;
  }

  // เพิ่มการตรวจสอบข้อมูลกับ API หรือเซิร์ฟเวอร์ที่ต้องการที่นี่
  console.log('Login submitted', { email: email.value, password: password.value });
};
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center">
    <div class="card mx-auto w-full max-w-2xl shadow-xl">
      <div class="py-24 px-10">
        <h2 class="text-2xl font-semibold mb-2 text-center">เข้าสู่ระบบ</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <div class="form-control w-full mt-4">
              <label class="label">
                <span class="label-text text-base-content">อีเมล</span>
              </label>
              <input
                v-model="email"
                type="email"
                placeholder="กรุณากรอกอีเมล"
                class="input input-bordered w-full"
                required
              />
            </div>
            <div class="form-control w-full mt-4">
              <label class="label">
                <span class="label-text text-base-content">รหัสผ่าน</span>
              </label>
              <input
                v-model="password"
                type="password"
                placeholder="กรุณากรอกรหัสผ่าน"
                class="input input-bordered w-full"
                required
              />
            </div>
          </div>
          <p v-if="error" class="text-center text-error mt-8">{{ error }}</p>
          <button type="submit" class="btn mt-2 w-full btn-primary">เข้าสู่ระบบ</button>
        </form>
        <div class="text-center mt-4">
          <RouterLink to="/register" class="text-primary">สมัครสมาชิก</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
