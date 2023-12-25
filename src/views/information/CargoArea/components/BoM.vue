<script setup lang="ts">
import { ref, watch } from 'vue'
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import useCargoAreaStore from '@/store/modules/information/cargoarea.ts'
import CargoAreaApi from '@/api/modules/information/CargoArea.ts'
import AddBoM from '@/views/information/CargoArea/components/AddBoM.vue'

const props = defineProps({
  openBoMShow: {
    type: Boolean,
    default: false,
  },
  areaId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:openBoMShow'])
const CargoAreaStore = useCargoAreaStore()
const BoMListRef = ref('')

// 关闭
function closeShow() {
  emit('update:openBoMShow', false)
}

// 获取物料清单
const getBoMListForm = ref({
  AreaId: props.areaId,
  PageIndex: 1,
  PageRows: 10,
  Search: {
    MaterialName: '',
  },
  SortField: 'MaterialId',
  SortType: 'asc',
})
const BoMList = ref([])

watch(() => props.areaId, (newAreaId) => {
  getBoMListForm.value.AreaId = newAreaId
  getBoMList()
})

// 获取物料列表
const areaId = ref('')
const loading = ref(false)
async function getBoMList() {
  loading.value = true
  await CargoAreaStore.getBoMData(getBoMListForm.value)
  const { BoMData } = storeToRefs(CargoAreaStore)
  BoMList.value = BoMData.value
  loading.value = false
  if (BoMList.value.length !== 0) {
    const { AreaId } = BoMList.value[0]
    areaId.value = AreaId
  }
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
    return Selection.value.includes(item.MaterialId)
  })

  // 将Selection中的所有Id推入warehouseSelection，并删除重复的项
  warehouseSelection.value = [...new Set([...warehouseSelection.value, ...Selection.value.map(item => item.MaterialId)])]
}

async function delBoM(AreaId, MaterialId) {
  ElMessageBox.confirm(
    '确认删除吗?',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      if (AreaId) {
        await CargoAreaApi.delBoMDataList(AreaId, [MaterialId])
      }
      else {
        await CargoAreaApi.delBoMDataList(areaId.value, warehouseSelection.value)
      }
      await getBoMList()
      ElMessage.success('操作成功')
    })
    .catch(() => {})
}

// 分页
const { BoMTotal } = storeToRefs(CargoAreaStore)
async function Page(currentPage) {
  getBoMListForm.value.PageIndex = currentPage
  await getBoMList()
}

// 添加物料
const openAddBoM = ref(false)

function OpenAddBoMShow() {
  openAddBoM.value = true
}
</script>

<template>
  <el-drawer :model-value="openBoMShow" title="关联物料清单" size="55%" @close="closeShow">
    <el-row>
      <el-button type="primary" :icon="Plus" @click="OpenAddBoMShow">
        新建
      </el-button>
      <el-button :icon="Minus" :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delBoM(null, null)">
        删除
      </el-button>
      <el-button type="primary" :icon="Refresh" @click="getBoMList">
        刷新
      </el-button>
    </el-row>
    <el-row>
      <el-input v-model="getBoMListForm.Search.MaterialName" />
      <el-button type="primary" @click="getBoMList">
        查询
      </el-button>
      <el-button @click="getBoMListForm.Search.MaterialName = ''">
        重置
      </el-button>
    </el-row>
    <el-table
      ref="BoMListRef"
      v-loading="loading"
      border
      :data="BoMList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="PB_Material.Code" label="物料编码" />
      <el-table-column property="PB_Material.Name" label="物料名称" />
      <el-table-column property="PB_Material.Spec" label="物料规格" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" link @click="delBoM(scope.row.AreaId, scope.row.MaterialId)">
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
      :current-page="getBoMListForm.PageIndex"
      :total="BoMTotal"
      @current-change="Page"
    />
    <AddBoM v-model:open-add-bo-m="openAddBoM" :area-id="areaId" @up-list="getBoMList" />
  </el-drawer>
</template>

<style scoped lang="scss">
.el-input{
  width: 200px;
  margin: 10px;
}
.el-button{
  margin: 10px;
}
</style>
