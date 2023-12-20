<script setup lang="ts">
    import { ref, defineEmits, inject } from 'vue'
    import  storeCallInterface from '@/store/modules/DataDictionary/index.ts'
    const emit = defineEmits('Refresh')
    const outerVisible = inject('newdialogShow')

    const storeCallInterfaces = storeCallInterface()
    const saveNewData = async () => {
        console.log(newDialoginputdata.value)
        // console.log(storeCallInterfaces.DictionaryAdd)
        await storeCallInterfaces.DictionaryAdd(newDialoginputdata.value)
        console.log(storeCallInterfaces.addDictionaryres)
    }

    // 对话框值
    const newDialoginputdata = ref({
        serNumber: '',
        Name: '',
        notes: ''
    })
</script>
<template>
    <el-dialog v-model="outerVisible" title="Outer Dialog">
        <el-col :span="16" class="colauto">
            <el-row class="rowtop">
                <span>编号:</span>
                <el-input class="w-180 m-2" v-model="newDialoginputdata.serNumber" />
            </el-row>
            <el-row class="rowtop">
                <span>名称:</span>
                <el-input class="w-180 m-2" v-model="newDialoginputdata.Name" />
            </el-row>
            <el-row class="rowtop">
                <span>备注:</span>
                <el-input class="w-180 m-2" v-model="newDialoginputdata.notes" />
            </el-row>
        </el-col>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="outerVisible = false">取消</el-button>
                <el-button type="primary" @click="saveNewData"> 保存 </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }
    .colauto{
        margin: auto;
    }
    .rowtop{
        margin-top: 20;
        margin-left: 10px;
        line-height: 50px;
    }
</style>