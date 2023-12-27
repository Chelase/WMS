<script setup lang="ts">
import { ref } from 'vue'
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import Message from 'vue-m-message'
import { ElMessageBox } from 'element-plus'
import usePlannedStore from '@/store/modules/information/planned.ts'
import AddPlanned from '@/views/information/planned/components/AddPlanned.vue'
import plannedApi from '@/api/modules/information/planned.ts'

const PlannedStore = usePlannedStore()

onMounted(() => getPlannedList())

// 获取计划
const PlannedList = ref([])
const getPlannedListForm = ref({
  PageIndex: 1,
  PageRows: 10,
  Search: {
    Keyword: '',
  },
  SortField: 'Id',
  SortType: 'asc',
})
const loading = ref(false)

async function getPlannedList() {
  loading.value = true
  await PlannedStore.getPlannedData(getPlannedListForm.value)
  const { PlannedData } = storeToRefs(PlannedStore)
  PlannedList.value = PlannedData.value
  loading.value = false
}

// 分页
const { PlannedTotal } = storeToRefs(PlannedStore)
async function Page(currentPage) {
  getPlannedListForm.value.PageIndex = currentPage
  await getPlannedList()
}

// 新增
const openAddPlanned = ref(false)
const title = ref('')
const editId = ref('')

function OpenAddPlanned(type, id) {
  switch (type) {
    case 'add':
      title.value = '新增'
      break
    case 'edit':
      title.value = '编辑'
      editId.value = id
      break
  }
  openAddPlanned.value = true
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

async function delPlanned(id) {
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
        await plannedApi.delPlannedDataList([id])
      }
      else {
        await plannedApi.delPlannedDataList(warehouseSelection.value)
      }
      await getPlannedList()
      Message.success('操作成功')
    })
    .catch(() => {})
}

// 完成与未完成
async function IsStatus(id, Status) {
  ElMessageBox.confirm(
    Status ? '确认已完成吗?' : '确认未完成吗?',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      await plannedApi.IsStatus(id, Status)
      await getPlannedList()
      Message.success('操作成功')
    })
    .catch(() => {})
}
</script>

<template>
  <div>
    <PageMain>
      <el-row>
        <el-button type="primary" :icon="Plus" @click="OpenAddPlanned('add', null)">
          新建
        </el-button>
        <el-button :icon="Minus" :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delPlanned(null)">
          删除
        </el-button>
        <el-button type="primary" :icon="Refresh" @click="getPlannedList">
          刷新
        </el-button>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-input v-model="getPlannedListForm.Search.Keyword" placeholder="仓库编号或名称" />
        <el-button type="primary" @click="getPlannedList">
          查询
        </el-button>
        <el-button @click="getPlannedListForm.Search.Keyword = ''">
          重置
        </el-button>
      </el-row>
      <el-table
        v-loading="loading"
        border
        :data="PlannedList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="Code" label="计划编号" width="130" />
        <el-table-column property="Material.Name" label="物料" width="130" />
        <el-table-column property="PlanDate" label="计划日期" width="130" />
        <el-table-column property="StartDate" label="开始日期" width="130" />
        <el-table-column property="FinishDate" label="完成日期" width="130" />
        <el-table-column property="UnitCode" label="生产单元" width="130" />
        <el-table-column property="Status" label="状态" width="100">
          <template #default="scope">
            <div :class="scope.row.Status ? 'success' : 'error'">
              <p>{{ scope.row.Status ? '已完成' : '未完成' }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-row v-if="scope.row.Status">
              <el-button type="primary" link @click="IsStatus(scope.row.Id, 0)">
                未完成
              </el-button>
            </el-row>
            <el-row v-else>
              <el-button type="primary" link @click="OpenAddPlanned('edit', scope.row.Id)">
                编辑
              </el-button>
              <el-button type="primary" link @click="delPlanned(scope.row.Id)">
                删除
              </el-button>
              <el-button type="primary" link @click="IsStatus(scope.row.Id, 1)">
                已完成
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
        :current-page="getPlannedListForm.PageIndex"
        :total="PlannedTotal"
        @current-change="Page"
      />
    </PageMain>
    <AddPlanned
      v-if="openAddPlanned"
      v-model:open-add-planned="openAddPlanned"
      :title="title"
      :edit-id="editId"
    />
  </div>
</template>

<style scoped lang="scss">
.el-input{
  width: 200px;
  margin-right: 10px;
}
.success{
  width: 50px;
  height: 25px;
  background: #f6ffed;
  border: 1px #b7eb8f solid;
  border-radius: 5px;
  p{
    text-align: center;
    line-height: 25px;
    margin-top: 0;
    color: #52c41a;
  }
}
.error{
  width: 50px;
  height: 25px;
  background: #fff0f6;
  border: 1px #ffadd2 solid;
  border-radius: 5px;
  p{
    text-align: center;
    line-height: 25px;
    margin-top: 0;
    color: #eb2f96;
  }
}
</style>
