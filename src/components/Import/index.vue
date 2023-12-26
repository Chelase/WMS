<script setup lang="ts">
import { Download, Upload } from '@element-plus/icons-vue'
import { ref } from 'vue'
import type { UploadInstance } from 'element-plus'

const props = defineProps({
  openShow: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  importUrl: {
    type: String,
    default: '',
  },
  exportUrl: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:openShow'])

const fileListRef = ref<UploadInstance>()

function submitUpload() {
  fileListRef.value!.submit()
}

function closeShow() {
  emit('update:openShow', false)
}
</script>

<template>
  <el-dialog
    :model-value="openShow"
    :title="title"
    width="30%"
    @close="closeShow"
  >
    <el-row justify="center">
      <el-col :span="10">
        <el-upload
          ref="fileListRef"
          class="upload-demo"
          :action="importUrl"
          :auto-upload="false"
          @change="submitUpload"
        >
          <el-button :icon="Upload" type="primary">
            上传数据
          </el-button>
        </el-upload>
      </el-col>
      <el-col :span="10">
        <el-button :icon="Download" tag="a" :href="exportUrl">
          下载模板表
        </el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
