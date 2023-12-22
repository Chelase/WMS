<script setup lang="ts">
defineProps({
  openAddBoM: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:openAddBoM'])

function closeShow() {
  emit('update:openAddBoM')
}
</script>

<template>
  <el-dialog :model-value="openAddBoM" title="物料选择" width="60%" @close="closeShow">
    <el-row>
      <el-select placeholder="物料类型" style="margin-right: 10px" />
      <el-input placeholder="物料名称\编号\条码" />
      <el-input placeholder="客户\供应商名称或编码" />
      <el-button type="primary">
        查询
      </el-button>
      <el-button>重置</el-button>
    </el-row>
    <el-table
      border
      style="margin-top: 20px"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="物料名称" />
      <el-table-column label="物料编码" />
      <el-table-column label="物料类别" />
      <el-table-column label="条码" />
      <el-table-column label="物料简称" />
      <el-table-column label="物料规格" />
      <template #empty>
        <el-empty />
      </template>
    </el-table>
    <template #footer>
      <el-button>取消</el-button>
      <el-button type="primary">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-input{
  width: 200px;
  margin-right: 10px;
}
</style>
