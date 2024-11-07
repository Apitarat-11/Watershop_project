<script setup>
import { onMounted, reactive, computed } from 'vue'
import { useUserCartStore } from '@/stores/user/cart'
import UserLayout from '@/layouts/UserLayout.vue'

const userCartStore = useUserCartStore()
const checkoutData = reactive({
  name: '',
  orderNumber: '',
  paymentMethod: '',
  address: '',
  products: [],
  totalPrice: 0
})


onMounted(() => {
  userCartStore.loadCheckout()  
  checkoutData.name = userCartStore.checkout.name || 'ผู้ใช้งานไม่ระบุ'
  checkoutData.orderNumber = userCartStore.checkout.orderNumber
  checkoutData.paymentMethod = userCartStore.checkout.paymentMethod
  checkoutData.address = userCartStore.checkout.address
  checkoutData.products = userCartStore.checkout.products || []
  checkoutData.totalPrice = userCartStore.checkout.totalPrice
})
</script>

<template>
  <UserLayout>
    <div class="container mx-auto max-w-2xl p-4 bg-base-100 my-4 border border-base-200 shadow-md">
      <h1 class="text-2xl">รายละเอียดคำสั่งซื้อของคุณ</h1>
      <div>
        <div>สวัสดีคุณ: {{ checkoutData.name }}</div>
        <div>เตรียมรอรับสินค้าของคุณได้เลย</div>
      </div>
      <div class="divider"></div>

      <div class="flex justify-between">
        <div>
          <div class="font-bold">วันที่สั่งซื้อ</div>
          <div>{{ checkoutData.createdAt }}</div>
        </div>
        <div>
          <div class="font-bold">เลขที่คำสั่งซื้อ</div>
          <div>{{ checkoutData.orderNumber }}</div>
        </div>
        <div>
          <div class="font-bold">วิธีการชำระเงิน</div>
          <div>{{ checkoutData.paymentMethod }}</div>
        </div>
        <div>
          <div class="font-bold">ที่อยู่</div>
          <div>{{ checkoutData.address }}</div>
        </div>
      </div>

      <div class="divider"></div>
      <div v-for="(product, index) in checkoutData.products" class="flex items-center" :key="index">
        <div>
          <img class="w-48" :src="product.imageUrl" />
        </div>
        <div class="flex-1 ml-4">
          <div class="font-bold">{{ product.name }}</div>
          <div>{{ product.about }}</div>
        </div>
        <div class="flex-1">จำนวน {{ product.quantity }}</div>
        <div>{{ product.price * product.quantity }} ฿</div>
      </div>

      <div class="divider"></div>

      <div class="mt-4 m-0">
        <div class="flex align-middle justify-between mb-2">
          <div class="font-bold">ราคาของสินค้าทั้งหมด</div>
          <div>{{ checkoutData.totalPrice }} บาท</div>
        </div>
        <div class="flex align-middle justify-between mb-2">
          <div class="font-bold">ค่าส่ง</div>
          <div>0 บาท</div>
        </div>
      </div>

      <div class="divider"></div>
      <div class="flex align-middle justify-between mb-2">
        <div class="font-bold">ราคารวมทั้งสิ้น</div>
        <div>{{ checkoutData.totalPrice }} บาท</div>
      </div>

      <div class="divider"></div>
      <div>
        ขอบคุณที่มาอุดหนุนสินค้าทางร้านเรา
      </div>
    </div>
  </UserLayout>
</template>
