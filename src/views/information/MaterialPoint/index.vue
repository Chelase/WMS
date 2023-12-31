<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { ElMessageBox } from 'element-plus'
import Message from 'vue-m-message'
import BoM from './components/BoM.vue'
import Import from '@/components/Import/index.vue'
import useMaterialPointStore from '@/store/modules/information/MaterialPoint.ts'
import useCargoAreaStore from '@/store/modules/information/cargoarea.ts'
import AddMaterialPont from '@/views/information/MaterialPoint/components/AddMaterialPont.vue'
import MaterialPointApi from '@/api/modules/information/MaterialPoint.ts'

const MaterialPointStore = useMaterialPointStore()
const CargoAreaStore = useCargoAreaStore()
const { MaterialPointTotal } = storeToRefs(MaterialPointStore)

onMounted(() => {
  getMaterialPointList()
  getWarehouse()
})

// 获取上下料点
const MaterialPointList = ref([])
const getMaterialPointForm = ref({
  PageIndex: 1,
  PageRows: 10,
  Search: {
    Keyword: '',
    StorId: '',
    Type: '',
  },
  SortField: 'Id',
  SortType: 'asc',
})
const loading = ref(false)

async function getMaterialPointList() {
  loading.value = true
  await MaterialPointStore.getMaterialPointData(getMaterialPointForm.value)
  const { MaterialPointData } = storeToRefs(MaterialPointStore)
  MaterialPointList.value = MaterialPointData.value
  loading.value = false
}

// 获取仓库
const warehouseList = ref([])
async function getWarehouse() {
  await CargoAreaStore.getCargoAreaWarehouseData()
  const { warehouseData } = storeToRefs(CargoAreaStore)
  warehouseList.value = warehouseData.value
}

// 新增上下料点
const openMaterialPont = ref(false)
const title = ref('')
const editId = ref('')

function OpenMaterialPontShow(type, id) {
  switch (type) {
    case 'add':
      title.value = '新建'
      break
    case 'edit':
      title.value = '编辑'
      editId.value = id
      break
  }
  openMaterialPont.value = true
}

// 分页
async function Page(currentPage) {
  getMaterialPointForm.value.PageIndex = currentPage
  await getMaterialPointList()
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

async function delMaterialPoint(id) {
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
        await MaterialPointApi.delMaterialPointDataList([id])
      }
      else {
        await MaterialPointApi.delMaterialPointDataList(warehouseSelection.value)
      }
      await getMaterialPointList()
      Message.success('操作成功')
    })
    .catch(() => {})
}

// 启用与停用
async function IsEnable(id, Enable) {
  ElMessageBox.confirm(
    Enable ? '确认启用此料点吗?' : '确认停用此料点吗?',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      await MaterialPointApi.IsEnableMaterialPoint(id, Enable)
      await getMaterialPointList()
      Message.success('操作成功')
    })
    .catch(() => {})
}

// 关联物料
const openBoMShow = ref(false)
const pointId = ref('')

function OpenBoM(id) {
  pointId.value = id
  openBoMShow.value = true
}

// 导入组件开关
const openShow = ref(false)
</script>

<template>
  <div>
    <PageMain>
      <el-row>
        <el-button type="primary" :icon="Plus" @click="OpenMaterialPontShow('add', null)">
          新建
        </el-button>
        <el-button :icon="Minus" :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delMaterialPoint(null)">
          删除
        </el-button>
        <el-button type="primary" :icon="Refresh" @click="getMaterialPointList">
          刷新
        </el-button>
        <el-button type="primary" style="position: absolute;right: 25px" @click="openShow = true">
          导入上下料点
        </el-button>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-input v-model="getMaterialPointForm.Search.Keyword" placeholder="名称/编码" />
        <el-select v-model="getMaterialPointForm.Search.StorId" clearable placeholder="请选择仓库">
          <el-option v-for="item in warehouseList" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
        <el-select v-model="getMaterialPointForm.Search.Type" style="margin-left: 10px" clearable placeholder="上下料点类型">
          <el-option label="只进" value="In" />
          <el-option label="只出" value="Out" />
          <el-option label="进出" value="InOut" />
          <el-option label="出回" value="OutBack" />
        </el-select>
        <el-button type="primary" style="margin-left: 10px" @click="getMaterialPointList">
          查询
        </el-button>
        <el-button @click="getMaterialPointForm.Search = { Keyword: '', StorId: '', Type: '' }">
          重置
        </el-button>
      </el-row>
      <el-table
        v-loading="loading"
        border
        :data="MaterialPointList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="Name" label="名称" />
        <el-table-column property="Code" label="编码" width="120" />
        <el-table-column property="Storage.Name" label="仓库" width="120">
          <template #default="scope">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="scope.row.Storage.Code"
              placement="top"
            >
              <p>{{scope.row.Storage.Name}}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column property="Laneway.Name" label="巷道" width="120">
          <template #default="scope">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="scope.row.Laneway.Code"
              placement="top"
            >
              <p>{{scope.row.Laneway.Name}}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column property="Type" label="类型" width="80">
          <template #default="scope">
            <p v-if="scope.row.Type === 'In'">
              只进
            </p>
            <p v-else-if="scope.row.Type === 'Out'">
              只出
            </p>
            <p v-else-if="scope.row.Type === 'InOut'">
              进出
            </p>
            <p v-else>
              出回
            </p>
          </template>
        </el-table-column>
        <el-table-column property="IsEnable" label="启用" width="80">
          <template #default="scope">
            <div :class="scope.row.IsEnable ? 'IsEnable-success' : 'IsEnable-error'">
              <p>{{ scope.row.IsEnable ? '是' : '否' }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-row v-if="!scope.row.IsEnable">
              <el-button type="primary" link @click="OpenMaterialPontShow('edit', scope.row.Id)">
                编辑
              </el-button>
              <el-button type="primary" link @click="delMaterialPoint(scope.row.Id)">
                删除
              </el-button>
              <el-button type="primary" link @click="IsEnable(scope.row.Id, true)">
                启用
              </el-button>
              <el-button type="primary" link @click="OpenBoM(scope.row.Id)">
                关联物料
              </el-button>
            </el-row>
            <el-row v-else>
              <el-button type="primary" link @click="IsEnable(scope.row.Id, false)">
                停用
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
        :current-page="getMaterialPointForm.PageIndex"
        :total="MaterialPointTotal"
        @current-change="Page"
      />
    </PageMain>
    <Import
      v-model:open-show="openShow"
      title="导入上下料点"
      import-url="http://118.190.145.57/api/PB/PB_FeedPoint/Import"
      export-url="http://118.190.145.57/api/PB/PB_FeedPoint/ExportToExcel"
    />
    <AddMaterialPont
      v-if="openMaterialPont"
      v-model:open-material-pont="openMaterialPont"
      :title="title"
      :edit-id="editId"
      :warehouse-list="warehouseList"
      @up-list="getMaterialPointList"
    />
    <BoM
      v-if="openBoMShow"
      v-model:open-bo-m-show="openBoMShow"
      :point-id="pointId"
    />
  </div>
</template>

<style scoped lang="scss">
.el-input{
  width: 200px;
  margin: 0 10px;
}
.IsEnable-success{
  width: 30px;
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
.IsEnable-error{
  width: 30px;
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
