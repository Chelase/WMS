<script setup lang="ts">
import { onMounted, ref } from 'vue'
import WarehouseDialog from './components/WarehouseDialog.vue'
import useWarehouseStore from '@/store/modules/information/warehouse.ts'

const WarehouseStore = useWarehouseStore()

onMounted(() => {
  GetWarehouseList()
})

// 获取仓库列表
const tableData = ref([])
const getTabList = ref({
  pageIndex: 1,
  pageRows: 10,
  search: {
    keyword: '',
  },
  SortField: 'Id',
})

const search = ref('')

async function GetWarehouseList() {
  await WarehouseStore.getWarehouse(getTabList.value)
  tableData.value = WarehouseStore.warehouseList
  console.log('仓库列表', tableData.value)
}

// 添加仓库
const isWarehouseShow = ref(false)

function upIsWarehouseShow(row) {
  isWarehouseShow.value = row
}
</script>

<template>
  <div>
    <PageMain>
      <el-row>
        <el-button type="primary" @click="isWarehouseShow = true">
          <svg-icon name="ep:plus" /> &nbsp 新建
        </el-button>
        <el-button disabled>
          <svg-icon name="ep:minus" /> &nbsp 删除
        </el-button>
        <el-button type="primary">
          <svg-icon name="ep:refresh" /> &nbsp 刷新
        </el-button>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-input v-model="search" placeholder="仓库编号或名称" />
        <el-button type="primary">
          查询
        </el-button>
        <el-button>重置</el-button>
      </el-row>
      <el-table
        ref="WarehouseTableRef"
        border
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="Code" label="仓库编号" width="120" />
        <el-table-column property="Name" label="仓库名称" width="120" />
        <el-table-column property="Type" label="仓库类型" width="120" />
        <el-table-column property="IsZone" label="托盘管理" width="120" />
        <el-table-column property="IsTray" label="托盘分区" width="120" />
        <el-table-column property="Disable" label="仓库状态" width="120" />
        <el-table-column property="IsDefault" label="默认仓库" width="120" />
        <el-table-column label="操作" width="329">
          <el-row>
            <el-button type="text">
              设置巷道
            </el-button>
            <el-button type="text">
              设置货架
            </el-button>
            <el-button type="text">
              配置
            </el-button>
            <el-button type="text">
              编辑
            </el-button>
            <el-button type="text">
              删除
            </el-button>
          </el-row>
        </el-table-column>
      </el-table>
      <el-pagination
        style="float: right"
        :page-size="10"
        layout="prev, pager, next"
        :total="2"
      />
    </PageMain>

    <HDialog v-model="isWarehouseShow" title="新增仓库">
      <WarehouseDialog @up-warehouse-show="upIsWarehouseShow" />
    </HDialog>
  </div>
</template>

<style scoped lang="scss">
.el-input{
  width: 200px;
  margin-right: 10px;
}
</style>
