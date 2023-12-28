<script setup lang="ts">
    import { ref, inject, defineEmits } from 'vue'
    const emit = defineEmits(['showpop', 'showdele'])

    interface User {
        date: string
        name: string
        address: string
    }
    const multipleTableRef = ref<InstanceType<typeof ElTable>>()
    //表格数据
    //接收父级数据
    const tableDatas: User[] = inject('tableDatas')
    //存储表格多选选中数据
    const multipleSelection = ref < User[] > ([])
    // 监听选择多选
    const handleSelectionChange = (val: User[]) => {
        multipleSelection.value = val
        console.log(multipleSelection.value)
        // 如果multipleSelection有值就让删除按钮可点
        emit('showdele', val)
    }
    //'字典值'点击显示侧边弹窗，传递点击的字典值
    const dictionarys = (value, rows) => {
        // console.log('字典value', value)
        // console.log('rows', rows)
        emit('showpop', rows)
    }
</script>
<template>
    <el-table ref="multipleTableRef" :data="tableDatas" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="" type="selection">
            <template #default="{row}"> 
                <el-checkbox :disabled="row.IsSystem"></el-checkbox>
            </template>
        </el-table-column>
        <el-table-column prop="CreatorId" label="编号" width="280" />
        <el-table-column prop="Name" label="名称" width="280" />
        <el-table-column prop="IsSystem" label="系统必须" width="150">
            <template #default="scope">
                {{scope.row.IsSystem?'是':'否'}}
            </template>
        </el-table-column>
        <el-table-column prop="Remarks" label="备注" />
        <el-table-column label="操作">
            <template #default="scope">
                <div style="color: rgb(11, 109, 255); cursor: pointer;" @click="dictionarys(scope.$index, scope.row)">
                    字典值
                </div>
            </template>
        </el-table-column>
    </el-table>

</template>