<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Location, User } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import supplierApi from '@/api/modules/information/supplier.ts'
import useSupplierStore from '@/store/modules/information/supplier.ts'

const props = defineProps({
  openAddAddress: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  supId: {
    type: String,
    default: '',
  },
  addressId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:openAddAddress', 'upList'])
const SupplierStore = useSupplierStore()
const AddressFormRef = ref<FormInstance>()

const AddressForm = ref({
  Address: '',
  Code: '',
  Name: '',
  Remarks: '',
  SupId: props.supId,
})
const AddressFormRules = ref({
  Name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
  Address: [{ required: true, trigger: 'blur', message: '请输入地址' }],
})

onMounted(async () => {
  if (props.title === '编辑') {
    await SupplierStore.getEditAddressData({ id: props.addressId })
    const { AddressFormData } = storeToRefs(SupplierStore)
    AddressForm.value = AddressFormData.value
  }
})

function closeShow() {
  emit('update:openAddAddress')
}

function SaveData() {
  AddressFormRef.value && AddressFormRef.value?.validate(async (valid) => {
    if (valid) {
      await supplierApi.AddAddressDataList(AddressForm.value)
      ElMessage.success('操作成功')
      closeShow()
      emit('upList')
    }
  })
}
</script>

<template>
  <el-dialog :model-value="openAddAddress" :title="`${title}地址`" @close="closeShow">
    <el-form
      ref="AddressFormRef"
      :model="AddressForm"
      :rules="AddressFormRules"
      style="width: 600px;margin: auto"
      label-position="right"
      label-width="auto"
    >
      <el-form-item label="编号">
        <el-input v-model="AddressForm.Code" placeholder="系统自动生成" disabled>
          <template #prefix>
            <svg-icon name="扫码" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="Name" label="名称">
        <el-input v-model="AddressForm.Name" :prefix-icon="User" />
      </el-form-item>
      <el-form-item prop="Address" label="地址">
        <el-input v-model="AddressForm.Address" :prefix-icon="Location" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="AddressForm.Remarks" style="width: 600px" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeShow">
        取消
      </el-button>
      <el-button type="primary" @click="SaveData">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-input{
  width: 600px;
}
</style>
