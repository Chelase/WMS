<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import useLocationStore from '@/store/modules/information/location.ts'

const props = defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
    default: '新增货位',
  },
})
const emit = defineEmits(['close', 'shaxin'])

const LocationStore = useLocationStore()

interface RuleForm {
  name: ''
  stash: ''
  area: ''
  racks: ''
  region: ''
  desc: ''
  rlsc: ''
  delivery: false
  mrli: false
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  region: '',
  area: '',
  stash: '',
  racks: '',
  rlsc: '',
})
const thedata = ref()

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入货位名称', trigger: 'blur' },
  ],
  area: [
    {
      required: true,
      message: '请选择货区',
      trigger: 'change',
    },
  ],
  stash: [
    {
      required: true,
      message: '请选择仓库',
      trigger: 'change',
    },
  ],
})
const bianma = ref()

function submitForm() {
  ruleFormRef.value && ruleFormRef.value?.validate(async (valid) => {
    if (valid && props.title === '新增货位') {
      await LocationStore.SaveData({
        areaId: ruleForm.area,
        isDefault: ruleForm.mrli,
        isForbid: ruleForm.delivery,
        lanewayId: ruleForm.racks,
        name: ruleForm.name,
        overVol: ruleForm.rlsc,
        rackId: ruleForm.region,
        remarks: ruleForm.desc,
        storId: ruleForm.stash,
      })
      close()
      ElMessage.success('操作成功')
    }
    else {
      await LocationStore.SaveData({
        areaId: ruleForm.area,
        code: bianma.value,
        isDefault: ruleForm.mrli,
        isForbid: ruleForm.delivery,
        lanewayId: ruleForm.racks,
        name: ruleForm.name,
        overVol: ruleForm.rlsc,
        rackId: ruleForm.region,
        remarks: ruleForm.desc,
        storId: ruleForm.stash,
        creatorId: thedata.value.Data.CreatorId,
        errorCode: thedata.value.Data.ErrorCode,
        pB_Storage: thedata.value.Data.PB_Storage,
        pB_StorArea: thedata.value.Data.PB_StorArea,
        pB_Laneway: thedata.value.Data.PB_Laneway,
        pB_Rack: thedata.value.Data.PB_Rack,
        pB_LocalTrays: thedata.value.Data.PB_LocalTrays,
        createTime: thedata.value.Data.CreateTime,
        lockType: thedata.value.Data.LockType,
        deleted: thedata.value.Data.Deleted,
        Id: thedata.value.Data.Id,
      })
      close()
      ElMessage.success('操作成功')
    }
  })
}
const housedata = ref()
async function getWarehousedata() {
  await LocationStore.getstoredataList()
  housedata.value = LocationStore.storage.Data
  console.log(housedata)
}
const bystordata = ref()
const lanedata = ref()
const rackdata = ref()
async function househuoqu(id) {
  await LocationStore.getbystordataList(id)
  bystordata.value = LocationStore.bystor.Data
  await LocationStore.getLaneDataList(id)
  lanedata.value = LocationStore.lanedata.Data
  await LocationStore.getRackDataList(id)
  rackdata.value = LocationStore.rackdata.Data
}
const id = props.id
async function bianji(id) {
  await LocationStore.GetTheData({ id })
  thedata.value = LocationStore.thedata
  console.log(thedata.value.Data, '321312')
  bianma.value = thedata.value.Data.Code
  ruleForm.name = thedata.value.Data.Name
  ruleForm.stash = thedata.value.Data.StorId
  househuoqu(ruleForm.stash)
  ruleForm.area = thedata.value.Data.AreaId
  ruleForm.racks = thedata.value.Data.LanewayId
  ruleForm.region = thedata.value.Data.RackId
  ruleForm.delivery = thedata.value.Data.IsForbid
  ruleForm.mrli = thedata.value.Data.IsDefault
  ruleForm.rlsc = thedata.value.Data.OverVol
  ruleForm.desc = thedata.value.Data.Remarks
}
function close() {
  bianma.value = ''
  ruleForm.name = ''
  ruleForm.stash = ''
  househuoqu(ruleForm.stash)
  ruleForm.area = ''
  ruleForm.racks = ''
  ruleForm.region = ''
  ruleForm.delivery = ''
  ruleForm.mrli = ''
  ruleForm.rlsc = ''
  ruleForm.desc = ''
  emit('close', false)
  emit('shaxin')
}
onMounted(() => {
  getWarehousedata()
  if (props.title !== '新增货位') {
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
    <el-form-item label="货区编码">
      <el-input v-model="bianma" placeholder="系统自动生成" style="width: 220px;" disabled />
    </el-form-item>
    <el-form-item label="货区名称" prop="name">
      <el-input v-model="ruleForm.name" style="width: 220px;" />
    </el-form-item>
    <el-form-item label="仓库" prop="stash">
      <el-select v-model="ruleForm.stash" placeholder="请选择仓库" @change="househuoqu">
        <el-option
          v-for="item in housedata"
          :key="item.Id"
          :label="item.Name"
          :value="item.Id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="货区" prop="area">
      <el-select v-model="ruleForm.area" placeholder="请选择货区">
        <el-option
          v-for="item in bystordata"
          :key="item.Id"
          :label="item.Name"
          :value="item.Id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="巷道">
      <el-select v-model="ruleForm.racks" placeholder="请选择巷道">
        <el-option
          v-for="item in lanedata"
          :key="item.Id"
          :label="item.Name"
          :value="item.Id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="货架">
      <el-select v-model="ruleForm.region" placeholder="请选择货架">
        <el-option
          v-for="item in rackdata"
          :key="item.Id"
          :label="item.Name"
          :value="item.Id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="是否禁用" prop="delivery">
      <el-switch v-model="ruleForm.delivery" />
    </el-form-item>
    <el-form-item label="是否默认" prop="delivery">
      <el-switch v-model="ruleForm.mrli" />
    </el-form-item>
    <el-form-item label="剩余容量">
      <el-input v-model="ruleForm.rlsc" style="width: 220px;" />
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
