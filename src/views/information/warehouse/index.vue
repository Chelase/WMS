<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Message from 'vue-m-message'
import { ElMessageBox } from 'element-plus'
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
import WarehouseDialog from './components/WarehouseDialog.vue'
import useWarehouseStore from '@/store/modules/information/warehouse.ts'
import RoadwaySlideover from '@/views/information/warehouse/components/RoadwaySlideover.vue'
import GoodsShelves from '@/views/information/warehouse/components/GoodsShelves.vue'
import EditConfig from '@/views/information/warehouse/components/EditConfig.vue'

const WarehouseStore = useWarehouseStore()
const { Warehouse_Totals } = storeToRefs(WarehouseStore)
const storId = ref('')

// 添加及编辑仓库
const isWarehouseShow = ref(false)

function upIsWarehouseShow(row) {
  isWarehouseShow.value = row
}

const title = ref('')
function OpenEditWarehouse(type, row) {
  switch (type) {
    case 'add' :
      title.value = '新增'
      break
    case 'edit' :
      title.value = '编辑'
      storId.value = row
      break
  }
  isWarehouseShow.value = true
}

// 分页
async function Page(currentPage) {
  getTabList.value.pageIndex = currentPage
  await GetWarehouseList()
}

// 多选及删除
const Selection = ref([])
const warehouseSelection = ref([])
const disabled = computed(() => {
  return !warehouseSelection.value.length
})

function handleSelectionChange(val) {
  Selection.value = val
  // 清除warehouseSelection中不再在Selection中的项
  warehouseSelection.value = warehouseSelection.value.filter((item) => {
    return Selection.value.includes(item.Id)
  })

  // 将Selection中的所有Id推入warehouseSelection，并删除重复的项
  warehouseSelection.value = [...new Set([...warehouseSelection.value, ...Selection.value.map(item => item.Id)])]
}

async function delWarehouse(id) {
  ElMessageBox.confirm(
    '确认删除吗?',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      if (id) {
        await WarehouseStore.delWarehouseData([id])
      }
      else {
        await WarehouseStore.delWarehouseData(warehouseSelection.value)
      }
      await GetWarehouseList()
      Message.success('操作成功')
    })
    .catch(() => {})
}

// 设置巷道
const isRoadwayShow = ref(false)

function OpenRoadwaySlideover(row) {
  isRoadwayShow.value = true
  storId.value = row
}

// 设置货架
const isGoodsShelves = ref(false)

function OpenGoodsShelves(row) {
  isGoodsShelves.value = true
  storId.value = row
}

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

const loading = ref(true)

// 获取仓库
async function GetWarehouseList() {
  loading.value = true
  await WarehouseStore.getWarehouse(getTabList.value)
  const { warehouseList } = storeToRefs(WarehouseStore)
  if (warehouseList.value.length !== 0) { tableData.value = warehouseList.value }
  loading.value = false
  warehouseSelection.value = []
}

// 仓库配置
const OpenConfig = ref(false)

function OpenEditConfig(row) {
  OpenConfig.value = true
  storId.value = row
}
</script>

<template>
  <div>
    <PageMain>
      <el-row>
        <el-button type="primary" :icon="Plus" @click="OpenEditWarehouse('add', '')">
          新建
        </el-button>
        <el-button :icon="Minus" :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delWarehouse(null)">
          删除
        </el-button>
        <el-button type="primary" :icon="Refresh" @click="GetWarehouseList">
          刷新
        </el-button>
      </el-row>
      <el-row style="margin: 20px 0;">
        <el-input v-model="getTabList.search.keyword" placeholder="仓库编号或名称" />
        <el-button type="primary" @click="GetWarehouseList">
          查询
        </el-button>
        <el-button @click="getTabList.search.keyword = ''">
          重置
        </el-button>
      </el-row>
      <el-table
        v-loading="loading"
        border
        :data="tableData"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="Code" label="仓库编号" width="120" />
        <el-table-column property="Name" label="仓库名称" width="120" />
        <el-table-column property="Type" label="仓库类型" width="120">
          <template #default="scope">
            <p>{{ scope.row.Type === 'Plane' ? '平面仓库' : '立体仓库' }}</p>
          </template>
        </el-table-column>
        <el-table-column property="IsZone" label="托盘管理" width="120">
          <template #default="scope">
            <div v-if="scope.row.IsZone" class="success">
              <p>是</p>
            </div>
            <div v-else class="danger">
              <p>否</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="IsTray" label="托盘分区" width="120">
          <template #default="scope">
            <div v-if="scope.row.IsTray" class="success">
              <p>是</p>
            </div>
            <div v-else class="danger">
              <p>否</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="Disable" label="仓库状态" width="120">
          <template #default="scope">
            <div v-if="scope.row.Disable" class="success">
              <p>启用</p>
            </div>
            <div v-else class="danger">
              <p>停用</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="IsDefault" label="默认仓库" width="120">
          <template #default="scope">
            <div v-if="scope.row.IsDefault" class="success">
              <p>是</p>
            </div>
            <div v-else class="danger">
              <p>否</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="329">
          <template #default="scope">
            <el-row>
              <el-button type="primary" link @click="OpenRoadwaySlideover(scope.row.Id)">
                设置巷道
              </el-button>
              <el-button type="primary" link @click="OpenGoodsShelves(scope.row.Id)">
                设置货架
              </el-button>
              <el-button type="primary" link @click="OpenEditConfig(scope.row.Id)">
                配置
              </el-button>
              <el-button type="primary" link @click="OpenEditWarehouse('edit', scope.row.Id)">
                编辑
              </el-button>
              <el-button type="primary" link @click="delWarehouse(scope.row.Id)">
                删除
              </el-button>
            </el-row>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty />
        </template>
      </el-table>
      <el-pagination
        style="float: right;margin-right: 30px;"
        :page-size="10"
        layout="total, prev, pager, next"
        :current-page="getTabList.pageIndex"
        :total="Warehouse_Totals"
        @current-change="Page"
      />
    </PageMain>

    <HDialog v-model="isWarehouseShow" :title="`${title}仓库`">
      <WarehouseDialog
        :title="title"
        :stor-id="storId"
        @up-warehouse-show="upIsWarehouseShow"
        @up-warehouse-list="GetWarehouseList"
      />
    </HDialog>
    <el-drawer v-model="isRoadwayShow" title="设置巷道" size="67%">
      <RoadwaySlideover :stor-id="storId" title="巷道" />
    </el-drawer>
    <el-drawer v-model="isGoodsShelves" title="设置货架" size="67%">
      <GoodsShelves :stor-id="storId" title="货架" />
    </el-drawer>
    <EditConfig
      v-model:OpenConfig="OpenConfig"
      :stor-id="storId"
      @up-list="GetWarehouseList"
    />
  </div>
</template>

<style scoped lang="scss">
.el-input {
  width: 200px;
  margin-right: 10px;
}

.success {
  width: 40px;
  height: 25px;
  background: #f6ffed;
  color: #52c41a;
  border: #b7eb8f 1px solid;
  border-radius: 5px;

  p {
    text-align: center;
    margin-top: 0;
    font-size: 13px;
  }
}

.danger {
  width: 40px;
  height: 25px;
  background: #fff1f0;
  color: #f5222d;
  border: #ffa39e 1px solid;
  border-radius: 5px;

  p {
    text-align: center;
    margin-top: 0;
    font-size: 13px;
  }
}
</style>
