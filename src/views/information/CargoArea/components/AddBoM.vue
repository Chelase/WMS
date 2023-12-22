<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import useCargoAreaStore from '@/store/modules/information/cargoarea.ts'
import CargoareaApi from '@/api/modules/information/CargoArea.ts'

const props = defineProps({
  openAddBoM: {
    type: Boolean,
    default: false,
  },
  areaId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:openAddBoM', 'upList'])
const CargoAreaStore = useCargoAreaStore()

onMounted(() => {
  getBoMTree()
  getBoMQueryList()
})

// 获取物料类型树状列表
const BoMTreeList = ref([])
async function getBoMTree() {
  await CargoAreaStore.getBoMTreeData()
  const { BoMTreeData } = storeToRefs(CargoAreaStore)
  BoMTreeList.value = BoMTreeData.value
}

const getBoMListForm = ref({
  PageIndex: 1,
  PageRows: 10,
  Search: {
    ContactName: '',
    Keyword: '',
    TypeId: '',
  },
  SortField: 'Id',
  SortType: 'asc',
})
const BoMQueryList = ref([])
// 获取物料表格
async function getBoMQueryList() {
  await CargoAreaStore.getBoMQueryData(getBoMListForm.value)
  const { BoMQueryData } = storeToRefs(CargoAreaStore)
  BoMQueryList.value = BoMQueryData.value
}

// 多选
const Selection = ref([])
const warehouseSelection = ref([])

function handleSelectionChange(val) {
  Selection.value = val
  // 清除warehouseSelection中不再在Selection中的项
  warehouseSelection.value = warehouseSelection.value.filter((item) => {
    return Selection.value.includes(item.Id)
  })

  // 将Selection中的所有Id推入warehouseSelection，并删除重复的项
  warehouseSelection.value = [...new Set([...warehouseSelection.value, ...Selection.value.map(item => item.Id)])]
  console.log(warehouseSelection.value)
}

function closeShow() {
  emit('update:openAddBoM', false)
}

async function SaveData() {
  await CargoareaApi.AddBoMQuerySaveData({ id: props.areaId, keys: warehouseSelection.value })
  ElMessage.success('操作成功')
  closeShow()
  emit('upList')
}
</script>

<template>
  <el-dialog :model-value="openAddBoM" title="物料选择" width="60%" @close="closeShow">
    <el-row>
      <el-tree-select
        v-model="getBoMListForm.Search.TypeId"
        style="margin-right: 10px"
        :data="BoMTreeList"
        check-strictly
        :render-after-expand="false"
      />
      <el-input v-model="getBoMListForm.Search.Keyword" placeholder="物料名称\编号\条码" />
      <el-input v-model="getBoMListForm.Search.ContactName" placeholder="客户\供应商名称或编码" />
      <el-button type="primary" @click="getBoMQueryList">
        查询
      </el-button>
      <el-button @click="getBoMListForm.Search = { ContactName: '', Keyword: '', TypeId: '' }">
        重置
      </el-button>
    </el-row>
    <el-table
      border
      :data="BoMQueryList"
      style="margin-top: 20px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="Name" label="物料名称" />
      <el-table-column property="Code" label="物料编码" />
      <el-table-column property="MaterialType.Name" label="物料类别" />
      <el-table-column property="BarCode" label="条码" />
      <el-table-column property="SimpleName" label="物料简称" />
      <el-table-column property="Spec" label="物料规格" />
      <template #empty>
        <el-empty />
      </template>
    </el-table>
    <template #footer>
      <el-button @click="closeShow">
        取消
      </el-button>
      <el-button type="primary" @click="SaveData">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-input{
  width: 200px;
  margin-right: 10px;
}
</style>
