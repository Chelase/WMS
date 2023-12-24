import { 
    getQueryDataList,               //获取客户列表
    addQueryData,                   //添加客户
    delQueryData,                   //删除客户
    getAddressDataList,             //获取客户地址
    addAddressDataList,             //添加客户地址
    delAddressDataList,             //删除客户地址
    modifyAddressListstate,         //修改地址状态
    modifyDefaultListstate,       //修改默认状态
} from '@/api/modules/information/customer.ts'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const storeQueryData = defineStore('querydata', () => {

    //获取客户列表
    const querydata = ref()
    const getQueryData = async (data: NonNullable<unknown>) => {
        const res = await getQueryDataList(data)
        // console.log('123', res)
        querydata.value = res
    }

    //添加客户
    const addQueryDatas = async (data: NonNullable<unknown>) => {
        const res = await addQueryData(data)
        // console.log('addquerData', res.Msg)
        if (res.Msg == '请求成功！') {
            ElMessage({
                message: '操作成功!.',
                type: 'success',
            })
        }  
    }

    //删除各户
    const delQueryDatas = async(data: NonNullable<unknown>) => {
        const res = await delQueryData(data)
        // console.log('delquerDatas', res.Msg)
        if( res.Msg == '请求成功！') {
            ElMessage({
                message: '删除成功.',
                type: 'success',
            })
        }
    }

    //获取地址
    const addressDataList = ref([])
    const getAddressData = async (data: NonNullable<unknown>) => {
        const res = await getAddressDataList(data)
        // console.log('地址', res)
        addressDataList.value = res
    }

    //添加地址
    const addAddressData = async(data: NonNullable<unknown>) => {
        const res = await addAddressDataList(data)
        // console.log(res)
    }

    //删除地址
    const delAddressData = async(data: NonNullable<unknown>) => {
        const res = await delAddressDataList(data)
        // console.log(res)
    }

    //修改地址
    const modifyAddressState = async(data:NonNullable<unknown>) => {
        const res = await modifyAddressListstate(data)
        // console.log(res)
    }

    //修改默认
    const modifyDefaultState = async(data:NonNullable<unknown>) => {
        const res = await modifyDefaultListstate(data)
        // console.log(res)
    }

    return {
        //获取客户列表
        querydata,
        getQueryData,
        //添加客户
        addQueryDatas,
        //删除客户
        delQueryDatas,
        //获取地址
        addressDataList,
        getAddressData,
        //添加地址
        addAddressData,
        //删除地址
        delAddressData,
        //修改状态
        modifyAddressState,
        //修改默认
        modifyDefaultState,
    }
})

export default storeQueryData