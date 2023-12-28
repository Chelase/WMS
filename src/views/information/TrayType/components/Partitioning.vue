<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import useTrayTypeStore from '@/store/modules/information/TrayType.ts'
import AddPartitioning from "@/views/information/TrayType/components/AddPartitioning.vue";
import TrayTypeApi from '@/api/modules/information/TrayType.ts'

const props = defineProps({
  openPartitioning: {
    type: Boolean,
    default: false,
  },
  partitioningId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:openPartitioning'])
const TrayTypeStore = useTrayTypeStore()
const BoMListRef = ref('')

// 关闭
function closeShow() {
  emit('update:openPartitioning', false)
}

// 获取物料清单
const BoMList = ref([])

onMounted(() => getBoMList())

// 获取物料列表
const loading = ref(false)
async function getBoMList() {
  loading.value = true
  await TrayTypeStore.getPartitioningData(props.partitioningId)
  const { PartitioningData } = storeToRefs(TrayTypeStore)
  BoMList.value = PartitioningData.value
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
    return Selection.value.includes(item.Id)
  })

  // 将Selection中的所有Id推入warehouseSelection，并删除重复的项
  warehouseSelection.value = [...new Set([...warehouseSelection.value, ...Selection.value.map(item => item.Id)])]
}

async function delPartitioning(id) {
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
        await TrayTypeApi.delPartitioningDataList([id])
      }
      else {
        await TrayTypeApi.delPartitioningDataList(warehouseSelection.value)
      }
      await getBoMList()
      ElMessage.success('操作成功')
    })
    .catch(() => {})
}

// 添加分区
const openAddPartitioning = ref(false)
const title = ref('')
const editId = ref('')

function OpenAddPartitioning(type, id) {
  switch (type) {
    case 'add':
      title.value = '新增'
      break
    case 'edit':
      title.value = '编辑'
      editId.value = id
      break
  }
  openAddPartitioning.value = true
}
</script>

<template>
  <el-drawer :model-value="openPartitioning" title="分区信息" size="65%" @close="closeShow">
    <el-row>
      <el-button type="primary" :icon="Plus" @click="OpenAddPartitioning('add', null)">
        新建
      </el-button>
      <el-button :icon="Minus" :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delPartitioning(null)">
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
      <el-table-column property="Code" label="编号" />
      <el-table-column property="Name" label="名称" />
      <el-table-column property="X" label="X" />
      <el-table-column property="Y" label="Y" />
      <el-table-column property="IsDefault" label="是否默认">
        <template #default="scope">
          <p>{{ scope.row.IsDefault ? '是' : '否' }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" link @click="OpenAddPartitioning('edit', scope.row.Id)">
            编辑
          </el-button>
          <el-button type="primary" link @click="delPartitioning(scope.row.Id)">
            删除
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty />
      </template>
    </el-table>
    <AddPartitioning
      v-if="openAddPartitioning"
      v-model:open-add-partitioning="openAddPartitioning"
      :title="title"
      :edit-id="editId"
      :tray-type-id="props.partitioningId"
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
