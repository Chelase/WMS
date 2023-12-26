<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import useMeteringStore from '@/store/modules/information/metering.ts'
import importindex from '@/components/Import/index.vue'

const openShow = ref(false)
interface RuleForm {
  name: ''
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
})
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入货位名称', trigger: 'blur' },
  ],
})
const bianma = ref()
const MeteringStore = useMeteringStore()
const title = ref('新增单位')
const slideover = ref(false)
const selectionData = ref([])
const meteringlistdata = ref({
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
function tapReset() {
  meteringlistdata.value.search.keyword = ''
}
const meteringlist = ref()
async function getdataList() {
  await MeteringStore.getdataList(meteringlistdata.value)
  meteringlist.value = MeteringStore.datalist.Data
  console.log(meteringlist)
}
function chaxun() {
  getdataList(meteringlistdata.value)
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
        await MeteringStore.Delete(id)
      }
      else {
        await MeteringStore.Delete(selectionData.value)
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
  title.value = '新增单位'
}
const bjdata = ref()
async function bianji(id) {
  ide.value = id
  await MeteringStore.GetTheData({ id })
  bjdata.value = MeteringStore.getdata
  ruleForm.name = bjdata.value.Data.Name
  console.log(bjdata.value)
  slideover.value = true
  title.value = '编辑单位'
}
function handleSelectionChange(value) {
  selectionData.value = []
  // 遍历选中的数据，只获取数据Id
  value.forEach((item) => {
    selectionData.value.push(item.Id)
  })
  console.log(selectionData.value)
}
function submitForm() {
  ruleFormRef.value && ruleFormRef.value?.validate(async (valid) => {
    if (valid && title.value === '新增单位') {
      await MeteringStore.SaveDate({
        name: ruleForm.name,
      })
      slideover.value = false
      ruleForm.name = ''
      ElMessage.success('操作成功')
      getdataList()
    }
    else {
      await MeteringStore.SaveDate({
        name: ruleForm.name,
        code: bjdata.value.Data.Code,
        CreatorId: bjdata.value.Data.CreatorId,
        CreateTime: bjdata.value.Data.CreateTime,
        Id: bjdata.value.Data.Id,
        Deleted: bjdata.value.Data.Deleted,
      })
      slideover.value = false
      ruleForm.name = ''
      ElMessage.success('操作成功')
      getdataList()
    }
  })
}
onMounted(() => {
  getdataList()
})
</script>

<template>
  <div>
    <importindex
      v-model:open-show="openShow"
      title="导入货位"
      import-url="http://118.190.145.57/api/PB/PB_Measure/Import"
      export-url="http://118.190.145.57/api/PB/PB_Measure/ExportToExcel"
    />
    <el-dialog v-model="slideover" size="80%" :title="title">
      <el-form
        v-if="slideover"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="货区编码">
          <el-input v-model="bianma" placeholder="系统自动生成" style="width: 280px;" disabled />
        </el-form-item>
        <el-form-item label="货区名称" prop="name">
          <el-input v-model="ruleForm.name" style="width: 280px;" />
        </el-form-item>
        <el-form-item>
          <el-button @click="slideover = false">
            取消
          </el-button>
          <el-button type="primary" @click="submitForm()">
            确定
          </el-button>
        </el-form-item>
      </el-form>
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
            导入单位
          </ElButton>
        </span>
      </div>
      <div style="margin: 10px;">
        <span style="margin: 10px;">
          <ElInput v-model="meteringlistdata.search.keyword" style="width: 180px;height: 32px;" placeholder="编码/名称" />
        </span>
        <ElButton type="primary" @click="chaxun">
          查询
        </ElButton>
        <ElButton @click="tapReset">
          重置
        </ElButton>
      </div>
      <el-table
        :data="meteringlist"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="Code" label="单位编码" width="350" />
        <el-table-column prop="Name" label="单位名称" width="350" />
        <el-table-column label="操作" width="440">
          <template #default="scope">
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
