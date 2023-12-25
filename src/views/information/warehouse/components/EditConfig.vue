<script setup lang="ts">
import { ref, watch } from 'vue'
import {storeToRefs} from "pinia";
import useWarehouseStore from "@/store/modules/information/warehouse.ts";
import useUserStore from "@/store/modules/user.ts";

const props = defineProps({
  OpenConfig: {
    type: Boolean,
    default: false,
  },
  storId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:OpenConfig', 'upList'])
const WarehouseStore = useWarehouseStore()
const userStore = useUserStore()

const id = ref(props.storId)

watch(() => props.storId, (newStorId) => {
  id.value = newStorId
  getEditWarehouse()
})

const state = ref({
  IsZone: false,
  IsTray: false,
  Disable: false,
  IsDefault: false,
})
const WarehouseForm = ref({
  code: '',
  name: '',
  type: '',
  remarks: '',
})

// 获取仓库详情
async function getEditWarehouse() {
  await WarehouseStore.GetEditWarehouseList({ id: id.value })
  const { WarehouseFormData } = storeToRefs(WarehouseStore)
  WarehouseForm.value = WarehouseFormData.value
  const { warehouseState } = storeToRefs(WarehouseStore)
  state.value = warehouseState.value
}

function closeConfig() {
  emit('update:OpenConfig', false)
}

async function SaveData() {
  await WarehouseStore.AddWarehouseList({
    Code: WarehouseForm.value.code,
    CreateTime: WarehouseStore.CreateTimes,
    CreatorId: userStore.CreatorId,
    Id: id.value,
    Name: WarehouseForm.value.name,
    Remarks: WarehouseForm.value.remarks,
    Type: WarehouseForm.value.type,
    IsZone: state.value.IsZone,
    IsTray: state.value.IsTray,
    Disable: state.value.Disable,
    IsDefault: state.value.IsDefault,
  })
  closeConfig()
  emit('upList')
}
</script>

<template>
  <el-dialog :model-value="OpenConfig" title="编辑配置" width="35%" @close="closeConfig">
    <el-row justify="center">
      <el-col :span="5">
        <p>托盘管理</p>
      </el-col>
      <el-col :span="5">
        <el-switch
          v-model="state.IsZone"
          size="large"
          inline-prompt
          active-text="启用"
          inactive-text="停用"
        />
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="5">
        <p>分区管理</p>
      </el-col>
      <el-col :span="5">
        <el-switch
          v-model="state.IsTray"
          size="large"
          inline-prompt
          active-text="启用"
          inactive-text="停用"
        />
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="5">
        <p>仓库状态</p>
      </el-col>
      <el-col :span="5">
        <el-switch
          v-model="state.Disable"
          size="large"
          inline-prompt
          active-text="启用"
          inactive-text="停用"
        />
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="5">
        <p>默认仓库</p>
      </el-col>
      <el-col :span="5">
        <el-switch
          v-model="state.IsDefault"
          size="large"
          inline-prompt
          active-text="是"
          inactive-text="否"
        />
      </el-col>
    </el-row>
    <template #footer>
      <el-button @click="closeConfig">取消</el-button>
      <el-button type="primary" @click="SaveData">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
