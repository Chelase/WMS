<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GetDataList, GetTreeDataListAPI, QueryDataListAPI, QueryStorageDataAPI } from '@/api/modules/operations/Warehousing.ts'

defineProps({
  types: {
    type: Number,
    default: 1,
  },
})
const emit = defineEmits(['closeson', 'chuan'])
const quertlist = ref([])
const quertlistdata = ref()
const querydataliste = ref()
const gongysdata = ref()
const encodingInput = ref('')
const encodingInput2 = ref('')
const value = ref('')
const valuef = ref('')
const radio = ref()
const datalistae = ref([])
const treedatalist = ref([])
const treedata = ref('')
function closeson() {
  emit('closeson', false)
}
function chuan() {
  emit('chuan', quertlistdata.value)
  closeson()
}

const options = [
  {
    value: '公司',
    label: '公司',
  },
  {
    value: '个人',
    label: '个人',
  },
  {
    value: '虚拟',
    label: '虚拟',
  },
  {
    value: '内部',
    label: '内部',
  },
  {
    value: '生产车间',
    label: '生产车间',
  },
  {
    value: '模块',
    label: '模块',
  },
]
async function getTreedataList() {
  const res = await GetTreeDataListAPI()
  treedatalist.value = res.Data
  console.log(treedatalist)
}
async function querydatalist() {
  const res = await QueryDataListAPI({
    pageIndex: 1,
    pageRows: 10,
    search: {},
    sortField: 'Id',
    sortType: 'asc',
  })
  console.log(res.Data, 'errs')
  querydataliste.value = res.Data
}
async function getdataListae() {
  const res = await GetDataList({
    pageIndex: 1,
    pageRows: 10,
    search: {
      storId: '1735904478579658752',
    },
    sortField: 'Id',
    sortType: 'asc',

  })
  console.log(res.Data)
  datalistae.value = res.Data
}

async function queryStorageData() {
  const res = await QueryStorageDataAPI({})
  console.log(res.Data, '仓库id')
  quertlist.value = res.Data
}

onMounted(() => {
  getTreedataList()
  getdataListae()
  queryStorageData()
  querydatalist()
})
function qingchu() {
  encodingInput.value = ''
  encodingInput2.value = ''
  quertlistdata.value = ''
  value.value = ''
  valuef.value = ''
  treedata.value = ''
}
function qingchu2() {
  gongysdata.value = ''
  encodingInput.value = ''
}
</script>

<template>
  <div>
    <div v-if="types === 1">
      <span>
        <el-select v-model="gongysdata" style="width: 160px;height: 32px;" class="m-2" placeholder="供应商类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <ElInput v-model="encodingInput" style="width: 160px;height: 32px;" placeholder="供应商编码或名称" />
      </span>
      <span style="margin-left: 10px;">
        <ElButton type="primary">
          查询
        </ElButton>
        <ElButton @click="qingchu2">
          重置
        </ElButton>
      </span>
      <el-table
        style="width: 100%;"
        border
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="供应商编号" width="135" />
        <el-table-column label="供应商名称" width="290" />
        <el-table-column label="供应商类型" width="130" />
        <el-table-column label="电话" width="132" />
        <el-table-column label="Email" width="130" />
        <el-table-column label="联系人" width="130" />
      </el-table>
      <span class="dialog-footer">
        <el-button @click="closeson">取消</el-button>
        <el-button type="primary" @click="closeson">
          选择
        </el-button>
      </span>
    </div>
    <div v-else>
      <span>
        <span v-if="types === 2">
          <el-tree-select v-model="treedata" :data="treedatalist" prop="treedatalist.title" style="width: 160px;height: 32px;" :render-after-expand="false" placeholder="物料类型" />
          <ElInput v-model="value" style="width: 160px;height: 32px;" placeholder="物料名称\编号\条码" />
          <ElInput v-model="valuef" style="width: 160px;height: 32px;" placeholder="客户\供应商名称或编码" />
        </span>
        <span v-else>
          <el-select v-model="quertlistdata" style="width: 160px;height: 32px;" class="m-2" placeholder="请选择仓库">
            <el-option
              v-for="item in quertlist"
              :key="item.Name"
              :label="item.Name"
              :value="item.Name"
            />
          </el-select>
          <ElInput v-model="encodingInput" style="width: 160px;height: 32px;" placeholder="编码\名称\巷道\货架" />
          <ElInput v-model="encodingInput2" style="width: 160px;height: 32px;" placeholder="货区编码\名称" />
        </span>
      </span>
      <span style="margin-left: 10px;">
        <ElButton type="primary">
          查询
        </ElButton>
        <ElButton @click="qingchu">
          重置
        </ElButton>
      </span>
      <el-table
        v-if="types === 2"
        style="width: 100%;"
        :data="querydataliste"
        border
      >
        <el-table-column width="55">
          <el-radio-group v-model="radio">
            <el-radio :label="1" size="small" />
          </el-radio-group>
        </el-table-column>
        <el-table-column prop="Name" label="物料名称" width="135" />
        <el-table-column prop="Code" label="物料编码" width="290" />
        <el-table-column prop="MaterialType.Name" label="物料类别" width="130" />
        <el-table-column prop="BarCode" label="条码" width="132" />
        <el-table-column prop="SimpleName" label="物料简称" width="130" />
        <el-table-column prop="Spec" label="物料规格" width="130" />
      </el-table>
      <el-table
        v-else
        style="width: 100%;"
        :data="datalistae"
        border
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="Code" label="货位编号" width="135" />
        <el-table-column prop="Name" label="货位名称" width="290" />
        <el-table-column prop="PB_Storage.Name" label="仓库" width="130" />
        <el-table-column prop="PB_StorArea.Name" label="货区" width="132" />
        <el-table-column prop="PB_Laneway.Name" label="巷道" width="130" />
        <el-table-column prop="PB_Rack.Name" label="货架" width="130" />
      </el-table>
      <span class="dialog-footer">
        <el-button @click="closeson">取消</el-button>
        <el-button type="primary" @click="chuan">
          选择
        </el-button>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog-footer {
  position: absolute;
  left: 850px;
  top: 400px;
}
</style>
