<script setup lang="ts">
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
import Import from '@/components/Import/index.vue'

// 导入
const openShow = ref(false)
</script>

<template>
  <div>
    <PageMain>
      <el-row>
        <el-button type="primary" :icon="Plus">
          新建
        </el-button>
        <el-button :icon="Minus" disabled>
          删除
        </el-button>
        <el-button type="primary" :icon="Refresh">
          刷新
        </el-button>
        <el-button type="primary" style="position: absolute;right: 25px" @click="openShow = true">
          导入托盘类型
        </el-button>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-input placeholder="类型编号或名称" />
        <el-button type="primary">
          查询
        </el-button>
        <el-button>重置</el-button>
      </el-row>
    </PageMain>
    <Import
      v-model:open-show="openShow"
      title="导入供应商信息"
      import-url="http://118.190.145.57/api/PB/PB_TrayType/Import"
      export-url="http://118.190.145.57/api/PB/PB_TrayType/ExportToExcel"
    />
  </div>
</template>

<style scoped lang="scss">
.el-input{
  width: 200px;
  margin-right: 10px;
}
</style>
