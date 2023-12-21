<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  ShowConfig: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['upOpenConfig'])

const isShow = ref(false)

watch(() => props.ShowConfig, (newValue) => {
  console.log(16, newValue)
  isShow.value = newValue
})

const IsZone = ref(false)
const IsTray = ref(false)
const Disable = ref(false)
const IsDefault = ref(false)

function closeConfig() {
  emit('upOpenConfig', false)
}
</script>

<template>
  <el-dialog v-model="isShow" title="编辑配置" width="35%" @close="closeConfig">
    <el-row justify="center">
      <el-col :span="5">
        <p>托盘管理</p>
      </el-col>
      <el-col :span="5">
        <el-switch
          v-model="IsZone"
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
          v-model="IsTray"
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
          v-model="Disable"
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
          v-model="IsDefault"
          size="large"
          inline-prompt
          active-text="是"
          inactive-text="否"
        />
      </el-col>
    </el-row>
    <template #footer>
      <el-button @click="closeConfig">取消</el-button>
      <el-button type="primary">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
