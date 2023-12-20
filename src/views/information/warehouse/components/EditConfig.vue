<script setup lang="ts">
import { watch } from 'vue'

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

function closeConfig() {
  emit(['update:OpenConfig'], false)
}
</script>

<template>
  <el-dialog v-model="isShow" title="编辑配置" @close="closeConfig">
    111
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
