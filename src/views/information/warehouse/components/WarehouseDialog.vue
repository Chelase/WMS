<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import Message from 'vue-m-message'
import { storeToRefs } from 'pinia'
import useWarehouseStore from '@/store/modules/information/warehouse.ts'
import useUserStore from "@/store/modules/user.ts";

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  storId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['upWarehouseShow', 'upWarehouseList'])

const WarehouseStore = useWarehouseStore()
const userStore = useUserStore()

const id = ref(props.storId)

watch(() => props.storId, (newValue) => {
  id.value = newValue
})

onMounted(() => {
  if (props.title === '编辑') {
    getEditWarehouse()
  }
})

// 获取编辑信息
async function getEditWarehouse() {
  await WarehouseStore.GetEditWarehouseList({ id: id.value })
  const { WarehouseFormData } = storeToRefs(WarehouseStore)
  WarehouseForm.value = WarehouseFormData.value
}

const WarehouseForm = ref({
  Code: '',
  Name: '',
  Type: '',
  Remarks: '',
})

const WarehouseRules = ref<FormRules>({
  Name: [
    { required: true, trigger: 'blur', message: '请输入系统名称' },
  ],
  Type: [
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
      if (props.title === '新增') { await WarehouseStore.AddWarehouseList(WarehouseForm.value) }
      else {
        const EditWarehouseForm = ref({
          Code: WarehouseForm.value.Code,
          CreateTime: WarehouseStore.CreateTimes,
          CreatorId: userStore.CreatorId,
          Id: id.value,
          Name: WarehouseForm.value.Name,
          Remarks: WarehouseForm.value.Remarks,
          Type: WarehouseForm.value.Type,
        })
        await WarehouseStore.EditWarehouseData(EditWarehouseForm.value)
      }
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
      <el-input v-model="WarehouseForm.Code" placeholder="系统自动生成" disabled />
    </el-form-item>
    <el-form-item prop="name" label="仓库名称">
      <el-input v-model="WarehouseForm.Name" />
    </el-form-item>
    <el-form-item prop="type" label="仓库类型">
      <el-select v-model="WarehouseForm.Type" placeholder="仓库类型">
        <el-option label="平面仓库" value="Plane" />
        <el-option label="立体仓库" value="Frame" />
      </el-select>
    </el-form-item>
    <el-form-item prop="remarks" label="备注">
      <el-input v-model="WarehouseForm.Remarks" type="textarea" />
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
