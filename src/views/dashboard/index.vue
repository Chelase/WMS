<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  getMaterialStatisticsData,
  getInventoryStatistics,
  getOutboundStatistics
 } from '@/api/modules/dashboard/index.ts'
//物料统计
const MaterialStatistics = ref({
  Total: 0,
  Storage: 0
})
//入库统计
const InventoryStatistics = ref({
  Total: 0,
  Storage: 0
})
// 出库统计
const OutboundStatistics = ref({
  Total: 0,
  Storage: 0
})



const getData = async() => {
  //物料统计
  const Mres =  await getMaterialStatisticsData()
  MaterialStatistics.value = Mres.Data
  //入库统计
  const Ires =  await getInventoryStatistics()
  InventoryStatistics.value = Ires.Data
  //出库统计
  const Ores =  await getOutboundStatistics()
  OutboundStatistics.value = Ores.Data
}
onMounted(() => {
  getData()
})
</script>

<template>
  <div>
    <PageMain>
      <el-row>
        <el-col :span="8">
          <el-card class="box-card" :span="8">
            <template #header>
              <div class="card-header">
                <span>物料统计</span>
                <el-button class="button" text>
                  <svg-icon name="prime:refresh" />
                </el-button>
              </div>
            </template>
            <div>
              <p class="light">物料总数</p>
              <p class="Btext">{{MaterialStatistics.Total}}</p>
              <p class="light">当前仓库</p>
              <p class="Btext">{{MaterialStatistics.Storage}}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" :span="8">
            <template #header>
              <div class="card-header">
                <span>入库统计</span>
                <el-button class="button" text>
                  <svg-icon name="prime:refresh" />
                </el-button>
              </div>
            </template>
            <div>
              <p class="light">今日入库</p>
              <p class="Btext">{{InventoryStatistics.Total}}</p>
              <p class="light">当前仓库</p>
              <p class="Btext">{{InventoryStatistics.Storage}}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" :span="8">
            <template #header>
              <div class="card-header">
                <span>出库统计</span>
                <el-button class="button" text>
                  <svg-icon name="prime:refresh"/>
                </el-button>
              </div>
            </template>
            <div>
              <p class="light">今日出库</p>
              <p class="Btext">{{OutboundStatistics.Total}}</p>
              <p class="light">当前仓库</p>
              <p class="Btext">{{OutboundStatistics.Storage}}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.Btext{
  font-size: 28px;
}
.light{
  color: rgb(114, 114, 114);
}
.button {
  float: right;
}
</style>