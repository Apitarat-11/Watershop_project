<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import { reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserCartStore } from '@/stores/user/cart'

// กำหนดฟิลด์ฟอร์มสำหรับกรอกข้อมูลผู้ใช้งาน
const checkoutForm = [
  { name: 'อีเมลของผู้ใช้งาน', field: 'email' },
  { name: 'ชื่อ', field: 'name' },
  { name: 'ที่อยู่', field: 'address' },
  { name: 'ข้อแนะนำ', field: 'note' }
]

const userCartStore = useUserCartStore()
const userCheckoutData = reactive(JSON.parse(localStorage.getItem('checkoutData')) || {})
const router = useRouter()

// ฟังก์ชันเพื่อบันทึกข้อมูลการกรอกลงใน localStorage
const saveDataToLocalStorage = () => {
  localStorage.setItem('checkoutData', JSON.stringify(userCheckoutData))
}

// โหลดข้อมูลจาก localStorage เมื่อตอนที่โหลดหน้า
onMounted(() => {
  const savedData = localStorage.getItem('checkoutData')
  if (savedData) {
    Object.assign(userCheckoutData, JSON.parse(savedData))
  }
})

// ตรวจสอบและบันทึกข้อมูลทุกครั้งที่ userCheckoutData เปลี่ยนแปลง
watch(userCheckoutData, saveDataToLocalStorage, { deep: true })

// ฟังก์ชันสำหรับเช็คเอาต์
const checkout = () => {
  // ตรวจสอบข้อมูลที่กรอกก่อน
  if (!userCheckoutData.email || !userCheckoutData.name || !userCheckoutData.address) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }
  
  // ส่งข้อมูลการชำระเงินไปที่ store
  userCartStore.checkout(userCheckoutData)
  
  // ไปยังหน้าสำเร็จหลังจากเช็คเอาต์
  router.push({ name: 'success' })
}
</script>

<template>
  <UserLayout>
    <div class="container mx-auto my-4">
      <h1 class="text-4xl mb-4">ข้อมูลของผู้ที่กำลังชำระสินค้า</h1>
      <div class="flex">
        <!-- ส่วนฟอร์มกรอกข้อมูล -->
        <section class="flex-auto w-64 bg-base-200">
          <div class="px-8 py-2">
            <div
              v-for="form in checkoutForm"
              class="form-control w-full"
              :key="form.field"
            >
              <label class="label">
                <span class="label-text">{{ form.name }}</span>
              </label>
              <textarea
                v-if="form.field === 'address'"
                class="textarea textarea-bordered h-24"
                placeholder="กรอกที่อยู่"
                v-model="userCheckoutData[form.field]"
              ></textarea>
              <input
                v-else
                type="text"
                placeholder="กรอกข้อมูลที่นี่"
                class="input input-bordered input-sm w-full"
                v-model="userCheckoutData[form.field]"
              />
            </div>
            <button class="btn btn-primary w-full mt-4" @click="checkout">
              ชำระเงิน
            </button>
          </div>
        </section>
        
        <!-- ส่วนสรุปการสั่งซื้อ -->
        <section class="flex-auto w-32 bg-slate-200">
          <div class="px-8">
            <ul>
              <li v-for="(item, index) in userCartStore.items" class="px-2 flex py-6" :key="index">
                <img class="w-40 object-cover object-center" :src="item.imageUrl" />
                <div class="flex flex-col justify-between ml-4">
                  <div>
                    <div>{{ item.name }}</div>
                    <div>จำนวน: {{ item.quantity }}</div>
                  </div>
                  <div class="flex mt-2">
                    <button @click="userCartStore.removeItemInCart(index)">ลบ</button>
                  </div>
                </div>
              </li>
            </ul>
            <div class="divider"></div>
            <div class="mb-4">
              <h2 class="text-2xl">สรุปรายการสั่งซื้อ</h2>
              <div class="mt-4 m-0">
                <div class="flex align-middle justify-between mb-2">
                  <div class="font-bold">ราคาสินค้าทั้งหมด</div>
                  <div>{{ userCartStore.summaryPrice }} ฿</div>
                </div>
                <div class="flex align-middle justify-between mb-2">
                  <div class="font-bold">ค่าส่ง</div>
                  <div>0</div>
                </div>
                <div class="divider"></div>
                <div class="flex align-middle justify-between mb-2">
                  <div class="font-bold">ราคาทั้งสิ้น</div>
                  <div>{{ userCartStore.summaryPrice }} ฿</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </UserLayout>
</template>
