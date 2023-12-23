import { ref } from 'vue'
import supplierApi from '@/api/modules/information/supplier.ts'

const useSupplierStore = defineStore('supplier', () => {
  const supplierData = ref([])
  const supplierTotal = ref(0)

  // 获取供应商列表
  const getSupplierData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await supplierApi.getSupplierDataList(data)
    supplierData.value = Data
    supplierTotal.value = Total
  }

  return {
    supplierData,
    supplierTotal,
    getSupplierData,
  }
})

export default useSupplierStore
