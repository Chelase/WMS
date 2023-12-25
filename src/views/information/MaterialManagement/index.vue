<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import locationdialog from '@/views/information/location/components/locationdialog.vue'
import { QueryStorageDataAPI } from '@/api/modules/operations/Warehousing.ts'
import useLocationStore from '@/store/modules/information/location.ts'

const LocationStore = useLocationStore()
const title = ref('新增货位')
const slideover = ref(false)
const selectionData = ref([])
const options = ref([])
const locationlistdata = ref({
  pageIndex: 1,
  pageRows: 10,
  search: {
    storId: '',
    keyword: '',
    areaName: '',
  },
  sortField: 'Id',
  sortType: 'asc',
})
async function QueryStorageData() {
  const res = await QueryStorageDataAPI()
  options.value = res.Data
}

onMounted(() => {
  QueryStorageData()
})
function tapReset() {
  locationlistdata.value.search.storId = ''
  locationlistdata.value.search.areaName = ''
  locationlistdata.value.search.keyword = ''
}
function close(e) {
  slideover.value = e
}
const locationlist = ref()
async function getdataList() {
  await LocationStore.getdataList(locationlistdata.value)
  locationlist.value = LocationStore.datalist.Data
  console.log(locationlist)
}
const housedata = ref()
async function getWarehousedata() {
  await LocationStore.getstoredataList()
  housedata.value = LocationStore.storage.Data
  console.log(housedata)
}
function chaxun() {
  getdataList(locationlistdata.value)
}
async function deletedata(id) {
  if (id.length === 1) {
    await LocationStore.DeleteData(id)
  }
  else {
    await LocationStore.DeleteData(selectionData.value)
  }
  getdataList()
  ElMessage.success('操作成功')
}
const ide = ref()
function xinzeng() {
  slideover.value = true
  title.value = '新增货位'
}
function bianji(id) {
  slideover.value = true
  ide.value = id
  title.value = '编辑货位'
}
function handleSelectionChange(value) {
  selectionData.value = []
  // 遍历选中的数据，只获取数据Id
  value.forEach((item) => {
    selectionData.value.push(item.Id)
  })
  console.log(selectionData.value)
}
onMounted(() => {
  getdataList()
  getWarehousedata()
})
</script>

<template>
  <div>
    <el-dialog v-model="slideover" size="80%" :title="title">
      <locationdialog v-if="slideover" :id="ide" :title="title" @shaxin="getdataList()" @close="close" />
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
      </div>
      <div>
        <span style="margin: 10px;">
          <el-select v-model="locationlistdata.search.storId" style="width: 180px;" class="m-2" placeholder="请选择仓库">
            <el-option
              v-for="item in housedata"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
        </span>
        <span style="margin: 10px;">
          <ElInput v-model="locationlistdata.search.keyword" style="width: 180px;height: 32px;" placeholder="货位/巷道/货架" />
        </span>
        <span />
        <span style="margin: 10px;">
          <ElInput v-model="locationlistdata.search.areaName" style="width: 180px;height: 32px;" placeholder="货区编码/名称" />
        </span>
        <ElButton type="primary" @click="chaxun">
          查询
        </ElButton>
        <ElButton @click="tapReset">
          重置
        </ElButton>
      </div>
      <el-table
        :data="locationlist"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="Code" label="物料名称" width="100" />
        <el-table-column prop="Name" label="物料编码" width="100" />
        <el-table-column prop="PB_Storage.Name" label="物料简称" width="90" />
        <el-table-column prop="PB_StorArea.Name" label="物料类别" width="100" />
        <el-table-column prop="PB_Laneway.Name" label="条码" width="100" />
        <el-table-column prop="PB_Rack.Name" label="物料规格" width="140" />
        <el-table-column prop="OverVol" label="单位" />
        <el-table-column prop="IsForbid" label="上限数量" />
        <el-table-column prop="IsDefault" label="下限数量" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="text" @click="bianji(scope.row.Id)">
              编辑
            </el-button>
            <el-button type="text" @click="deletedata([scope.row.Id])">
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
