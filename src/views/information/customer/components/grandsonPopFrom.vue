<script setup lang="ts">

    import { ref, inject, defineEmits } from 'vue'
    import { ElMessageBox } from 'element-plus'
    import { FullScreen, User, Location } from '@element-plus/icons-vue'
    import storeQueryData from '@/store/modules/information/customer.ts'

    //store
    const storeAddress = storeQueryData()

    //触发父组件方法
    const emit = defineEmits(['refreshs'])

    //本弹框显示隐藏
    const addIsSshow = inject('addIsSshow')

    //客户id
    const customId = inject('customId')

    //输入框内容v-model
    const addAddressContent = ref({
        Address: '',
        Code: '',
        CusId: customId.value,
        IsDefault: false,
        IsEnable: true,
        Name: '',
        Remarks: '',
        SupId: ''
    })

    //取消
    //清空输入框 并 关闭弹框
    const cancellation = () => {
        addIsSshow.value = false
        addAddressContent.value = {
            Address: '',
            Code: '',
            CusId: customId,
            IsDefault: false,
            IsEnable: true,
            Name: '',
            Remarks: '',
            SupId: ''
        }
    }

    //保存
    const savedata = async() => {
        // console.log(addAddressContent.value)
        await storeAddress.addAddressData(addAddressContent.value)
        cancellation()
        emit('refreshs')
    }
</script>
<template>
    <el-dialog v-model="addIsSshow" title="新增地址" width="30%">
        <el-col :span="20" class="colauto">
            <el-row>
                <span>编号：</span>
                <el-input class="w-130 m-2" :prefix-icon="FullScreen" v-model="addAddressContent.Code" />
            </el-row>
            <el-row>
                <span>名称：</span>
                <el-input class="w-130 m-2" :prefix-icon="User" v-model="addAddressContent.Name" />
            </el-row>
            <el-row>
                <span>地址：</span>
                <el-input class="w-130 m-2" :prefix-icon="Location" v-model="addAddressContent.Address" />
            </el-row>
            <el-row>
                <span>备注：</span>
                <el-input maxlength="30" placeholder="Please input" show-word-limit type="textarea" class="w-130 m-2"
                    v-model="addAddressContent.Remarks" />
            </el-row>
        </el-col>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancellation">取消</el-button>
                <el-button type="primary" @click="savedata">
                    保存
                </el-button>
            </span>
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

    .colauto * {
        margin-top: 15px;
        line-height: 30px;
    }
</style>