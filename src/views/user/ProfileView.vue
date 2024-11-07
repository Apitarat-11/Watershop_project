<script setup>
import { ref, reactive, onMounted } from 'vue'
import UserLayout from '@/layouts/UserLayout.vue'
import { useEventStore } from '@/stores/event'

const eventStore = useEventStore()

const userForm = [
  { name: 'อีเมล', field: 'email' },
  { name: 'ชื่อ', field: 'name' }
]

const userData = reactive({
  imageUrl: 'https://mikelopster.dev/mikelopster.da6b9a03.webp',
  email: '',
  name: ''
})

const isUploading = ref(false) 
const showModal = ref(false)  

onMounted(() => {
  const savedUserProfile = localStorage.getItem('user-profile')
  if (savedUserProfile) {
    const userProfile = JSON.parse(savedUserProfile)
    userData.imageUrl = userProfile.imageUrl
    userData.email = userProfile.email
    userData.name = userProfile.name
  }
})

const handleFileChange = (event) => {
  const file = event.target.files[0]

  if (file) {
    if (!file.type.startsWith('image/')) {
      eventStore.popupMessage('error', 'กรุณาเลือกไฟล์รูปภาพเท่านั้น')
      return
    }

    isUploading.value = true
    const reader = new FileReader()
    reader.onload = (e) => {
      userData.imageUrl = e.target.result
      isUploading.value = false
    }
    reader.readAsDataURL(file)
  }
}

const updateProfile = () => {
  if (!userData.email || !userData.name) {
    eventStore.popupMessage('error', 'กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }

  showModal.value = true
}

const confirmUpdate = () => {
  localStorage.setItem('user-profile', JSON.stringify(userData))
  eventStore.popupMessage('success', 'Update Profile successful!')
  showModal.value = false
}

const cancelUpdate = () => {
  showModal.value = false
}
</script>

<template>
  <UserLayout>
    <div class="container mx-auto max-w-2xl p-4 bg-base-100 my-4 border border-base-200 shadow-md">
      <h1 class="text-2xl">หน้าโปรไฟล์</h1>
      <div class="flex flex-col items-center">
        <div class="avatar">
          <div class="w-24 rounded-full">
            <img :src="userData.imageUrl" />
          </div>
        </div>

        <input 
          type="file" 
          @change="handleFileChange" 
          class="file-input file-input-bordered file-input-primary mt-4"
        />
        <div v-if="isUploading" class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>

        <div v-for="item in userForm" class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ item.name }}</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
            v-model="userData[item.field]"
          />
        </div>

        <button 
          class="btn btn-primary w-full mt-4" 
          @click="updateProfile"
        >
          อัปเดตโปรไฟล์
        </button>

        <div v-if="showModal" class="modal modal-open">
          <div class="modal-box">
            <h2 class="text-lg">ยืนยันการบันทึกข้อมูล</h2>
            <p>คุณต้องการบันทึกข้อมูลโปรไฟล์ใหม่หรือไม่?</p>
            <div class="modal-action">
              <button class="btn btn-ghost" @click="cancelUpdate">ยกเลิก</button>
              <button class="btn btn-primary" @click="confirmUpdate">ยืนยัน</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
