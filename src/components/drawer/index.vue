<script setup lang="ts">
    import { ref } from 'vue'
    
    // const prpos = defineProps({
    //   slideover: {
    //     type: Boolean,
    //     default: false,
    //   },
    // })
    const input = ref('')
    const valuetimeone = ref('')
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1 // 月份从0开始，需要加1
    const day = currentDate.getDate()
    </script>
    
    <template>
      <div>
        <el-row style="margin-bottom: 10px;">
          <el-col :span="8">
            <span style="margin: 10px;">入库单号:</span>
            <ElInput v-model="input" style="width: 260px;height: 32px;" placeholder="系统自动生成" :disabled="true" />
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
            <el-select style="width: 260px;height: 32px;" class="m-2" placeholder="入库类型" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span style="margin: 10px;">关联单号:</span>
            <ElInput v-model="input" style="width: 260px;height: 32px;" />
          </el-col>
          <el-col :span="8">
            <span style="margin-left: 28px;">供应商:</span>
            <el-select style="width: 210px;height: 32px;" class="m-2" placeholder="供应商/下料点" />
            <el-button type="primary">
              <SvgIcon name="ep:search" />
            </el-button>
          </el-col>
          <el-col :span="8">
            <span style="margin: 10px;margin-left: 30px;">备注:</span>
            <ElInput v-model="input" style="width: 260px;height: 32px;" />
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-button type="primary">+ 添加</el-button>
            <el-button type="info" plain disabled>- 删除</el-button>
        </el-row>
        <el-row style="margin-top: 20px;"> 
            <el-table :data="tableData" border style="width: 100%" text-align="center">
                <el-table-column type="selection" width="80" />
                <el-table-column prop="收货单号" label="收货单号" width="180" />
                <el-table-column prop="订单日期" label="订单日期" />
                <el-table-column prop="收货类型" label="收货类型" />
                <el-table-column prop="关联单号" label="关联单号" />
                <el-table-column prop="状态" label="状态" />
                <el-table-column prop="供应商" label="供应商" />
                <el-table-column prop="收货数量" label="收货数量" />
                <el-table-column prop="入库数量" label="入库数量" />
                <el-table-column prop="操作" label="操作" />
              </el-table>
        </el-row>
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