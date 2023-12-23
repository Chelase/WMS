<script setup lang="ts">
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import useSupplierStore from '@/store/modules/information/supplier.ts'
import AddAddress from '@/views/information/supplier/components/AddAddress.vue'
import supplierApi from '@/api/modules/information/supplier.ts'

const props = defineProps({
  openAddress: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
  supId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:openAddress'])
const SupplierStore = useSupplierStore()
const { AddressDataTotal } = storeToRefs(SupplierStore)

onMounted(() => getAddressList())

const loading = ref(false)
const getAddressForm = ref({
  PageIndex: 1,
  PageRows: 10,
  Search: {
    CusId: '',
    SupId: props.supId,
  },
  SortField: 'Id',
  SortType: 'asc',
})
const AddressList = ref([])

async function getAddressList() {
  loading.value = true
  await SupplierStore.getAddressData(getAddressForm.value)
  const { AddressData } = storeToRefs(SupplierStore)
  AddressList.value = AddressData.value
  loading.value = false
}

function closeShow() {
  emit('update:openAddress', false)
}

// 添加地址
const openAddAddress = ref(false)
const addressId = ref('')
const title = ref('')

function OpenAddAddressShow(type, id) {
  switch (type) {
    case 'add':
      title.value = '新增'
      break
    case 'edit':
      title.value = '编辑'
      addressId.value = id
      break
  }
  openAddAddress.value = true
}

// 分页
async function Page(currentPage) {
  getAddressForm.value.PageIndex = currentPage
  await getAddressList()
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

async function delAddress(id) {
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
        await supplierApi.delAddressDataList([id])
      }
      else {
        await supplierApi.delAddressDataList(warehouseSelection.value)
      }
      await getAddressList()
      ElMessage.success('操作成功')
    })
    .catch(() => {})
}

// 修改是否启用
async function EditIsEnable(id) {
  await supplierApi.EditAddressDataIsEnable(id)
  await getAddressList()
}

// 修改是否默认
async function EditIsDefault(id) {
  await supplierApi.EditAddressDataIsDefault(id)
  await getAddressList()
}
</script>

<template>
  <el-drawer :model-value="openAddress" :title="`${name}地址设置`" size="80%" @close="closeShow">
    <el-row>
      <el-button type="primary" :icon="Plus" @click="OpenAddAddressShow('add', null)">
        新建
      </el-button>
      <el-button :icon="Minus" :disabled="disabled" :type="disabled ? '' : 'primary'" @click="delAddress(null)">
        删除
      </el-button>
      <el-button type="primary" :icon="Refresh" @click="getAddressList">
        刷新
      </el-button>
    </el-row>
    <el-table
      v-loading="loading"
      border
      :data="AddressList"
      style="margin-top: 20px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="Code" label="编号" />
      <el-table-column property="Name" label="名称" />
      <el-table-column property="Address" label="地址" />
      <el-table-column property="Remarks" label="备注" />
      <el-table-column property="IsEnable" label="状态">
        <template #default="scope">
          <el-switch
            v-model="scope.row.IsEnable"
            size="large"
            inline-prompt
            active-text="启用"
            inactive-text="停用"
            @change="EditIsEnable(scope.row.Id)"
          />
        </template>
      </el-table-column>
      <el-table-column property="IsDefault" label="默认">
        <template #default="scope">
          <el-switch
            v-model="scope.row.IsDefault"
            size="large"
            inline-prompt
            active-text="开"
            inactive-text="关"
            @change="EditIsDefault(scope.row.Id)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" link @click="OpenAddAddressShow('edit', scope.row.Id)">
            编辑
          </el-button>
          <el-button type="primary" link @click="delAddress(scope.row.Id)">
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
      :current-page="getAddressForm.PageIndex"
      :total="AddressDataTotal"
      @current-change="Page"
    />
    <AddAddress
      v-if="openAddAddress"
      v-model:open-add-address="openAddAddress"
      :title="title"
      :sup-id="supId"
      :address-id="addressId"
      @up-list="getAddressList"
    />
  </el-drawer>
</template>

<style scoped lang="scss">

</style>
