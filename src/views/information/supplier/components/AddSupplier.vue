<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Location, Message, Phone, Printer, User } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import useSupplierStore from '@/store/modules/information/supplier.ts'
import supplierApi from '@/api/modules/information/supplier.ts'

const props = defineProps({
  openSupplier: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  editId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:openSupplier', 'upList'])
const SupplierStore = useSupplierStore()

const AddSupplierFormRef = ref<FormInstance>()
const AddSupplierForm = ref({
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
const AddSupplierFormRules = ref<FormRules>({
  Name: [
    { required: true, trigger: 'blur', message: '请输入供应商名称' },
  ],
  Type: [
    { required: true, trigger: 'change', message: '请选择供应商类型' },
  ],
  Phone: [
    { required: false, trigger: 'blur', message: '请选择供应商类型' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
})

onMounted(async () => {
  if (props.title === '编辑') {
    await SupplierStore.getEditSupplierData({ id: props.editId })
    const { supplierFormData } = storeToRefs(SupplierStore)
    AddSupplierForm.value = supplierFormData.value
  }
})

function closeShow() {
  emit('update:openSupplier', false)
}

function SaveData() {
  AddSupplierFormRef.value && AddSupplierFormRef.value?.validate(async (valid) => {
    if (valid) {
      await supplierApi.AddSupplierDataList(AddSupplierForm.value)
      ElMessage.success('操作成功')
      closeShow()
      emit('upList')
    }
  })
}
</script>

<template>
  <el-dialog :model-value="openSupplier" :title="`${title}供应商`" @close="closeShow">
    <el-form
      ref="AddSupplierFormRef"
      :model="AddSupplierForm"
      :rules="AddSupplierFormRules"
      label-position="right"
      style="width: 600px;margin: auto"
      label-width="auto"
    >
      <el-form-item label="供应商编号：">
        <el-input v-model="AddSupplierForm.Code" placeholder="系统自动生成" disabled>
          <template #prefix>
            <svg-icon name="扫码" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="Name" label="供应商名称：">
        <el-input v-model="AddSupplierForm.Name" :prefix-icon="User" />
      </el-form-item>
      <el-form-item prop="Type" label="供应商类型：">
        <el-select v-model="AddSupplierForm.Type" clearable placeholder="供应商类型">
          <el-option label="公司" value="Company" />
          <el-option label="个人" value="Personal" />
          <el-option label="虚拟" value="Virtual" />
          <el-option label="内部" value="Internal" />
          <el-option label="生产车间" value="Product" />
          <el-option label="模块" value="model" />
        </el-select>
      </el-form-item>
      <el-form-item prop="Phone" label="电话：">
        <el-input v-model="AddSupplierForm.Phone" :prefix-icon="Phone" />
      </el-form-item>
      <el-form-item label="传真：">
        <el-input v-model="AddSupplierForm.Fax" :prefix-icon="Printer" />
      </el-form-item>
      <el-form-item label="Email：">
        <el-input v-model="AddSupplierForm.Email" :prefix-icon="Message" />
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="AddSupplierForm.ContactName">
          <template #prefix>
            <svg-icon name="ep:postcard" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="地址：">
        <el-input v-model="AddSupplierForm.Address" :prefix-icon="Location" />
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="AddSupplierForm.Remarks" style="width: 550px;margin: auto" type="textarea" />
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
  width: 550px;
  margin: auto;
}
.el-select{
  width: 550px;
  margin: auto;
}
</style>
