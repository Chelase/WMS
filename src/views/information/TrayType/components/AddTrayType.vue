<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import Message from 'vue-m-message'
import { storeToRefs } from 'pinia'
import TrayTypeApi from '@/api/modules/information/TrayType.ts'
import useTrayTypeStore from '@/store/modules/information/TrayType.ts'

const props = defineProps({
  openAddTrayType: {
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

const emit = defineEmits(['update:openAddTrayType', 'upList'])
const TrayTypeStore = useTrayTypeStore()

const AddTrayTypeFrom = ref({
  Code: '',
  High: 0,
  IsZone: false,
  Length: 0,
  Name: '',
  Width: 0,
})
const AddTrayTypeFromRef = ref<FormInstance>()
const AddTrayTypeFromRules = ref({
  Name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
})

// 获取编辑详情
onMounted(async () => {
  if (props.title === '编辑') {
    await TrayTypeStore.getEditTrayTypeData({ id: props.editId })
    const { EditTrayTypeFrom } = storeToRefs(TrayTypeStore)
    AddTrayTypeFrom.value = EditTrayTypeFrom.value
  }
})

function closeShow() {
  emit('update:openAddTrayType', false)
}

async function SaveData() {
  AddTrayTypeFromRef.value && AddTrayTypeFromRef.value?.validate(async (valid) => {
    if (valid) {
      if (props.title === '新增') {
        await TrayTypeApi.AddTrayTypeDataList(AddTrayTypeFrom.value)
      }
      else if (props.title === '编辑') {
        await TrayTypeApi.AddTrayTypeDataList({
          Code: AddTrayTypeFrom.value.Code,
          CreateTime: TrayTypeStore.TrayTypeEditForm.CreateTime,
          CreatorId: TrayTypeStore.TrayTypeEditForm.CreatorId,
          High: AddTrayTypeFrom.value.High,
          Id: TrayTypeStore.TrayTypeEditForm.Id,
          IsZone: AddTrayTypeFrom.value.IsZone,
          Length: AddTrayTypeFrom.value.Length,
          Name: AddTrayTypeFrom.value.Name,
          Width: AddTrayTypeFrom.value.Width,
        })
      }
      closeShow()
      emit('upList')
      Message.success('操作成功')
    }
  })
}
</script>

<template>
  <el-dialog :model-value="openAddTrayType" :title="title" @close="closeShow">
    <el-form
      ref="AddTrayTypeFromRef"
      :model="AddTrayTypeFrom"
      :rules="AddTrayTypeFromRules"
      style="width: 570px;margin: auto"
      label-position="right"
      label-width="auto"
      :inline="true"
    >
      <el-form-item label="编号：">
        <el-input v-model="AddTrayTypeFrom.Code" disabled placeholder="系统自动生成" />
      </el-form-item>
      <el-form-item prop="Name" label="名称：">
        <el-input v-model="AddTrayTypeFrom.Name" />
      </el-form-item>
      <el-form-item label="长：">
        <el-input-number
          v-model="AddTrayTypeFrom.Length"
          :min="1"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="宽：">
        <el-input-number
          v-model="AddTrayTypeFrom.Width"
          :min="1"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="高：">
        <el-input-number
          v-model="AddTrayTypeFrom.High"
          :min="1"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="分区：">
        <el-radio-group v-model="AddTrayTypeFrom.IsZone" label="IsZone">
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
.el-input-number{
  width: 195px;
}
</style>
