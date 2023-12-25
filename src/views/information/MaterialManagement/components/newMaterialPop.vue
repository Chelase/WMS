<script setup lang="ts">
    import { ref, inject, defineEmits } from 'vue'
    import { Search } from '@element-plus/icons-vue'

    //父组件传递的值，控制弹窗显示隐藏
    const isShow = inject('isShow')
    const input2 = ref()
</script>
<template>
    <el-dialog v-model="isShow" title="新增" width="50%">
        <div class="w-80% lineheight" style="margin: auto;">
            <el-col class="w-50%">
                <el-row>
                    <span>名称:</span>
                    <el-input v-model="input2" class="w-88% m-3"/>
                </el-row>
                <el-row>
                    <span>编码:</span>
                    <el-input v-model="input2" class="w-88% m-3" placeholder="系统自动生成" disabled />
                </el-row>
                <el-row>
                    <span>类型:</span>
                    <el-select v-model="value" class="w-88% m-3" placeholder="物料类型"></el-select>
                </el-row>
                <el-row>
                    <span>下限:</span>
                    <el-input v-model="input2" class="w-88% m-3" placeholder="下限" />
                </el-row>
                <el-row>
                    <span>单价:</span>
                    <el-input v-model="input2" class="w-88% m-3" placeholder="0" />
                </el-row>
                <el-row>
                    <span>客户:</span>
                    <el-input v-model="input2" class="w-73% m-3" placeholder="客户/投料点" />
                    <el-button type="primary" class="w-12% buttop" :icon="Search"></el-button>
                </el-row>
                <el-row>
                    <span>仓库:</span>
                    <el-input v-model="input2" class="w-88% m-3" placeholder="请选择仓库" />
                </el-row>
            </el-col>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isShow = false">Cancel</el-button>
                <el-button type="primary" @click="isShow = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style scoped>
.lineheight span{
    line-height: 60px;
}
.buttop{
    margin-top: 14px;
} 
</style>