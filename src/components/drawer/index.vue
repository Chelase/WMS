<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import sonDrawer from '@/components/drawer/sonindex.vue'

const emit = defineEmits(['close'])
const dialogVisible = ref(false)
const guanlian = ref('')
const quantityInput = ref('')
const Pinput = ref('')
const Tinput = ref('')
const optionss = [
  {
    value: '生产产品入库',
    label: '生产产品入库',
  },
  {
    value: '采购收获入库',
    label: '采购收获入库',
  },
  {
    value: '退货入库',
    label: '退货入库',
  },
]

interface RuleForm {
  name: string
  region: string
  count: string
  type: string
  supplier: string
  date: string
}

const ruleFormRef = ref<FormInstance>()
const ruleFormReftwo = ref<FormInstance>()

const ruleForm = reactive<RuleForm>({
  name: '',
  region: '',
  count: '',
  type: '',
  supplier: '',
  date: '',
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入入库数量', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: '请选择物料',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: '请选择货位',
      trigger: 'change',
    },
  ],
  type: [
    {
      required: true,
      message: '请选择入库类型',
      trigger: 'change',
    },
  ],
  supplier: [
    {
      required: true,
      message: '请选择供应商',
      trigger: 'change',
    },
  ],
  date: [
    {
      type: 'date',
      required: true,
      message: '请选择日期',
      trigger: 'change',
    },
  ],
})

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) { return }
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    }
    else {
      console.log('error submit!', fields)
    }
  })
}

// const relevanceInput = ref('')
const remarkInput = ref('')
const huoweia = ref('')
const addDrawer = ref(false)
const title = ref('供应商选择')
const types = ref()

function close() {
  emit('close', false)
}
function closeson(e) {
  dialogVisible.value = e
}
function chuan(e) {
  huoweia.value = e
}
function danchu() {
  dialogVisible.value = true
  title.value = '物料选择'
  types.value = 2
}
function supplierbutton() {
  dialogVisible.value = true
  types.value = 1
}
function spaceButn() {
  dialogVisible.value = true
  types.value = 3
  title.value = '货位选择'
}
</script>

<template>
  <div>
    <el-row style="margin-bottom: 10px;">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="入库单号" style="float: left;">
          <el-input style="width: 260px;height: 32px;" placeholder="系统自动生成" disabled />
        </el-form-item>
        <el-form-item label="入库时间" style="float: left;" required>
          <el-col :span="11">
            <el-form-item style="width: 260px;height: 32px;" prop="date">
              <el-date-picker
                v-model="ruleForm.date"
                type="date"
                label="Pick a date"
                placeholder="请选择日期"
                style="width: 260px;height: 32px;"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="入库类型" prop="type">
          <el-select v-model="ruleForm.type" style="width: 260px;height: 32px;" placeholder="入库类型">
            <el-option v-for="item in optionss" :key="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="关联单号" style="float: left;">
          <el-input v-model="guanlian" style="width: 260px;height: 32px;" />
        </el-form-item>
        <el-form-item label="供应商" prop="supplier" style="float: left;" required>
          <el-select v-model="ruleForm.supplier" style="width: 210px;height: 32px;" class="m-2" placeholder="供应商/下料点" />
          <el-button type="primary" @click="supplierbutton()">
            <SvgIcon name="ep:search" />
          </el-button>
        </el-form-item>
        <el-form-item label="备注">
          <ElInput v-model="remarkInput" style="width: 260px;height: 32px;" />
        </el-form-item>
      </el-form>
    </el-row>
    <ElButton type="primary" @click="addDrawer = true">
      <SvgIcon name="ep:plus" />
      添加
    </ElButton>
    <ElButton disabled type="info">
      <SvgIcon name="ep:semi-select" />
      删除
    </ElButton>
    <el-table
      style="width: 100%;"
      border
    >
      <el-table-column type="select" width="55" />
      <el-table-column label="物料" width="260" />
      <el-table-column label="货位" width="260" />
      <el-table-column label="数量" width="260" />
      <el-table-column label="操作" width="260" />
    </el-table>
    <div style="position: absolute; left: 1000px; top: 670px;">
      <ElButton @click="close">
        取消
      </ElButton>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="70%"
      style="height: 500px;"
    >
      <sonDrawer :types="types" @closeson="closeson" @chuan="chuan" />
    </el-dialog>
    <el-dialog
      v-model="addDrawer"
      title="入库"
      width="50%"
      style="height: 480px;"
    >
      <el-form
        ref="ruleFormReftwo"
        :model="ruleForm"
        :rules="rules"
        label-width="220px"
        class="demo-ruleForm"
        style=" text-align: center; justify-content: center;"
        status-icon
      >
        <el-form-item label="物料" prop="region">
          <el-select v-model="ruleForm.region" style="width: 210px;height: 32px;" class="m-2" />
          <el-button type="primary" @click="danchu()">
            <SvgIcon name="ep:search" />
          </el-button>
        </el-form-item>
        <el-form-item label="货位" prop="count">
          <el-select v-model="ruleForm.count" style="width: 210px;height: 32px;" class="m-2" />
          <el-button type="primary" @click="spaceButn()">
            <SvgIcon name="ep:search" />
          </el-button>
        </el-form-item>
        <el-form-item label="批次号">
          <el-input v-model="quantityInput" style="width: 260px;height: 32px;" />
        </el-form-item>
        <el-form-item label="条码">
          <el-input v-model="Pinput" style="width: 260px;height: 32px;" />
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="Tinput" style="width: 260px;height: 32px;" />
        </el-form-item>
        <el-form-item label="入库数量" prop="name">
          <el-input v-model="ruleForm.name" style="width: 260px;height: 32px;" />
        </el-form-item>
      </el-form>
      <div style="position: absolute; left: 300px; top: 420px;">
        <ElButton @click="addDrawer = false">
          取消
        </ElButton>
        <el-button type="primary" @click="submitForm(ruleFormReftwo)">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="ts">
</style>
