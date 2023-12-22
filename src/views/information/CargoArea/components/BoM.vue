<script setup lang="ts">
import { ref, watch } from 'vue'
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
import Message from 'vue-m-message'
import { ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import useCargoAreaStore from '@/store/modules/information/cargoarea.ts'
import CargoAreaApi from '@/api/modules/information/CargoArea.ts'

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
    return Selection.value.includes(item.PB_Material.Id)
  })

  // 将Selection中的所有Id推入warehouseSelection，并删除重复的项
  warehouseSelection.value = [...new Set([...warehouseSelection.value, ...Selection.value.map(item => item.PB_Material.Id)])]
}

async function delBoM(id) {
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
        await CargoAreaApi.delBoMDataList(props.areaId, [id])
      }
      else {
        await CargoAreaApi.delBoMDataList(props.areaId, warehouseSelection.value)
      }
      await getBoMList()
      Message.success('操作成功')
    })
    .catch(() => {})
}

// 关闭
function closeShow() {
  emit('update:openBoMShow', false)
}

// 获取物料清单
const loading = ref(false)
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

async function getBoMList() {
  await CargoAreaStore.getBoMData(getBoMListForm.value)
  const { BoMData } = storeToRefs(CargoAreaStore)
  BoMList.value = BoMData.value
}
</script>

<template>
  <el-drawer :model-value="openBoMShow" title="关联物料清单" size="55%" @close="closeShow">
    <el-row>
      <el-button type="primary" :icon="Plus">
        新建
      </el-button>
      <el-button :icon="Minus" :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delBoM(null)">
        删除
      </el-button>
      <el-button type="primary" :icon="Refresh" @click="getBoMList">
        刷新
      </el-button>
    </el-row>
    <el-row>
      <el-input v-model="getBoMListForm.Search.MaterialName" />
      <el-button type="primary">
        查询
      </el-button>
      <el-button>重置</el-button>
    </el-row>
    <el-table
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
          <el-button type="primary" link @click="delBoM(scope.row.AreaId)">
            删除
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty />
      </template>
    </el-table>
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
