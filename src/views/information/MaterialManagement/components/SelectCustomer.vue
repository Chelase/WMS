<script setup lang="ts">
    import { ref, onMounted, inject, defineEmits } from 'vue'
    import storeQueryData from '@/store/modules/information/customer.ts'
    //store
    const getQueryData = storeQueryData()

    const emit = defineEmits(['selectionsone'])

    //客户类型
    const userType = [
        { chin: '公司', engl: 'Company' },
        { chin: '个人', engl: 'Personal' },
        { chin: '虚拟', engl: 'Virtual' },
        { chin: '内部', engl: 'Internal' }
    ]
    //存储表格初始值
    const tableData = ref()
    //表格列表数量
    const tableDataNum = ref(0)
    //调用列表数据需要的值
    const getneedData = ref({
        PageIndex: 1,
        PageRows: 10,
        Search: {
            KeyWord: '',
            Type: ''
        },
        SortField: 'Id',
        SortType: 'asc'
    })

    //获取表格值方法
    const getQueryDatas = async () => {
        // store 表格列表get方法
        await getQueryData.getQueryData(getneedData.value)
        //store 表格列表存值
        tableData.value = getQueryData.querydata.Data
        tableDataNum.value = getQueryData.querydata.Total
        // console.log(tableData.value)
    }
    onMounted(() => {
        getQueryDatas()
    })

    const dialogTableVisible = inject('showCustom')
    //存储单选框的值
    const selections = ref()

    //查询按钮
    const query = () => {
        getQueryDatas()
    }
    const resetting = () => {
        getneedData.value = {
            PageIndex: 1,
            PageRows: 10,
            Search: {},
            SortField: 'Id',
            SortType: 'asc'
        }
        getQueryDatas()
    }

    //换页
    const PageChange = (value) => {
        getneedData.value.PageIndex = value
        getQueryDatas()
    }

    //选择
    const selectionfun = () => {
        emit('selectionsone', selections.value)
        dialogTableVisible.value = false
    }
</script>
<template>
    <el-dialog v-model="dialogTableVisible" title="客户选择" class="w-65%">
        <el-row style="margin-bottom: 20px;" class="margins">
            <el-select v-model="getneedData.Search.Type" clearable placeholder="客户类型">
                <el-option v-for="(item, index) in userType" :key="index" :label="item.chin" :value="item.engl" />
            </el-select>
            <el-input v-model="getneedData.Search.KeyWord" class="w-50" placeholder="客户编号或名称" />
            <el-button type="primary" @click="query">查询</el-button>
            <el-button @click="resetting">重置</el-button>
        </el-row>
        <el-radio-group v-model="selections" class="w-100%">
            <el-table :data="tableData" border style="width: 100%" highlight-current-row>
                <el-table-column width="60">
                    <template #default="{row}">
                        <el-radio :label="row.Id">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="Code" label="客户编号" width="160" />
                <el-table-column prop="Name" label="客户名称" />
                <el-table-column prop="Type" label="客户类型" width="200">
                  <template #default="{row}">
                    <span>{{
                      row.Type=='Personal'?'个人':
                      row.Type == 'Company'? '公司':
                      row.Type == 'Virtual'? '虚拟' :
                      row.Type == 'Internal' ? '内部': ''
                      }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Phone" label="电话" width="200" />
                <el-table-column prop="Email" label="Email" width="300" />
            </el-table>
        </el-radio-group>
        <el-pagination layout=" total, prev, pager, next" :total="tableDataNum" style="float: right;"
            @current-change="PageChange" />
        <div style="height: 30px;"></div>
        <!-- 弹框操作 -->
        <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogTableVisible = false">取消</el-button>
              <el-button type="primary" @click="selectionfun">
                选择
              </el-button>
            </span>
          </template>
    </el-dialog>
</template>
<style scoped>
    .margins * {
        margin-left: 15px;
    }
</style>