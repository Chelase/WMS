<script setup lang="ts">

</script>

<template>
  <div>
    <PageMain>
      <el-row>
        <el-button type="primary"> <svg-icon name="ep:plus"/> &nbsp 新建</el-button>
        <el-button disabled> <svg-icon name="ep:minus"/> &nbsp 删除</el-button>
        <el-button type="primary"> <svg-icon name="ep:refresh"/> &nbsp 刷新</el-button>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-input placeholder="仓库编号或名称"/>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-row>
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.el-input{
  width: 200px;
  margin-right: 10px;
}
</style>
