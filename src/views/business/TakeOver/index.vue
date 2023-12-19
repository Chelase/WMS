<route lang="yaml">
  meta:
  title: 收货管理
</route>

<script setup lang="ts">
  //新建弹框组件
  import newaddFrom from './components/newaddFrom.vue'
  import { ref, onMounted } from 'vue'
  //表格初始值  
  import { getTakeOverList } from '@/api/modules/TakeOver/TakeOver.ts'

  //控制组件显示隐藏
  const showhidd = ref(false)

  //单号输入框
  const oddnumbers = ref()
  //收货类型选择器 v-model
  const goodsTypeof = ref({})
  const dateSelete = (value) => {
    console.log(value)

  }
  //日期选择框
  const twodates = ref('')
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
    //表格数据
  const tableData = ref([])
  const gettableData = async() => {
    const { data } = await getTakeOverList()
    console.log(data)
    tableData.value = data
  }
  onMounted(() => {
    gettableData()
  })

</script>

<template>
  <div>
    <PageMain>
      收货管理
      <el-row>
        <el-button type="primary" @click="showhidd = true">+ &nbsp;&nbsp; 新建</el-button>
        <el-button type="info" plain>- &nbsp;&nbsp; 删除</el-button>
        <el-button type="primary"> &nbsp;&nbsp;刷新</el-button>
        <el-button type="primary">全部</el-button>
        <el-button type="default">编制中</el-button>
        <el-button type="default">已确认</el-button>
        <el-button type="default">审核通过</el-button>
        <el-button type="default">部分入库</el-button>
        <el-button type="default">全部入库</el-button>
      </el-row>
      <el-row class="marleft" style="margin-top: 10px;">
        <el-input v-model="oddnumbers" class="w-50 m-2" placeholder="单号/供应商" />
        <el-select v-model="goodsTypeof" class="m-2" placeholder="Select">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-date-picker style="margin-top: 7px;margin-right: 20px;margin-left: 10px;" 
        v-model="twodates" type="dates" placeholder="开始日期~结束日期" @input="dateSelete" />
        <el-button type="primary" class="martop">查询</el-button>
        <el-button type="default" class="martop">重置</el-button>
      </el-row>

      <el-table :data="tableData" border style="width: 100%" text-align="center">
        <el-table-column type="selection" width="80" />
        <el-table-column prop="收货单号" label="收货单号" width="180" />
        <el-table-column prop="订单日期" label="订单日期" />
        <el-table-column prop="收货类型" label="收货类型" />
        <el-table-column prop="关联单号" label="关联单号" />
        <el-table-column prop="状态" label="状态" />
        <el-table-column prop="供应商" label="供应商" />
        <el-table-column prop="收货数量" label="收货数量" />
        <el-table-column prop="入库数量" label="入库数量" />
        <el-table-column prop="操作" label="操作" />
      </el-table>
    </PageMain>
    <HDialog v-model="showhidd" title="新建">
      <newaddFrom></newaddFrom>
    </HDialog>
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