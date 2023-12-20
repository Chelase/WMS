<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import useWarehouseStore from '@/store/modules/information/warehouse.ts'

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

const emit = defineEmits(['upAddSlideoverShow', 'upList'])

const WarehouseStore = useWarehouseStore()

const AddSlideoverFormRef = ref<FormInstance>()

const SlideoverForm = ref({
  code: '',
  name: '',
  storId: props.storId,
})

watch(() => props.storId, (newValue) => {
  SlideoverForm.value.storId = newValue
})

const SlideoverRules = ref({
  name: [
    { required: true, trigger: 'blur', message: '请输入系统名称' },
  ],
})

// 通知组件更新列表
function upList() {
  emit('upList')
}

// 关闭弹窗
function closeShow() {
  emit('upAddSlideoverShow', false)
  AddSlideoverFormRef.value.resetFields()
}

function SaveData() {
  AddSlideoverFormRef.value && AddSlideoverFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (props.title === '巷道') { await WarehouseStore.AddRoadwayData(SlideoverForm.value) }
      else { await WarehouseStore.AddGoodsShelvesData(SlideoverForm.value) }
      ElMessage.success('操作成功')
      closeShow()
      upList()
    }
  })
}
</script>

<template>
  <el-form ref="AddSlideoverFormRef" :rules="SlideoverRules" :model="SlideoverForm" label-position="right" label-width="auto">
    <el-form-item prop="code" :label="`${title}编号`">
      <el-input v-model="SlideoverForm.code" placeholder="系统自动生成" disabled />
    </el-form-item>
    <el-form-item prop="name" :label="`${title}名称`">
      <el-input v-model="SlideoverForm.name" />
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
