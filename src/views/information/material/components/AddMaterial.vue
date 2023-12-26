<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Paperclip } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import materialApi from '@/api/modules/information/material.ts'
import useMaterialStore from '@/store/modules/information/material.ts'
import useUserStore from '@/store/modules/user.ts'

const props = defineProps({
  openAddMaterial: {
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
  materialList: {
    type: Array,
    default: [],
  },
})

const emit = defineEmits(['update:openAddMaterial', 'upList'])
const MaterialStore = useMaterialStore()
const userStore = useUserStore()

function closeShow() {
  emit('update:openAddMaterial', false)
}

const MaterialFormRef = ref<FormInstance>()
const AddMaterialForm = ref({
  Code: '',
  Name: '',
  ParentId: '',
  Remarks: '',
})
const MaterialFormRules = ref({
  Name: [{ required: true, trigger: 'blur', message: '请输入物料类型名称' }],
})

onMounted(async () => {
  if (props.title === '编辑') {
    await MaterialStore.getEditMaterialData({ id: props.editId })
    const { MaterialFormData } = storeToRefs(MaterialStore)
    AddMaterialForm.value = MaterialFormData.value
  }
})

function SaveData() {
  MaterialFormRef.value && MaterialFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (props.title === '新增') {
        await materialApi.AddMaterialDataList(AddMaterialForm.value)
      }
      else if (props.title === '编辑') {
        await materialApi.AddMaterialDataList({
          Code: AddMaterialForm.value.Code,
          CreateTime: MaterialStore.MaterialCreateTime,
          CreatorId: userStore.CreatorId,
          Id: MaterialStore.MaterialEditId,
          Name: AddMaterialForm.value.Name,
          ParentId: AddMaterialForm.value.ParentId,
          Remarks: AddMaterialForm.value.Remarks,
        })
      }
    }
    ElMessage.success('操作成功')
    closeShow()
    emit('upList')
  })
}
</script>

<template>
  <el-dialog :model-value="openAddMaterial" :title="`${title}物料类型`" @close="closeShow">
    <el-form
      ref="MaterialFormRef"
      :rules="MaterialFormRules"
      :model="AddMaterialForm"
      label-position="right"
      label-width="auto"
    >
      <el-form-item label="上级物料分类：">
        <el-tree-select
          v-model="AddMaterialForm.ParentId"
          check-strictly
          :data="materialList"
          :props="{ value: 'Id', label: 'Text' }"
          :render-after-expand="false"
          placeholder="请选择上级物料分类"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="物料分类编码：">
        <el-input v-model="AddMaterialForm.Code" placeholder="系统自动生成" disabled>
          <template #prefix>
            <svg-icon name="扫码" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="Name" label="物料分类名称：">
        <el-input v-model="AddMaterialForm.Name" :prefix-icon="Paperclip" />
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="AddMaterialForm.Remarks" type="textarea" />
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
