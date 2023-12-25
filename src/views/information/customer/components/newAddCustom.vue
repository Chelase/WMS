<script setup lang="ts">
    import { ref, inject, defineEmits } from 'vue'
    import { FullScreen, User, Phone, Printer, Message } from '@element-plus/icons-vue'
    import storeQueryData from '@/store/modules/information/customer.ts'
    //store添加客户方法
    const addQueryData = storeQueryData()
    //父组件传值 控制显示
    const outerVisible = inject('showform')
    //触发父组件方法
    const emit = defineEmits(['refreshs'])

    const userType = [
        { chin: '公司', engl: 'Company' },
        { chin: '个人', engl: 'Personal' },
        { chin: '虚拟', engl: 'Virtual' },
        { chin: '内部', engl: 'Internal' }
    ]
    //表单内容
    const formData = inject('formDatas')

    //保存
    const preserve = async() => {
        // console.log(formData.value)
        await addQueryData.addQueryDatas(formData.value)
        emptyform()
        emit('refreshs')
    }

    //清空输入框封装
    function emptyform() {
        //关闭表单
        outerVisible.value = false
        //清空表单输入框
        formData.value = {
            Name: '',
            Type: '',
            Phone: '',
            Fax: '',
            Email: '',
            Remarks: ''
        }
    }
</script>
<template>
    <el-dialog v-model="outerVisible" title="新增客户">
        <div>
            <el-col :span="18" class="colauto">
                <el-row class="martop">
                    <span>客户编号：</span>
                    <el-input disabled class="w-180 m-2" :prefix-icon="FullScreen" placeholder="由系统生成" />
                </el-row>
                <el-row class="martop">
                    <span>客户名称：</span>
                    <el-input class="w-180 m-2" :prefix-icon="User" v-model="formData.Name" />
                </el-row>
                <el-row class="martop">
                    <span>客户类型：</span>
                    <el-select class="w-180 m-2" placeholder="客户类型" v-model="formData.Type">
                        <el-option v-for="item in userType" :key="item" :label="item.chin" :value="item.engl" />
                    </el-select>
                </el-row>
                <el-row class="martop">
                    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 电话；</span>
                    <el-input class="w-180 m-2" :prefix-icon="Phone" v-model="formData.Phone" />
                </el-row>
                <el-row class="martop">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 传真：</span>
                    <el-input class="w-180 m-2" :prefix-icon="Printer" v-model="formData.Fax" />
                </el-row>
                <el-row class="martop">
                    <span> &nbsp;&nbsp;&nbsp;&nbsp; Email：</span>
                    <el-input class="w-180 m-2" :prefix-icon="Message" v-model="formData.Email" />
                </el-row>
                <el-row class="martop">
                    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 备注：</span>
                    <el-input class="w-180 m-2" v-model="formData.Remarks" />
                </el-row>
            </el-col>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="emptyform">取消</el-button>
                <el-button type="primary" @click="preserve"> 保存 </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style scoped>
    .colauto {
        margin: auto;
    }

    .martop {
        margin-top: 20px;
    }

    .colauto * {
        line-height: 40px;
    }

    .dialog-footer button:first-child {
        margin-right: 10px;
    }
</style>