import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    list: [{
      no: 'A112234',
      customerName: 'คุณส้มโอ',
      totalPrice: '210',
      status: 'ชำระเงินเรียบร้อย',
      address: '111/892 เชียงใหม่ ประเทศไทย 99999',
      paymentMethod: 'บัตรเครดิต',
      updatedAt: '9/15/2023, 11:50:24 PM',
      products: [{
        name: 'น้ำแตงโม',
        description: 'รายละเอียดสินค้า 1',
        imageUrl: 'https://i.pinimg.com/564x/cc/26/73/cc26734d9802454d02e45a0263c78995.jpg',
        quantity: 1,
        price: '90'
      },
      {
        name: 'น้ำส้ม',
        description: 'รายละเอียดสินค้า 2',
        imageUrl: 'https://i.pinimg.com/564x/b8/a0/30/b8a030f3a0671d2e817636638721f46e.jpg',
        quantity: 1,
        price: '120'
      }]
    }]
  }),
  actions: {
    getOrder(index) {
      return this.list[index]
    }
  }
})