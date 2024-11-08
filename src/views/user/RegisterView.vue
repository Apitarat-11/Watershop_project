<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as Yup from 'yup';

const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const loading = ref(false);
const error = ref('');
const successMessage = ref('');

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_]{3,20}$/, 'ชื่อผู้ใช้ต้องมีความยาวระหว่าง 3-20 ตัวอักษรและไม่สามารถมีสัญลักษณ์พิเศษได้')
    .required('ชื่อผู้ใช้เป็นข้อมูลที่จำเป็น'),
  email: Yup.string()
    .email('กรุณากรอกอีเมลที่ถูกต้อง')
    .required('อีเมลเป็นข้อมูลที่จำเป็น'),
  password: Yup.string()
    .min(6, 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร')
    .required('รหัสผ่านเป็นข้อมูลที่จำเป็น'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน')
    .required('การยืนยันรหัสผ่านเป็นข้อมูลที่จำเป็น')
});

const validateForm = async () => {
  try {

    await validationSchema.validate({
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }, { abortEarly: false });

    return true;
  } catch (err) {

    error.value = err.inner.map(e => e.message).join(', ');
    return false;
  }
};

const handleRegister = async () => {
  if (!await validateForm()) return;

  loading.value = true;
  try {
    successMessage.value = 'สมัครสมาชิกสำเร็จ! สามารถเข้าสู่ระบบได้แล้ว';
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (err) {
    error.value = 'เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองใหม่อีกครั้ง';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center">
    <div class="card mx-auto w-full max-w-2xl shadow-xl">
      <div class="py-24 px-10">
        <h2 class="text-2xl font-semibold mb-2 text-center">สมัครสมาชิก</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-control w-full mt-4">
            <label class="label">
              <span class="label-text text-base-content">ชื่อผู้ใช้</span>
            </label>
            <input
              v-model="username"
              type="text"
              placeholder="กรุณากรอกชื่อผู้ใช้"
              class="input input-bordered w-full"
              required
            />
          </div>
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
          <div class="form-control w-full mt-4">
            <label class="label">
              <span class="label-text text-base-content">ยืนยันรหัสผ่าน</span>
            </label>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="กรุณากรอกยืนยันรหัสผ่าน"
              class="input input-bordered w-full"
              required
            />
          </div>
          <p v-if="error" class="text-center text-error mt-8">{{ error }}</p>
          <p v-if="successMessage" class="text-center text-success mt-8">{{ successMessage }}</p>

          <button type="submit" :disabled="loading" class="btn mt-2 w-full btn-primary">
            <span v-if="loading">กำลังสมัคร...</span>
            <span v-else>สมัครสมาชิก</span>
          </button>
        </form>

        <div class="text-center mt-4">
          <RouterLink to="/login" class="text-primary">เข้าสู่ระบบ</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
