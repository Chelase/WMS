<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { storeToRefs } from 'pinia'
import Message from 'vue-m-message'
import useCargoAreaStore from '@/store/modules/information/cargoarea.ts'
import CargoAreaApi from '@/api/modules/information/CargoArea.ts'
import useUserStore from '@/store/modules/user.ts'

const props = defineProps({
  OpenAddCargoArea: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  warehouseList: {
    type: Array,
    default: [],
  },
  queryList: {
    type: Array,
    default: [],
  },
  editId: {
    type: String,
    default: '',
  },
  storId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:OpenAddCargoArea', 'upList'])
const CargoAreaStore = useCargoAreaStore()
const userStore = useUserStore()

onMounted(() => {
  if (props.title === '编辑') getEditCargoAreaList()
})

const CargoAreaFormRef = ref<FormInstance>()

const CargoAreaForm = ref({
  Code: '',
  Type: '',
  StorId: '',
  Name: '',
})


const CargoAreaFormRules = ref<FormRules>({
  StorId: [
    { required: true, trigger: 'change', message: '请选择仓库' },
  ],
  Type: [
    { required: true, trigger: 'change', message: '请选择货区类型' },
  ],
  Name: [
    { required: true, trigger: 'blur', message: '请输入货区名称' },
  ],
})

async function getEditCargoAreaList() {
  await CargoAreaStore.getEditCargoAreaData({ id: props.editId })
  const { CargoAreaFormData } = storeToRefs(CargoAreaStore)
  CargoAreaForm.value = CargoAreaFormData.value
}

function closeShow() {
  emit('update:OpenAddCargoArea', false)
  CargoAreaFormRef.value.resetFields()
}

function SaveData() {
  CargoAreaFormRef.value && CargoAreaFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (props.title === '新增') {
        await CargoAreaApi.AddCargoAreaDataList(CargoAreaForm.value)
      }
      else if (props.title === '编辑') {
        await CargoAreaApi.AddCargoAreaDataList({
          Code: CargoAreaForm.value.Code,
          CreateTime: CargoAreaStore.CreateTimes,
          CreatorId: userStore.CreatorId,
          Id: props.editId,
          Name: CargoAreaForm.value.Name,
          StorId: props.storId,
          Type: CargoAreaForm.value.Type,
        })
      }
      Message.success('操作成功')
      closeShow()
      emit('upList')
    }
  })
}
</script>

<template>
  <el-dialog
    :model-value="OpenAddCargoArea"
    :title="`${title}货区`"
    @close="closeShow"
  >
    <el-row justify="center">
      <el-col :span="35">
        <el-form
          ref="CargoAreaFormRef"
          style="margin: auto"
          :rules="CargoAreaFormRules"
          :model="CargoAreaForm"
          label-position="right"
          label-width="auto"
        >
          <el-form-item prop="Code" label="货区编号">
            <el-input v-model="CargoAreaForm.Code" placeholder="系统自动生成" disabled />
          </el-form-item>
          <el-form-item prop="StorId" label="仓库">
            <el-select v-model="CargoAreaForm.StorId" clearable placeholder="请选择仓库">
              <el-option v-for="item in warehouseList" :label="item.Name" :value="item.Id" />
            </el-select>
          </el-form-item>
          <el-form-item prop="Type" label="货区类型">
            <el-select v-model="CargoAreaForm.Type" clearable placeholder="货区类型">
              <el-option v-for="elem in queryList" :label="elem.Name" :value="elem.Code" />
            </el-select>
          </el-form-item>
          <el-form-item prop="Name" label="货区名称">
            <el-input v-model="CargoAreaForm.Name" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <template #footer>
      <el-button @click="closeShow">
        取消
      </el-button>
      <el-button type="primary" @click="SaveData">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-input{
  width: 500px;
}
.el-select{
  width: 500px;
}
</style>
