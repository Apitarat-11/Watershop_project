<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserCartStore } from '@/stores/user/cart'

const searchText = ref('')
const isLoggedIn = ref(false)
const userData = ref({
  imageUrl: 'https://cdn-icons-png.flaticon.com/256/8326/8326711.png', 
})

const router = useRouter()
const userCartStore = useUserCartStore()

onMounted(() => {
  if (localStorage.getItem('login')) {
    isLoggedIn.value = true
  }

  const savedUserProfile = localStorage.getItem('user-profile')
  if (savedUserProfile) {
    const userProfile = JSON.parse(savedUserProfile)
    userData.value.imageUrl = userProfile.imageUrl 
  }
})

watch(() => localStorage.getItem('user-profile'), () => {
  const savedUserProfile = localStorage.getItem('user-profile')
  if (savedUserProfile) {
    const userProfile = JSON.parse(savedUserProfile)
    userData.value.imageUrl = userProfile.imageUrl 
  }
})

const handleEnter = (event) => {
  if (event.key === 'Enter') {
    router.push({
      name: 'search',
      query: {
        q: searchText.value
      }
    })
  }
}

const login = () => {
  isLoggedIn.value = true
  localStorage.setItem('login', true)
}

const logout = () => {
  isLoggedIn.value = false
  localStorage.removeItem('login')
  localStorage.removeItem('cart-item')
  localStorage.removeItem('checkout-data')
  window.location.reload()
}
</script>

<template>
  <div class="max-w-screen-xl mx-auto">
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost normal-case text-3xl">ร้านน้ำคลายร้อน</RouterLink>
      </div>
      <div class="flex-none">
        <!-- Search input -->
        <div class="form-control">
          <input type="text" v-model="searchText" placeholder="Search" class="input input-bordered w-24 md:w-auto"
            @keyup="handleEnter" />
        </div>
        <!-- Cart dropdown -->
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="badge badge-sm indicator-item">{{ userCartStore.quantity }}</span>
            </div>
          </label>
          <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div class="card-body">
              <span class="font-bold text-lg">{{ userCartStore.quantity }} รายการ</span>
              <span class="text-info">Subtotal: {{ userCartStore.summaryPrice }} บาท</span>
              <div class="card-actions">
                <RouterLink to="/cart" class="btn btn-primary btn-block">
                  ดูตะกร้า
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isLoggedIn" class="btn btn-ghost" @click="login">
          เข้าสู่ระบบ
        </div>
        <div v-else class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <!-- ใช้รูปจาก userData -->
              <img :src="userData.imageUrl" />
            </div>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <RouterLink to="/profile" class="justify-between">
                <a>โปรไฟล์</a>
              </RouterLink>
            </li>
            <li>
              <a @click="logout">ออกจากระบบ</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <slot></slot>
    <footer class="footer p-10 bg-neutral text-neutral-content">
      <div>
        <span class="footer-title">บริการ</span>
        <a class="link link-hover">แบรนดิ้ง</a>
        <a class="link link-hover">ออกแบบ</a>
        <a class="link link-hover">การตลาด</a>
        <a class="link link-hover">โฆษณา</a>
      </div>
      <div>
        <span class="footer-title">บริษัท</span>
        <a class="link link-hover">เกี่ยวกับเรา</a>
        <a class="link link-hover">ติดต่อ</a>
        <a class="link link-hover">งาน</a>
        <a class="link link-hover">ชุดสื่อ</a>
      </div>
      <div>
        <span class="footer-title">กฎหมาย</span>
        <a class="link link-hover">เงื่อนไขการใช้งาน</a>
        <a class="link link-hover">นโยบายความเป็นส่วนตัว</a>
        <a class="link link-hover">นโยบายคุกกี้</a>
      </div>

    </footer>
  </div>
</template>
