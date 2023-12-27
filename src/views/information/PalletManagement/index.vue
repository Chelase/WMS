<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PalleManagementdialog from './components/PalleManagementdialog.vue'
import importindex from '@/components/Import/index.vue'
import usePalletManagementStore from '@/store/modules/information/PalletManagement'

const PalletManagementStore = usePalletManagementStore()
const title = ref('新增')
const slideover = ref(false)
const selectionData = ref([])
const openShow = ref(false)
const PalletManagementlistdata = ref({
  pageIndex: 1,
  pageRows: 10,
  search: {
    storId: '',
    Keyword: '',
    TypeName: '',
  },
  sortField: 'Id',
  sortType: 'asc',
})

onMounted(() => {
  getdataList()
})
function tapReset() {
  PalletManagementlistdata.value.search.TypeName = ''
  PalletManagementlistdata.value.search.Keyword = ''
}
function close(e) {
  slideover.value = e
}
const palletlist = ref()
async function getdataList() {
  await PalletManagementStore.getdataList(PalletManagementlistdata.value)
  palletlist.value = PalletManagementStore.datalist.Data
  console.log(palletlist)
}
function chaxun() {
  getdataList(PalletManagementlistdata.value)
}
function deletedata(id) {
  ElMessageBox.confirm(
    '确认删除吗?',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      if (id.length === 1) {
        await PalletManagementStore.DeleteData(id)
      }
      else {
        await PalletManagementStore.DeleteData(selectionData.value)
      }
      ElMessage({
        type: 'success',
        message: '操作成功',
      })
      getdataList()
    })
}
const ide = ref()
function xinzeng() {
  slideover.value = true
  title.value = '新增'
}
async function tyhuo(id) {
  await PalletManagementStore.DisableTheData({ id })
  ElMessage({
    type: 'success',
    message: '操作成功',
  })
  getdataList()
}
async function qyhuo(id) {
  await PalletManagementStore.EnableTheData({ id })
  ElMessage({
    type: 'success',
    message: '操作成功',
  })
  getdataList()
}
function bianji(id) {
  slideover.value = true
  ide.value = id
  title.value = '编辑'
}
function handleSelectionChange(value) {
  selectionData.value = []
  // 遍历选中的数据，只获取数据Id
  value.forEach((item) => {
    selectionData.value.push(item.Id)
  })
  console.log(selectionData.value)
}
</script>

<template>
  <div>
    <importindex
      v-model:open-show="openShow"
      title="导入货位"
      import-url="http://118.190.145.57/api/PB/PB_Location/Import"
      export-url="http://118.190.145.57/api/PB/PB_Location/ExportToExcel"
    />
    <el-dialog v-model="slideover" size="80%" :title="title">
      <PalleManagementdialog v-if="slideover" :id="ide" :title="title" @shaxin="getdataList()" @close="close" />
    </el-dialog>
    <PageMain>
      <div class="button-top">
        <span class="three-button">
          <ElButton type="primary" @click="xinzeng">
            <SvgIcon name="ep:plus" />
            新建
          </ElButton>
          <ElButton v-if="selectionData.length === 0" disabled type="info">
            <SvgIcon name="ep:semi-select" />
            删除
          </ElButton>
          <ElButton v-else type="info" @click="deletedata">
            <SvgIcon name="ep:semi-select" />
            删除
          </ElButton>
          <ElButton type="primary" @click="getdataList()">
            <SvgIcon name="ep:refresh-right" />
            刷新
          </ElButton>
        </span>
        <span style="margin-left: 1000px;">
          <ElButton type="primary" @click="openShow = true">
            导入货位
          </ElButton>
        </span>
      </div>
      <div>
        <span style="margin: 10px;">
          <ElInput v-model="PalletManagementlistdata.search.Keyword" style="width: 180px;height: 32px;" placeholder="托盘名称/编码" />
        </span>
        <span style="margin: 10px;">
          <ElInput v-model="PalletManagementlistdata.search.TypeName" style="width: 180px;height: 32px;" placeholder="类型名称/编码" />
        </span>
        <ElButton type="primary" @click="chaxun">
          查询
        </ElButton>
        <ElButton @click="tapReset">
          重置
        </ElButton>
      </div>
      <el-table
        :data="palletlist"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="Code" label="托盘号" width="130" />
        <el-table-column prop="Name" label="托盘名称" width="120" />
        <el-table-column prop="PB_TrayType.Name" label="托盘类型" width="160" />
        <el-table-column prop="PB_Location.Name" label="货位" width="120" />
        <el-table-column prop="StartTime" label="启用日期" width="220" />
        <el-table-column prop="Status" label="托盘状态" width="140">
          <template #default="scope">
            <span v-if="scope.row.Status === 1">启用</span>
            <span v-else>停用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <el-button v-if="scope.row.Status === 1" type="primary" link @click="tyhuo(scope.row.Id)">
              停用
            </el-button>
            <el-button v-else type="primary" link @click="qyhuo(scope.row.Id)">
              启用
            </el-button>
            <el-button type="primary" link @click="bianji(scope.row.Id)">
              编辑
            </el-button>
            <el-button type="primary" link @click="deletedata([scope.row.Id])">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-left: 1100px;"
        :total="5"
        layout="prev, pager, next"
      />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.three-button {
  align-items: center;
}

.radio-button {
  margin-left: 20px;
}
</style>
