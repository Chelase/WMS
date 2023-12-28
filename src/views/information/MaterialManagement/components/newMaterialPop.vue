<script setup lang="ts">
    import { ref, reactive, onMounted, inject, defineEmits } from 'vue'
    import { Search, Paperclip, FullScreen, Document, Tickets } from '@element-plus/icons-vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import selectDialogcust from './SelectCustomer.vue'
    import selectDialogsupp from './SelectSuppliers.vue'
    import storeMaterialQueryData from '@/store/modules/information/materialManage.ts'
    import useMaterialStore from '@/store/modules/information/material.ts'
    import useMeteringStore from '@/store/modules/information/metering.ts'
    import storeQueryData from '@/store/modules/information/customer.ts'
    import useSupplierStore from '@/store/modules/information/supplier.ts'
    import useWarehouseStore from '@/store/modules/information/warehouse.ts'

    //store
    const storeMaterialData = storeMaterialQueryData()
    //物料类型store
    const useMaterialStoredata = useMaterialStore()
    //计量单位store
    const useMeteringStoreData = useMeteringStore()
    //客户管理 store
    const useQueryData = storeQueryData()
    //供应商管理store 
    const useSupplierStoreData = useSupplierStore()
    //仓库管理store
    const useWarehouseStoreData = useWarehouseStore()

    //父组件传递的值，控制弹窗显示隐藏
    const isShow = inject('isShow')
    const emit = defineEmits(['refresh'])

    //form表单
    const formobj = inject('formobj')
    //get物料类型条件
    const typeCondition = {
        PageIndex: 1,
        PageRows: 10,
        Search: {},
        SortField: 'Id',
        SortType: 'asc'
    }
    //物料类型list
    const materialTypesData = ref([])
    //计量单位list
    const MeteringUniteData = ref([])
    //客户管理list
    const customerManagement = ref([])
    //供应商管理list
    const SupplierStoreData = ref([])
    //仓库管理list
    const WarehouseStoreData = ref([])
    //接口
    const initialData = async () => {
        //获取 物料类型
        await useMaterialStoredata.getMaterialTreeData(typeCondition)
        materialTypesData.value = useMaterialStoredata.MaterialTreeData
        //获取 计量单位
        await useMeteringStoreData.getdataList(typeCondition)
        MeteringUniteData.value = useMeteringStoreData.datalist.Data
        //获取 客户管理
        await useQueryData.getQueryData(typeCondition)
        customerManagement.value = useQueryData.querydata.Data
        //获取 供应商管理
        await useSupplierStoreData.getSupplierData(typeCondition)
        SupplierStoreData.value = useSupplierStoreData.supplierData
        //获取 仓库管理
        await useWarehouseStoreData.getWarehouse(typeCondition)
        WarehouseStoreData.value = useWarehouseStoreData.warehouseList
    }
    onMounted(() => {
        initialData()
    })

    //对话框表单验证
    const newfromverify = ref({
        verifyCode: [{
            required: true, trigger: 'blur', message: '不能为空'
        }]
    })

    //保存按钮
    const savedata = async () => {
        await storeMaterialData.addMaterialList(formobj.value)
        emit('refresh')
        cancellation()
    }
    //取消按钮
    const cancellation = () => {
        isShow.value = false
        formobj.value = {
            BarCode: '',
            CusId: '',
            MaterialTypeId: '',
            Max: '',
            MeasureId: '',
            Min: '',
            Name: '',
            Price: '',
            Remarks: '',
            SimpleName: '',
            Spec: '',
            StorId: '',
            SupId: ''
        }
    }

    //控制搜索客户供应商弹框显示隐藏
    const showCustom = ref(false)
    provide('showCustom', showCustom)
    const showSupplier = ref(false)
    provide('showSupplier', showSupplier)
    //选中
    const Selectedone = (value) => {
        formobj.value.CusId = value
    }
    const Selectedtwo = (value) => {
        formobj.value.SupId = value
    }
</script>
<template>
    <el-dialog v-model="isShow" title="新增" width="50%">
        <el-row :gutter="10" class="lineheight">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                <el-form ref="ruleFormRef" :model="formobj" status-icon label-width="auto">
                    <el-form-item label="名称:">
                        <el-input v-model="formobj.Name" class="w-88%" :icon="Paperclip" />
                    </el-form-item>
                    <el-form-item label="编码">
                        <el-input class="w-88%" placeholder="系统自动生成" disabled :icon="FullScreen" />
                    </el-form-item>
                    <el-form-item label="类型:">
                        <el-tree-select class="w-88%" placeholder="类型" v-model="formobj.MaterialTypeId"
                            :data="materialTypesData" :label="materialTypesData.title"
                            :props="{ vlaue: 'Id', label: 'title' }" />
                    </el-form-item>
                    <el-form-item label="下限:">
                        <el-input v-model="formobj.Min" class="w-88%" placeholder="下限" />
                    </el-form-item>
                    <el-form-item label="单价:">
                        <el-input v-model="formobj.Price" class="w-88%" placeholder="0" />
                    </el-form-item>
                    <el-form-item label="客户:">
                        <el-select v-model="formobj.CusId" class="w-73%" placeholder="客户/投料点" :icon="Document">
                            <el-option v-for="(item, index) in customerManagement" :key="index" :label="item.Name"
                                :value="item.Id" />
                        </el-select>
                        <el-button type="primary" class="w-14%" :icon="Search" @click="showCustom = true"></el-button>
                    </el-form-item>
                    <el-form-item label="仓库:">
                        <el-select v-model="formobj.StorId" class="w-88%" placeholder="请选择仓库" :icon="Document">
                            <el-option v-for="(item, index) in WarehouseStoreData" :key="index" :label="item.Name"
                                :value="item.Id" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                <el-form ref="ruleFormRef" :model="formobj" status-icon label-width="auto">
                    <el-form-item label="简介:">
                        <el-input v-model="formobj.SimpleName" class="w-88%" :icon="Paperclip" />
                    </el-form-item>
                    <el-form-item label="条码:">
                        <el-input v-model="formobj.BarCode" class="w-88%" :icon="FullScreen" />
                    </el-form-item>
                    <el-form-item label="规格:">
                        <el-input v-model="formobj.Spec" class="w-88%" :icon="Tickets" />
                    </el-form-item>
                    <el-form-item label="上限:">
                        <el-input v-model="formobj.Max" class="w-88%" placeholder="上限" />
                    </el-form-item>
                    <el-form-item label="单位:">
                        <el-select v-model="formobj.MeasureId" class="w-88%" :icon="Document" placeholder="单位">
                            <el-option v-for="(item, index) in MeteringUniteData" :key="index" :label="item.Name"
                                :value="item.Id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供应商:">
                        <el-select v-model="formobj.SupId" class="w-73%" :icon="Document" placeholder="供应商/下料点">
                            <el-option v-for="(item, index) in SupplierStoreData" :key="index" :label="item.Name"
                                :value="item.Id" />
                        </el-select>
                        <el-button type="primary" class="w-14%" :icon="Search" @click="showSupplier = true"></el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
        </el-row>
        <el-row class="w-82%" style="margin: auto;margin-top: 10px;">
            <span>备注:</span>
            <el-input v-model="formobj.Remarks" maxlength="30" show-word-limit type="textarea" class="w-90%" />
        </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancellation">取消</el-button>
                <el-button type="primary" @click="savedata">保存</el-button>
            </span>
        </template>
    </el-dialog>
    <selectDialogcust @selectionsone="Selectedone"></selectDialogcust>
    <selectDialogsupp @selectionstwo="Selectedtwo"></selectDialogsupp>
</template>
<style scoped>
</style>