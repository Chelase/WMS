<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import AddBoM from './AddBoM.vue'
import useTrayTypeStore from '@/store/modules/information/TrayType.ts'

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
const TrayTypeStore = useTrayTypeStore()
const BoMListRef = ref('')

// 关闭
function closeShow() {
  emit('update:openBoMShow', false)
}

// 获取物料清单
const getBoMListForm = ref({
  PageIndex: 1,
  PageRows: 10,
  Search: {
    Keyword: props.areaId,
  },
  SortField: 'MaterialId',
  SortType: 'asc',
})
const BoMList = ref([])

onMounted(() => getBoMList())

// 获取物料列表
const loading = ref(false)
async function getBoMList() {
  loading.value = true
  await TrayTypeStore.getTrayTypeBoMData(getBoMListForm.value)
  const { TrayTypeBoMData } = storeToRefs(TrayTypeStore)
  BoMList.value = TrayTypeBoMData.value
  loading.value = false
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
        await CargoAreaApi.delBoMDataList(props.areaId, warehouseSelection.value)
      }
      await getBoMList()
      ElMessage.success('操作成功')
    })
    .catch(() => {})
}

// 分页
const { TrayTypeBoMDataTotal } = storeToRefs(TrayTypeStore)
async function Page(currentPage) {
  getBoMListForm.value.PageIndex = currentPage
  await getBoMList()
}

// 添加物料
const openAddBoM = ref(false)
</script>

<template>
  <el-drawer :model-value="openBoMShow" title="关联物料清单" size="55%" @close="closeShow">
    <el-row>
      <el-button type="primary" :icon="Plus" @click="openAddBoM = true">
        新建
      </el-button>
      <el-button :icon="Minus" :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delBoM(null, null)">
        删除
      </el-button>
      <el-button type="primary" :icon="Refresh" @click="getBoMList">
        刷新
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
      :total="TrayTypeBoMDataTotal"
      @current-change="Page"
    />
    <AddBoM
      v-model:open-add-bo-m="openAddBoM"
      :area-id="props.areaId"
      @up-list="getBoMList"
    />
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
