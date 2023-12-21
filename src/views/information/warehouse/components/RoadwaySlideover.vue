<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import useWarehouseStore from '@/store/modules/information/warehouse.ts'
import AddSlideover from '@/views/information/warehouse/components/AddSlideover.vue'

const props = defineProps({
  storId: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
})

watch(() => props.storId, (newValue) => {
  getRoadwayList.value.StorId = newValue
  getRoadway()
})

const WarehouseStore = useWarehouseStore()

const search = ref('')

// 分页
async function Page(currentPage) {
  getRoadwayList.value.PageIndex = currentPage
  await getRoadway()
}

onMounted(() => getRoadway())

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

async function delRoadwaySlideover(id) {
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
        await WarehouseStore.delRoadwaySlideoverData([id])
      }
      else {
        await WarehouseStore.delRoadwaySlideoverData(warehouseSelection.value)
      }
      await getRoadway()
      ElMessage.success('操作成功')
    })
    .catch(() => {})
}

// 新增巷道
const IsAddRoadwayShow = ref(false)

const loading = ref(false)

function upIsAddRoadwayShow(row) {
  IsAddRoadwayShow.value = row
}

// 编辑
const editId = ref('')
const isEdit = ref('')
function OpenEdit(type, row) {
  switch (type) {
    case 'add':
      isEdit.value = '新增'
      break
    case 'edit':
      isEdit.value = '编辑'
      editId.value = row
      break
  }
  IsAddRoadwayShow.value = true
}

// 获取巷道
const RoadwayList = ref([])
const getRoadwayList = ref({
  PageIndex: 1,
  PageRows: 10,
  Search: {},
  SortField: 'Id',
  SortType: 'asc',
  StorId: props.storId,
})
async function getRoadway() {
  loading.value = true
  await WarehouseStore.getRoadwayData(getRoadwayList.value)
  const { RoadwayDataList } = storeToRefs(WarehouseStore)
  RoadwayList.value = RoadwayDataList.value
  loading.value = false
  warehouseSelection.value = []
}
</script>

<template>
  <el-row>
    <el-button type="primary" @click="OpenEdit('add')">
      <svg-icon name="ep:plus" /> &nbsp; 新建
    </el-button>
    <el-button :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delRoadwaySlideover">
      <svg-icon name="ep:minus" /> &nbsp; 删除
    </el-button>
    <el-button type="primary" @click="getRoadway">
      <svg-icon name="ep:refresh" /> &nbsp; 刷新
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
    v-loading="loading"
    border
    :data="RoadwayList"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="PB_Storage.Name" label="所属仓库" width="220" />
    <el-table-column property="Code" label="巷道编号" width="220" />
    <el-table-column property="Name" label="巷道名称" width="220" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" link @click="OpenEdit('edit', scope.row.Id)">
          编辑
        </el-button>
        <el-button type="primary" link @click="delRoadwaySlideover(scope.row.Id)">
          删除
        </el-button>
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
    :current-page="getRoadwayList.PageIndex"
    :total="WarehouseStore.RoadwayTotal"
    @current-change="Page"
  />
  <AddSlideover
    v-model="IsAddRoadwayShow"
    :title="title"
    :stor-id="props.storId"
    :is-edit="isEdit"
    :edit-id="editId"
    @up-add-slideover-show="upIsAddRoadwayShow"
    @up-list="getRoadway"
  />
</template>

<style scoped lang="scss">
.el-input{
  width: 200px;
  margin-right: 10px;
}
</style>
