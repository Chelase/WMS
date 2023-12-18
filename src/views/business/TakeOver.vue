<route lang="yaml">
  meta:
  title: 收货管理
</route>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  //单号输入框
  const oddnumbers = ref()
  //收货类型选择器 v-model
  const goodsTypeof = ref({})
  //收获类型选择器 数据
  const options = ref([
    {
      value: 1,
      label: 1,
    },
    {
      value: 2,
      label: 22,
    },
    {
      value: 3,
      label: 333,
    },
  ])

  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
</script>

<template>
  <div>
    <PageMain>
      收货管理
      <el-row>
        <el-button type="primary">+ &nbsp;&nbsp; 新建</el-button>
        <el-button type="info" plain>- &nbsp;&nbsp; 删除</el-button>
        <el-button type="primary"> &nbsp;&nbsp;刷新</el-button>
        <el-button type="primary">全部</el-button>
        <el-button type="Default">编制中</el-button>
        <el-button type="Default">已确认</el-button>
        <el-button type="Default">审核通过</el-button>
        <el-button type="Default">部分入库</el-button>
        <el-button type="Default">全部入库</el-button>
      </el-row>
      <el-row class="marleft" style="margin-top: 10px;">
        <el-input v-model="oddnumbers" class="w-50 m-2" placeholder="单号/供应商" />
        <el-select v-model="goodsTypeof" class="m-2" placeholder="Select">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" class="martop">查询</el-button>
        <el-button type="Default" class="martop">重置</el-button>
      </el-row>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
  .martop {
    margin-top: 7px;
  }

  .marleft {
    margin-left: -10px;
  }
</style>