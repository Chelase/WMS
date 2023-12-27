<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import usePalletManagementStore from '@/store/modules/information/PalletManagement'

const props = defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
    default: '新增',
  },
})
const emit = defineEmits(['close', 'shaxin'])

const PalletManagementStore = usePalletManagementStore()

interface RuleForm {
  name: ''
  stash: ''
  area: ''
  racks: null
  region: null
  desc: ''
  rlsc: ''
  delivery: false
  mrli: false
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  area: '',
  stash: '',
  rlsc: '',
  date: '',
})
const thedata = ref()

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
  ],
  stash: [
    {
      required: true,
      message: '请选择类型',
      trigger: 'change',
    },
  ],
})
const bianma = ref()

function submitForm() {
  ruleFormRef.value && ruleFormRef.value?.validate(async (valid) => {
    if (valid && props.title === '新增') {
      await PalletManagementStore.SaveData({
        Name: ruleForm.name,
        Remarks: ruleForm.desc,
        StartTime: ruleForm.date,
        Status: 1,
        TrayTypeId: ruleForm.stash,
      })
      close()
      ElMessage.success('操作成功')
    }
    else {
      await PalletManagementStore.SaveData({
        Code: bianma.value,
        Name: ruleForm.name,
        Remarks: ruleForm.desc,
        StartTime: ruleForm.date,
        Status: 1,
        TrayTypeId: ruleForm.stash,
        CreateTime: thedata.value.Data.CreateTime,
        CreatorId: thedata.value.Data.CreatorId,
        Deleted: thedata.value.Data.Deleted,
        Id: thedata.value.Data.Id,
        LocalId: thedata.value.Data.LocalId,
        PB_Location: thedata.value.Data.PB_Location,
        PB_TrayType: thedata.value.Data.PB_TrayType,
      })
      close()
      ElMessage.success('操作成功')
    }
  })
}
const Tuodata = ref()
async function GetAllData() {
  await PalletManagementStore.GetAllData()
  Tuodata.value = PalletManagementStore.Tuodata.Data
  console.log(Tuodata)
}
const id = props.id
async function bianji(id) {
  await PalletManagementStore.GetTheData({ id })
  thedata.value = PalletManagementStore.getThedata
  bianma.value = thedata.value.Data.Code
  ruleForm.name = thedata.value.Data.Name
  ruleForm.stash = thedata.value.Data.TrayTypeId
  ruleForm.date = thedata.value.Data.StartTime
  ruleForm.desc = thedata.value.Data.Remarks
}
function close() {
  bianma.value = ''
  ruleForm.name = ''
  ruleForm.stash = ''
  ruleForm.date = ''
  ruleForm.desc = ''
  emit('close', false)
  emit('shaxin')
}
onMounted(() => {
  GetAllData()
  if (props.title !== '新增') {
    bianji(id)
  }
})
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="托盘号">
      <el-input v-model="bianma" placeholder="系统自动生成" style="width: 220px;" disabled />
    </el-form-item>
    <el-form-item label="托盘名称" prop="name">
      <el-input v-model="ruleForm.name" style="width: 220px;" />
    </el-form-item>
    <el-form-item label="托盘类型" prop="stash">
      <el-select v-model="ruleForm.stash">
        <el-option
          v-for="item in Tuodata"
          :key="item.Id"
          :label="item.Name"
          :value="item.Id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="启用日期">
      <el-form-item style="width: 260px;height: 32px;">
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          label="Pick a date"
          placeholder="请选择日期"
          style="width: 260px;height: 32px;"
        />
      </el-form-item>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button @click="close">
        取消
      </el-button>
      <el-button type="primary" @click="submitForm()">
        确定
      </el-button>
    </el-form-item>
  </el-form>
</template>
