<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GetTreeDataListAPI } from '@/api/modules/operations/Warehousing.ts'

defineProps({
  types: {
    type: Number,
    default: 1,
  },
})
const emit = defineEmits(['closeson'])
const encodingInput = ref('')
function closeson() {
  emit('closeson', false)
}
function getTreedataList() {
  const res = GetTreeDataListAPI()
  console.log(res)
}
onMounted(() => {
  getTreedataList()
})
</script>

<template>
  <div>
    <div v-if="types === 1">
      <span>
        <el-select style="width: 160px;height: 32px;" class="m-2" placeholder="供应商类型" />
        <ElInput v-model="encodingInput" style="width: 160px;height: 32px;" placeholder="供应商编码或名称" />
      </span>
      <span style="margin-left: 10px;">
        <ElButton type="primary">
          查询
        </ElButton>
        <ElButton>
          重置
        </ElButton>
      </span>
      <el-table
        style="width: 100%;"
        border
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="供应商编号" width="135" />
        <el-table-column label="供应商名称" width="290" />
        <el-table-column label="供应商类型" width="130" />
        <el-table-column label="电话" width="132" />
        <el-table-column label="Email" width="130" />
        <el-table-column label="联系人" width="130" />
      </el-table>
      <span class="dialog-footer">
        <el-button @click="closeson">取消</el-button>
        <el-button type="primary" @click="closeson">
          选择
        </el-button>
      </span>
    </div>
    <div v-else>
      <span>
        <el-select style="width: 160px;height: 32px;" class="m-2" placeholder="物料类型" />
        <ElInput v-model="encodingInput" style="width: 160px;height: 32px;" placeholder="物料名称\编号\条码" />
        <ElInput v-model="encodingInput" style="width: 160px;height: 32px;" placeholder="客户\供应商名称或编码" />
      </span>
      <span style="margin-left: 10px;">
        <ElButton type="primary">
          查询
        </ElButton>
        <ElButton>
          重置
        </ElButton>
      </span>
      <el-table
        style="width: 100%;"
        border
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="物料名称" width="135" />
        <el-table-column label="物料编码" width="290" />
        <el-table-column label="物料类别" width="130" />
        <el-table-column label="条码" width="132" />
        <el-table-column label="物料简称" width="130" />
        <el-table-column label="物料规格" width="130" />
      </el-table>
      <span class="dialog-footer">
        <el-button @click="closeson">取消</el-button>
        <el-button type="primary" @click="closeson">
          选择
        </el-button>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog-footer {
  position: absolute;
  left: 850px;
  top: 400px;
}
</style>
