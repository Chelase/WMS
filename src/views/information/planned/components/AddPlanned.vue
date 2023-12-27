<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";

const props = defineProps({
  openAddPlanned: {
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

const emit = defineEmits(['update:openAddPlanned', 'upList'])

function closeShow() {
  emit('update:openAddPlanned', false)
}

</script>

<template>
  <el-dialog :model-value="openAddPlanned" :title="title" @close="closeShow">
    <el-form
      label-position="right"
      label-width="auto"
      :inline="true"
    >
      <el-form-item label="计划编号：">
        <el-input disabled placeholder="系统自动生成">
          <template #prefix>
            <svg-icon name="扫码" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Bom版本：">
        <el-input />
      </el-form-item>
      <el-form-item label="物料：">
        <el-row>
          <el-select style="width: 160px"></el-select>
          <el-button type="primary" :icon="Search" />
        </el-row>
      </el-form-item>
      <el-form-item label="批次号：">
        <el-input />
      </el-form-item>
      <el-form-item label="数量：">
        <el-input-number
          :min="1"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="计划日期：">
        <el-input />
      </el-form-item>
      <el-form-item label="开始日期：">
        <el-input />
      </el-form-item>
      <el-form-item label="完成日期：">
        <el-input />
      </el-form-item>
      <el-form-item label="备注：">
        <el-input />
      </el-form-item>
      <el-form-item label="订单编号：">
        <el-input />
      </el-form-item>
      <el-form-item label="生产单元：">
        <el-input />
      </el-form-item>
      <el-form-item label="上级系统Id：">
        <el-input />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeShow">取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
