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
const month = currentDate.getMonth()
const day = currentDate.getDate()
const slideover = ref(false)

const options = [
  {
    value: '销售出库',
    label: '销售出库',
  },
  {
    value: '调拨出库',
    label: '调拨出库',
  },
  {
    value: '盘亏出库',
    label: '盘亏出库',
  },
  {
    value: '其他出库',
    label: '其他出库',
  },
  {
    value: '采购出库',
    label: '采购出库',
  },
  {
    value: '生产出库',
    label: '生产出库',
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
function close(e) {
  slideover.value = e
}
</script>

<template>
  <div>
    <el-drawer v-model="slideover" size="80%" title="入库">
      <drawer @close="close" />
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
          <el-select v-model="value" style="width: 180px;" class="m-2" placeholder="出库类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </span>
        <span>
          <ElInput v-model="input" style="width: 180px;height: 32px;" placeholder="出库/关联单号" />
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
        border
        style="width: 100%;"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="出库单号" width="120" />
        <el-table-column label="出库时间" />
        <el-table-column label="出库类型" width="120" />
        <el-table-column label="出库数量" />
        <el-table-column label="状态" />
        <el-table-column label="客户" />
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
