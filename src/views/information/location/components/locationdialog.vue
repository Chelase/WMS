<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  name: string
  region: string
  count: string
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  region: '',
  count: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
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

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) { return }
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="货区编码">
      <el-input placeholder="系统自动生成" style="width: 220px;" disabled />
    </el-form-item>
    <el-form-item label="货区名称" propa="Name">
      <el-input v-model="ruleForm.Name" style="width: 220px;" />
    </el-form-item>
    <el-form-item label="仓库" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择仓库" />
    </el-form-item>
    <el-form-item label="货区" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择货区" />
    </el-form-item>
    <el-form-item label="巷道" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择巷道" />
    </el-form-item>
    <el-form-item label="货架" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择货架" />
    </el-form-item>
    <el-form-item label="是否禁用" prop="delivery">
      <el-switch v-model="ruleForm.delivery" />
    </el-form-item>
    <el-form-item label="是否默认" prop="delivery">
      <el-switch v-model="ruleForm.delivery" />
    </el-form-item>
    <el-form-item label="剩余容量">
      <el-input style="width: 220px;" />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">
        Reset
      </el-button>
    </el-form-item>
  </el-form>
</template>
