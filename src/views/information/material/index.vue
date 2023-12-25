<script setup lang="ts">
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import Message from 'vue-m-message'
import useMaterialStore from '@/store/modules/information/material.ts'
import materialApi from '@/api/modules/information/material.ts'
import AddMaterial from '@/views/information/material/components/AddMaterial.vue'
import Import from "@/components/Import/index.vue";

const MaterialStore = useMaterialStore()
// const { MaterialTreeTotal } = storeToRefs(MaterialStore)

onMounted(() => getMaterialTreeList())

// 获取物料类型树形列表
const loading = ref(false)
const MaterialList = ref([])
const getMaterialForm = ref({
  PageIndex: 1,
  PageRows: 10,
  Search: {},
  SortField: 'Id',
  SortType: 'asc',
})

async function getMaterialTreeList() {
  loading.value = true
  await MaterialStore.getMaterialTreeData(getMaterialForm.value)
  const { MaterialTreeData } = storeToRefs(MaterialStore)
  MaterialList.value = MaterialTreeData.value
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

async function delMaterial(id) {
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
        await materialApi.delMaterialTreeDataList([id])
      }
      else {
        await materialApi.delMaterialTreeDataList(warehouseSelection.value)
      }
      await getMaterialTreeList()
      Message.success('操作成功')
    })
    .catch(() => {})
}

// 新增物料类型
const openAddMaterial = ref(false)
const title = ref('')
const editId = ref('')

function OpenAddMaterialShow(type, id) {
  switch (type) {
    case 'add':
      title.value = '新增'
      break
    case 'edit':
      title.value = '编辑'
      editId.value = id
      break
  }
  openAddMaterial.value = true
}

// 分页
async function Page(currentPage) {
  getMaterialForm.value.PageIndex = currentPage
  await getMaterialTreeList()
}

// 控制导入组件开关
const openShow = ref(false)
</script>

<template>
  <div>
    <PageMain>
      <el-row>
        <el-button type="primary" :icon="Plus" @click="OpenAddMaterialShow('add', null)">
          新建
        </el-button>
        <el-button :icon="Minus" :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delMaterial(null)">
          删除
        </el-button>
        <el-button type="primary" :icon="Refresh" @click="getMaterialTreeList">
          刷新
        </el-button>
        <el-button type="primary" style="position: absolute;right: 25px" @click="openShow = true">
          导入物料类型
        </el-button>
      </el-row>
      <el-table
        v-loading="loading"
        border
        :data="MaterialList"
        style="margin-top: 20px"
        row-key="Id"
        :tree-props="{ children: 'Children' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="title" label="物料分类名称" />
        <el-table-column prop="Code" label="物料分类编码" />
        <el-table-column prop="Remark" label="备注" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" link @click="OpenAddMaterialShow('edit', scope.row.Id)">
              编辑
            </el-button>
            <el-button type="primary" link @click="delMaterial(scope.row.Id)">
              删除
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty />
        </template>
      </el-table>
<!--      <el-pagination-->
<!--        style="float: right;margin-right: 30px"-->
<!--        :page-size="10"-->
<!--        layout="total, prev, pager, next"-->
<!--        :current-page="getMaterialForm.PageIndex"-->
<!--        :total="MaterialTreeTotal"-->
<!--        @current-change="Page"-->
<!--      />-->
    </PageMain>
    <AddMaterial
      v-if="openAddMaterial"
      v-model:open-add-material="openAddMaterial"
      :title="title"
      :edit-id="editId"
      :material-list="MaterialList"
      @up-list="getMaterialTreeList"
    />
    <Import
      v-model:open-show="openShow"
      title="导入物料信息"
      import-url="http://118.190.145.57/api/PB/PB_MaterialType/Import"
      export-url="http://118.190.145.57/api/PB/PB_MaterialType/ExportToExcel"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
