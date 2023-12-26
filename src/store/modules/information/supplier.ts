import { ref } from 'vue'
import supplierApi from '@/api/modules/information/supplier.ts'

const useSupplierStore = defineStore('supplier', () => {
  const supplierData = ref([])
  const supplierTotal = ref(0)
  const supplierFormData = ref({
    Code: '',
    Address: '',
    ContactName: '',
    Email: '',
    Fax: '',
    Name: '',
    Phone: '',
    Remarks: '',
    Type: '',
  })
  const AddressData = ref([])
  const AddressDataTotal = ref(0)
  const AddressFormData = ref({
    Address: '',
    Code: '',
    Name: '',
    Remarks: '',
    SupId: '',
  })
  const AddressEditForm = ref({
    CreateTime: '',
    IsDefault: false,
    IsEnable: false,
  })

  // 获取供应商列表
  const getSupplierData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await supplierApi.getSupplierDataList(data)
    supplierData.value = Data
    supplierTotal.value = Total
  }

  // 获取供应商编辑详情
  const getEditSupplierData = async (id: NonNullable<object>) => {
    const { Data } = await supplierApi.getEditSupplierDataList(id)
    supplierFormData.value = Data
  }

  // 获取地址
  const getAddressData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await supplierApi.getAddressDataList(data)
    AddressData.value = Data
    AddressDataTotal.value = Total
  }

  // 获取编辑地址详情
  const getEditAddressData = async (id: NonNullable<object>) => {
    const { Data: { Code, Address, SupId, Remarks, Name, CreateTime, IsEnable, IsDefault } } = await supplierApi.getEditAddressDataList(id)
    AddressFormData.value = {
      Address,
      Code,
      Name,
      Remarks,
      SupId,
    }
    AddressEditForm.value = {
      CreateTime,
      IsDefault,
      IsEnable,
    }
  }

  return {
    supplierData,
    supplierTotal,
    supplierFormData,
    AddressData,
    AddressDataTotal,
    AddressFormData,
    AddressEditForm,
    getSupplierData,
    getEditSupplierData,
    getAddressData,
    getEditAddressData,
  }
})

export default useSupplierStore
