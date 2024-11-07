<script setup>
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageData = [
  {
    name: 'แดชบอร์ด', // Dashboard
    route: '/admin/dashboard',
  },
  {
    name: 'ผลิตภัณฑ์', // Product
    route: '/admin/products',
  },
  {
    name: 'คำสั่งซื้อ', // Order
    route: '/admin/orders',
  },
  {
    name: 'ผู้ใช้', // User
    route: '/admin/users',
  },
  {
    name: 'ออกจากระบบ', // Logout
    route: '/admin/login',
  },
]

const currentPath = ref('')
currentPath.value = route.path

const pageName = computed(() => {
  const currentPage = pageData.find(page => page.route === currentPath.value)
  return currentPage ? currentPage.name : 'ไม่พบหน้า' 
})
</script>

<template>
  <div class="drawer drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content p-4">
      <slot></slot>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-60 h-full bg-base-200 text-base-content">

        <li class="mb-2 font-semibold text-2xl">
          <div>ผู้ดูแลระบบ {{ pageName }}</div>
        </li>
        <li v-for="page in pageData" :key="page.route">
          <RouterLink :to="page.route" :class="currentPath === page.route ? 'active' : ''">
            {{ page.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
