import { 
    getQueryDataList,               //获取客户列表
    addQueryData,                   //添加客户
    delQueryData                    //删除客户
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
                message: '添加成功.',
                type: 'success',
            })
        }  
    }

    //删除各户
    const delQueryDatas = async(data: NonNullable<unknown>) => {
        const res = await delQueryData(data)
        console.log('delquerDatas', res.Msg)
        if( res.Msg == '请求成功！') {
            ElMessage({
                message: '删除成功.',
                type: 'success',
            })
        }
    }

    return {
        //获取客户列表
        querydata,
        getQueryData,
        //添加客户
        addQueryDatas,
        //删除客户
        delQueryDatas
    }
})

export default storeQueryData