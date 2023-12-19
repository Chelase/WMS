<script setup lang="ts">
const radio = ref('上海')
</script>

<template>
  <div>
    <PageMain>
      <div class="button-topr3 fv">
        <ElButton type="primary">
          <SvgIcon name="ep:plus" />
          新建
        </ElButton>
        <ElButton>
          <SvgIcon name="ep:semi-select" />
          删除
        </ElButton>
        <ElButton type="primary">
          <SvgIcon name="ep:refresh-right" />
          刷新
        </ElButton>
        <ElRadioGroup v-model="radio">
          <ElRadioButton label="全部" />
          <ElRadioButton label="待审核" />
          <ElRadioButton label="审核通过" />
          <ElRadioButton label="审核失败" />
        </ElRadioGroup>
      </div>
    </PageMain>
  </div>
</template>

<style scoped lang="scss">

</style>
