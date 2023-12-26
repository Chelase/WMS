<script setup lang="ts">
import { Download, Minus, Plus, Refresh, Upload } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import type { UploadInstance } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import Message from 'vue-m-message'
import supplierApi from '@/api/modules/information/supplier.ts'
import useSupplierStore from '@/store/modules/information/supplier.ts'
import AddSupplier from '@/views/information/supplier/components/AddSupplier.vue'
import Address from '@/views/information/supplier/components/Address.vue'
import Import from '@/components/Import/index.vue'

const SupplierStore = useSupplierStore()

onMounted(() => {
  getSupplierList()
})

// 获取供应商列表
const loading = ref(false)
const supplierList = ref([])
const { supplierTotal } = storeToRefs(SupplierStore)
const getSupplierForm = ref({
  PageIndex: 1,
  PageRows: 10,
  Search: {
    Keyword: '',
    Type: '',
  },
  SortField: 'Id',
  SortType: 'asc',
})

async function getSupplierList() {
  loading.value = true
  await SupplierStore.getSupplierData(getSupplierForm.value)
  const { supplierData } = storeToRefs(SupplierStore)
  supplierList.value = supplierData.value
  loading.value = false
}

// 分页
async function Page(currentPage) {
  getSupplierForm.value.PageIndex = currentPage
  await getSupplierList()
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

async function delSupplier(id) {
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
        await supplierApi.delSupplierDataList([id])
      }
      else {
        await supplierApi.delSupplierDataList(warehouseSelection.value)
      }
      await getSupplierList()
      Message.success('操作成功')
    })
    .catch(() => {})
}

// 新增
const openSupplier = ref(false)
const title = ref('')
const EditId = ref('')

function OpenAddSupplier(type, id) {
  switch (type) {
    case 'add':
      title.value = '新增'
      break
    case 'edit':
      title.value = '编辑'
      EditId.value = id
      break
  }
  openSupplier.value = true
}

// 地址
const openAddress = ref(false)
const names = ref('')
const supId = ref('')

function OpenAddressShow(id, name) {
  openAddress.value = true
  supId.value = id
  names.value = name
}

// 导入
const openShow = ref(false)
</script>

<template>
  <div>
    <PageMain>
      <el-row>
        <el-button type="primary" :icon="Plus" @click="OpenAddSupplier('add', null)">
          新建
        </el-button>
        <el-button :icon="Minus" :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delSupplier(null)">
          删除
        </el-button>
        <el-button type="primary" :icon="Refresh" @click="getSupplierList">
          刷新
        </el-button>
        <el-button type="primary" style="position: absolute;right: 25px" @click="openShow = true">
          导入供应商
        </el-button>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-select v-model="getSupplierForm.Search.Type" clearable placeholder="供应商类型">
          <el-option label="公司" value="Company" />
          <el-option label="个人" value="Personal" />
          <el-option label="虚拟" value="Virtual" />
          <el-option label="内部" value="Internal" />
          <el-option label="生产车间" value="Product" />
          <el-option label="模块" value="model" />
        </el-select>
        <el-input v-model="getSupplierForm.Search.Keyword" placeholder="供应商编号或名称" />
        <el-button type="primary" @click="getSupplierList">
          查询
        </el-button>
        <el-button @click="getSupplierForm.Search = { Keyword: '', Type: '' }">
          重置
        </el-button>
      </el-row>
      <el-table
        v-loading="loading"
        border
        :data="supplierList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="Code" label="供应商编号" width="150" />
        <el-table-column property="Name" label="供应商名称" width="150" />
        <el-table-column property="Type" label="供应商类型" width="150">
          <template #default="scope">
            <p v-if="scope.row.Type === 'Company'">
              公司
            </p>
            <p v-else-if="scope.row.Type === 'Personal'">
              个人
            </p>
            <p v-else-if="scope.row.Type === 'Virtual'">
              虚拟
            </p>
            <p v-else-if="scope.row.Type === 'Internal'">
              内部
            </p>
            <p v-else-if="scope.row.Type === 'Product'">
              生产车间
            </p>
            <p v-else>
              模块
            </p>
          </template>
        </el-table-column>
        <el-table-column property="Phone" label="电话" />
        <el-table-column property="Email" label="Email" />
        <el-table-column property="ContactName" label="联系人" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-row>
              <el-button type="primary" link @click="OpenAddSupplier('edit', scope.row.Id)">
                编辑
              </el-button>
              <el-button type="primary" link @click="delSupplier(scope.row.Id)">
                删除
              </el-button>
              <el-button type="primary" link @click="OpenAddressShow(scope.row.Id, scope.row.Name)">
                地址
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
        :current-page="getSupplierForm.PageIndex"
        :total="supplierTotal"
        @current-change="Page"
      />
      <AddSupplier
        v-if="openSupplier"
        v-model:open-supplier="openSupplier"
        :title="title"
        :edit-id="EditId"
        @up-list="getSupplierList"
      />
      <Address
        v-if="openAddress"
        v-model:open-address="openAddress"
        :name="names"
        :sup-id="supId"
      />
      <Import
        v-model:open-show="openShow"
        title="导入供应商信息"
        import-url="http://118.190.145.57/api/PB/PB_Supplier/Import"
        export-url="http://118.190.145.57/api/PB/PB_Supplier/ExportToExcel"
      />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.el-input{
  width: 200px;
  margin: 0 10px;
}
</style>
