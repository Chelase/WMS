<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getdataListAPI } from '@/api/modules/operations/Warehousing.ts'
import drawer from '@/components/drawer/index.vue'

const radio = ref('全部')
const input = ref('')
const valuetimetwo = ref('')

const value = ref('')
const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1 // 月份从0开始，需要加1
const day = currentDate.getDate()

const slideover = ref(false)

const options = [
  {
    value: '生产产品入库',
    label: '生产产品入库',
  },
  {
    value: '采购收获入库',
    label: '采购收获入库',
  },
  {
    value: '退货入库',
    label: '退货入库',
  },
]
async function getdataList() {
  const res = await getdataListAPI({
    pageIndex: 1,
    pageRows: 10,
    search: {
      status: null,
    },
    sortType: 'desc',
    sortField: 'CreateTime',
  })
  console.log(res)
}
onMounted(() => {
  getdataList()
})
function tapReset() {
  value.value = ''
  valuetimetwo.value = ''
  input.value = ''
}
</script>

<template>
  <div>
    <el-drawer v-model="slideover" size="80%" title="入库">
      <drawer />
    </el-drawer>
    <PageMain>
      <div class="button-top">
        <span class="three-button">
          <ElButton type="primary" @click="slideover = true">
            <SvgIcon name="ep:plus" />
            新建
          </ElButton>
          <ElButton disabled type="info">
            <SvgIcon name="ep:semi-select" />
            删除
          </ElButton>
          <ElButton type="primary">
            <SvgIcon name="ep:refresh-right" />
            刷新
          </ElButton>
        </span>
        <span class="radio-button" style=" position: absolute; top: 20px; left: 270px;">
          <ElRadioGroup v-model="radio">
            <ElRadioButton label="全部" />
            <ElRadioButton label="待审核" />
            <ElRadioButton label="审核通过" />
            <ElRadioButton label="审核失败" />
          </ElRadioGroup>
        </span>
      </div>
      <div>
        <span>
          <el-select v-model="value" style="width: 180px;" class="m-2" placeholder="入库类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </span>
        <span>
          <ElInput v-model="input" style="width: 180px;height: 32px;" placeholder="入库/关联单号" />
        </span>
        <span>
          <el-date-picker
            v-model="valuetimetwo"
            style="height: 32px; width: 180px; margin: 10px;"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-value="[new Date(year, month, day), new Date(year, month, day)]"
          />
        </span>
        <ElButton type="primary">
          查询
        </ElButton>
        <ElButton @click="tapReset">
          重置
        </ElButton>
      </div>
      <el-table
        style="width: 100%;"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="入库单号" width="120" />
        <el-table-column label="入库类型" width="120" />
        <el-table-column label="入库时间" />
        <el-table-column label="关联单号" />
        <el-table-column label="状态" />
        <el-table-column label="供应商" />
        <el-table-column label="入库数量" />
        <el-table-column label="制单人" />
        <el-table-column label="审核人" />
        <el-table-column label="操作" />
      </el-table>
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.three-button {
  align-items: center;
}

.radio-button {
  margin-left: 20px;
}
</style>
