<script setup lang="ts">
import { ref } from 'vue'
import sonDrawer from '@/components/drawer/sonindex.vue'

const emit = defineEmits(['close'])
const dialogVisible = ref(false)
const value = ref('')
const quantityInput = ref('')

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
const relevanceInput = ref('')
const remarkInput = ref('')

const valuetimeone = ref('')
const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth()
const day = currentDate.getDate()

const addDrawer = ref(false)
function close() {
  emit('close', false)
}
function closeson(e) {
  dialogVisible.value = e
}
const title = ref('供应商选择')
const types = ref()
function danchu() {
  dialogVisible.value = true
  title.value = '物料选择'
  types.value = 2
}
function supplierbutton() {
  dialogVisible.value = true
  types.value = 1
}
</script>

<template>
  <div>
    <el-row style="margin-bottom: 10px;">
      <el-col :span="8">
        <span style="margin: 10px;">入库单号:</span>
        <ElInput style="width: 260px;height: 32px;" placeholder="系统自动生成" :disabled="true" />
      </el-col>
      <el-col :span="8">
        <span style="margin: 10px;">入库时间:</span>
        <el-date-picker
          v-model="valuetimeone"
          style="width: 260px;height: 32px;"
          type="date"
          placeholder="请选择日期"
          :default-value="new Date(year, month, day)"
        />
      </el-col>
      <el-col :span="8">
        <span>入库类型:</span>
        <el-select v-model="value" style="width: 260px;height: 32px;" class="m-2" placeholder="入库类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span style="margin: 10px;">关联单号:</span>
        <ElInput v-model="relevanceInput" style="width: 260px;height: 32px;" />
      </el-col>
      <el-col :span="8">
        <span style="margin-left: 28px;">供应商:</span>
        <el-select style="width: 210px;height: 32px;" class="m-2" placeholder="供应商/下料点" />
        <el-button type="primary" @click="supplierbutton()">
          <SvgIcon name="ep:search" />
        </el-button>
      </el-col>
      <el-col :span="8">
        <span style="margin: 10px;margin-left: 30px;">备注:</span>
        <ElInput v-model="remarkInput" style="width: 260px;height: 32px;" />
      </el-col>
    </el-row>
    <ElButton type="primary" @click="addDrawer = true">
      <SvgIcon name="ep:plus" />
      添加
    </ElButton>
    <ElButton disabled type="info">
      <SvgIcon name="ep:semi-select" />
      删除
    </ElButton>
    <el-table
      style="width: 100%;"
      border
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="物料" width="260" />
      <el-table-column label="货位" width="260" />
      <el-table-column label="数量" width="260" />
      <el-table-column label="操作" width="260" />
    </el-table>
    <div style="position: absolute; left: 1000px; top: 670px;">
      <ElButton @click="close">
        取消
      </ElButton>
      <ElButton type="primary">
        保存
      </ElButton>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="70%"
      style="height: 500px;"
    >
      <sonDrawer :types="types" @closeson="closeson" />
    </el-dialog>
    <el-dialog
      v-model="addDrawer"
      title="入库"
      width="58%"
      style="height: 330px;"
    >
      <el-row>
        <el-col :span="12">
          <span style="margin-left: 28px;">物料:</span>
          <el-select style="width: 210px;height: 32px;" class="m-2" />
          <el-button type="primary" @click="danchu()">
            <SvgIcon name="ep:search" />
          </el-button>
        </el-col>
        <el-col :span="12">
          <span style="margin-left: 28px;">货位:</span>
          <el-select style="width: 210px;height: 32px;" class="m-2" />
          <el-button type="primary">
            <SvgIcon name="ep:search" />
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span style="margin-left: 18px; margin-right: 10px;">批次号:</span>
          <ElInput style="width: 260px;height: 32px;" />
        </el-col>
        <el-col :span="12">
          <span style="margin-left: 28px; margin-right: 10px;">条码:</span>
          <ElInput style="width: 260px;height: 32px;" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span style="margin-left: 30px;margin-right: 10px;">单价:</span>
          <ElInput style="width: 260px;height: 32px;" />
        </el-col>
        <el-col :span="12">
          <span style="margin-left: 1px; margin-right: 10px;">入库数量:</span>
          <ElInput v-model="quantityInput" style="width: 260px;height: 32px;" />
        </el-col>
      </el-row>
      <div style="position: absolute; left: 640px; top: 270px;">
        <ElButton @click="addDrawer = false">
          取消
        </ElButton>
        <ElButton type="primary">
          确认
        </ElButton>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.demo-date-picker {
  width: 220px;
  height: 40px;
  padding: 0;
}

.el-col {
  line-height: 50px;
}
</style>
