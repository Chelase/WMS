<script setup lang="ts">
import { onMounted, ref } from 'vue'
import locationdialog from './components/locationdialog.vue'
import { QueryStorageDataAPI } from '@/api/modules/operations/Warehousing.ts'
import useLocationStore from '@/store/modules/information/location.ts'

const LocationStore = useLocationStore()

const input = ref('')
const valuetimetwo = ref('')
const value = ref('')
const slideover = ref(false)
const outlist = ref([])
const options = ref([])
async function QueryStorageData() {
  const res = await QueryStorageDataAPI()
  options.value = res.Data
  console.log(res)
}

onMounted(() => {
  QueryStorageData()
})
function tapReset() {
  value.value = ''
  valuetimetwo.value = ''
  input.value = ''
}
function close(e) {
  slideover.value = e
}
const locationlist = ref()
async function getdataList() {
  await LocationStore.getdataList({
    pageIndex: 1,
    pageRows: 10,
    search: {},
    sortField: 'Id',
    sortType: 'asc',
  })
  locationlist.value = LocationStore.datalist.Data
  console.log(locationlist)
}
onMounted(() => {
  getdataList()
})
</script>

<template>
  <div>
    <el-dialog v-model="slideover" size="80%" title="新增货位">
      <locationdialog />
    </el-dialog>
    <PageMain>
      <div class="button-top">
        <span class="three-button">
          <ElButton type="primary" @click="slideover = true">
            <SvgIcon name="ep:plus" />
            新建
          </ElButton>
          <ElButton disabled type="info">
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
        <span>
          <el-select v-model="value" style="width: 180px;" class="m-2" placeholder="请选择仓库">
            <el-option
              v-for="item in options"
              :key="item.Name"
              :label="item.Name"
              :value="item.Name"
            />
          </el-select>
        </span>
        <span>
          <ElInput v-model="input" style="width: 180px;height: 32px;" placeholder="货位/巷道/货架" />
        </span>
        <span />
        <ElInput v-model="input" style="width: 180px;height: 32px;" placeholder="货区编码/名称" />
        <ElButton type="primary">
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
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="Code" label="货位编号" width="100" />
        <el-table-column prop="Name" label="货位名称" width="100" />
        <el-table-column prop="PB_Storage.Name" label="仓库" width="90" />
        <el-table-column prop="PB_StorArea.Name" label="货区" width="90" />
        <el-table-column prop="PB_Laneway.Name" label="巷道" width="100" />
        <el-table-column prop="PB_Rack.Name" label="货架" width="140" />
        <el-table-column prop="OverVol" label="余量" />
        <el-table-column prop="IsForbid" label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.IsForbid === true " class="ml-2" type="success">
              启用
            </el-tag>
            <el-tag v-else class="ml-2" type="danger">
              禁用
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="IsDefault" label="默认">
          <template #default="scope">
            <el-tag v-if="scope.row.IsDefault === true " class="ml-2" type="success">
              是
            </el-tag>
            <el-tag v-else class="ml-2" type="danger">
              否
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <el-button type="text">
            编辑
          </el-button>
          <el-button type="text">
            删除
          </el-button>
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
