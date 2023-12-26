<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { ElMessageBox } from 'element-plus'
import Message from 'vue-m-message'
import AddCargoArea from '@/views/information/CargoArea/components/AddCargoArea.vue'
import useCargoAreaStore from '@/store/modules/information/CargoArea.ts'
import CargoAreaApi from '@/api/modules/information/CargoArea.ts'
import BoM from '@/views/information/CargoArea/components/BoM.vue'

const CargoAreaStore = useCargoAreaStore()

// 获取货区
onMounted(() => {
  getCargoList()
  getWarehouse()
  getQuery()
})

const CargoAreaList = ref([])
const getCargoDataForm = ref({
  PageIndex: 1,
  PageRows: 10,
  Search: {
    AreaType: '',
    StorageId: '',
    keyword: '',
  },
  SortField: 'Id',
  SortType: 'asc',
})

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

async function delCargoArea(id) {
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
        await CargoAreaApi.delCargoAreaDataList([id])
      }
      else {
        await CargoAreaApi.delCargoAreaDataList(warehouseSelection.value)
        // console.log(CargoAreaTableRef.value.getSelectionRows()) // 表格返回当前行的数据
      }
      await getCargoList()
      Message.success('操作成功')
    })
    .catch(() => {})
}

// 获取表格数据
const loading = ref(false)
async function getCargoList() {
  loading.value = true
  await CargoAreaStore.getCargoAreaData(getCargoDataForm.value)
  const { CargoAreaData } = storeToRefs(CargoAreaStore)
  CargoAreaList.value = CargoAreaData.value
  loading.value = false
  warehouseSelection.value = []
}

// 获取仓库
const warehouseList = ref([])
async function getWarehouse() {
  await CargoAreaStore.getCargoAreaWarehouseData()
  const { warehouseData } = storeToRefs(CargoAreaStore)
  warehouseList.value = warehouseData.value
}

// 获取货区
const QueryList = ref([])
async function getQuery() {
  await CargoAreaStore.getQueryData()
  const { QueryData } = storeToRefs(CargoAreaStore)
  QueryList.value = QueryData.value
}

// 新建
const OpenAddCargoArea = ref(false)
const title = ref('')
const EditId = ref('')
const StorId = ref('')

function OpenAddCargoAreaEdit(type, id, storId) {
  switch (type) {
    case 'add':
      title.value = '新增'
      break
    case 'edit':
      title.value = '编辑'
      break
  }
  EditId.value = id
  StorId.value = storId
  OpenAddCargoArea.value = true
}

// 重置
function Rest() {
  getCargoDataForm.value.Search = {
    AreaType: '',
    StorageId: '',
    keyword: '',
  }
}

// 分页
const { CargoAreaTotal } = storeToRefs(CargoAreaStore)
async function Page(currentPage) {
  getCargoDataForm.value.PageIndex = currentPage
  await getCargoList()
}

// 关联物料
const openBoMShow = ref(false)
const areaId = ref('')

function OpenBoM(id) {
  areaId.value = id
  openBoMShow.value = true
}
</script>

<template>
  <div>
    <PageMain>
      <el-row>
        <el-button type="primary" :icon="Plus" @click="OpenAddCargoAreaEdit('add', null)">
          新建
        </el-button>
        <el-button :icon="Minus" :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delCargoArea(null)">
          删除
        </el-button>
        <el-button type="primary" :icon="Refresh" @click="getCargoList">
          刷新
        </el-button>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-select v-model="getCargoDataForm.Search.StorageId" clearable placeholder="请选择仓库">
          <el-option v-for="item in warehouseList" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
        <el-input v-model="getCargoDataForm.Search.keyword" placeholder="货区编号或名称" />
        <el-select v-model="getCargoDataForm.Search.AreaType" clearable placeholder="货区类型">
          <el-option v-for="elem in QueryList" :key="elem.Id" :label="elem.Name" :value="elem.Code" />
        </el-select>
        <el-button type="primary" style="margin-left: 10px" @click="getCargoList">
          查询
        </el-button>
        <el-button @click="Rest">
          重置
        </el-button>
      </el-row>
      <el-table
        v-loading="loading"
        border
        :data="CargoAreaList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="PB_Storage.Name" label="仓库" width="200" />
        <el-table-column property="Code" label="货区编号" width="200" />
        <el-table-column property="Name" label="货区名称" width="200" />
        <el-table-column property="Type" label="货区类型" width="200" />
        <el-table-column label="操作" width="369">
          <template #default="scope">
            <el-row>
              <el-button type="primary" link @click="OpenAddCargoAreaEdit('edit', scope.row.Id, scope.row.PB_Storage.Id)">
                编辑
              </el-button>
              <el-button type="primary" link @click="delCargoArea(scope.row.Id)">
                删除
              </el-button>
              <el-button type="primary" link @click="OpenBoM(scope.row.Id)">
                关联物料
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
        :current-page="getCargoDataForm.PageIndex"
        :total="CargoAreaTotal"
        @current-change="Page"
      />
    </PageMain>
    <AddCargoArea
      v-if="OpenAddCargoArea"
      v-model:OpenAddCargoArea="OpenAddCargoArea"
      :title="title"
      :warehouse-list="warehouseList"
      :query-list="QueryList"
      :edit-id="EditId"
      :stor-id="StorId"
      @up-list="getCargoList"
    />
    <BoM
      v-if="openBoMShow"
      v-model:open-bo-m-show="openBoMShow"
      :area-id="areaId"
    />
  </div>
</template>

<style scoped lang="scss">
.el-input{
  width: 200px;
  margin: 0 10px;
}
</style>
