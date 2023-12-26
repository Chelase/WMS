<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import useMaterialPointStore from '@/store/modules/information/MaterialPoint.ts'
import useUserStore from '@/store/modules/user.ts'
import MaterialPointApi from '@/api/modules/information/MaterialPoint.ts'

const props = defineProps({
  openMaterialPont: {
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
  warehouseList: {
    type: Array,
    default: [],
  },
})

const emit = defineEmits(['update:openMaterialPont', 'upList'])
const MaterialPontStore = useMaterialPointStore()
const userStore = useUserStore()
const AddMaterialPontFormRef = ref<FormInstance>()

const AddMaterialPontFormRules = ref({
  Name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
  Code: [{ required: true, trigger: 'blur', message: '请输入编码' }],
  Type: [{ required: true, trigger: 'change', message: '请选择类型' }],
  StorId: [{ required: true, trigger: 'change', message: '请选择仓库' }],
  LaneId: [{ required: true, trigger: 'change', message: '请选择巷道' }],
})

const AddMaterialPontForm = ref({
  Code: '',
  LaneId: '',
  Name: '',
  StorId: '',
  Type: '',
})

// 获取巷道
const roadway = ref([])

watch(() => AddMaterialPontForm.value.StorId, (newStorId) => {
  if (newStorId) {
    getRoadway()
  }
})

onMounted(async () => {
  if (props.title === '编辑') {
    await MaterialPontStore.getEditMaterialPontData({ id: props.editId })
    const { AddMaterialPontFormData } = storeToRefs(MaterialPontStore)
    AddMaterialPontForm.value = AddMaterialPontFormData.value
  }
})

async function getRoadway() {
  await MaterialPontStore.getByStorData(AddMaterialPontForm.value.StorId)
  const { ByStorData } = storeToRefs(MaterialPontStore)
  roadway.value = ByStorData.value
}

function closeShow() {
  emit('update:openMaterialPont', false)
}

async function SaveData() {
  AddMaterialPontFormRef.value && AddMaterialPontFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (props.title === '新增') {
        await MaterialPointApi.AddMaterialPointDataList(AddMaterialPontForm.value)
      }
      else if (props.title === '编辑') {
        await MaterialPointApi.AddMaterialPointDataList({
          Code: AddMaterialPontForm.value.Code,
          CreateTime: MaterialPontStore.MaterialPontCreateTime,
          CreatorId: userStore.CreatorId,
          Id: props.editId,
          LaneId: AddMaterialPontForm.value.LaneId,
          Name: AddMaterialPontForm.value.Name,
          StorId: AddMaterialPontForm.value.StorId,
          Type: AddMaterialPontForm.value.Type,
        })
      }
      ElMessage.success('操作成功')
      closeShow()
      emit('upList')
    }
  })
}
</script>

<template>
  <el-dialog :model-value="openMaterialPont" :title="title" @close="closeShow">
    <el-form
      ref="AddMaterialPontFormRef"
      :model="AddMaterialPontForm"
      :rules="AddMaterialPontFormRules"
      label-position="right"
      label-width="auto"
    >
      <el-form-item prop="StorId" label="仓库：">
        <el-select v-model="AddMaterialPontForm.StorId" clearable placeholder="请选择仓库">
          <el-option v-for="item in warehouseList" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="LaneId" label="巷道：">
        <el-select v-model="AddMaterialPontForm.LaneId" clearable placeholder="请选择仓库">
          <el-option v-for="item in roadway" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="Name" label="名称：">
        <el-input v-model="AddMaterialPontForm.Name" />
      </el-form-item>
      <el-form-item prop="Code" label="编码：">
        <el-input v-model="AddMaterialPontForm.Code" />
      </el-form-item>
      <el-form-item prop="Type" label="类型：">
        <el-select v-model="AddMaterialPontForm.Type" clearable placeholder="上下料点类型">
          <el-option label="只进" value="In" />
          <el-option label="只出" value="Out" />
          <el-option label="进出" value="InOut" />
          <el-option label="出回" value="OutBack" />
        </el-select>
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
.el-select{
  width: 100%;
}
</style>
