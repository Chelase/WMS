<script setup lang="ts">

defineProps({
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
})

const emit = defineEmits(['update:openMaterialPont'])

function closeShow() {
  emit('update:openMaterialPont', false)
}

</script>

<template>
  <el-dialog :model-value="openMaterialPont" :title="title" @close="closeShow">
    <el-form
      label-position="right"
      label-width="auto"
    >
      <el-form-item label="仓库：">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="巷道：">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="名称：">
        <el-input />
      </el-form-item>
      <el-form-item label="编码：">
        <el-input />
      </el-form-item>
      <el-form-item label="类型：">
        <el-select></el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button>取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-select{
  width: 100%;
}
</style>
