<script setup lang="ts">
    import newDialog from './newDialog.vue'
    import tables from './dictionaryTable.vue'
    import { ref, inject, defineEmits } from 'vue'

    //接收父组件数据————表格列表
    const DictionaryListNum = inject('DictionaryList')
    const emit = defineEmits('getdictionary')

    // 存储表格组件选择的数据
    const delDictionaryList = ref([])
    const deletefun = (value) => {
        // console.log('父组件', value)
        delDictionaryList.value = value
        // console.log(delDictionaryList.value.length)
    }

    //显示侧边弹窗
    const isshow = (value) => {
        showhidd.value = true
        // console.log(value)
        dictionarylistData.value = value
    }


    //切换页数触发
    const nextView = (value) => {
        getdictionarylist(value)
        console.log('viwe', value)
    }

    const input2 = ref()

</script>
<template>
    <div>
        <el-row>
            <el-button type="primary" @click="newlogShow = true">+ &nbsp;新建</el-button>
            <el-button type="info" plain disabled v-if="delDictionaryList.length === 0">- &nbsp;删除</el-button>
            <el-button type="info" v-else>- &nbsp;删除</el-button>
            <el-button type="primary" @click="$emit('getdictionary')"><svg-icon name="ep:refresh-right"></svg-icon>
                刷新</el-button>
        </el-row>
        <el-row class="martop">
            <el-input v-model="input2" class="w-50 m-2" placeholder="编号/名称" style="margin-top: 0px;margin-left: 0px;" />
            <el-button type="primary"> 查询 </el-button>
            <el-button>重置</el-button>
        </el-row>
        <el-row class="martop">
            <tables @showdele="deletefun" @showpop="isshow"></tables>
        </el-row>
        <!-- 新建对话框 -->
        <newDialog @Refresh="newlogShow = false"></newDialog>
        <div class="example-pagination-block">
            <el-row>
                <el-pagination @current-change="nextView" layout="total, prev, pager, next"
                    :total="DictionaryListNum" />
            </el-row>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .martop {
        margin-top: 15px;
    }

    .example-pagination-block {
        float: right;
        line-height: 60px;
        color: rgb(100, 100, 100);
    }
</style>