<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const emit = defineEmits(['upWarehouseShow'])

const ruleFormRef = ref<FormInstance>()

const WarehouseForm = ref({
  Code: '',
  Name: '',
  Type: '',
  Text: '',
})

const WarehouseRules = ref<FormRules>({
  Name: [
    { required: true, trigger: 'blur', message: '请输入系统名称' },
  ],
  Type: [
    { required: true, trigger: 'blur', message: '请输入仓库类型' },
  ],
})

function closeShow() {
  emit('upWarehouseShow', false)
}
</script>

<template>
  <el-form ref="WarehouseFormRef" :rules="WarehouseRules" :model="WarehouseForm" label-position="right" label-width="auto">
    <el-form-item prop="Code" label="仓库编号">
      <el-input v-model="WarehouseForm.Code" />
    </el-form-item>
    <el-form-item prop="Name" label="仓库名称">
      <el-input v-model="WarehouseForm.Name" />
    </el-form-item>
    <el-form-item prop="Type" label="仓库类型">
      <el-select v-model="WarehouseForm.Type" placeholder="仓库类型">
        <el-option label="平面仓库" value="Plane" />
        <el-option label="立体仓库" value="立库" />
      </el-select>
    </el-form-item>
    <el-form-item prop="Text" label="备注">
      <el-input v-model="WarehouseForm.Text" type="textarea" />
    </el-form-item>
  </el-form>
  <el-row style="float: right">
    <el-button @click="closeShow">
      取消
    </el-button>
    <el-button type="primary">
      确定
    </el-button>
  </el-row>
</template>

<style scoped lang="scss">

</style>
