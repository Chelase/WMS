<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  ShowConfig: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:OpenConfig'])

const isShow = ref(props.ShowConfig)

watch(() => props.ShowConfig, (newValue) => {
  isShow.value = newValue
})

const IsZone = ref(false)
const IsTray = ref(false)
const Disable = ref(false)
const IsDefault = ref(false)

function closeConfig() {
  emit(['update:OpenConfig'], false)
}
</script>

<template>
  <el-dialog v-model="isShow" title="编辑配置" width="35%" @close="closeConfig">
    <el-row>
      <span>托盘管理</span>
      <el-switch
        v-model="IsZone"
        size="large"
        inline-prompt
        active-text="启用"
        inactive-text="停用"
      />
    </el-row>
    <el-row>
      <span>分区管理</span>
      <el-switch
        v-model="IsTray"
        size="large"
        inline-prompt
        active-text="启用"
        inactive-text="停用"
      />
    </el-row>
    <el-row>
      <span>仓库状态</span>
      <el-switch
        v-model="Disable"
        size="large"
        inline-prompt
        active-text="启用"
        inactive-text="停用"
      />
    </el-row>
    <el-row>
      <span>默认仓库</span>
      <el-switch
        v-model="IsDefault"
        size="large"
        inline-prompt
        active-text="是"
        inactive-text="否"
      />
    </el-row>
    <template #footer>
      <el-button>取消</el-button>
      <el-button type="primary">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
