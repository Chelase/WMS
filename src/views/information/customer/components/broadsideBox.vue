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
    //分页total
    const pageTotal = ref(1)
    //获取地址
    const getAddressList = async () => {
        await getQueryData.getAddressData(AddressNeedData.value)
        addressData.value = getQueryData.addressDataList.Data
        // console.log(getQueryData.addressDataList.Data)
        //分页total
        pageTotal.value = getQueryData.addressDataList.Total
    }
    onMounted(() => {
        getAddressList()
    })
    //向子组件传递表单
    const formdataobj = ref({
        Address: '',
        Code: '',
        CusId: customId.value,
        IsDefault: false,
        IsEnable: true,
        Name: '',
        Remarks: '',
        SupId: ''
    })
    provide('addAddressContent', formdataobj)

    //新建按钮
    const newAddress = () => {
        addAddressIsShow.value = true
    }

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
    const modifystate = async (row) => {
        // console.log(row)
        await getQueryData.modifyAddressState(row)
    }

    //修改默认按钮
    const modifyDefault = async (row) => {
        // console.log(row)
        await getQueryData.modifyDefaultState(row)
        getAddressList()
    }

    //编辑按钮
    const editAddress = (row) => {
        // console.log(row)
        formdataobj.value = { ...row }
        addAddressIsShow.value = true
    }

    //分页
    const PageChange = (value) => {
        // console.log(value)
        AddressNeedData.value.PageIndex = value
        getAddressList()
    }
</script>
<template>
    <PageMain>
        测边框
        {{addressData.Total}}
        <el-row>
            <el-button type="primary" @click="newAddress">+ 新建 </el-button>
            <el-button type="info" plain disabled v-if="addresslist.length === 0">- 删除 </el-button>
            <!-- 删除弹出框 -->
            <el-popconfirm title="确定删除此地址？" @confirm="deleteAddress" v-else>
                <template #reference>
                    <el-button type="info">- 删除 </el-button>
                </template>
            </el-popconfirm>
            <el-button type="primary" :icon="RefreshRight" @click="getAddressList">刷新</el-button>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-table :data="addressData" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"/>
                <el-table-column prop="Code" label="编号"/>
                <el-table-column prop="Name" label="家"/>
                <el-table-column prop="Address" label="地址" />
                <el-table-column prop="Remarks" label="备注" />
                <el-table-column prop="IsEnable" label="状态">
                    <template #default="{row}">
                        <el-switch v-model="row.IsEnable" inline-prompt active-text="启用" inactive-text="停用"
                            @click="modifystate(row.Id)" />
                    </template>
                </el-table-column>
                <el-table-column prop="IsDefault" label="默认">
                    <template #default="{row}">
                        <el-switch v-model="row.IsDefault" inline-prompt active-text="开" inactive-text="关"
                            @click="modifyDefault(row.Id)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-row style="color: rgb(25, 113, 228);" class="marleft">
                            <span @click="editAddress(row)">编辑</span>
                            <el-popconfirm title="确定删除此地址？" @confirm="deleteAddress([row.Id])">
                                <template #reference>
                                    <span>- 删除 </span>
                                </template>
                            </el-popconfirm>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 分页 -->
        <el-row style="float: right;">
            <div class="example-pagination-block">
                <el-pagination layout="total, prev, pager, next" :total="pageTotal" @current-change="PageChange" />
            </div>
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