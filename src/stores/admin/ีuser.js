import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    list: [
      {
        name: 'ไมค์',
        role: 'ผู้ดูแลระบบ',
        status: 'ใช้งาน',
        updatedAt: '15/9/2023, 23:50:24',
    },
    {
        name: 'ทดสอบ',
        role: 'ผู้ดูแล',
        status: 'ไม่ใช้งาน',
        updatedAt: '15/9/2023, 23:50:24',
    },
    {
        name: 'ทีพี',
        role: 'สมาชิก',
        status: 'ใช้งาน',
        updatedAt: '15/9/2023, 23:50:24',
    }    
  ]
  }),
  actions: {
    getUser (index) {
      return this.list[index]
    },
    updateUser (index, userData) {
      this.list[index].name = userData.name
      this.list[index].status = userData.status
      this.list[index].role = userData.role
      this.list[index].updatedAt = (new Date()).toLocaleString()
    },
    removeUser (index) {
      this.list.splice(index, 1)
    }
  }
})