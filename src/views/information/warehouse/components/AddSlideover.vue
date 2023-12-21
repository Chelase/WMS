<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import useWarehouseStore from '@/store/modules/information/warehouse.ts'
import useUserStore from '@/store/modules/user.ts'

const props = defineProps({
  IsShow: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  storId: {
    type: String,
    default: '',
  },
  isEdit: String,
  editId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['upAddSlideoverShow', 'upList'])

const WarehouseStore = useWarehouseStore()
const userStore = useUserStore()

const AddSlideoverFormRef = ref<FormInstance>()

const SlideoverForm = ref({
  Code: '',
  name: '',
  StorId: props.storId,
})

watch(() => props.storId, (newStorId) => {
  SlideoverForm.value.StorId = newStorId
}, { immediate: true })

const id = ref(props.editId)
const isShow = props.IsShow

watch(() => props.editId, (newEditId) => {
  id.value = newEditId
  IsEdit()
}, { immediate: true })

watch(() => props.IsShow, (newValue) => {
  console.log(55, newValue)
  if (newValue === true) {
    IsEdit()
  }
})

onMounted(() => {
  IsEdit()
})

function IsEdit() {
  if (props.isEdit === '编辑') {
    if (props.title === '货架') {
      getEditGoodsShelvesList()
    }
    else if (props.title === '巷道') {
      getEditRoadwaySlideoverList()
    }
  }
}

// 获取货架编辑详情
async function getEditGoodsShelvesList() {
  await WarehouseStore.getEditGoodsShelvesData({ id: id.value })
  const { SlideoverFormData } = storeToRefs(WarehouseStore)
  SlideoverForm.value.name = SlideoverFormData.value.name
  SlideoverForm.value.Code = SlideoverFormData.value.Code
}

// 获取巷道编辑详情
async function getEditRoadwaySlideoverList() {
  await WarehouseStore.getEditRoadwaySlideoverData({ id: id.value })
  const { SlideoverFormData } = storeToRefs(WarehouseStore)
  SlideoverForm.value.name = SlideoverFormData.value.name
  SlideoverForm.value.Code = SlideoverFormData.value.Code
}

const SlideoverRules = ref({
  name: [
    { required: true, trigger: 'blur', message: '请输入系统名称' },
  ],
})

// 通知组件更新列表
function upList() {
  emit('upList')
}

// 关闭弹窗
function closeShow() {
  emit('upAddSlideoverShow', false)
  SlideoverForm.value = {
    Code: '',
    name: '',
    StorId: props.storId,
  }
}

function SaveData() {
  AddSlideoverFormRef.value && AddSlideoverFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (props.title === '巷道') {
        if (props.isEdit === '新增') {
          await WarehouseStore.AddRoadwayData(SlideoverForm.value)
        }
        else if (props.isEdit === '编辑') {
          const EditRoadwaySlideoverForm = ref({
            Code: SlideoverForm.value.Code,
            CreateTime: WarehouseStore.CreateTimes,
            CreatorId: userStore.CreatorId,
            Id: id.value,
            Name: SlideoverForm.value.name,
            StorId: SlideoverForm.value.StorId,
          })
          await WarehouseStore.AddRoadwayData(EditRoadwaySlideoverForm.value)
        }
      }
      else {
        if (props.isEdit === '新增') {
          await WarehouseStore.AddGoodsShelvesData(SlideoverForm.value)
        }
        else if (props.isEdit === '编辑') {
          const EditRoadwaySlideoverForm = ref({
            Code: SlideoverForm.value.Code,
            CreateTime: WarehouseStore.CreateTimes,
            CreatorId: userStore.CreatorId,
            Id: id.value,
            Name: SlideoverForm.value.name,
            StorId: SlideoverForm.value.StorId,
          })
          await WarehouseStore.AddGoodsShelvesData(EditRoadwaySlideoverForm.value)
        }
      }
      ElMessage.success('操作成功')
      closeShow()
      upList()
    }
  })
}
</script>

<template>
  <el-dialog v-model="isShow" :title="`${isEdit}巷道`" width="40%" style="height: 250px">
    <el-form
      ref="AddSlideoverFormRef"
      :rules="SlideoverRules"
      :model="SlideoverForm"
      label-position="right"
      label-width="auto"
      reset-fields
    >
      <el-form-item prop="code" :label="`${title}编号`">
        <el-input v-model="SlideoverForm.Code" placeholder="系统自动生成" disabled />
      </el-form-item>
      <el-form-item prop="name" :label="`${title}名称`">
        <el-input v-model="SlideoverForm.name" />
      </el-form-item>
    </el-form>
    <el-row style="float: right;">
      <el-button @click="closeShow">
        取消
      </el-button>
      <el-button type="primary" @click="SaveData">
        确定
      </el-button>
    </el-row>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
