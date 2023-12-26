<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import TrayTypeApi from '@/api/modules/information/TrayType.ts'
import useTrayTypeStore from '@/store/modules/information/TrayType.ts'

const props = defineProps({
  openAddPartitioning: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  trayTypeId: {
    type: String,
    default: '',
  },
  editId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:openAddPartitioning', 'upList'])
const TrayTypeStore = useTrayTypeStore()

const AddPartitioningFormRef = ref<FormInstance>()
const AddPartitioningForm = ref({
  Code: '',
  IsDefault: false,
  Name: '',
  TrayTypeId: props.trayTypeId,
  X: 0,
  Y: 0,
})
const AddPartitioningFormRules = ref({
  Code: [{ required: true, trigger: 'blur', message: '请输入编号' }],
  Name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
  IsDefault: [{ required: true, trigger: 'change', message: '请选择是否默认' }],
})

onMounted(async () => {
  if (props.title === '编辑') {
    await TrayTypeStore.getEditPartitioningData({ id: props.editId })
    const { EditAddPartitioningForm } = storeToRefs(TrayTypeStore)
    AddPartitioningForm.value = EditAddPartitioningForm.value
  }
})

function closeShow() {
  emit('update:openAddPartitioning', false)
}

async function SaveData() {
  AddPartitioningFormRef.value && AddPartitioningFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (props.title === '新增') {
        await TrayTypeApi.AddPartitioningDataList(AddPartitioningForm.value)
      }
      else if (props.title === '编辑') {
        await TrayTypeApi.AddPartitioningDataList({
          Code: AddPartitioningForm.value.Code,
          CreateTime: TrayTypeStore.AddPartitioningEditForm.CreateTime,
          CreatorId: TrayTypeStore.AddPartitioningEditForm.CreatorId,
          Id: TrayTypeStore.AddPartitioningEditForm.Id,
          IsDefault: AddPartitioningForm.value.IsDefault,
          Name: AddPartitioningForm.value.Name,
          TrayTypeId: AddPartitioningForm.value.TrayTypeId,
          X: AddPartitioningForm.value.X,
          Y: AddPartitioningForm.value.Y,
        })
      }
      closeShow()
      emit('upList')
      ElMessage.success('操作成功')
    }
  })
}
</script>

<template>
  <el-dialog :model-value="openAddPartitioning" :title="title" @close="closeShow">
    <el-form
      ref="AddPartitioningFormRef"
      :model="AddPartitioningForm"
      :rules="AddPartitioningFormRules"
      style="width: 600px;margin: auto"
      label-position="right"
      label-width="auto"
      :inline="true"
    >
      <el-form-item prop="Code" label="编号：">
        <el-input v-model="AddPartitioningForm.Code" />
      </el-form-item>
      <el-form-item prop="Name" label="名称：">
        <el-input v-model="AddPartitioningForm.Name" />
      </el-form-item>
      <el-form-item label="X：">
        <el-input-number
          v-model="AddPartitioningForm.X"
          :min="1"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="Y：">
        <el-input-number
          v-model="AddPartitioningForm.Y"
          :min="1"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item prop="IsDefault" label="是否默认：">
        <el-radio-group v-model="AddPartitioningForm.IsDefault" label="IsDefault">
          <el-radio-button label="true">
            是
          </el-radio-button>
          <el-radio-button label="false">
            否
          </el-radio-button>
        </el-radio-group>
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

</style>
