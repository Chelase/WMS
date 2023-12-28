<script setup lang="ts">
    import { ref, defineEmits, inject } from 'vue'
    import storeCallInterface from '@/store/modules/DataDictionary/index.ts'
    import { ElMessage } from 'element-plus'
    const emit = defineEmits('Refresh')
    const outerVisible = inject('newdialogShow')

    const storeCallInterfaces = storeCallInterface()
    const saveNewData = async () => {
        if (newDialoginputdata.value.Code === ''
            || newDialoginputdata.value.Name === ''
            || newDialoginputdata.value.Remarks === '') {
            ElMessage({
                message: '输入值不能为空',
                type: 'error',
            })
            return
        }
        console.log(newDialoginputdata.value)
        // console.log(storeCallInterfaces.DictionaryAdd)
        await storeCallInterfaces.DictionaryAdd(newDialoginputdata.value)
        console.log(storeCallInterfaces.addDictionaryres)
        emit('Refresh')
        if (storeCallInterfaces.addDictionaryres.Msg == '请求成功') {
            ElMessage({
                message: 'Congrats, this is a success message.',
                type: 'success',
            })
        }
    }

    // 对话框值
    const newDialoginputdata = ref({
        Code: '',
        Name: '',
        Remarks: ''
    })
    //对话框表单验证
    const newfromverify = ref({
        verifyCode: [{
            required: true, trigger: 'blur', message: '不能为空'
        }]
    })
</script>
<template>
    <el-dialog v-model="outerVisible" title="Outer Dialog">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="newfromverify" label-width="120px"
            class="demo-ruleForm">
            <el-form-item prop="verifyCode" label="编号:">
                <el-input class="w-180 m-2" v-model="newDialoginputdata.Code" />
            </el-form-item>

            <el-form-item prop="verifyCode" label="名称">
                <el-input class="w-180 m-2" v-model="newDialoginputdata.Name" />
            </el-form-item>
            <el-form-item prop="verifyCode" label="备注:">
                <el-input class="w-180 m-2" v-model="newDialoginputdata.Remarks" />
            </el-form-item>
        </el-form>
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

    .colauto {
        margin: auto;
    }

    .rowtop {
        margin-top: 20;
        margin-left: 10px;
        line-height: 50px;
    }
</style>