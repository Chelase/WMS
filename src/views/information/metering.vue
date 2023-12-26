<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import useMeteringStore from '@/store/modules/information/metering.ts'

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
async function deletedata(id) {
  if (id.length === 1) {
    await MeteringStore.Delete(id)
  }
  else {
    await MeteringStore.Delete(selectionData.value)
  }
  getdataList()
  ElMessage.success('操作成功')
}
const ide = ref()
function xinzeng() {
  slideover.value = true
  title.value = '新增单位'
}
function bianji(id) {
  slideover.value = true
  ide.value = id
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
    if (valid) {
      console.log(123)
    }
  })
}
onMounted(() => {
  getdataList()
})
</script>

<template>
  <div>
    <el-dialog v-model="slideover" size="80%" :title="title">
      <el-form
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
