<script setup lang="ts">
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
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
        <el-button type="primary" style="position: absolute;right: 25px">
          导入物料类型
        </el-button>
      </el-row>
    </PageMain>
  </div>
</template>

<style scoped lang="scss">

</style>
