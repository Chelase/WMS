<script setup lang="ts">
import {Phone, Printer, User, Message, Location} from '@element-plus/icons-vue'

defineProps({
  openSupplier: {
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

const emit = defineEmits(['update:openSupplier'])

function closeShow() {
  emit('update:openSupplier', false)
}
</script>

<template>
  <el-dialog :model-value="openSupplier" :title="`${title}供应商`" @close="closeShow">
    <el-form
      label-position="right"
      style="width: 600px;margin: auto"
      label-width="auto"
    >
      <el-form-item label="供应商编号：">
        <el-input placeholder="系统自动生成" disabled>
          <template #prefix>
            <svg-icon name="扫码" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="供应商名称：">
        <el-input :prefix-icon="User" />
      </el-form-item>
      <el-form-item label="供应商类型：">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="电话：">
        <el-input :prefix-icon="Phone" />
      </el-form-item>
      <el-form-item label="传真：">
        <el-input :prefix-icon="Printer" />
      </el-form-item>
      <el-form-item label="Email：">
        <el-input :prefix-icon="Message" />
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input>
          <template #prefix>
            <svg-icon name="ep:postcard" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="地址：">
        <el-input :prefix-icon="Location" />
      </el-form-item>
      <el-form-item label="备注：">
        <el-input style="width: 550px;margin: auto" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeShow">取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-input{
  width: 550px;
  margin: auto;
}
.el-select{
  width: 550px;
  margin: auto;
}
</style>
