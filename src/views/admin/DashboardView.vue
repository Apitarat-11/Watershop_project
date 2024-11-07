<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'

const barOption = {
  options: {
    chart: {
      id: 'vuechart-example'
    },
    xaxis: {
      categories: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.']
    }
  },
  series: [{
    name: 'ยอดขาย',
    data: [300, 400, 350, 500, 480, 520, 600, 700]
  }]
}

const donutOption = {
  options: {
        labels: ['ชาไทย', 'ชานม', 'น้ำส้ม', 'ชาผลไม้', 'น้ำเบอร์รี่']
    },
    series: [44, 25, 15, 10, 6]
}
</script>

<template>
  <AdminLayout>
    <h1 class="text-4xl mb-4">ร้านน้ำคลายร้อน</h1>
    <div class="flex mb-4">
      <div class="stats w-full shadow">
        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em"
              viewBox="0 0 320 512">
        
            </svg>
          </div>
          <div class="stat-title">ยอดขายเดือนนี้</div>
          <div class="stat-value">15K</div>
        </div>
        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em"
              viewBox="0 0 448 512">
              
            </svg>
          </div>
          <div class="stat-title">จำนวนสินค้า</div>
          <div class="stat-value">400</div>
        </div>
        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              </path>
            </svg>
          </div>
          <div class="stat-title">ลูกค้า</div>
          <div class="stat-value">1000</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex-1">
        <div class="card w-full p-6 bg-base-100 shadow-xl">
          <h1>ยอดขายรายเดือน</h1>
          <apexchart type="bar" :options="barOption.options" :series="barOption.series"></apexchart>
        </div>
      </div>
      <div class="flex-1">
        <div class="card w-full p-6 bg-base-100 shadow-xl">
          <h1>ประเภทการขาย</h1>
          <apexchart type="donut" :options="donutOption.options" :series="donutOption.series"></apexchart>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>