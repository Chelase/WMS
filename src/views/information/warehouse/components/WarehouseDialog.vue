<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import Message from 'vue-m-message'
import useWarehouseStore from '@/store/modules/information/warehouse.ts'

const emit = defineEmits(['upWarehouseShow', 'upWarehouseList'])

const WarehouseStore = useWarehouseStore()

const WarehouseForm = ref({
  code: '',
  name: '',
  type: '',
  remarks: '',
})

const WarehouseRules = ref<FormRules>({
  name: [
    { required: true, trigger: 'blur', message: '请输入系统名称' },
  ],
  type: [
    { required: true, trigger: 'change', message: '请输入仓库类型' },
  ],
})

// 通知父组件关闭子组件
function closeShow() {
  emit('upWarehouseShow', false)
}

// 通知父组件更新列表
function upList() {
  emit('upWarehouseList')
}

// 新增
const WarehouseFormRef = ref<FormInstance>()
async function SaveData() {
  WarehouseFormRef.value && WarehouseFormRef.value?.validate(async (valid) => {
    if (valid) {
      console.log(WarehouseForm.value)
      await WarehouseStore.AddWarehouseList(WarehouseForm.value)
      Message.success('操作成功')
      closeShow()
      upList()
    }
  })
}
</script>

<template>
  <el-form ref="WarehouseFormRef" :rules="WarehouseRules" :model="WarehouseForm" label-position="right" label-width="auto">
    <el-form-item prop="code" label="仓库编号">
      <el-input v-model="WarehouseForm.code" placeholder="系统自动生成" disabled />
    </el-form-item>
    <el-form-item prop="name" label="仓库名称">
      <el-input v-model="WarehouseForm.name" />
    </el-form-item>
    <el-form-item prop="type" label="仓库类型">
      <el-select v-model="WarehouseForm.type" placeholder="仓库类型">
        <el-option label="平面仓库" value="Plane" />
        <el-option label="立体仓库" value="Frame" />
      </el-select>
    </el-form-item>
    <el-form-item prop="remarks" label="备注">
      <el-input v-model="WarehouseForm.remarks" type="textarea" />
    </el-form-item>
  </el-form>
  <el-row style="float: right">
    <el-button @click="closeShow">
      取消
    </el-button>
    <el-button type="primary" @click="SaveData">
      确定
    </el-button>
  </el-row>
</template>

<style scoped lang="scss">

</style>
