<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { ElMessageBox } from 'element-plus'
import Message from 'vue-m-message'
import Import from '@/components/Import/index.vue'
import useTrayTypeStore from '@/store/modules/information/TrayType.ts'
import AddTrayType from '@/views/information/TrayType/components/AddTrayType.vue'
import TrayTypeApi from '@/api/modules/information/TrayType.ts'
import Partitioning from '@/views/information/TrayType/components/Partitioning.vue'
import BoM from './components/BoM.vue'

const TrayTypeStore = useTrayTypeStore()

onMounted(() => {
  getTrayTypeList()
})

// 获取托盘类型
const getTrayTypeForm = ref({
  PageIndex: 1,
  PageRows: 10,
  Search: {
    keyword: '',
  },
  SortField: 'Id',
  SortType: 'asc',
})
const loading = ref(false)
const TrayTypeList = ref([])

async function getTrayTypeList() {
  loading.value = true
  await TrayTypeStore.getTrayTypeData(getTrayTypeForm.value)
  const { TrayTypeData } = storeToRefs(TrayTypeStore)
  TrayTypeList.value = TrayTypeData.value
  loading.value = false
}

// 分页
const { TrayTypeTotal } = storeToRefs(TrayTypeStore)
async function Page(currentPage) {
  getTrayTypeForm.value.PageIndex = currentPage
  await getTrayTypeList()
}

// 新增托盘类型
const openAddTrayType = ref(false)
const title = ref('')
const editId = ref('')

async function OpenAddTrayTypeShow(type, id) {
  switch (type) {
    case 'add':
      title.value = '新增'
      break
    case 'edit':
      title.value = '编辑'
      editId.value = id
      break
  }
  openAddTrayType.value = true
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

async function delTrayType(id) {
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
        await TrayTypeApi.delTrayTypeDataList([id])
      }
      else {
        await TrayTypeApi.delTrayTypeDataList(warehouseSelection.value)
      }
      await getTrayTypeList()
      Message.success('操作成功')
    })
    .catch(() => {})
}

// 分区管理
const openPartitioning = ref(false)
const partitioningId = ref('')
function OpenPartitioning(id) {
  partitioningId.value = id
  openPartitioning.value = true
}

// 关联物料
const openBoMShow = ref(false)
const BoMId = ref('')

function OpenBoM(id) {
  BoMId.value = id
  openBoMShow.value = true
}

// 导入
const openShow = ref(false)
</script>

<template>
  <div>
    <PageMain>
      <el-row>
        <el-button type="primary" :icon="Plus" @click="OpenAddTrayTypeShow('add', null)">
          新建
        </el-button>
        <el-button :icon="Minus" :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delTrayType(null)">
          删除
        </el-button>
        <el-button type="primary" :icon="Refresh" @click="getTrayTypeList">
          刷新
        </el-button>
        <el-button type="primary" style="position: absolute;right: 25px" @click="openShow = true">
          导入托盘类型
        </el-button>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-input v-model="getTrayTypeForm.Search.keyword" placeholder="类型编号或名称" />
        <el-button type="primary" @click="getTrayTypeList">
          查询
        </el-button>
        <el-button @click="getTrayTypeForm.Search.keyword = ''">
          重置
        </el-button>
      </el-row>
      <el-table
        v-loading="loading"
        border
        :data="TrayTypeList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="Code" label="编号" width="120" />
        <el-table-column property="Name" label="名称" width="120" />
        <el-table-column property="Length" label="长" width="120" />
        <el-table-column property="Width" label="宽" width="120" />
        <el-table-column property="High" label="高" width="120" />
        <el-table-column property="IsZone" label="是否有分区" width="120">
          <template #default="scope">
            <p>{{ scope.row.IsZone ? '是' : '否' }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-row>
              <el-button type="primary" link @click="OpenAddTrayTypeShow('edit', scope.row.Id)">
                编辑
              </el-button>
              <el-button type="primary" link @click="delTrayType(scope.row.Id)">
                删除
              </el-button>
              <el-button type="primary" link @click="OpenPartitioning(scope.row.Id)">
                分区管理
              </el-button>
              <el-button type="primary" link @click="OpenBoM(scope.row.Id)">
                关联物料
              </el-button>
              <el-button type="primary" link>
                关联货位
              </el-button>
            </el-row>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty />
        </template>
      </el-table>
      <el-pagination
        style="float: right;margin-right: 30px"
        :page-size="10"
        layout="total, prev, pager, next"
        :current-page="getTrayTypeForm.PageIndex"
        :total="TrayTypeTotal"
        @current-change="Page"
      />
    </PageMain>
    <Import
      v-model:open-show="openShow"
      title="导入托盘类型"
      import-url="http://118.190.145.57/api/PB/PB_TrayType/Import"
      export-url="http://118.190.145.57/api/PB/PB_TrayType/ExportToExcel"
    />
    <AddTrayType
      v-if="openAddTrayType"
      v-model:open-add-tray-type="openAddTrayType"
      :title="title"
      :edit-id="editId"
      @up-list="getTrayTypeList"
    />
    <Partitioning
      v-if="openPartitioning"
      v-model:open-partitioning="openPartitioning"
      :partitioning-id="partitioningId"
    />
    <BoM
      v-if="openBoMShow"
      v-model:open-bo-m-show="openBoMShow"
      :area-id="BoMId"
    />
  </div>
</template>

<style scoped lang="scss">
.el-input{
  width: 200px;
  margin-right: 10px;
}
</style>
