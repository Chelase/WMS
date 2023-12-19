<script setup lang="ts">
    import { ref, props } from 'vue'
    //表格数据
    const tableDatas = [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ]
    const tableData = props
    //存储表格多选选中数据
    const multipleSelection = ref < User[] > ([])
    // 监听选择多选
    const handleSelectionChange = (val: User[]) => {
        multipleSelection.value = val
        // console.log(multipleSelection.value)
    }
    //字典值点击事件
    const dictionarys = (value, rows) => {
        console.log('字典value', value)
        console.log('rows', rows)
        console.log('....................')
    }
</script>
<template>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="" type="selection" />
        <el-table-column prop="date" label="编号" width="280" />
        <el-table-column prop="name" label="名称" width="280" />
        <el-table-column prop="" label="系统必须" width="150" />
        <el-table-column prop="" label="备注" />
        <el-table-column label="操作">
            <template #default="scope">
            <div style="color: rgb(11, 109, 255); cursor: pointer;" @click="dictionarys(scope.$index, scope.row)">
                字典值
            </div>
            </template>
        </el-table-column>
    </el-table>
</template>