<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const submitLogin = async () => {
  console.log('Logging in with:', email.value, password.value);
  try {
    
    const response = await axios.post('http://localhost/my_api/login.php', {
      email: email.value,
      password: password.value,
    });

    if (response.data.status === 'success') {
      router.push('/admin/dashboard');
    } else {
      errorMessage.value = response.data.message; 
    }
  } catch (error) {
    errorMessage.value = 'เกิดข้อผิดพลาดในการเชื่อมต่อ';
    console.error(error);
  }
};
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center">
    <div class="card mx-auto w-full max-w-2xl shadow-xl">
      <div class="py-24 px-10">
        <h2 class="text-2xl font-semibold mb-2 text-center">เข้าสู่ระบบ</h2>
        <form @submit.prevent="submitLogin">
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
                autocomplete="current-password"
                required
              />
            </div>
          </div>
          <p v-if="errorMessage" class="text-center text-error mt-8">{{ errorMessage }}</p>
          <button type="submit" class="btn mt-2 w-full btn-primary">
            เข้าสู่ระบบ
          </button>
        </form>
        <div class="text-center mt-4">
          <RouterLink to="/register" class="text-primary">สมัครสมาชิก</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
