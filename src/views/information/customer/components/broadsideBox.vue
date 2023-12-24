<script setup lang="ts">
    import storeQueryData from '@/store/modules/information/customer.ts'
    import { RefreshRight } from '@element-plus/icons-vue'
    import { ref, onMounted, provide, inject, defineEmits } from 'vue'
    //新增地址弹框
    import grandsonPopFrom from './grandsonPopFrom.vue'

    //store
    const getQueryData = storeQueryData()

    //客户Id
    const customId = inject('customId')
    //获取地址 负载
    const AddressNeedData = ref({
        PageIndex: 1,
        PageRows: 10,
        Search: {
            CusId: customId.value,
            SupId: ''
        },
        SortField: 'Id',
        SortType: 'asc'
    })
    //存储地址list
    const addressData = ref([])
    //获取地址
    const getAddressList = async () => {
        await getQueryData.getAddressData(AddressNeedData.value)
        addressData.value = getQueryData.addressDataList.Data
        // console.log(addressData.value[0])
    }
    onMounted(() => {
        getAddressList()
    })

    //控制新增地址的弹框显示隐藏
    const addAddressIsShow = ref(false)
    provide('addIsSshow', addAddressIsShow)

    //存储多选框选中的数据
    const addresslist = ref([])
    //监听多选框
    const handleSelectionChange = (value) => {
        // console.log(value)
        addresslist.value = []
        value.forEach(item => {
            addresslist.value.push(item.Id)
        });
    }

    //删除按钮
    const deleteAddress = async (row) => {
        if (row.length === 1) {
            // console.log(row)
            await getQueryData.delAddressData(row)
        } else {
            // console.log(addresslist.value)
            await getQueryData.delAddressData(addresslist.value)
        }
        getAddressList()
    }

    //修改状态按钮
    const modifystate = async(row) => {
        // console.log(row)
        await getQueryData.modifyAddressState(row)
    }

    //修改默认按钮
    const modifyDefault = async(row) => {
        // console.log(row)
        await getQueryData.modifyDefaultState(row)
        getAddressList()
    }
</script>
<template>
    <PageMain>
        测边框
        <el-row>
            <el-button type="primary" @click="addAddressIsShow = true">+ 新建 </el-button>
            <el-button type="info" plain disabled v-if="addresslist.length === 0">- 删除 </el-button>
            <el-button type="info" v-else @click="deleteAddress">- 删除 </el-button>
            <el-button type="primary" :icon="RefreshRight" @click="getAddressList">刷新</el-button>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-table :data="addressData" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="Code" label="编号" width="180" />
                <el-table-column prop="Name" label="家" width="180" />
                <el-table-column prop="Address" label="地址" />
                <el-table-column prop="Remarks" label="备注" />
                <el-table-column prop="IsEnable" label="状态">
                    <template #default="{row}">
                        <el-switch v-model="row.IsEnable" inline-prompt active-text="启用" inactive-text="停用" @click="modifystate(row.Id)" />
                    </template>
                </el-table-column>
                <el-table-column prop="IsDefault" label="默认">
                    <template #default="{row}">
                        <el-switch v-model="row.IsDefault" inline-prompt active-text="开" inactive-text="关" @click="modifyDefault(row.Id)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-row style="color: rgb(25, 113, 228);" class="marleft">
                            <span>编辑</span>
                            <span @click="deleteAddress([row.Id])">删除</span>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </PageMain>
    <grandsonPopFrom @refreshs="getAddressList"></grandsonPopFrom>
</template>
<style scoped>
    .marleft * {
        margin-left: 10px;
        cursor: pointer;
    }
</style>