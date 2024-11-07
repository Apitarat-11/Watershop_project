<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useUserProductStore } from '@/stores/user/product'
import { useUserCartStore } from '@/stores/user/cart'

import UserLayout from '@/layouts/UserLayout.vue'
import ProductList from '@/components/ProductList.vue'

const userProductStore = useUserProductStore()
const userCartStore = useUserCartStore()

const router = useRouter()

onMounted(() => {
  userProductStore.loadProduct()
})

const addToCart = (productData) => {
  userCartStore.addToCart(productData)
  router.push({ name: 'cart' })
}
</script>

<template>
  <UserLayout>
    <div class="hero h-96 bg-base-200 bg-image">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-2xl font-bold">ยินดีต้อนรับเข้าสู่ร้านน้ำคลายร้อน</h1>
          <p class="py-6">เรามีเครื่องดื่มทุกชนิทที่สามารถคลายร้อนให้กลับลูกค้าทุกท่านได้</p>
        </div>
      </div>
    </div>
    <ProductList
      :products="userProductStore.list"
      :addToCart="addToCart"
    >
    </ProductList>
  </UserLayout>
</template>

<style scoped>
.bg-image {
  background-image: url('https://i.pinimg.com/564x/37/08/fb/3708fb8c78fcb06dbf71223f9fafc548.jpg');
}
</style>