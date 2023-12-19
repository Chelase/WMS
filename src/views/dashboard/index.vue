<script setup lang="ts">

</script>

<template>
  <div>
    <PageMain>仓库统计
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
              <p>物料总数</p>
              <p>0</p>
              <p>当前仓库</p>
              <p>0</p>
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
              <p>今日入库</p>
              <p>0</p>
              <p>当前仓库</p>
              <p>0</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" :span="8">
            <template #header>
              <div class="card-header">
                <span>出库统计</span>
                <el-button class="button" text>
                  <svg-icon name="prime:refresh" />
                </el-button>
              </div>
            </template>
            <div>
              <p>今日出库</p>
              <p>0</p>
              <p>当前仓库</p>
              <p>0</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </PageMain>
  </div>
</template>

<style scoped lang="scss">

</style>